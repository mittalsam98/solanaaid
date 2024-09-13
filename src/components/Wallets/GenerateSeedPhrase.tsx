import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createSolanaWalletFromMnemonic } from '@/lib/utilities';
import { useWalletStore } from '@/store/walletStore';
import { generateMnemonic } from 'bip39';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function GenerateSeedPhrase({ handleStep }: { handleStep: (step: number) => void }) {
  const mnemonic = useWalletStore((state) => state.mnemonic);
  const setMnemonics = useWalletStore((state) => state.setMnemonics);
  const walletData = useWalletStore((state) => state.walletData);
  const setWalletData = useWalletStore((state) => state.setWalletData);

  const createNewWallet = () => {
    const newWalletData = createSolanaWalletFromMnemonic();
    const tempWalletData = [...walletData];
    tempWalletData.push(newWalletData);
    setWalletData(tempWalletData);
  };

  useEffect(() => {
    generateMnemonics();
  }, []);

  const generateMnemonics = () => {
    let mnemonicsString = generateMnemonic();
    setMnemonics(mnemonicsString);
  };

  const handleContinue = () => {
    createNewWallet();
    handleStep(2);
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

      <SeedPhraseDisplay mnemonic={mnemonic} />

      <CardFooter className='p-0 flex flex-col gap-5 w-3/6'>
        <Button className='w-full' onClick={handleContinue}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SeedPhraseDisplay({
  mnemonic,
  className
}: {
  mnemonic: string;
  className?: string;
}) {
  const copyText = () => {
    try {
      navigator.clipboard.writeText(mnemonic);
      toast('Copied Secret Recovery phrase to clipboard!');
    } catch (error) {
      toast('Uh oh! Something went wrong.');
    }
  };
  return (
    <div
      className={`px-3 py-4 w-full mb-4 text-center hover:bg-slate-50 rounded-sm`}
      onClick={copyText}
    >
      <div className={`grid grid-cols-3 gap-6 text-center mb-4 ${className ? className : ''}`}>
        {mnemonic.split(' ').map((val, index) => (
          <span key={index} className='p-2 border rounded-lg'>
            {val}
          </span>
        ))}
      </div>
      <div className='w-2/4 border-t pt-1 m-auto'>Click anywhere to copy</div>
    </div>
  );
}
