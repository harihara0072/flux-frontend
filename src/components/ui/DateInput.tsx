// src/components/ui/DateInput.tsx
import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, error, className, ...props }) => {
  // Base styles - layout, sizing, colors
  const baseClasses = cn(
    'w-full p-4',
    'text-gray-200 bg-gray-700',
    'border rounded-lg',
    'transition duration-200',
    'outline-none'
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

  return (
    <div className="w-full">
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      <input
        type="date"
        className={cn(baseClasses, stateClasses, className)}
        {...props}
      />
      {error && (
        <p className={errorClasses}>{error}</p>
      )}
    </div>
  );
};

export default DateInput;

