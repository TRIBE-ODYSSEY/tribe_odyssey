import { createPublicClient, http, parseGwei, keccak256, encodeAbiParameters, type PublicClient, type WalletClient } from 'viem'
import { getContract } from '@wagmi/core'
import { mainnet } from 'wagmi/chains'
import { type WalletClient as EthersWalletClient } from 'ethers'

// Import ABIs
import MulticallABI from '../config/abi/Multicall.json'
import TribeABI from '../config/abi/tribe.json'
import ApeABI from '../config/abi/erc721.json'
import ERC20ABI from '../config/abi/erc20.json'
import StakingABI from '../config/abi/staking.json'
import EnsRegistrarABI from '../config/abi/EthRegistrarSubdomainRegistrar.json'

import {
  getApeAddress,
  getEnsRegistrarAddress,
  getMulticallAddress,
  getStakingAddress,
  getTribeAddress,
} from "./addressHelpers"
import getNodeUrl from "./getRcpUrl"
import axios from "axios"

// Create public client for read operations
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(getNodeUrl())
})

// Contract getter function
export const getContractInstance = (
  address: string, 
  abi: any[], 
  client: PublicClient | WalletClient
) => {
  return getContract({
    address,
    abi,
    publicClient: client as PublicClient,
    walletClient: client as WalletClient
  })
}

// Contract getters
export const getMulticallContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getMulticallAddress(), MulticallABI, client)
}

export const getTribeContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getTribeAddress(), TribeABI, client)
}

export const getApeContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getApeAddress(), ApeABI, client)
}

export const getTokenContract = (tokenAddress: string, client: PublicClient | WalletClient) => {
  return getContractInstance(tokenAddress, ERC20ABI, client)
}

export const getStakingContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getStakingAddress(), StakingABI, client)
}

export const getEnsRegistrarContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getEnsRegistrarAddress(), EnsRegistrarABI, client)
}

// Add interfaces
interface StakeParams {
  ids: number[];
  pid: number;
  signer: EthersWalletClient;
}

// Update register function
export const register = async (
  name: string, 
  signer: EthersWalletClient
) => {
  const ensContract = getEnsRegistrarContract(signer);
  const nftContract = getTribeContract(signer);
  const address = await signer.getAddress();
  try {
    let gasPrice = await signer.getGasPrice();
    if (gasPrice < parseGwei("10")) {
      gasPrice = parseGwei("10");
    }

    const label = keccak256(encodeAbiParameters(
      [{ type: 'string' }],
      [name]
    ));
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

// Update stake function
export const stake = async ({
  ids,
  pid,
  signer
}: StakeParams): Promise<{ transactionHash: string; error: null | string }> => {
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

// Update unstake function
export const unstake = async ({
  ids,
  pid,
  signer
}: StakeParams): Promise<{ transactionHash: string; error: null | string }> => {
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
