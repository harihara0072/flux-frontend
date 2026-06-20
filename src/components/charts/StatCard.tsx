// src/components/charts/StatCard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  changePercent?: number;
  icon?: React.ReactNode;
  accentColor?: string;
}

/**
 * Animates the displayed number counting up from 0 to value on mount,
 * which reinforces the "flow" motif at a smaller scale than FlowBar.
 */
function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frame: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, changePercent, icon, accentColor = '#6c5ce7' }) => {
  const animatedValue = useCountUp(value);
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <Card interactive padding="md" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[color:var(--color-text-secondary)]">{label}</span>
        {icon && (
          <span
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
          >
            {icon}
          </span>
        )}
      </div>
      <span className="font-display text-2xl text-[color:var(--color-text-primary)] tabular-amount">
        {formatCurrency(animatedValue)}
      </span>
      {typeof changePercent === 'number' && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium w-fit px-2 py-0.5 rounded-full',
            isPositive ? 'text-teal bg-teal-dim' : 'text-coral bg-coral-dim'
          )}
        >
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(changePercent)}% vs last month
        </motion.span>
      )}
    </Card>
  );
};

export default StatCard;
