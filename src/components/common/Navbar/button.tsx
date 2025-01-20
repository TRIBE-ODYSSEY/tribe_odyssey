import React from 'react';
import { FaDiscord, FaChevronDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ShinyButtonBg from './ShinyButtonBg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isWalletConnected?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  isWalletConnected = false,
  className = '', 
  children,
  ...props 
}) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <button
      className={`relative px-6 py-2.5 min-h-[44px] min-w-[140px] rounded-full transition-all duration-300 hover:opacity-90 ${className}`}
      {...props}
    >
      <ShinyButtonBg />
      <div className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {isWalletConnected ? (
          <>
            <span className="text-white/90">{children}</span>
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
              <span className="text-white">{children}</span>
            )}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;