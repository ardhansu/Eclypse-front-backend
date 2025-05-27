import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'transition-all duration-200 font-medium rounded focus:outline-none',
        {
          // Variants
          'bg-primary text-white hover:bg-gray-800': variant === 'primary',
          'bg-white text-primary border border-primary hover:bg-gray-100': variant === 'secondary',
          'bg-transparent border border-primary text-primary hover:bg-gray-100': variant === 'outline',
          
          // Sizes
          'text-xs px-3 py-1': size === 'sm',
          'text-sm px-4 py-2': size === 'md',
          'text-base px-6 py-3': size === 'lg',
          
          // Full width
          'w-full': fullWidth,
          
          // Disabled
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;