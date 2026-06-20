// src/flows/auth/MultiStepAuthFlow.tsx
import React, {useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';

// We will create the next steps later
// import StepTwoEmail from './StepTwoEmail';
// import StepThreePassword from './StepThreePassword';
import StepOneName from './StepOneName';
import StepTwoEmail from './StepTwoEmail'; // New Import
import StepThreePassword from './StepThreePassword'; // New Import
import { BASE_URL } from '../../api/config'; // New Import for API URL
import axios from 'axios'; // New Import for API calls

// Define the full data structure we need for the Django API
interface RegistrationData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

// Map the steps to components
// Map the steps to components (Now includes all three steps)
const steps = [
  StepOneName,
  StepTwoEmail,
  StepThreePassword,
];

const MultiStepAuthFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // State to hold all registration data across steps
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});

  const handleNext = (newData: Partial<RegistrationData>) => {
    // 1. Merge the new data from the current step with the existing form data
    setFormData(prev => ({ ...prev, ...newData }));

    // 2. Check if we're on the last step
    if (currentStep === steps.length - 1) {
      // LAST STEP: Trigger the final API submission function
      handleSubmit(newData);
    } else {
      // NOT LAST STEP: Move to the next component
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };


  // Function to handle the final API submission
  const handleSubmit = async (finalData: Partial<RegistrationData>) => {
    const payload = finalData as RegistrationData;

    try {
      await axios.post(`${BASE_URL}/auth/register/`, payload);

      console.log("Registration Successful!");

      // Navigate to the login page after success
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });

    } catch (error) {
      let errorMessage = "Registration failed. Please check your network.";
      if (axios.isAxiosError(error) && error.response) {
        // Simple error extraction for UI feedback
        errorMessage = error.response.data.detail || error.response.data.username?.[0] || 'Registration failed.';
      }
      console.error("Registration Error:", errorMessage);
      // TO-DO: A robust application would display this error on the final step component
      alert(`Error: ${errorMessage}`);
    }
  };

  // Dynamic component selection (as you correctly pointed out)
  const CurrentStepComponent = useMemo(() => {
    return steps[currentStep];
  }, [currentStep]);

  return (
    // Centering wrapper
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Render the current step component, passing down the logic */}
        <CurrentStepComponent onNext={handleNext} prevData={formData} />

        {/* Navigation Button */}
        {currentStep > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-emerald-400 transition-colors font-medium"
            >
              ← Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepAuthFlow;
