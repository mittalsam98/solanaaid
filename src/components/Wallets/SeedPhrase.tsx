import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateMnemonic } from 'bip39';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function SeedPhrase({ handleStep }: { handleStep: (step: number) => void }) {
  const [mnemonics, setMnemonics] = useState<string[]>([]);
  const handleContinue = () => {
    handleStep(2);
  };

  useEffect(() => {
    generateMnemonics();
  }, []);

  const generateMnemonics = () => {
    let mnemonicsString = generateMnemonic();

    const mnemonicsArray = mnemonicsString.split(' ');
    setMnemonics(mnemonicsArray);
  };

  const copyText = (text: string[]) => {
    try {
      navigator.clipboard.writeText(text.join(' '));
      toast('Copied Secret Recovery phrase to clipboard!');
    } catch (error) {
      toast('Uh oh! Something went wrong.');
    }
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
          This phrase can be used to recover your wallet. These are confidential, do not share it
          with anyone!
        </CardDescription>
      </CardHeader>
      <CardContent
        className='px-3 py-4 w-full mb-4 text-center hover:bg-slate-50 rounded-sm'
        onClick={() => copyText(mnemonics)}
      >
        <div className='grid grid-cols-3 gap-6 text-center mb-4'>
          {mnemonics.map((val) => {
            return <span className='p-2 border rounded-lg'>{val}</span>;
          })}
        </div>
        <div className='w-2/4 border-t m-auto'>Click anywhere to copy</div>
      </CardContent>
      <CardFooter className='p-0 flex flex-col gap-5 w-3/6'>
        <Button className='w-full' onClick={handleContinue}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
