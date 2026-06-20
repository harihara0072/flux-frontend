// src/flows/auth/StepTwoEmail.tsx
import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MotionContainer from '../../components/ui/MotionContainer';

interface StepProps {
  onNext: (data: { email: string }) => void;
  prevData: { username?: string }; // Expects the name from the previous step
}

const StepTwoEmail: React.FC<StepProps> = ({ onNext, prevData }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const username = prevData.username || 'Friend'; // Use 'Friend' if name is somehow missing

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple email validation check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError('');
    onNext({ email: email.trim() });
  };

  return (
      <MotionContainer>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <h3 className="text-3xl font-bold text-gray-200">
            Nice one, {username}! What's the best email for a superhero?
          </h3>
          <p className="text-sm text-gray-400">
            This email gets all the important stuff, like password resets and zero spam. Pinky swear.
          </p>

          <Input
            type="email"
            placeholder="Your secret communication channel"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          <Button type="submit" className="w-full">
            Onwards!
          </Button>
        </form>
      </MotionContainer>
    );
};

export default StepTwoEmail;
