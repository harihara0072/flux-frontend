// src/components/ui/Button.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Define the component props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}) => {
  // Base classes for a clean, modern look
  let baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg flex items-center justify-center';

  // Apply the theme colors we planned
  switch (variant) {
    case 'primary':
      baseClasses += ' bg-emerald-400 text-gray-900 hover:bg-emerald-500 disabled:bg-gray-600 disabled:text-gray-400';
      break;
    case 'secondary':
      baseClasses += ' bg-gray-600 text-gray-200 hover:bg-gray-700 disabled:bg-gray-600 disabled:text-gray-400';
      break;
    case 'danger':
      baseClasses += ' bg-red-400 text-gray-900 hover:bg-red-500 disabled:bg-gray-600 disabled:text-gray-400';
      break;
  }

  return (
    <motion.button
      // Add a subtle scale effect on click for a "fun" touch
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        // Simple loading spinner (replace with a custom animated component later)
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;