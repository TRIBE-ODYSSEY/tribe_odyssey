import { FC, ReactElement } from "react";

interface ButtonProps {
  children: ReactElement | string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
  type = 'button',
  variant = 'primary',
}) => {
  const baseClasses = "transition-all rounded-md h-[50px] flex justify-center items-center px-[20px] font-medium";
  
  const variantClasses = {
    primary: `${
      disabled
        ? "bg-[var(--color-button-disabled)] text-gray-400 cursor-not-allowed"
        : "bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] active:bg-[var(--color-button-primary)]/80 text-white"
    }`,
    secondary: `${
      disabled
        ? "bg-[var(--color-button-disabled)] text-gray-400 cursor-not-allowed"
        : "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 active:bg-[var(--color-secondary)]/80 text-white"
    }`
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
