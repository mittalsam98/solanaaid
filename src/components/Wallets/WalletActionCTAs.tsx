import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WalletActionCTAs({ handleStep }: { handleStep: (step: number) => void }) {
  const handleNewWallet = () => {
    handleStep(1);
  };
  const handleImportWallet = () => {
    handleStep(3);
  };

  return (
    <Card className='w-full flex flex-col items-center pb-8 pt-5 lg:max-w-[80%]'>
      <CardHeader className='text-center mb-8'>
        <CardTitle className='text-2xl'>Get started with Wallet(s)</CardTitle>
        <CardDescription className=''>
          To get started create new wallet or import an existing wallet
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <Button onClick={handleNewWallet}>Create a new Wallet</Button>
        <Button onClick={handleImportWallet}>Import an existing wallet</Button>
      </CardContent>
    </Card>
  );
}
