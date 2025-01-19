import React from 'react';
import { motion } from 'framer-motion';
import { FaXTwitter, FaDiscord, FaInstagram} from 'react-icons/fa6';
import { SiOpensea } from "react-icons/si";
import PageTitle from '@src/components/common/PageTitle';

const socialLinks = [
  {
    name: 'X',
    icon: <FaXTwitter size={24} />,
    href: 'https://x.com/tribeodyssey'
  },
  {
    name: 'Discord',
    icon: <FaDiscord size={24} />,
    href: 'https://discord.gg/tribeodyssey'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram size={24} />,
    href: 'https://instagram.com/tribeodyssey'
  }
];

const marketplaces = [
  {
    name: 'OpenSea',
    logo: <SiOpensea size={32} />,
    href: 'https://opensea.io/collection/tribe-odyssey'
  }
];

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, var(--color-button-primary) 0%, 
                      rgba(255, 0, 9, 0.05) 50%, transparent 100%)`,
          opacity: '0.05',
          mixBlendMode: 'screen',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <PageTitle>System Maintenance</PageTitle>
          
          <p className="text-lg text-[var(--color-text-muted)] mb-12">
            We're currently upgrading our systems to bring you an even better experience.
            Please check back soon.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] 
                         transition-colors duration-200"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Marketplace Links */}
          <div className="flex justify-center gap-6">
            {marketplaces.map((marketplace) => (
              <motion.a
                key={marketplace.name}
                href={marketplace.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-overlay-dark)] p-4 rounded-xl 
                         flex items-center justify-center
                         hover:bg-[var(--color-overlay-dark)]/80 
                         transition-colors duration-200
                         border border-[var(--color-text-primary)]/10"
              >
                <span className="text-[var(--color-text-on-dark)]">
                  {marketplace.logo}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Status Updates */}
          <div className="mt-12 text-sm text-[var(--color-text-muted)]">
            For status updates, please follow us on X
            <a 
              href="https://x.com/tribeodyssey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-[var(--color-button-primary)] 
                       hover:text-[var(--color-button-hover)] 
                       transition-colors duration-200"
            >
              Twitter
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenancePage; 