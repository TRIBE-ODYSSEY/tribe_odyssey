import { FC, ReactElement } from "react";


interface ButtonProps {
  children: ReactElement | string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition-all rounded-md h-[50px] flex justify-center items-center px-[20px] ${
        disabled
          ? "bg-theme-grey cursor-not-allowed"
          : "bg-[#B91D1D] hover:bg-[#961616] active:bg-[#870505]"
      } ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
