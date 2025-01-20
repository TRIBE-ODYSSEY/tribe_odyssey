import React from 'react';
import { IMAGES } from '@src/assets/images';

interface DonateHoodieProps {
  amount: string;
}

const DonateHoodie: React.FC<DonateHoodieProps> = ({ amount }) => {
  return (
    <div className="bg-[var(--color-secondary)] rounded-2xl border border-white/10 
                   transition-all duration-300 hover:-translate-y-1.5
                   hover:border-white/20 hover:shadow-xl overflow-hidden">
      <div className="relative h-32 bg-gradient-to-b from-[rgba(255,0,8,0.1)] to-transparent">
        <img
          src={IMAGES.threads.hoodieFront}
          alt="Hoodie"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-28 w-auto object-contain"
        />
      </div>
      <div className="p-6 text-center">
        <p className="text-[var(--color-text-secondary)] text-sm mb-2">
          Donate a Hoodie
        </p>
        <p className="text-2xl font-light text-[var(--color-text-primary)]">
          ${amount}
        </p>
      </div>
    </div>
  );
};

export default DonateHoodie;
