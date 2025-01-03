import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import useWinners from '@src/lib/hooks/useWinners';
import moment from 'moment';

const WinnerCard: React.FC<{
  id: string;
  nftId: string;
  projectName: string;
  prizeImage: string;
  raffleAt: string;
  entryCount: number;
}> = ({ id, nftId, projectName, prizeImage, raffleAt, entryCount }) => {
  const daysAgo = moment.utc().diff(moment.utc(raffleAt), 'days');

  return (
    <div className="bg-dark border border-white/10 rounded-lg p-3 transition-all 
                  duration-300 hover:border-white/20">
      <div className="relative">
        <img 
          src={prizeImage} 
          alt={projectName}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-2 w-full px-2 flex justify-between">
          <span className="bg-white text-gray-600 text-xs font-semibold px-2 
                       py-1 rounded-full">
            #{nftId}
          </span>
          <span className="bg-yellow-400 text-black text-xs font-bold px-2 
                       py-1 rounded-full whitespace-nowrap">
            {daysAgo} Days Ago
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <h4 className="font-semibold text-white">{projectName}</h4>
          <p className="text-xs text-gray-400">#{nftId}</p>
        </div>

        <Link
          to={`/raffle/${id}`}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-800 
                   hover:opacity-90 transition-opacity rounded-md text-white text-sm 
                   font-medium border border-transparent"
        >
          View Winner
        </Link>

        <div className="text-center text-xs text-gray-400 font-medium">
          {entryCount} ENTRIES
        </div>
      </div>
    </div>
  );
};

const Winners: React.FC = () => {
  const { raffles = [] } = useWinners(0);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-[900px] mx-auto">
          <PageTitle className="text-center">Winners</PageTitle>
          
          <p className="mt-4 text-center text-gray-400">
            Past raffle winners. Winners are grinners!
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {raffles.map((raffle) => (
              <WinnerCard
                key={raffle.id}
                id={raffle.id}
                nftId={raffle.nft_id}
                projectName={raffle.project_name}
                prizeImage={raffle.prize_image}
                raffleAt={raffle.raffle_at}
                entryCount={raffle.entry_count}
              />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Winners; 