import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useWalletStore } from '@/store/walletStore';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

export default function ImportSeedPhrase({ handleStep }: { handleStep: (step: number) => void }) {
  const setMnemonics = useWalletStore((state) => state.setMnemonics);
  const [mnemonicInput, setMnemonicInput] = useState('');

  const handleContinue = () => {
    handleStep(2);
    setMnemonics(mnemonicInput);
  };

  const mnemonicArray = mnemonicInput?.trim() ? mnemonicInput?.trim()?.split(' ') : [];

  const fullMnemonicArray = [...mnemonicArray, ...Array(12 - mnemonicArray.length).fill('')];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedMnemonicArray = [...fullMnemonicArray];
    updatedMnemonicArray[index] = e.target.value.trim();
    setMnemonicInput(updatedMnemonicArray.join(' '));
  };

  return (
    <Card className='w-full flex flex-col items-center py-8 px-3'>
      <div className='w-full text-left pl-2' onClick={() => handleStep(0)}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ArrowLeft />
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-'>Go back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CardHeader className='text-center pt-0'>
        <CardTitle className='text-2xl'>Secret Recovery Phase</CardTitle>
        <CardDescription className='text-yellow-700'>
          Import 12 word seed phrase to recover your wallet. These are confidential, do not share it
          with anyone!
        </CardDescription>
      </CardHeader>

      <div className={`px-3 py-4 w-full mb-4 text-center hover:bg-slate-50 rounded-sm `}>
        <div className={`grid grid-cols-3 gap-6 text-center mb-4`}>
          {fullMnemonicArray.map((val, index) => (
            <Input key={index} value={val} onChange={(e) => handleInputChange(e, index)} />
          ))}
        </div>
        <div className='w-2/4 border-t pt-1 m-auto'>Click anywhere to copy</div>
      </div>
      <CardFooter className='p-0 flex flex-col gap-5 w-3/6'>
        <Button className='w-full' onClick={handleContinue}>
          Import
        </Button>
      </CardFooter>
    </Card>
  );
}
