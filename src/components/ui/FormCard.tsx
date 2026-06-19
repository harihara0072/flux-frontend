// src/components/ui/FormCard.tsx (UPDATED for Dynamic Width)
import React, { ReactNode } from 'react';

interface FormCardProps {
  children: ReactNode;
  className?: string;
  // NEW PROP: Accepts a Tailwind max-width class (e.g., 'max-w-md', 'max-w-lg', 'max-w-xl')
  maxWidth?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, className = '', maxWidth = 'max-w-lg' }) => {
  return (
    // Note: We need a wrapper in the flow component to handle centering,
    // but the card itself gets the specific max-width class.
    <div className={`form-card-base-style ${maxWidth} ${className}`}>
      {children}
    </div>
  );
};

export default FormCard;