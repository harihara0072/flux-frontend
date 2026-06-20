// src/components/common/Tabs/Tabs.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  /** 'rail' = vertical sidebar layout, 'inline' = horizontal pill layout */
  orientation?: 'rail' | 'inline';
  layoutGroupId?: string;
  className?: string;
}

/**
 * Tabs with a shared-layout "liquid" indicator: framer-motion's layoutId
 * makes the active pill morph smoothly between tab positions instead of
 * snapping, which is the one motion signature this app leans on.
 */
function Tabs<T extends string = string>({
  items,
  activeId,
  onChange,
  orientation = 'rail',
  layoutGroupId = 'tabs-indicator',
  className = '',
}: TabsProps<T>) {
  const isRail = orientation === 'rail';

  return (
    <div
      role="tablist"
      aria-orientation={isRail ? 'vertical' : 'horizontal'}
      className={cn(isRail ? 'flex flex-col gap-1' : 'flex flex-row gap-1 p-1 bg-surface-sunken rounded-full', className)}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative flex items-center font-medium transition-colors duration-200',
              isRail
                ? 'gap-3 px-4 py-3 rounded-xl text-[15px] text-left'
                : 'gap-2 px-4 py-2 rounded-full text-sm z-10',
              isActive
                ? 'text-[color:var(--color-text-on-accent)]'
                : 'text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutGroupId}
                className={cn(
                  'absolute inset-0 -z-10 bg-violet',
                  isRail ? 'rounded-xl' : 'rounded-full'
                )}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {item.icon && <span className="shrink-0 inline-flex">{item.icon}</span>}
            <span>{item.label}</span>
            {typeof item.badge === 'number' && item.badge > 0 && (
              <span
                className={cn(
                  'ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold tabular-amount',
                  isActive ? 'bg-white/20 text-white' : 'bg-coral/20 text-coral'
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
