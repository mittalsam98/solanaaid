import SeedPhrase from '@/components/Wallets/SeedPhrase';
import WalletsList from '@/components/Wallets/WalletsList';
import WalletActionCTAs from '@/components/Wallets/WalletActionCTAs';
import { useState } from 'react';

export default function Wallets() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <>
      {(currentStep === 0 || currentStep === 1) && (
        <div className='h-full w-full flex justify-center items-center p-2'>
          <div className='lg:w-1/4 sm:2/4'>
            {currentStep === 0 && <WalletActionCTAs handleStep={handleStep} />}
            {currentStep === 1 && <SeedPhrase handleStep={handleStep} />}
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className='h-full w-full flex justify-center items-center p-2'>
          <div className='lg:w-3/4 sm:2/4'>
            {currentStep === 2 && <WalletsList handleStep={handleStep} />}
          </div>
        </div>
      )}
    </>
  );
}
