import { FC, useState, useMemo } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from 'react-modal';
import { ClockLoader } from 'react-spinners';
import PageLayout from '@src/components/common/layout/PageLayout';
import Button from '@src/components/common/Button';
import { useModal as useConnectKitModal } from 'connectkit';
import { useQueryClient } from '@tanstack/react-query';
import { stakingAbi, stakingAddress } from '@src/generated';
import { useReadContract, useWriteContract } from 'wagmi';

const StakeApes: FC = () => {
  const [selectedApes, setSelectedApes] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'unstaked' | 'staked'>('unstaked');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { address: account, isConnected } = useAccount();
  const { openConnectModal } = useConnectKitModal();
  const { signMessageAsync } = useSignMessage();
  const queryClient = useQueryClient();
  const { writeContract } = useWriteContract();

  // Read staked NFTs
  const { data: stakedNfts } = useReadContract({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'getStakedTokens',
    args: [account!],
    enabled: !!account,
  });

  // Read unstaked NFTs
  const { data: unstakedNfts } = useReadContract({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'getUnstakedTokens',
    args: [account!],
    enabled: !!account,
  });

  const displayedNfts = useMemo(() => {
    return activeTab === 'staked' ? stakedNfts : unstakedNfts;
  }, [activeTab, stakedNfts, unstakedNfts]);

  const handleStake = async () => {
    if (!account || selectedApes.length === 0) {
      toast.error('Please select NFTs to stake');
      return;
    }

    setIsLoading(true);
    try {
      const message = JSON.stringify({
        ids: selectedApes,
        address: account.toLowerCase(),
      });

      const signature = await signMessageAsync({ message });

      await axios.post('/api/staking/stake', {
        address: account,
        signature,
        ids: selectedApes,
      });

      await writeContract({
        address: stakingAddress,
        abi: stakingAbi,
        functionName: 'stakeMany',
        args: [selectedApes],
      });

      toast.success(`Successfully staked ${selectedApes.length} NFT(s)`);
      setSelectedApes([]);
      setIsConfirmModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['stakedNfts'] });

    } catch (error) {
      toast.error('Failed to stake NFTs');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!account || selectedApes.length === 0) {
      toast.error('Please select NFTs to unstake');
      return;
    }

    setIsLoading(true);
    try {
      const message = JSON.stringify({
        ids: selectedApes,
        address: account.toLowerCase(),
      });

      const signature = await signMessageAsync({ message });

      await axios.post('/api/staking/unstake', {
        address: account,
        signature,
        ids: selectedApes,
      });

      await writeContract({
        address: stakingAddress,
        abi: stakingAbi,
        functionName: 'unstakeMany',
        args: [selectedApes],
      });

      toast.success(`Successfully unstaked ${selectedApes.length} NFT(s)`);
      setSelectedApes([]);
      setIsUnstakeModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['stakedNfts'] });

    } catch (error) {
      toast.error('Failed to unstake NFTs');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="text-center">
            <p className="mb-4">Connect your wallet to view and stake your NFTs</p>
            <Button onClick={openConnectModal}>Connect Wallet</Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-6">
              <div className="flex gap-4">
                <Button 
                  onClick={() => setActiveTab('unstaked')}
                  variant={activeTab === 'unstaked' ? 'primary' : 'secondary'}
                >
                  Unstaked
                </Button>
                <Button 
                  onClick={() => setActiveTab('staked')}
                  variant={activeTab === 'staked' ? 'primary' : 'secondary'}
                >
                  Staked
                </Button>
              </div>
              <Button
                onClick={() => activeTab === 'staked' ? setIsUnstakeModalOpen(true) : setIsConfirmModalOpen(true)}
                disabled={selectedApes.length === 0}
              >
                {activeTab === 'staked' ? 'Unstake Selected' : 'Stake Selected'}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedNfts?.map((nft) => (
                <div 
                  key={nft.id}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden
                    ${selectedApes.includes(nft.id) ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => {
                    setSelectedApes(prev => 
                      prev.includes(nft.id) 
                        ? prev.filter(id => id !== nft.id)
                        : [...prev, nft.id]
                    );
                  }}
                >
                  <img 
                    src={nft.image} 
                    alt={`NFT #${nft.id}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Stake Confirmation Modal */}
        <Modal
          isOpen={isConfirmModalOpen}
          onRequestClose={() => setIsConfirmModalOpen(false)}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl mb-4">Confirm Staking</h2>
          <p>Are you sure you want to stake {selectedApes.length} NFT(s)?</p>
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              variant="secondary"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStake}
              disabled={isLoading}
            >
              {isLoading ? <ClockLoader size={20} color="white" /> : 'Confirm Stake'}
            </Button>
          </div>
        </Modal>

        {/* Unstake Confirmation Modal */}
        <Modal
          isOpen={isUnstakeModalOpen}
          onRequestClose={() => setIsUnstakeModalOpen(false)}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl mb-4">Confirm Unstaking</h2>
          <p>Are you sure you want to unstake {selectedApes.length} NFT(s)?</p>
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              variant="secondary"
              onClick={() => setIsUnstakeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUnstake}
              disabled={isLoading}
            >
              {isLoading ? <ClockLoader size={20} color="white" /> : 'Confirm Unstake'}
            </Button>
          </div>
        </Modal>
      </div>
    </PageLayout>
  );
};

export default StakeApes;