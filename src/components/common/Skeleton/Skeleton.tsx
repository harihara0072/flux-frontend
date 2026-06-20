// src/components/common/Skeleton/Skeleton.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
}

const variantClasses = {
  text: 'rounded-md h-4',
  circle: 'rounded-full',
  rect: 'rounded-lg',
};

/**
 * Shimmering placeholder for loading states. Compose multiple Skeletons
 * to build a loading version of any card (see DashboardSkeleton).
 */
const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('skeleton-shimmer animate-shimmer', variantClasses[variant], className)}
    />
  );
};

export default Skeleton;
