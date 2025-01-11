import React from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Link } from 'react-router-dom';

interface CompletedRaffle {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  prizeImage: string;
  winner: string;
  prizeValue: string;
  totalParticipants: number;
}

const RafflesOpened: React.FC = () => {
  // Mock data - replace with actual data later
  const completedRaffles: CompletedRaffle[] = [
    {
      id: '1',
      title: 'Past Tribe NFT Raffle',
      description: 'Previous raffle for a rare Tribe NFT',
      endDate: new Date('2024-02-01'),
      prizeImage: '/images/placeholder.png',
      winner: '0x1234...5678',
      prizeValue: '2 ETH',
      totalParticipants: 156
    },
    // Add more mock completed raffles
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <PageTitle>Past Raffles</PageTitle>
            <Link 
              to="/raffles"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              View Active Raffles
            </Link>
          </div>

          <div className="space-y-6">
            {completedRaffles.map((raffle) => (
              <div
                key={raffle.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <img 
                    src={raffle.prizeImage} 
                    alt={raffle.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="p-6 md:col-span-2">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {raffle.title}
                    </h3>
                    <p className="text-white/60 mb-4">
                      {raffle.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-white/60 block">Winner:</span>
                        <span className="text-white">{raffle.winner}</span>
                      </div>
                      
                      <div>
                        <span className="text-white/60 block">Prize Value:</span>
                        <span className="text-white">{raffle.prizeValue}</span>
                      </div>
                      
                      <div>
                        <span className="text-white/60 block">End Date:</span>
                        <span className="text-white">
                          {raffle.endDate.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-white/60 block">Participants:</span>
                        <span className="text-white">{raffle.totalParticipants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RafflesOpened;