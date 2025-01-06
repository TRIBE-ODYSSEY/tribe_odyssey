import { type Address, type Hash, parseEther, zeroAddress } from 'viem'
import { type WalletClient, type PublicClient, getContract } from 'wagmi/actions'
import { type GetContractReturnType } from 'wagmi/contracts'

// Import ABIs as plain imports instead of require
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
  isZeroAddress,
} from "../utils/addressHelpers"
import getNodeUrl from "../utils/getRcpUrl"
import { getMerkleProof } from "../utils/merkle"
import axios from "axios"

// Define contract types based on ABIs
type MulticallContract = GetContractReturnType<typeof MulticallABI>
type TribeContract = GetContractReturnType<typeof TribeABI>
type ApeContract = GetContractReturnType<typeof ApeABI>
type ERC20Contract = GetContractReturnType<typeof ERC20ABI>
type StakingContract = GetContractReturnType<typeof StakingABI>
type EnsRegistrarContract = GetContractReturnType<typeof EnsRegistrarABI>

// Update the provider to use Viem's public client
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(getNodeUrl())
})

// Update contract getter functions to use Wagmi v2 patterns
export const getContract = <TAbi extends any[]>(
  address: Address, 
  abi: TAbi,
  client: PublicClient | WalletClient
) => {
  return getContract({
    address,
    abi,
    publicClient: client as PublicClient,
    walletClient: client as WalletClient
  })
}

export const getMulticallContract = (client: PublicClient | WalletClient) => {
  return getContract(getMulticallAddress(), MulticallABI, client) as MulticallContract
}

export const getTribeContract = (client: PublicClient | WalletClient) => {
  return getContract(getTribeAddress(), TribeABI, client) as TribeContract
}

export const getApeContract = (client: PublicClient | WalletClient) => {
  return getContract(getApeAddress(), ApeABI, client) as ApeContract
}

export const getTokenContract = (currency: Address, client: PublicClient | WalletClient) => {
  return getContract(currency, ERC20ABI, client) as ERC20Contract
}

export const getStakingContract = (client: PublicClient | WalletClient) => {
  return getContract(getStakingAddress(), StakingABI, client) as StakingContract
}

export const getEnsRegistrarContract = (client: PublicClient | WalletClient) => {
  return getContract(getEnsRegistrarAddress(), EnsRegistrarABI, client) as EnsRegistrarContract
}

export const mint = async (
  numToMint: number, 
  client: WalletClient
): Promise<{ transactionHash: Hash; error: null } | { error: string }> => {
  try {
    const account = await client.account.address
    if (!account) throw new Error('No account connected')

    const proof = getMerkleProof(account)
    
    // Read cost for minting
    const price = await readContract({
      address: getTribeAddress(),
      abi: TribeABI,
      functionName: 'costForMint',
      args: [BigInt(numToMint), account, proof]
    })

    // Check balance
    const balance = await publicClient.getBalance({ address: account })
    if (balance < price) {
      throw new Error('Insufficient funds!')
    }

    // Prepare the transaction
    const { request } = await prepareWriteContract({
      address: getTribeAddress(),
      abi: TribeABI,
      functionName: 'mint',
      args: [BigInt(numToMint), proof],
      value: price
    })

    // Send the transaction
    const hash = await writeContract(request)

    // Wait for transaction
    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    return {
      transactionHash: receipt.transactionHash,
      error: null
    }
  } catch (e) {
    const error = e as BaseError
    const message = error?.message || 'Failed Transaction!'
    return {
      error: message.length > 100 ? message.slice(0, 100) + '...' : message
    }
  }
}

export const checkClaimed = async (id: number): Promise<boolean> => {
  try {
    const owner = await readContract({
      address: getTribeAddress(),
      abi: TribeABI,
      functionName: 'ownerOf',
      args: [BigInt(id - 10000)]
    })

    return owner ? isZeroAddress(owner) : false
  } catch {
    return false
  }
}

export const checkExist = async (ids: number[]): Promise<number[]> => {
  if (ids.length === 0) return []

  try {
    const exists = await readContract({
      address: getTribeAddress(),
      abi: TribeABI,
      functionName: 'isExists',
      args: [ids.map(id => BigInt(id - 10000))]
    })

    return ids.filter((_, index) => exists[index])
  } catch {
    return []
  }
}

export const claim = async (
  ids: number[], 
  client: WalletClient
): Promise<{ transactionHash: Hash; error: null } | { error: string }> => {
  try {
    // Check if any tokens are already claimed
    const exists = await checkExist(ids)
    if (exists.length) {
      throw new Error('Some of selected are already claimed!')
    }

    // Prepare the transaction based on number of ids
    const { request } = await prepareWriteContract({
      address: getTribeAddress(),
      abi: TribeABI,
      functionName: ids.length === 1 ? 'claim' : 'claimBatch',
      args: ids.length === 1 ? [BigInt(ids[0])] : [ids.map(id => BigInt(id))]
    })

    // Send the transaction
    const hash = await writeContract(request)

    // Wait for transaction
    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    return {
      transactionHash: receipt.transactionHash,
      error: null
    }
  } catch (e) {
    const error = e as BaseError
    const message = error?.message || 'Failed Transaction!'
    return {
      error: message.length > 100 ? message.slice(0, 100) + '...' : message
    }
  }
}

export const register = async (name: string, signer: JsonRpcSigner) => {
  const ensContract = getEnsRegistrarContract(signer);
  const nftContract = getTribeContract(signer);
  const address = await signer.getAddress();
  try {
    let gasPrice = await signer.provider.getGasPrice();
    if (gasPrice.lt(ethers.parseUnits("10", "gwei"))) {
      gasPrice = ethers.parseUnits("10", "gwei");
    }

    const label = ethers.keccak256(ethers.toUtf8Bytes("tribeodyssey"));
    const resolver = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41");

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
    const gasPrice = await signer.provider.getGasPrice();
    const address = await signer.getAddress();
    const approved = await nftContract.isApprovedForAll(
      address,
      stakingContract.target
    );
    if (!approved) {
      const approveTx = await nftContract.setApprovalForAll(
        stakingContract.target,
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
    const gasPrice = await signer.provider.getGasPrice();
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
