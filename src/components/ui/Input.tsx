import React from 'react';
import clsx from 'clsx';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  id,
  name,
  className,
  fullWidth = false,
}) => {
  return (
    <div className={clsx('mb-4', fullWidth && 'w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={clsx(
          'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500'
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;