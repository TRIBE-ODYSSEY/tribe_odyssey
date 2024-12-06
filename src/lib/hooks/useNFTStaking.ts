// import { useState } from 'react';
// import { useAccount, useContractWrite, useContractRead } from 'wagmi';
// import { parseEther } from 'viem';
// import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../config/constants';

// export interface NFTStakingState {
//   stakedNFTs: number;
//   isStaking: boolean;
//   isUnstaking: boolean;
//   error: string | null;
//   rewards: bigint;
// }

// export const useNFTStaking = () => {
//   const { address } = useAccount();
//   const [state, setState] = useState<NFTStakingState>({
//     stakedNFTs: 0,
//     isStaking: false,
//     isUnstaking: false,
//     error: null,
//     rewards: BigInt(0),
//   });

//   const { write: stakeWrite } = useContractWrite({
//     address: NFT_CONTRACT_ADDRESS,
//     abi: NFT_CONTRACT_ABI,
//     functionName: 'stake',
//   });

//   const { write: unstakeWrite } = useContractWrite({
//     address: NFT_CONTRACT_ADDRESS,
//     abi: NFT_CONTRACT_ABI,
//     functionName: 'unstake',
//   });

//   const { data: stakedBalance } = useContractRead({
//     address: NFT_CONTRACT_ADDRESS,
//     abi: NFT_CONTRACT_ABI,
//     functionName: 'balanceOf',
//     args: [address],
//     watch: true,
//   });

//   const { data: rewardsBalance } = useContractRead({
//     address: NFT_CONTRACT_ADDRESS,
//     abi: NFT_CONTRACT_ABI,
//     functionName: 'getRewards',
//     args: [address],
//     watch: true,
//   });

//   const stakeNFT = async () => {
//     if (!address) {
//       setState(prev => ({ ...prev, error: 'Please connect your wallet' }));
//       return;
//     }

//     setState(prev => ({ ...prev, isStaking: true, error: null }));
//     try {
//       await stakeWrite({
//         args: [1], // Assuming staking 1 NFT at a time
//         value: parseEther('0.01'), // Example staking fee
//       });
//     } catch (error) {
//       console.error('Error staking NFT:', error);
//       setState(prev => ({ 
//         ...prev, 
//         error: 'Failed to stake NFT. Please try again.' 
//       }));
//     } finally {
//       setState(prev => ({ ...prev, isStaking: false }));
//     }
//   };

//   const unstakeNFT = async () => {
//     if (!address) {
//       setState(prev => ({ ...prev, error: 'Please connect your wallet' }));
//       return;
//     }

//     setState(prev => ({ ...prev, isUnstaking: true, error: null }));
//     try {
//       await unstakeWrite({
//         args: [1], // Assuming unstaking 1 NFT at a time
//       });
//     } catch (error) {
//       console.error('Error unstaking NFT:', error);
//       setState(prev => ({ 
//         ...prev, 
//         error: 'Failed to unstake NFT. Please try again.' 
//       }));
//     } finally {
//       setState(prev => ({ ...prev, isUnstaking: false }));
//     }
//   };

//   return {
//     ...state,
//     stakedNFTs: Number(stakedBalance || 0),
//     rewards: rewardsBalance || BigInt(0),
//     stakeNFT,
//     unstakeNFT,
//   };
// };