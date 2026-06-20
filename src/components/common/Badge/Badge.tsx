// src/components/common/Badge/Badge.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

export type BadgeTone = 'neutral' | 'violet' | 'teal' | 'coral' | 'amber';

export interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-overlay-strong text-[color:var(--color-text-secondary)]',
  violet: 'bg-violet-dim text-violet-soft',
  teal: 'bg-teal-dim text-teal',
  coral: 'bg-coral-dim text-coral',
  amber: 'bg-amber-dim text-amber',
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: 'bg-[color:var(--color-text-secondary)]',
  violet: 'bg-violet-soft',
  teal: 'bg-teal',
  coral: 'bg-coral',
  amber: 'bg-amber',
};

const Badge: React.FC<BadgeProps> = ({ children, tone = 'neutral', dot = false, className = '' }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        toneClasses[tone],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses[tone])} />}
      {children}
    </span>
  );
};

export default Badge;
