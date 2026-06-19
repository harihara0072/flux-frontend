// src/flows/auth/StepTwoPersonal.tsx
import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import MotionContainer from '../../components/ui/MotionContainer';
import FormCard from '../../components/ui/FormCard';
import ScribbledTitle from '../../components/ui/ScribbledTitle';
import Select from '../../components/ui/Select';
import DateInput from '../../components/ui/DateInput';
import RadioGroup from '../../components/ui/RadioGroup';

interface StepTwoProps {
  onNext: (data: { country: string; dateOfBirth: string, gender: string }) => void;
  prevData: Record<string, any>;
}

const countries = [
  { value: 'USD', label: 'United States (USD)' },
  { value: 'EUR', label: 'Eurozone (EUR)' },
  { value: 'CAD', label: 'Canada (CAD)' },
  // ... add more countries/currencies
];

const StepTwoPersonal: React.FC<StepTwoProps> = ({ onNext, prevData }) => {
  const [country, setCountry] = useState(prevData.country || 'USD');
  const [dateOfBirth, setDateOfBirth] = useState(prevData.dateOfBirth || '');
  const [gender, setGender] = useState(prevData.gender || 'neutral');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country || !dateOfBirth) {
      setError('Please select your Country/Currency and Date of Birth.');
      return;
    }
    setError('');
    onNext({ country, dateOfBirth, gender });
  };

  return (
    <MotionContainer>
      <FormCard maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <ScribbledTitle>
            Where in the world are you budgeting?
          </ScribbledTitle>

          <p className="text-sm text-gray-500">
            Your country determines your default currency. (This can be changed later, but the primary currency is set here).
          </p>

          <Select
            label="Primary Currency & Country"
            options={countries}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            // optional: maxOptionsHeight="h-60"
          />

          <DateInput
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            label="Date of Birth (Required for Compliance)"
            error={error && !dateOfBirth ? error : undefined}
          />

          <RadioGroup
            label="Gender (For Avatar Default)"
            name="gender"
            options={[
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'neutral', label: 'Neutral' },
            ]}
            value={gender}
            onChange={setGender}
          />


          <Button type="submit" className="w-full">
            Next: Choose Your Look
          </Button>
        </form>
      </FormCard>
    </MotionContainer>
  );
};
export default StepTwoPersonal;