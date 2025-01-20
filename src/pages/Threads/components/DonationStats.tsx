import React from 'react';
import { motion } from 'framer-motion';

const DonationStats: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
    >
      {[
        { value: '100+', label: 'Hoodies Donated' },
        { value: '$4,400', label: 'Funds Raised' },
        { value: '50+', label: 'Contributors' },
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-[var(--color-secondary)] rounded-2xl p-6 text-center border border-white/10
                   transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
        >
          <h3 className="text-3xl font-light text-[var(--color-text-primary)] mb-2">
            {stat.value}
          </h3>
          <p className="text-[var(--color-text-secondary)]">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default DonationStats;
