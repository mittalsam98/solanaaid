import SeedPhrase from '@/components/Wallets/SeedPhrase';
import SuccessCard from '@/components/Wallets/SuccessCard';
import WalletActionCTAs from '@/components/Wallets/WalletActionCTAs';
import { useState } from 'react';

export default function Wallets() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className='h-full w-full flex justify-center items-center p-2'>
      <div className='lg:w-1/4 sm:2/4'>
        {currentStep === 0 && <WalletActionCTAs handleStep={handleStep} />}
        {currentStep === 1 && <SeedPhrase handleStep={handleStep} />}
        {currentStep === 2 && <SuccessCard handleStep={handleStep} />}
      </div>
    </div>
  );
}
