// src/components/common/Button/Button.tsx
import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-violet text-white hover:bg-violet-soft shadow-glow-violet disabled:bg-white/10 disabled:text-white/30 disabled:shadow-none',
  secondary:
    'bg-overlay-medium text-[color:var(--color-text-primary)] hover:bg-overlay-strong border border-[color:var(--color-border-subtle)] disabled:opacity-40',
  ghost:
    'bg-transparent text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-overlay-medium disabled:opacity-30',
  danger:
    'bg-coral/90 text-white hover:bg-coral disabled:bg-coral/30',
  outline:
    'bg-transparent border border-violet/40 text-violet-soft hover:bg-violet-dim hover:border-violet disabled:opacity-30',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3.5 py-2 gap-1.5 rounded-[10px]',
  md: 'text-sm px-5 py-2.5 gap-2 rounded-xl',
  lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl',
};

/**
 * Flux primary Button. Use this everywhere a clickable action is needed
 * rather than a raw <button> so motion, focus, loading, and disabled
 * states stay consistent across the app.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center font-medium font-body',
          'transition-colors duration-150',
          'disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            <span className="opacity-70">{children}</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0 inline-flex">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
