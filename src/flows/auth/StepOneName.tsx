// src/flows/auth/StepOneName.tsx
import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input'; // Import the new component
import MotionContainer from '../../components/ui/MotionContainer';

// Props passed from the Orchestrator
interface StepProps {
  onNext: (data: { username: string }) => void;
  prevData: any; // We use 'any' for simplicity here, but should be specific interface
}

const StepOneName: React.FC<StepProps> = ({ onNext }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError("Please enter a name at least 3 characters long.");
      return;
    }
    setError('');

    // Pass the collected data back to the orchestrator, using name as the username
    onNext({ username: username.trim() });
  };

return (
    <MotionContainer>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <h3 className="text-4xl font-extrabold text-emerald-400">
          Let's get this party started.
        </h3>
        <p className="text-xl font-semibold text-gray-200">
          First things first: What should we call you?
        </p>
        <p className="text-sm text-gray-400">
          (This will be your username. Choose wisely, young budget warrior.)
        </p>

        <Input
          type="text"
          placeholder="Your Budget Name (e.g., PennyPincher, FluxMaster)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error}
        />

        <Button type="submit" className="w-full">
          Got it!
        </Button>
      </form>
    </MotionContainer>
  );
};

export default StepOneName;
