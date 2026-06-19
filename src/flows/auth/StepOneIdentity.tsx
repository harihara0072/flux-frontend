// src/flows/auth/StepOneIdentity.tsx
import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input'; // Import the new component
import MotionContainer from '../../components/ui/MotionContainer';
import FormCard from '../../components/ui/FormCard'; // NEW IMPORT
import ScribbledTitle from '../../components/ui/ScribbledTitle'; // NEW IMPORT

// Props passed from the Orchestrator
interface StepProps {
  onNext: (data: { username: string, name: string }) => void;
  prevData: any;
}

const StepOneIdentity: React.FC<StepProps> = ({ onNext , prevData}) => {
  const [username, setUsername] = useState(prevData.username || '');
  const [name, setName] = useState(prevData.name || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError("Please enter a name at least 3 characters long.");
      return;
    }

    if (!username.trim() || !name.trim()) {
      setError('Both Username and Full Name are required.');
      return;
    }

    setError('');

    // Pass the collected data back to the orchestrator, using name as the username
    onNext({ username: username, name });
  };

  return (
<MotionContainer>
      <FormCard maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <ScribbledTitle size="large">
            Who are you, really?
          </ScribbledTitle>

          <p className="text-xl font-semibold text-gray-700">
            Let's start with your permanent identity and display name.
          </p>

          <Input
            type="text"
            placeholder="Username (e.g., PennyPincher99) - This is permanent!"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error}
            label="Username"
          />
          <Input
            type="text"
            placeholder="Full Name (e.g., Alex Johnson)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Display Name"
          />

          <Button type="submit" className="w-full">
            Got it!
          </Button>
        </form>
      </FormCard>
    </MotionContainer>
    );
};

export default StepOneIdentity;