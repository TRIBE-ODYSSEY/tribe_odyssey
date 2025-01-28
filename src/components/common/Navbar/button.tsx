import React from 'react';
import ShinyButtonBg from './ShinyButtonBg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '', 
  children,
  leftIcon,
  rightIcon,
  ...props 
}) => {

  const sizeClasses = {
    sm: 'px-4 py-2 min-h-[36px] min-w-[120px] text-sm',
    md: 'px-6 py-2.5 min-h-[44px] min-w-[140px]',
    lg: 'px-8 py-3 min-h-[52px] min-w-[160px] text-lg'
  };

  return (
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
      {...props}
    >
      <ShinyButtonBg />
      <div className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex items-center">{rightIcon}</span>}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;