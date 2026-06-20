// src/components/common/Avatar/Avatar.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

export interface AvatarProps {
  name: string;
  initials: string;
  imageUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ringed?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

// Deterministic background tint from name so the same person always
// gets the same color across the app, without needing a stored value.
const palette = ['#6c5ce7', '#00d9a3', '#ff6b6b', '#ffb84d', '#5b9eff', '#ff8fc7'];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

const Avatar: React.FC<AvatarProps> = ({ name, initials, imageUrl, size = 'md', ringed = false, className = '' }) => {
  const bgColor = colorForName(name);

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0 select-none overflow-hidden',
        sizeClasses[size],
        ringed && 'ring-2 ring-[color:var(--color-bg)] ring-offset-0',
        className
      )}
      style={{ backgroundColor: imageUrl ? undefined : bgColor }}
      title={name}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
};

export default Avatar;
