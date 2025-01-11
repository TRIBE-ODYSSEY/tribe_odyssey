import React, { useState, useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
// @ts-ignore
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@src/components/common/Button';
import { toast } from 'react-toastify';
import RaffleFormModal from '@src/components/Raffles/RaffleFormModal';
import { useNavigate } from 'react-router-dom';

interface RaffleData {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  prizeImage: string;
  totalTickets: number;
  ticketsSold: number;
  prizeValue: string;
  ticketPrice: string;
  status: 'active' | 'completed' | 'draft';
  participants: {
    address: string;
    tickets: number;
    joinedAt: Date;
  }[];
  winner?: string;
}

const ADMIN_ADDRESSES = [
  '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
];

const RafflesAdmin: React.FC = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRaffle, setSelectedRaffle] = useState<RaffleData | null>(null);
  const [raffles, setRaffles] = useState<RaffleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address || !ADMIN_ADDRESSES.includes(address)) {
      toast.error('Unauthorized access');
      navigate('/raffles');
      return;
    }
    fetchRaffles();
  }, [address]);

  const fetchRaffles = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const mockRaffles: RaffleData[] = [
        {
          id: '1',
          title: 'Exclusive Tribe NFT',
          description: 'Win a rare Tribe NFT from our exclusive collection',
          endDate: new Date('2024-04-01'),
          prizeImage: '/images/placeholder.png',
          totalTickets: 100,
          ticketsSold: 45,
          prizeValue: '2 ETH',
          ticketPrice: '0.1 ETH',
          status: 'active',
          participants: []
        }
      ];
      setRaffles(mockRaffles);
    } catch (error) {
      console.error('Failed to fetch raffles:', error);
      toast.error('Failed to load raffles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRaffle = async (formData: FormData) => {
    try {
      // Add validation
      if (!formData.get('title') || !formData.get('description')) {
        toast.error('Please fill in all required fields');
        return;
      }

      const newRaffle: RaffleData = {
        id: String(Date.now()),
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        endDate: new Date(formData.get('endDate') as string),
        prizeImage: formData.get('prizeImage') as string,
        totalTickets: Number(formData.get('totalTickets')),
        ticketsSold: 0,
        prizeValue: formData.get('prizeValue') as string,
        ticketPrice: formData.get('ticketPrice') as string,
        status: 'draft',
        participants: []
      };

      // Replace with actual API call
      setRaffles([...raffles, newRaffle]);
      toast.success('Raffle created successfully!');
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create raffle:', error);
      toast.error('Failed to create raffle');
    }
  };

  const handleUpdateRaffle = async (raffleId: string, updates: Partial<RaffleData>) => {
    try {
      // Replace with actual API call
      setRaffles(raffles.map(raffle => 
        raffle.id === raffleId 
          ? { ...raffle, ...updates }
          : raffle
      ));
      toast.success('Raffle updated successfully!');
    } catch (error) {
      console.error('Failed to update raffle:', error);
      toast.error('Failed to update raffle');
    }
  };

  const handleEndRaffle = async (raffleId: string) => {
    try {
      // Add confirmation dialog
      if (!window.confirm('Are you sure you want to end this raffle?')) {
        return;
      }

      await handleUpdateRaffle(raffleId, { status: 'completed' });
    } catch (error) {
      console.error('Failed to end raffle:', error);
      toast.error('Failed to end raffle');
    }
  };

  const handleDrawWinner = async (raffleId: string) => {
    try {
      const raffle = raffles.find(r => r.id === raffleId);
      if (!raffle || raffle.participants.length === 0) {
        toast.error('No participants in this raffle');
        return;
      }

      // Replace with actual winner selection logic
      const winnerIndex = Math.floor(Math.random() * raffle.participants.length);
      const winner = raffle.participants[winnerIndex];

      await handleUpdateRaffle(raffleId, { 
        winner: winner.address,
        status: 'completed'
      });

      toast.success(`Winner: ${winner.address}`);
    } catch (error) {
      console.error('Failed to draw winner:', error);
      toast.error('Failed to draw winner');
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <PageTitle>Raffle Administration</PageTitle>
            <Button onClick={() => setIsCreating(true)}>
              Create New Raffle
            </Button>
          </div>

          {/* Raffle List */}
          <div className="space-y-6">
            {raffles.map((raffle) => (
              <motion.div
                key={raffle.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <img 
                    src={raffle.prizeImage} 
                    alt={raffle.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="p-6 md:col-span-3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {raffle.title}
                        </h3>
                        <p className="text-white/60 mt-1">
                          {raffle.description}
                        </p>
                      </div>
                      <span className={`
                        px-3 py-1 rounded-full text-sm
                        ${raffle.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                          raffle.status === 'completed' ? 'bg-gray-500/20 text-gray-400' : 
                          'bg-yellow-500/20 text-yellow-400'}
                      `}>
                        {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <span className="text-white/60 block text-sm">Prize Value:</span>
                        <span className="text-white">{raffle.prizeValue}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block text-sm">Tickets Sold:</span>
                        <span className="text-white">
                          {raffle.ticketsSold} / {raffle.totalTickets}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/60 block text-sm">End Date:</span>
                        <span className="text-white">
                          {raffle.endDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/60 block text-sm">Progress:</span>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ 
                              width: `${(raffle.ticketsSold / raffle.totalTickets) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={() => setSelectedRaffle(raffle)}>
                        Edit
                      </Button>
                      {raffle.status === 'active' && (
                        <>
                          <Button onClick={() => handleEndRaffle(raffle.id)}>
                            End Raffle
                          </Button>
                          <Button onClick={() => handleDrawWinner(raffle.id)}>
                            Draw Winner
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(isCreating || selectedRaffle) && (
          <RaffleFormModal
            raffle={selectedRaffle}
            onClose={() => {
              setIsCreating(false);
              setSelectedRaffle(null);
            }}
            onSubmit={handleCreateRaffle}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default RafflesAdmin;