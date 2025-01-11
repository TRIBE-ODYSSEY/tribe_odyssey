import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import Button from '@src/components/common/Button';
// @ts-ignore
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

interface Participant {
  address: string;
  tickets: number;
  joinedAt: Date;
}

interface RaffleDetails {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  prizeImage: string;
  totalTickets: number;
  ticketsSold: number;
  prizeValue: string;
  ticketPrice: string;
  participants: Participant[];
}

const RaffleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();
  const [ticketAmount, setTicketAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data with participants
  const raffle: RaffleDetails = {
    id: id || '1',
    title: 'Exclusive Tribe NFT',
    description: 'Win a rare Tribe NFT from our exclusive collection',
    endDate: new Date('2024-04-01'),
    prizeImage: '/images/placeholder.png',
    totalTickets: 100,
    ticketsSold: 45,
    prizeValue: '2 ETH',
    ticketPrice: '0.1 ETH',
    participants: [
      {
        address: '0x1234...5678',
        tickets: 5,
        joinedAt: new Date('2024-03-15')
      },
      {
        address: '0x8765...4321',
        tickets: 3,
        joinedAt: new Date('2024-03-14')
      },
      // Add more mock participants
    ]
  };

  const handleBuyTickets = async () => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      // API call to purchase tickets
      toast.success(`Successfully purchased ${ticketAmount} ticket(s)!`);
    } catch (error) {
      toast.error('Failed to purchase tickets');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const shortenAddress = (address: string) => {
    if (address.includes('...')) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <PageTitle>{raffle.title}</PageTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Column - Image and Description */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <img 
                  src={raffle.prizeImage} 
                  alt={raffle.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Description</h3>
                <p className="text-white/60">{raffle.description}</p>
              </div>
            </div>

            {/* Right Column - Details and Purchase */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Prize Value:</span>
                    <span className="text-white">{raffle.prizeValue}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/60">Ticket Price:</span>
                    <span className="text-white">{raffle.ticketPrice}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/60">Tickets Remaining:</span>
                    <span className="text-white">
                      {raffle.totalTickets - raffle.ticketsSold} / {raffle.totalTickets}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/60">End Date:</span>
                    <span className="text-white">
                      {new Date(raffle.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ 
                        width: `${(raffle.ticketsSold / raffle.totalTickets) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Buy Tickets</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTicketAmount(Math.max(1, ticketAmount - 1))}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white text-xl font-medium">{ticketAmount}</span>
                    <button
                      onClick={() => setTicketAmount(ticketAmount + 1)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-white/60">
                    Total Cost: {Number(raffle.ticketPrice.split(' ')[0]) * ticketAmount} ETH
                  </div>

                  <Button
                    onClick={handleBuyTickets}
                    disabled={isLoading || !address}
                    className="w-full"
                  >
                    {isLoading ? 'Processing...' : 'Buy Tickets'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* New Participants Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Participants ({raffle.participants.length})
            </h3>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Address
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Tickets
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Chance to Win
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {raffle.participants.map((participant, index) => (
                      <tr 
                        key={index}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-white">
                          {shortenAddress(participant.address)}
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {participant.tickets}
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {participant.joinedAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {((participant.tickets / raffle.ticketsSold) * 100).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {raffle.participants.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  No participants yet. Be the first to join!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RaffleDetails;