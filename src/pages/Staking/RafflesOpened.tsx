import { Link } from 'react-router-dom';
import moment from 'moment';
import PageLayout from '@src/components/common/layout/PageLayout';
import useRaffles from '@src/lib/hooks/useRaffles';
import { RaffleData } from '@src/lib/types/raffle';

interface RaffleCardProps {
  id: string;
  nft_id: string;
  project_name: string;
  prize_image: string;
  raffle_at: string;
  entry_count: number;
}

const RaffleCard = ({ 
  id, 
  nft_id, 
  project_name, 
  prize_image, 
  raffle_at, 
  entry_count 
}: RaffleCardProps) => (
  <div className="bg-dark border border-gray-600/50 rounded-lg p-3 transition-all duration-300 hover:border-gray-500">
    <div className="relative">
      <img 
        src={prize_image} 
        alt={project_name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="absolute bottom-2 w-full px-2 flex justify-between">
        <span className="bg-white text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
          #{nft_id}
        </span>
        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
          {Math.max(moment.utc(raffle_at).diff(moment.utc(), 'days'), 0)} Days Left
        </span>
      </div>
    </div>

    <div className="mt-3 space-y-3">
      <div>
        <h4 className="font-semibold text-white">{project_name}</h4>
        <p className="mt-1 text-xs text-gray-400">#{nft_id}</p>
      </div>

      <Link
        to={`/raffle/${id}`}
        className="block w-full py-2 bg-gradient-to-r from-purple-600 to-purple-800 
                 hover:opacity-90 transition-opacity rounded-md text-white 
                 text-sm font-medium border-2 border-transparent text-center"
      >
        Enter Now
      </Link>

      <div className="py-3 text-xs text-gray-400 font-semibold text-center">
        {entry_count || 0} ENTRIES
      </div>
    </div>
  </div>
);

const RafflesOpened = () => {
  const { raffles = [], isLoading } = useRaffles(false, 0);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            Open Raffles
          </h1>
          
          <div className="mt-6 text-center text-gray-400 space-y-2">
            <p>Currently open raffles that you can enter with your NANA points.</p>
            <p>Good luck!</p>
          </div>

          {isLoading ? (
            <div className="mt-10 text-center text-gray-400">Loading...</div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {raffles.map((raffle: RaffleData) => (
                <RaffleCard 
                  key={raffle.id}
                  id={raffle.id}
                  nft_id={raffle.nft_id}
                  project_name={raffle.project_name}
                  prize_image={raffle.prize_image}
                  raffle_at={raffle.raffle_at}
                  entry_count={raffle.entry_count}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default RafflesOpened;
