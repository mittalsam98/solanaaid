import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createSolanaWalletFromMnemonic } from '@/lib/utilities';
import { useWalletStore } from '@/store/walletStore';
import { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, EyeOff, Trash } from 'lucide-react';
import { CustomAlertDialog } from '../CustomAlertDialog';

export default function WalletsList({ handleStep }: { handleStep: (step: number) => void }) {
  const activeWalletIndex = useWalletStore((state) => state.activeWalletIndex);
  const walletData = useWalletStore((state) => state.walletData);
  const setActiveWalletIndex = useWalletStore((state) => state.setActiveWalletIndex);
  const setWalletData = useWalletStore((state) => state.setWalletData);

  useEffect(() => {
    const walletData = createSolanaWalletFromMnemonic();
    setWalletData([walletData]);
  }, []);

  const handleActiveIndex = (val: number) => {
    setActiveWalletIndex(val);
  };

  const addWalletHandler = () => {
    const newWalletData = createSolanaWalletFromMnemonic();
    const tempWalletData = [...walletData];
    tempWalletData.push(newWalletData);
    setWalletData(tempWalletData);
  };

  const handlePrivateKeyVisibility = () => {
    const tempWalletData = [...walletData];
    setWalletData(
      tempWalletData.map((datum, i) => {
        if (i === activeWalletIndex) {
          datum.privateKeyVisible = !datum.privateKeyVisible;
        }
        return datum;
      })
    );
  };

  const clearWallets = () => {
    setWalletData([]);
    setActiveWalletIndex(0);
    handleStep(0);
  };

  const deleteWallet = (index: number) => {
    const tempWalletData = [...walletData];
    tempWalletData.splice(index, 1);
    setWalletData(tempWalletData);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <Button onClick={addWalletHandler} className='mb-5'>
          Add Wallet
        </Button>
        <CustomAlertDialog
          title='Delete all Wallets?'
          desc='Are you sure you want to delete all the wallets? This action cannot be undone.'
          cancelBtnText='No'
          confirmBtnText='Yes'
          confirmClickHandler={clearWallets}
        >
          <Button variant={'destructive'} className='mb-5'>
            Clear Wallets
          </Button>
        </CustomAlertDialog>
      </div>
      <Card className='w-full flex flex-col items-center'>
        <CardContent className='flex w-full p-0'>
          {walletData.length > 0 ? (
            <div className='flex flex-col border-r rounded-tl-xl rounded-bl-xl'>
              {walletData.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleActiveIndex(index)}
                  className={`${
                    activeWalletIndex === index ? 'bg-gray-100' : ''
                  } p-5 grow max-h-20 cursor-pointer ${
                    activeWalletIndex === 0 ? 'rounded-tl-xl' : ''
                  } ${activeWalletIndex - 1 === walletData.length ? 'rounded-bl-xl' : ''}`}
                >
                  <Avatar>
                    <AvatarFallback>W{index + 1}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          ) : null}

          <div className='grow'>
            <div className='min-h-12 px-8 pt-3 text-xl font-semibold flex justify-between items-center'>
              Wallet {activeWalletIndex + 1}
              <CustomAlertDialog
                title='Delete this Wallet?'
                desc='Are you sure you want to delete this wallet? This action cannot be undone.'
                cancelBtnText='No'
                confirmBtnText='Yes'
                confirmClickHandler={() => deleteWallet(activeWalletIndex)}
              >
                <Button variant='ghost' className='flex gap-2 items-center'>
                  <Trash className='size-4 text-destructive' />
                </Button>
              </CustomAlertDialog>
            </div>
            <div className='border-b'></div>
            <div className='py-4 px-8'>
              <div className='text-lg font-medium'>Public Key: </div>
              <div className='text-md font-light mb-4'>
                {walletData[activeWalletIndex]?.publicKey}
              </div>
            </div>
            <div className='pb-6 px-8'>
              <div className='flex items-center justify-between text-lg font-medium my-1'>
                <p>Private Key: </p>
                <Button
                  variant={!walletData[activeWalletIndex]?.privateKeyVisible ? 'ghost' : 'default'}
                  onClick={handlePrivateKeyVisibility}
                >
                  {walletData[activeWalletIndex]?.privateKeyVisible ? (
                    <EyeOff className='size-4' />
                  ) : (
                    <Eye className='size-4' />
                  )}
                </Button>
              </div>
              <div className='text-md font-light'>
                {walletData[activeWalletIndex]?.privateKeyVisible
                  ? walletData[activeWalletIndex]?.privateKey
                  : walletData[activeWalletIndex]?.privateKey.replace(/./g, '*')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
