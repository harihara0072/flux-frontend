// src/flows/auth/StepThreePassword.tsx
import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MotionContainer from '../../components/ui/MotionContainer';

interface StepProps {
  onNext: (data: { password: string, password2: string }) => void;
  prevData: { username?: string };
}

const StepThreePassword: React.FC<StepProps> = ({ onNext, prevData }) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const username = prevData.username || 'budget pro';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match. Please check again!");
      return;
    }
    setError('');

    // Pass final data to the orchestrator to trigger API call
    onNext({ password, password2 });
  };

return (
    <MotionContainer>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <h3 className="text-3xl font-bold text-emerald-400">
          The Final Challenge, {username}.
        </h3>
        <p className="text-sm text-gray-400">
          Your digital vault key. Make it complex, make it memorable, make it *at least 8 characters*.
        </p>

        <Input
          type="password"
          placeholder="Secure Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />
        <Input
          type="password"
          placeholder="Confirm Password (No typos allowed!)"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          error={error}
        />

        <Button type="submit" className="w-full" variant="primary">
          Create My Flux Account!
        </Button>
      </form>
    </MotionContainer>
  );
};

export default StepThreePassword;
