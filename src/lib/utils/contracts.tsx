import { createPublicClient, http, type PublicClient, type WalletClient } from 'viem'
import { getContract } from 'wagmi/actions'
import { mainnet } from 'wagmi/chains'

// Import ABIs
import MulticallABI from "../config/abi/Multicall.json";
import TribeABI from "../config/abi/tribe.json";
import ApeABI from "../config/abi/erc721.json";
import ERC20ABI from "../config/abi/erc20.json";
import StakingABI from "../config/abi/staking.json";
import EnsRegistrarABI from "../config/abi/EthRegistrarSubdomainRegistrar.json";

import {
  getApeAddress,
  getEnsRegistrarAddress,
  getMulticallAddress,
  getStakingAddress,
  getTribeAddress,
} from "./addressHelpers";
import getNodeUrl from "./getRpcUrl";
import whitelist from "../config/whitelist";
import { getMerkleProof } from "./merkle";
import { isAddress } from ".";
import axios from "axios";

// Create public client for read operations
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(getNodeUrl())
})

// Update contract getter to use Wagmi v2
export const getContract = (address: string, abi: any[], client: PublicClient | WalletClient) => {
  return getContract({
    address,
    abi,
    publicClient: client as PublicClient,
    walletClient: client as WalletClient
  })
}

export const getMulticallContract = (provider) => {
  return getContract(getMulticallAddress(), MulticallABI, provider);
};

// Get NFT Contract
export const getTribeContract = (provider) => {
  return getContract(getTribeAddress(), TribeABI, provider);
};

export const getApeContract = (provider) => {
  return getContract(getApeAddress(), ApeABI, provider);
};

export const getTokenContract = (currency, provider) => {
  return getContract(currency, ERC20ABI, provider);
};

export const getStakingContract = (provider) => {
  return getContract(getStakingAddress(), StakingABI, provider);
};

export const getEnsRegistrarContract = (provider) => {
  return getContract(getEnsRegistrarAddress(), EnsRegistrarABI, provider);
};

