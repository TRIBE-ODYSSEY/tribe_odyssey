import HexagonalGrid from "@components/Common/home/HexagonalGrid";

const StatsSection = () => {
  const stats = [
    { id: 1, value: "30K+", label: "Community Members" },
    { id: 2, value: "9.4K", label: "Total NFTs" },
    { id: 3, value: "3.2K", label: "Unique Holders" },
    { id: 4, value: "1.25K", label: "Trading Volume (ETH)" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 relative">
      <HexagonalGrid />
      <div>
        <h2 className="text-4xl md:text-6xl font-medium text-center mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 rounded-lg p-6 text-center"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;