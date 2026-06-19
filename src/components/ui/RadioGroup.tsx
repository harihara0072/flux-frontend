// src/components/ui/RadioGroup.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  label, 
  options, 
  selectedValue, 
  onChange, 
  error, 
  className 
}) => {
  // Container styles
  const containerClasses = cn(
    'space-y-1',
    className
  );

  // Label styles - matches other form field labels
  const labelClasses = cn(
    'block text-sm font-medium text-gray-700 mb-2'
  );

  // Option container styles
  const optionContainerClasses = cn(
    'flex items-center space-x-4',
    'capitalize',
    'cursor-pointer transition-opacity hover:opacity-80',
    'px-4 py-2'
  );

  // Radio button base styles - matches Input/Select dark theme
  const radioBaseClasses = cn(
    'appearance-none',
    'h-5 w-5 rounded-full border-2',
    'bg-gray-700',
    'transition duration-150',
    'focus:ring-2 focus:outline-none'
  );

  // Radio button state styles
  const radioStateClasses = cn(
    // Default state
    !error && 'border-gray-600 checked:bg-emerald-400 checked:border-emerald-400 focus:ring-emerald-400',
    // Error state
    error && 'border-red-400 checked:bg-red-400 checked:border-red-400 focus:ring-red-400'
  );

  // Option text styles - matches label color with left margin for spacing
  const optionTextClasses = cn(
    'select-none text-gray-700 ml-4'
  );

  // Error message styles
  const errorClasses = cn(
    'text-xs text-red-400 mt-1'
  );

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>
        {label}
      </label>
      
      <div className="flex space-x-10">
        {options.map(option => (
          <label 
            key={option.value} 
            className={optionContainerClasses}
          >
            <input
              type="radio"
              name={label.replace(/\s/g, '-')}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className={cn(radioBaseClasses, radioStateClasses)}
            />
            <span className={optionTextClasses}>{option.label}</span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className={errorClasses}>{error}</p>
      )}
    </div>
  );
};

export default RadioGroup;