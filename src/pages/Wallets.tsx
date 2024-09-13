import ImportSeedPhrase from '@/components/Wallets/ImportSeedPhrase';
import GenerateSeedPhrase from '@/components/Wallets/GenerateSeedPhrase';
import WalletActionCTAs from '@/components/Wallets/WalletActionCTAs';
import WalletsList from '@/components/Wallets/WalletsList';
import { useState } from 'react';

export default function Wallets() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <>
      {(currentStep === 0 || currentStep === 1 || currentStep === 3) && (
        <div className='h-full w-full flex justify-center items-center p-2'>
          <div className='xl:w-2/5'>
            {currentStep === 0 && <WalletActionCTAs handleStep={handleStep} />}
            {currentStep === 1 && <GenerateSeedPhrase handleStep={handleStep} />}
            {currentStep === 3 && <ImportSeedPhrase handleStep={handleStep} />}
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className='h-full w-full flex justify-center items-center p-2'>
          <div className='xl:w-3/5 w-full'>
            {currentStep === 2 && <WalletsList handleStep={handleStep} />}
          </div>
        </div>
      )}
    </>
  );
}
