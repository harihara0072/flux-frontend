// src/components/common/Input/Input.tsx
import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--color-text-secondary)] pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-surface-sunken text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-secondary)]/60',
              'border border-[color:var(--color-border-subtle)] rounded-xl',
              'px-4 py-3 text-sm transition-all duration-150',
              'focus:outline-none focus:border-violet/60 focus:bg-overlay-medium focus:ring-2 focus:ring-violet/20',
              !!leftIcon && 'pl-10',
              !!rightElement && 'pr-10',
              error && 'border-coral/60 focus:border-coral focus:ring-coral/20',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightElement}</span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-coral text-xs mt-1.5">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-[color:var(--color-text-secondary)] text-xs mt-1.5">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
