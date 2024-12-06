import { useEffect } from "react";

interface WinnerCardProps {
  imageUrl: string;
  tokenId: string;
  daysAgo: number;
  title: string;
  entries: number;
}

const WinnerCard = ({
  imageUrl,
  tokenId,
  daysAgo,
  title,
  entries,
}: WinnerCardProps) => (
  <div className="bg-gray-900 border border-white/10 rounded-md p-6 flex-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:border-white/20">
    <div
      className="h-56 bg-cover bg-center rounded-md relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex items-center gap-2 absolute bottom-2 left-2">
        <button className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-800 font-inter text-none hover:bg-white transition-colors duration-300">
          #{tokenId}
        </button>
        <button className="bg-red-600 rounded-full px-3 py-1 text-xs text-white font-inter text-none hover:bg-red-700 transition-colors duration-300">
          {daysAgo} Days Ago
        </button>
      </div>
    </div>
    <div className="pt-4">
      <h6 className="font-montserrat font-semibold text-white mb-1">{title}</h6>
      <p className="font-montserrat text-gray-400 mb-2">#{tokenId}</p>
      <button className="w-full bg-gray-200 rounded-full px-6 py-3 font-inter text-gray-800 text-none transition transform duration-300 ease-in-out hover:bg-white hover:-translate-y-0.5">
        View Winner
      </button>
      <div className="flex justify-center mt-2">
        <p className="font-inter text-gray-400">{entries.toLocaleString()} ENTRIES</p>
      </div>
    </div>
  </div>
);

const WinnersPage = () => {
  useEffect(() => {
    document.title = "Winners";
  }, []);

  const winners: WinnerCardProps[] = [
    {
      imageUrl: "/images/11362.png",
      tokenId: "1033627",
      daysAgo: 400,
      title: "Tribe Ordinals",
      entries: 1184,
    },
    // Dodaj więcej zwycięzców tutaj...
  ];

  return (
    <div className="flex flex-col items-center py-16 px-4 min-h-screen bg-gradient-to-b from-[#14121b] to-black">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="bg-gradient-to-b from-gray-200 to-transparent bg-clip-text text-transparent font-montserrat font-medium text-5xl text-center leading-tight mb-10 sm:text-3xl sm:leading-tight">
          Winners
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {winners.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersPage;