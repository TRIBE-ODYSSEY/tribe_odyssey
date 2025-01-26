import React, { useState } from 'react';
import { FaDiscord, FaChevronDown, FaWallet } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ShinyButtonBg from './ShinyButtonBg';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import WalletModal from './WalletModal';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '', 
  children,
  ...props 
}) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const { isConnected, address, disconnect } = useAlchemy();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 min-h-[36px] min-w-[120px] text-sm',
    md: 'px-6 py-2.5 min-h-[44px] min-w-[140px]',
    lg: 'px-8 py-3 min-h-[52px] min-w-[160px] text-lg'
  };

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        className={`
          relative 
          ${sizeClasses[size]}
          rounded-full 
          transition-all 
          duration-300 
          hover:opacity-90 
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${className}
        `}
        disabled={isLoading}
        onClick={handleClick}
        {...props}
      >
        <ShinyButtonBg />
        <div className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isConnected ? (
            <>
              <FaWallet className="w-4 h-4 text-white/90" />
              <span className="text-white/90">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
              </span>
              <FaChevronDown className="w-3 h-3 text-white/90" />
            </>
          ) : (
            <>
              {isHomePage ? (
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <FaDiscord className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white">Join Discord</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <FaWallet className="w-4 h-4 text-white" />
                  <span className="text-white">{children || 'Connect Wallet'}</span>
                </div>
              )}
            </>
          )}
        </div>
      </button>

      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Button;