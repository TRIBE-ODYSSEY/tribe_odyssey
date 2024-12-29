import Card from '../common/card/Card';

const stats = [
  { id: 'community', value: '30K+', label: 'Community Members' },
  { id: 'nfts', value: '9.4K', label: 'Total NFTs' },
  { id: 'holders', value: '3.2K', label: 'Unique Holders' },
  { id: 'volume', value: '1.25K', label: 'Trading Volume (ETH)' },
] as const;

const StatsSection = () => (
  <section className="container mx-auto px-4 py-8 sm:py-12">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white/90">
        Statistics
      </h2>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {stats.map(({ id, value, label }) => (
          <Card
            key={id}
            height="auto"
            className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              {value}
            </h3>
            <p className="text-sm sm:text-base text-white/70 text-center">
              {label}
            </p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
