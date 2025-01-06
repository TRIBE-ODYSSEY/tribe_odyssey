import { createPublicClient, http, parseGwei, keccak256, encodeAbiParameters, type PublicClient, type WalletClient } from 'viem'
import { getContract } from 'viem'
import { mainnet } from 'wagmi/chains'
import { type Wallet } from 'ethers'

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
    address: address as `0x${string}`,
    abi,
    client: client as PublicClient,
    publicClient: client as PublicClient
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
  signer: Wallet;
}

// Update register function
export const register = async (
  name: string,
  client: WalletClient
) => {
  const ensContract = getEnsRegistrarContract(client);
  const nftContract = getTribeContract(client);
  const address = client.account?.address;

  try {
    const feeData = await client.request({
      method: 'eth_gasPrice'
    });
    let gasPrice = BigInt(feeData as string);
    if (gasPrice < parseGwei("10")) {
      gasPrice = parseGwei("10");
    }

    const label = keccak256(encodeAbiParameters(
      [{ type: 'string' }],
      [name]
    ));
    const resolver = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

    const [exists, balance, allowed] = await Promise.all([
      ensContract.read.query([label, name]),
      nftContract.read.balanceOf([address]),
      ensContract.read.allowedToRegister([address])
    ]);

    if (Number(balance) <= 0) {
      throw new Error(`You don't have tribe nft!`);
    }

    if (exists !== "tribeodyssey") {
      throw new Error(`Subdomain ${name}.tribeodyssey.eth already registered!`);
    }

    if (!allowed) {
      throw new Error(`You can register 1 ENS per wallet address!`);
    }

    const gasLimit = await ensContract.estimateGas.register([
      label,
      name,
      resolver
    ]);

    const { request } = await ensContract.simulate.register(
      [label, name, resolver],
      {
        account: address,
        gas: (gasLimit * 140n) / 100n,
        gasPrice: (gasPrice * 120n) / 100n
      }
    );

    const hash = await client.writeContract(request);
    const receipt = await client.waitForTransactionReceipt({ hash });

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };

  } catch (error: unknown) {
    console.log(error);
    const message = error instanceof Error ? error.message : 'Failed Transaction!';
    throw new Error(
      message.length > 100 ? message.slice(0, 100) + "..." : message
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
