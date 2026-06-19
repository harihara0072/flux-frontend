// src/components/ui/ScribbledTitle.tsx
import React, { ReactNode } from 'react';

interface ScribbledTitleProps {
  children: ReactNode;
  size?: 'large' | 'medium'; // Allows for size variation
  className?: string;
}
// ... interface and component definition ...

const ScribbledTitle: React.FC<ScribbledTitleProps> = ({ children, size = 'medium', className = '' }) => {
  const textSize = size === 'large' ? 'text-4xl' : 'text-3xl';

  return (
    <h3 className={`${textSize} font-marker text-dark-text mb-4 ${className}`}>
      {/* 💥 This is the critical line where the class is applied 💥 */}
      <span className="scribble-underline">
        {children}
      </span>
    </h3>
  );
};

export default ScribbledTitle;