// src/components/common/IconButton/IconButton.tsx
import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface IconButtonProps extends HTMLMotionProps<'button'> {
  icon: React.ReactNode;
  label: string; // required for a11y since there's no visible text
  variant?: 'default' | 'subtle' | 'filled';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-overlay-strong',
  subtle: 'text-[color:var(--color-text-secondary)] hover:bg-overlay-medium',
  filled: 'bg-violet-dim text-violet-soft hover:bg-violet/30',
};

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'default', size = 'md', className = '', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        aria-label={label}
        title={label}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.12 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors duration-150',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
