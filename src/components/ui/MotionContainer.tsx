// src/components/ui/MotionContainer.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for smooth sliding transitions
const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// We will use this component to wrap each step of the conversational flow
const MotionContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.3 }}
      className="w-full flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
};

export default MotionContainer;