// src/components/charts/FlowBar.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SpendingByCategory } from '../../types';
import { formatCurrency } from '../../lib/utils';
import Tooltip from '../common/Tooltip';

interface FlowBarProps {
  data: SpendingByCategory[];
  total: number;
}

/**
 * The dashboard's signature visual: a single horizontal bar that "pours"
 * in on load, each segment proportional to category spend. This replaces
 * a generic stat-card grid as the hero of the Overview tab.
 */
const FlowBar: React.FC<FlowBarProps> = ({ data, total }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <p className="text-sm text-[color:var(--color-text-secondary)]">Total spent this month</p>
          <p className="font-display text-3xl text-[color:var(--color-text-primary)] mt-1">{formatCurrency(total)}</p>
        </div>
      </div>

      <div className="flex h-12 w-full rounded-xl overflow-hidden bg-overlay-soft origin-left">
        {data.map((slice, index) => (
          <Tooltip
            key={slice.category.id}
            content={
              <span>
                {slice.category.name} · {formatCurrency(slice.amount)} ({slice.percentage.toFixed(0)}%)
              </span>
            }
          >
            <motion.div
              onMouseEnter={() => setHoveredId(slice.category.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.9,
                ease: [0.32, 0.72, 0, 1],
                delay: index * 0.06,
              }}
              style={{
                backgroundColor: slice.category.colorHex,
                width: `${slice.percentage}%`,
                transformOrigin: 'left',
                opacity: hoveredId && hoveredId !== slice.category.id ? 0.45 : 1,
              }}
              className="h-full transition-opacity duration-200 cursor-pointer first:rounded-l-xl last:rounded-r-xl"
            />
          </Tooltip>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-5">
        {data.map((slice) => (
          <div
            key={slice.category.id}
            onMouseEnter={() => setHoveredId(slice.category.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="flex items-center gap-2 text-sm cursor-default"
          >
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.category.colorHex }} />
            <span className="text-[color:var(--color-text-secondary)]">{slice.category.name}</span>
            <span className="text-[color:var(--color-text-primary)] font-medium tabular-amount">
              {formatCurrency(slice.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowBar;
