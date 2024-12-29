import React from 'react';
import { FaDiscord, FaChevronDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isWalletConnected?: boolean;
}

const buttonVariants = {
  discord: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  wallet: 'bg-blue-500 hover:bg-blue-600 text-white',
  profile: 'border border-white/20 hover:bg-white/10 text-white/90'
} as const;

const Button: React.FC<ButtonProps> = ({ 
  isWalletConnected = false,
  className = '', 
  ...props 
}) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  if (isWalletConnected) {
    return (
      <button
        className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${buttonVariants.profile} ${className}`}
        {...props}
      >
        <span>Profile</span>
        <FaChevronDown className="w-3 h-3" />
      </button>
    );
  }

  return (
    <button
      className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
        isHomePage ? buttonVariants.discord : buttonVariants.wallet
      } ${className}`}
      {...props}
    >
      {isHomePage ? (
        <>
          <FaDiscord className="w-5 h-5" />
          <span>Join Discord</span>
        </>
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
};

export default Button;
