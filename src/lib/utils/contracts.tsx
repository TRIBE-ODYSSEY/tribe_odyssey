import { ethers } from "ethers";
import type { JsonRpcProvider, JsonRpcSigner } from "ethers";
import type { BaseContract } from "ethers";
import MulticallABI from "../config/abi/Multicall.json" assert { type: "json" };
import TribeABI from "../config/abi/tribe.json" assert { type: "json" };
import ApeABI from "../config/abi/erc721.json" assert { type: "json" };
import ERC20ABI from "../config/abi/erc20.json" assert { type: "json" };
import StakingABI from "../config/abi/staking.json" assert { type: "json" };
import EnsRegistrarABI from "../config/abi/EthRegistrarSubdomainRegistrar.json" assert { type: "json" };

import {
  getApeAddress,
  getEnsRegistrarAddress,
  getMulticallAddress,
  getStakingAddress,
  getTribeAddress,
  isZeroAddress,
} from "../utils/addressHelpers";
import getNodeUrl from "../utils/getRcpUrl";
import { getMerkleProof } from "../utils/merkle";
import axios from "axios";

export const simpleRpcProvider = new ethers.JsonRpcProvider(
  getNodeUrl()
);

export const getContract = (
  address: string,
  abi: any[],
  signer: JsonRpcSigner | JsonRpcProvider
): BaseContract => {
  const signerOrProvider = signer ? signer : simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getMulticallContract = (provider: JsonRpcProvider | JsonRpcSigner) => {
  return getContract(getMulticallAddress(), MulticallABI, provider);
};

// Get NFT Contract
export const getTribeContract = (provider: JsonRpcProvider | JsonRpcSigner) => {
  return getContract(getTribeAddress(), TribeABI, provider);
};

export const getApeContract = (provider: JsonRpcProvider | JsonRpcSigner) => {
  return getContract(getApeAddress(), ApeABI, provider);
};

export const getTokenContract = (currency: string, provider: JsonRpcProvider | JsonRpcSigner) => {
  return getContract(currency, ERC20ABI, provider);
};

export const getStakingContract = (provider: JsonRpcProvider | JsonRpcSigner) => {
  return getContract(getStakingAddress(), StakingABI, provider);
};

export const getEnsRegistrarContract = (provider: JsonRpcProvider | JsonRpcSigner) => {
  return getContract(getEnsRegistrarAddress(), EnsRegistrarABI, provider);
};

export const mint = async (numToMint: number, signer: JsonRpcSigner) => {
  const nftContract = getTribeContract(signer);

  try {
    const account = await signer.getAddress();
    const proof = getMerkleProof(account);

    const price = await nftContract.costForMint(numToMint, account, proof);

    const balance = await signer.getBalance();
    if (balance.lte(price)) {
      throw new Error("Insufficient funds!");
    }

    let gasPrice = await signer.getGasPrice();
    if (gasPrice.lt(ethers.parseUnits("20", "gwei"))) {
      gasPrice = ethers.parseUnits("20", "gwei");
    }

    const gasLimit = await nftContract.mint.estimateGas(numToMint, proof, {
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
  } catch (e: unknown) {
    const error = e as Error;
    const message = error?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const checkClaimed = async (id: number) => {
  const nftContract = getTribeContract(simpleRpcProvider);

  try {
    const owner = await nftContract.ownerOf(id - 10000);

    if (owner && isZeroAddress(owner)) {
      return true;
    }
    return false;
  } catch (_e: unknown) {
    return false;
  }
};

export const checkExist = async (ids: number[]) => {
  const nftContract = getTribeContract(simpleRpcProvider);

  if (ids.length === 0) return [];

  try {
    const exists = await nftContract.isExists(ids.map((id) => id - 10000));

    return ids.filter((_, index) => exists[index]);
  } catch (_e: unknown) {
    return [];
  }
};

export const claim = async (ids: number[], signer: JsonRpcSigner) => {
  const nftContract = getTribeContract(signer);
  try {
    let gasPrice = await signer.getGasPrice();
    if (gasPrice.lt(ethers.parseUnits("20", "gwei"))) {
      gasPrice = ethers.parseUnits("20", "gwei");
    }

    const exists = await checkExist(ids);
    if (exists.length) {
      throw new Error("Some of selected are already claimed!");
    }

    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await nftContract.claim.estimateGas(ids[0]);
      tx = await nftContract.claim(ids[0], {
        gasLimit: gasLimit.mul(140).div(100),
        gasPrice: gasPrice.mul(120).div(100),
      });
    } else {
      gasLimit = await nftContract.claimBatch.estimateGas(ids);
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
  } catch (e: unknown) {
    console.log(e);
    const error = e as Error;
    const message = error?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const register = async (name: string, signer: JsonRpcSigner) => {
  const ensContract = getEnsRegistrarContract(signer);
  const nftContract = getTribeContract(signer);
  const address = await signer.getAddress();
  try {
    let gasPrice = await signer.getGasPrice();
    if (gasPrice.lt(ethers.parseUnits("10", "gwei"))) {
      gasPrice = ethers.parseUnits("10", "gwei");
    }

    const label = ethers.keccak256(ethers.toUtf8Bytes("tribeodyssey"));
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

    const gasLimit = await ensContract.register.estimateGas(
      label,
      name,
      resolver
    );
    const tx = await ensContract.register(label, name, resolver, {
      gasLimit: gasLimit.mul(140).div(100),
      gasPrice: gasPrice.mul(120).div(100),
    });

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (e: unknown) {
    console.log(e);
    const error = e as Error;
    const message = error?.message;
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
  } catch (_e: unknown) {
    return null;
  }
};

export const stake = async (ids: number[], pid: number, signer: JsonRpcSigner) => {
  const nftContract = getTribeContract(signer);
  const stakingContract = getStakingContract(signer);
  try {
    const gasPrice = await signer.getGasPrice();
    const address = await signer.getAddress();
    const approved = await nftContract.isApprovedForAll(
      address,
      stakingContract.address
    );
    if (!approved) {
      const approveTx = await nftContract.setApprovalForAll(
        stakingContract.address,
        true
      );
      await approveTx.wait(1);
    }

    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await stakingContract.joinOne.estimateGas(pid, ids[0]);
      tx = await stakingContract.joinOne(pid, ids[0], {
        gasLimit: gasLimit.mul(110).div(100),
        gasPrice,
      });
    } else {
      gasLimit = await stakingContract.joinMany.estimateGas(pid, ids);
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
  } catch (e: unknown) {
    console.log(e);
    const error = e as Error;
    const message = error?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const unstake = async (ids: number[], pid: number, signer: JsonRpcSigner) => {
  const stakingContract = getStakingContract(signer);
  try {
    const gasPrice = await signer.getGasPrice();
    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await stakingContract.leaveOne.estimateGas(pid, ids[0]);
      tx = await stakingContract.leaveOne(pid, ids[0], {
        gasLimit: gasLimit.mul(110).div(100),
        gasPrice,
      });
    } else {
      gasLimit = await stakingContract.leaveMany.estimateGas(pid, ids);
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
  } catch (e: unknown) {
    console.log(e);
    const error = e as Error;
    const message = error?.message;
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};
