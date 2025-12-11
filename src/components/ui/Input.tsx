// src/components/ui/Input.tsx
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  const inputClasses = `
    w-full p-4 
    text-gray-200 
    bg-gray-700 
    border border-gray-600 
    rounded-lg 
    transition duration-200 
    focus:ring-2 
    focus:ring-emerald-400 
    focus:border-emerald-400 
    outline-none
    ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default Input;