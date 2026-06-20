// src/components/common/ThemeToggle/ThemeToggle.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import { cn } from '../../../lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Light/dark theme switch. Flux opens in light mode by default; this is
 * the only way a user moves to dark, and the choice persists via
 * ThemeProvider (localStorage). Track slides between Sun and Moon icons
 * rather than just inverting colors, to make the affordance unambiguous.
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center h-8 w-14 rounded-full px-1 transition-colors duration-200',
        'bg-surface-sunken border border-[color:var(--color-border-subtle)]',
        className
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'flex items-center justify-center h-6 w-6 rounded-full shadow-card bg-violet text-white',
          isDark ? 'ml-auto' : 'ml-0'
        )}
      >
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
