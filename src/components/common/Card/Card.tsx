// src/components/common/Card/Card.tsx
import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  variant?: 'surface' | 'raised' | 'outline';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantClasses = {
  surface: 'bg-surface border border-[color:var(--color-border-subtle)]',
  raised: 'bg-bg-raised border border-[color:var(--color-border-subtle)] shadow-raised',
  outline: 'bg-transparent border border-[color:var(--color-border-subtle)]',
};

/**
 * Base card surface used across dashboard widgets, transaction rows,
 * and bill entries. Keep visual weight (shadow/border) consistent by
 * always composing through this component rather than ad hoc divs.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, padding = 'md', interactive = false, variant = 'surface', className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -2, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
        className={cn(
          'rounded-lg',
          variantClasses[variant],
          paddingClasses[padding],
          interactive && 'cursor-pointer transition-shadow duration-200 hover:shadow-raised',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
