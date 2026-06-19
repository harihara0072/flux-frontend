// src/components/ui/Select.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  /** Optionally sets a max height for the options list to enable scrolling */
  maxOptionsHeight?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className,
  maxOptionsHeight = 'h-40',
  ...props
}) => {
  // Base styles - layout, sizing, colors
  const baseClasses = cn(
    'w-full p-4',
    'text-gray-200 bg-gray-700',
    'border rounded-lg',
    'transition duration-200',
    'outline-none appearance-none'
  );

  // State styles - focus and error states
  const stateClasses = cn(
    // Default focus state
    !error && 'border-gray-600 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400',
    // Error state
    error && 'border-red-400 focus:border-red-400 focus:ring-red-400'
  );

  // Label styles
  const labelClasses = cn(
    'block text-sm font-medium text-gray-700 mb-2'
  );

  // Error message styles
  const errorClasses = cn(
    'text-red-400 text-sm mt-2'
  );

  // Option styles
  const optionClasses = cn(
    'bg-gray-700 text-gray-200'
  );

  // Chevron icon styles
  const chevronClasses = cn(
    'w-5 h-5 text-gray-400'
  );

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(baseClasses, stateClasses, className)}
          style={{ overflowY: 'auto' }}
          {...props}
        >
          {options && options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={optionClasses}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg className={chevronClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {error && (
        <p className={errorClasses}>{error}</p>
      )}
    </div>
  );
};

export default Select;