import Card from '../common/card/Card';

const StatsSection = () => {
  const stats = [
    { id: 1, value: '30K+', label: 'Community Members' },
    { id: 2, value: '9.4K', label: 'Total NFTs' },
    { id: 3, value: '3.2K', label: 'Unique Holders' },
    { id: 4, value: '1.25K', label: 'Trading Volume (ETH)' },
  ];

  return (
    <div className="stats-section py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.id}
              height="auto"
              className="flex flex-col items-center justify-center p-4"
            >
              <h3 className="text-2xl font-semibold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