export const mint = async (numToMint, signer) => {
  const nftContract = getTribeContract(signer);

  try {
    const account = await signer.getAddress();
    const proof = getMerkleProof(whitelist, account);

    const price = await nftContract.costForMint(numToMint, account, proof);

    const balance = await signer.getBalance();
    if (balance.lte(price)) {
      throw new Error("Insufficient funds!");
    }

    let gasPrice = await signer.getGasPrice();
    if (gasPrice.lt(utils.parseUnits("20", "gwei"))) {
      gasPrice = utils.parseUnits("20", "gwei");
    }

    const gasLimit = await nftContract.estimateGas.mint(numToMint, proof, {
      value: price,
    });

    const tx = await nftContract.mint(numToMint, proof, {
      value: price,
      gasLimit: gasLimit.mul(140).div(100),
      gasPrice: gasPrice.mul(120).div(100),
    });
    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (e: any) {
    const message = e?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const checkClaimed = async (id) => {
  const nftContract = getTribeContract(simpleRpcProvider);

  try {
    const owner = await nftContract.ownerOf(id - 10000);

    if (owner && isAddress(owner)) {
      return true;
    }
    return false;
  } catch (e: any) {
    return false;
  }
};

export const checkExist = async (ids: number[]) => {
  const nftContract = getTribeContract(simpleRpcProvider);

  if (ids.length === 0) return [];

  try {
    const exists = await nftContract.isExists(ids.map((id) => id - 10000));

    return ids.filter((_, index) => exists[index]);
  } catch (e: any) {
    return [];
  }
};

export const claim = async (ids, signer) => {
  const nftContract = getTribeContract(signer);
  try {
    let gasPrice = await signer.getGasPrice();
    if (gasPrice.lt(utils.parseUnits("20", "gwei"))) {
      gasPrice = utils.parseUnits("20", "gwei");
    }

    const exists = await checkExist(ids);
    if (exists.length) {
      throw new Error("Some of selected are already claimed!");
    }

    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await nftContract.estimateGas.claim(ids[0]);
      tx = await nftContract.claim(ids[0], {
        gasLimit: gasLimit.mul(140).div(100),
        gasPrice: gasPrice.mul(120).div(100),
      });
    } else {
      gasLimit = await nftContract.estimateGas.claimBatch(ids);
      tx = await nftContract.claimBatch(ids, {
        gasLimit: gasLimit.mul(140).div(100),
        gasPrice: gasPrice.mul(120).div(100),
      });
    }

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (e: any) {
    console.log(e);
    const message = e?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const register = async (name: string, signer) => {
  const ensContract = getEnsRegistrarContract(signer);
  const nftContract = getTribeContract(signer);
  const address = await signer.getAddress();
  try {
    let gasPrice = await signer.getGasPrice();
    if (gasPrice.lt(utils.parseUnits("10", "gwei"))) {
      gasPrice = utils.parseUnits("10", "gwei");
    }

    const label = utils.keccak256(utils.toUtf8Bytes("tribeodyssey"));
    const resolver = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

    const [exists, balance, allowed] = await Promise.all([
      ensContract.query(label, name),
      nftContract.balanceOf(address),
      ensContract.allowedToRegister(address),
    ]);

    if (balance.toNumber() <= 0) {
      throw new Error(`You don't have tribe nft!`);
    }

    if (exists !== "tribeodyssey") {
      throw new Error(`Subdomain ${name}.tribeodyssey.eth already registered!`);
    }

    if (!allowed) {
      throw new Error(`You can register 1 ENS per wallet address!`);
    }

    let gasLimit = await ensContract.estimateGas.register(
      label,
      name,
      resolver
    );
    let tx = await ensContract.register(label, name, resolver, {
      gasLimit: gasLimit.mul(140).div(100),
      gasPrice: gasPrice.mul(120).div(100),
    });

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (e: any) {
    console.log(e);
    const message = e?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const lookup = async (account: string) => {
  const endpoint =
    "https://api.thegraph.com/subgraphs/name/hades8090/ens-subgraph";
  const headers = {
    "content-type": "application/json",
  };
  const graphqlQuery = {
    operationName: "ens",
    query: `query ens {
      domains(first:1, where: {owner_contains: "${account.toLowerCase()}"}) {
        id
        name
        owner {
          id
        }
      }
      
    }`,
    variables: {},
  };

  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });
    const subdomains = response?.data?.data?.domains;
    return subdomains && subdomains.length ? subdomains[0].name : null;
  } catch (e) {
    return null;
  }
};

export const stake = async (ids, pid, signer) => {
  const nftContract = getTribeContract(signer);
  const stakingContract = getStakingContract(signer);
  try {
    let gasPrice = await signer.getGasPrice();
    const address = await signer.getAddress();
    const approved = await nftContract.isApprovedForAll(
      address,
      stakingContract.address
    );
    if (!approved) {
      let approveTx = await nftContract.setApprovalForAll(
        stakingContract.address,
        true
      );
      await approveTx.wait(1);
    }

    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await stakingContract.estimateGas.joinOne(pid, ids[0]);
      tx = await stakingContract.joinOne(pid, ids[0], {
        gasLimit: gasLimit.mul(110).div(100),
        gasPrice,
      });
    } else {
      gasLimit = await stakingContract.estimateGas.joinMany(pid, ids);
      tx = await stakingContract.joinMany(pid, ids, {
        gasLimit: gasLimit.mul(110).div(100),
        gasPrice,
      });
    }

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (e: any) {
    console.log(e);
    const message = e?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const unstake = async (ids, pid, signer) => {
  const stakingContract = getStakingContract(signer);
  try {
    let gasPrice = await signer.getGasPrice();
    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await stakingContract.estimateGas.leaveOne(pid, ids[0]);
      tx = await stakingContract.leaveOne(pid, ids[0], {
        gasLimit: gasLimit.mul(110).div(100),
        gasPrice,
      });
    } else {
      gasLimit = await stakingContract.estimateGas.leaveMany(pid, ids);
      tx = await stakingContract.leaveMany(pid, ids, {
        gasLimit: gasLimit.mul(110).div(100),
        gasPrice,
      });
    }

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (e: any) {
    console.log(e);
    const message = e?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};