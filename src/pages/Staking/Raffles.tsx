import React from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface RaffleCard {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  prizeImage: string;
  totalTickets: number;
  ticketsSold: number;
  prizeValue: string;
}

const Raffles: React.FC = () => {
  // Mock data - replace with actual data later
  const activeRaffles: RaffleCard[] = [
    {
      id: '1',
      title: 'Exclusive Tribe NFT',
      description: 'Win a rare Tribe NFT from our exclusive collection',
      endDate: new Date('2024-04-01'),
      prizeImage: '/images/placeholder.png',
      totalTickets: 100,
      ticketsSold: 45,
      prizeValue: '2 ETH'
    },
    // Add more mock raffles
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <PageTitle>Active Raffles</PageTitle>
            <Link 
              to="/raffles/opened"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              View Past Raffles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRaffles.map((raffle) => (
              <motion.div
                key={raffle.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <img 
                  src={raffle.prizeImage} 
                  alt={raffle.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {raffle.title}
                  </h3>
                  <p className="text-white/60 mb-4">
                    {raffle.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Prize Value:</span>
                      <span className="text-white">{raffle.prizeValue}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Tickets Sold:</span>
                      <span className="text-white">
                        {raffle.ticketsSold} / {raffle.totalTickets}
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

                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Ends in:</span>
                      <span className="text-white">
                        {new Date(raffle.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/raffles/${raffle.id}`}
                    className="mt-6 block w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Enter Raffle
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Raffles;