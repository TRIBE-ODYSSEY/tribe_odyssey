import Card from '../common/card/Card';
import { motion } from 'framer-motion';

const stats = [
  { id: 'community', value: '30K+', label: 'Community Members' },
  { id: 'nfts', value: '9.4K', label: 'Total NFTs' },
  { id: 'holders', value: '3.2K', label: 'Unique Holders' },
  { id: 'volume', value: '1.25K', label: 'Trading Volume (ETH)' },
] as const;

const StatsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 
                     text-[var(--color-text-primary)]">
          Statistics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(({ id, value, label }) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className="w-full"
            >
              <Card
                className="h-full flex flex-col items-center justify-center p-6 sm:p-8 
                          bg-[var(--color-overlay-dark)]/5 hover:bg-[var(--color-overlay-dark)]/10 
                          backdrop-blur-sm transition-all duration-300 rounded-xl
                          border border-[var(--color-text-primary)]/10 hover:border-[var(--color-text-primary)]/20"
              >
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-bold 
                               bg-gradient-to-r from-[var(--color-button-primary)] to-[var(--color-button-hover)] 
                               bg-clip-text text-transparent">
                    {value}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--color-text-muted)] font-medium">
                    {label}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
