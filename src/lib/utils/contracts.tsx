import { ethers } from "ethers";
import MulticallABI from "@src/lib/config/abi/Multicall.json";
import TribeABI from "@src/lib/config/abi/tribe.json";
import ApeABI from "@src/lib/config/abi/erc721.json";
import ERC20ABI from "@src/lib/config/abi/erc20.json";
import StakingABI from "@src/lib/config/abi/staking.json";
import EnsRegistrarABI from "@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json";

import {
  getApeAddress,
  getEnsRegistrarAddress,
  getMulticallAddress,
  getStakingAddress,
  getTribeAddress,
} from "@src/lib/utils/addressHelpers";
import getNodeUrl from "@src/lib/utils/getRcpUrl";
import { getMerkleProof } from "@src/lib/utils/merkle";
import { isAddress } from ".";
import axios from "axios";

export const simpleRpcProvider = new ethers.JsonRpcProvider(
  getNodeUrl()
);

export const getContract = (
  address: string,
  abi: any,
  signer: ethers.Signer | null
): ethers.Contract => {
  const signerOrProvider = signer ? signer : simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getMulticallContract = (provider: ethers.Provider | ethers.Signer): ethers.Contract => {
  return getContract(getMulticallAddress(), MulticallABI, provider as ethers.Signer);
};

// Get NFT Contract
export const getTribeContract = (provider: ethers.Provider | ethers.Signer): ethers.Contract => {
  return getContract(getTribeAddress(), TribeABI, provider as ethers.Signer);
};

export const getApeContract = (provider: ethers.Provider | ethers.Signer): ethers.Contract => {
  return getContract(getApeAddress(), ApeABI, provider as ethers.Signer);
};

export const getTokenContract = (currency: string, provider: ethers.Provider | ethers.Signer): ethers.Contract => {
  return getContract(currency, ERC20ABI, provider as ethers.Signer);
};

export const getStakingContract = (provider: ethers.Provider | ethers.Signer): ethers.Contract => {
  return getContract(getStakingAddress(), StakingABI, provider as ethers.Signer);
};

export const getEnsRegistrarContract = (provider: ethers.Provider | ethers.Signer): ethers.Contract => {
  return getContract(getEnsRegistrarAddress(), EnsRegistrarABI, provider as ethers.Signer);
};

export const mint = async (numToMint: number, signer: ethers.Signer) => {
  const nftContract = getTribeContract(signer);

  try {
    const account = await signer.getAddress();
    const proof = getMerkleProof(account);

    const price = await nftContract.costForMint(numToMint, account, proof);

    const balance = await (signer.provider?.getBalance(account) ?? 0n);
    if (balance <= price) {
      throw new Error("Insufficient funds!");
    }

    const feeData = await signer.provider?.getFeeData();
    const gasPrice = feeData?.gasPrice;
    const minGasPrice = ethers.parseUnits("20", "gwei");
    const finalGasPrice = gasPrice && gasPrice < minGasPrice ? minGasPrice : gasPrice;

    const gasLimit = await nftContract.mint.estimateGas(numToMint, proof, {
      value: price,
    });

    const tx = await nftContract.mint(numToMint, proof, {
      value: price,
      gasLimit: BigInt(Number(gasLimit) * 1.4),
      gasPrice: finalGasPrice && BigInt(Number(finalGasPrice) * 1.2),
    });
    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
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

    if (owner && isAddress(owner)) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    return false;
  }
};

export const checkExist = async (ids: number[]) => {
  const nftContract = getTribeContract(simpleRpcProvider);

  if (ids.length === 0) return [];

  try {
    const exists = await nftContract.isExists(ids.map((id) => id - 10000));

    return ids.filter((_, index) => exists[index]);
  } catch (error: unknown) {
    return [];
  }
};

export const claim = async (ids: number[], signer: ethers.Signer) => {
  const nftContract = getTribeContract(signer);
  try {
    const feeData = await signer.provider?.getFeeData();
    const gasPrice = feeData?.gasPrice;
    const minGasPrice = ethers.parseUnits("20", "gwei");
    const finalGasPrice = gasPrice && gasPrice < minGasPrice ? minGasPrice : gasPrice;

    const exists = await checkExist(ids);
    if (exists.length) {
      throw new Error("Some of selected are already claimed!");
    }

    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await nftContract.claim.estimateGas(ids[0]);
      tx = await nftContract.claim(ids[0], {
        gasLimit: BigInt(Number(gasLimit) * 1.4),
        gasPrice: finalGasPrice && BigInt(Number(finalGasPrice) * 1.2),
      });
    } else {
      gasLimit = await nftContract.claimBatch.estimateGas(ids);
      tx = await nftContract.claimBatch(ids, {
        gasLimit: BigInt(Number(gasLimit) * 1.4),
        gasPrice: finalGasPrice && BigInt(Number(finalGasPrice) * 1.2),
      });
    }

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const register = async (name: string, signer: ethers.Signer) => {
  const ensContract = getEnsRegistrarContract(signer);
  const nftContract = getTribeContract(signer);
  const address = await signer.getAddress();
  try {
    const feeData = await signer.provider?.getFeeData();
    const gasPrice = feeData?.gasPrice;
    const minGasPrice = ethers.parseUnits("10", "gwei");
    const finalGasPrice = gasPrice && gasPrice < minGasPrice ? minGasPrice : gasPrice;

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
      gasLimit: BigInt(Number(gasLimit) * 1.4),
      gasPrice: finalGasPrice && BigInt(Number(finalGasPrice) * 1.2),
    });

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error";
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
  } catch {
    return null;
  }
};

export const stake = async (ids: number[], pid: number, signer: ethers.Signer) => {
  const nftContract = getTribeContract(signer);
  const stakingContract = getStakingContract(signer);
  try {
    const feeData = await signer.provider?.getFeeData();
    const gasPrice = feeData?.gasPrice;
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
        gasLimit: BigInt(Number(gasLimit) * 1.1),
        gasPrice,
      });
    } else {
      gasLimit = await stakingContract.joinMany.estimateGas(pid, ids);
      tx = await stakingContract.joinMany(pid, ids, {
        gasLimit: BigInt(Number(gasLimit) * 1.1),
        gasPrice,
      });
    }

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};

export const unstake = async (ids: number[], pid: number, signer: ethers.Signer) => {
  const stakingContract = getStakingContract(signer);
  try {
    const feeData = await signer.provider?.getFeeData();
    const gasPrice = feeData?.gasPrice;
    let gasLimit;
    let tx;

    if (ids.length === 1) {
      gasLimit = await stakingContract.leaveOne.estimateGas(pid, ids[0]);
      tx = await stakingContract.leaveOne(pid, ids[0], {
        gasLimit: BigInt(Number(gasLimit) * 1.1),
        gasPrice,
      });
    } else {
      gasLimit = await stakingContract.leaveMany.estimateGas(pid, ids);
      tx = await stakingContract.leaveMany(pid, ids, {
        gasLimit: BigInt(Number(gasLimit) * 1.1),
        gasPrice,
      });
    }

    const receipt = await tx.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      error: null,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      message
        ? message.length > 100
          ? message.slice(0, 100) + "..."
          : message
        : "Failed Transaction!"
    );
  }
};
