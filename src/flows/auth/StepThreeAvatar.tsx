// src/flows/auth/StepThreeAvatar.tsx
import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input'; // Import the new component
import MotionContainer from '../../components/ui/MotionContainer';
import FormCard from '../../components/ui/FormCard'; // NEW IMPORT
import ScribbledTitle from '../../components/ui/ScribbledTitle'; // NEW IMPORT

interface StepThreeProps {
  onNext: (data: { avatarUrl: string }) => void;
  prevData: Record<string, any>;
}

// Dummy Avatars for display
const avatarOptions = [
  { id: 1, url: 'avatar_cat.png' },
  { id: 2, url: 'avatar_robot.png' },
  { id: 3, url: 'avatar_gem.png' },
  { id: 4, url: 'avatar_rocket.png' },
  // ... more options
];

const StepThreeAvatar: React.FC<StepThreeProps> = ({ onNext }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ avatarUrl: selectedAvatar });
  };

  return (
    <MotionContainer>
      <FormCard maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="w-full space-y-6 text-center">
          <ScribbledTitle>
            Pick Your Avatar!
          </ScribbledTitle>

          <p className="text-sm text-gray-500 mb-6">
            This will be your identity across Flux. You can change this later in Settings.
          </p>

          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {avatarOptions.map(avatar => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.url)}
                className={`w-24 h-24 rounded-full border-4 cursor-pointer p-1 
                           ${selectedAvatar === avatar.url 
                              ? 'border-brand-primary shadow-lg ring-4 ring-brand-accent' 
                              : 'border-gray-300 opacity-70 hover:opacity-100'}`}
              >
                {/* Replace with actual image loading logic */}
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-sm">
                  {avatar.id}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 pt-4">Current Selection: {selectedAvatar}</p>

          <Button type="submit" className="w-full mt-8">
            Looks Good!
          </Button>
        </form>
      </FormCard>
    </MotionContainer>
  );
};
export default StepThreeAvatar;