// src/components/common/ProgressBar/ProgressBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn, clamp } from '../../../lib/utils';
import type { BudgetStatus } from '../../../types';

export interface ProgressBarProps {
  value: number; // spent
  max: number; // limit
  status?: BudgetStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const statusFillClasses: Record<BudgetStatus, string> = {
  'on-track': 'bg-teal',
  approaching: 'bg-amber',
  exceeded: 'bg-coral',
};

function deriveStatus(value: number, max: number): BudgetStatus {
  if (max <= 0) return 'on-track';
  const ratio = value / max;
  if (ratio >= 1) return 'exceeded';
  if (ratio >= 0.85) return 'approaching';
  return 'on-track';
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

/**
 * Animated progress bar used for budget category limits. Fill color
 * communicates status (teal/amber/coral) so the state reads at a glance
 * without needing to parse the number.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  status,
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const resolvedStatus = status ?? deriveStatus(value, max);
  const percentage = clamp(max > 0 ? (value / max) * 100 : 0, 0, 100);

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('relative w-full rounded-full bg-surface-sunken overflow-hidden', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full', statusFillClasses[resolvedStatus])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1.5 text-xs text-[color:var(--color-text-secondary)]">
          <span className="tabular-amount">{percentage.toFixed(0)}% used</span>
          {resolvedStatus === 'exceeded' && <span className="text-coral font-medium">Over limit</span>}
          {resolvedStatus === 'approaching' && <span className="text-amber font-medium">Approaching limit</span>}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
