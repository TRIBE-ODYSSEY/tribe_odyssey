import * as React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  className = '',
  onClick
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
