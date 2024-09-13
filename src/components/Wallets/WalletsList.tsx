import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createSolanaWalletFromMnemonic } from '@/lib/utilities';
import { LAYOUT, useWalletStore } from '@/store/walletStore';
import { Eye, EyeOff, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { CustomAlertDialog } from '../CustomAlertDialog';
import { WalletSettingPopover } from './WalletSettingPopover';

export default function WalletsList({ handleStep }: { handleStep: (step: number) => void }) {
  const walletData = useWalletStore((state) => state.walletData);
  const setWalletData = useWalletStore((state) => state.setWalletData);
  const layout = useWalletStore((state) => state.layout);
  const activeWalletIndex = useWalletStore((state) => state.activeWalletIndex);

  useEffect(() => {
    const walletData = createSolanaWalletFromMnemonic();
    setWalletData([walletData]);
  }, []);

  const addWalletHandler = () => {
    const newWalletData = createSolanaWalletFromMnemonic();
    const tempWalletData = [...walletData];
    tempWalletData.push(newWalletData);
    setWalletData(tempWalletData);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <Button onClick={addWalletHandler} className='mb-5'>
          Add Wallet
        </Button>
        <div className='flex gap-2'>
          <WalletSettingPopover handleStep={handleStep} />
        </div>
      </div>
      {layout === LAYOUT.CARD_VIEW ? (
        walletData.map((_, index) => (
          <div className='mb-5'>
            <WalletDetail key={index} walletIndex={index} />
          </div>
        ))
      ) : (
        <WalletDetail walletIndex={activeWalletIndex} />
      )}
    </div>
  );
}

const WalletDetail = ({ walletIndex }: { walletIndex: number }) => {
  const walletData = useWalletStore((state) => state.walletData);
  const setWalletData = useWalletStore((state) => state.setWalletData);
  const layout = useWalletStore((state) => state.layout);
  const setActiveWalletIndex = useWalletStore((state) => state.setActiveWalletIndex);

  const handleActiveIndex = (val: number) => {
    setActiveWalletIndex(val);
  };

  const handlePrivateKeyVisibility = () => {
    const tempWalletData = [...walletData];
    setWalletData(
      tempWalletData.map((datum, i) => {
        if (i === walletIndex) {
          datum.privateKeyVisible = !datum.privateKeyVisible;
        }
        return datum;
      })
    );
  };
  const deleteWallet = (index: number) => {
    const tempWalletData = [...walletData];
    tempWalletData.splice(index, 1);
    setWalletData(tempWalletData);
  };

  return (
    <Card className='w-full flex flex-col items-center'>
      <CardContent className='flex flex-col sm:flex-row w-full p-0'>
        {walletData.length > 0 && layout === LAYOUT.LEFT_PANEL ? (
          <div className='flex sm:flex-col border-b sm:border-r rounded-tl-xl rounded-bl-xl'>
            {walletData.map((_, index) => (
              <div
                key={index}
                onClick={() => handleActiveIndex(index)}
                className={`${
                  walletIndex === index ? 'bg-gray-100' : ''
                } p-5 grow max-w-20 sm:max-h-20 cursor-pointer ${
                  walletIndex === 0 ? 'rounded-tl-xl' : ''
                } ${walletIndex - 1 === walletData.length ? 'rounded-bl-xl' : ''}`}
              >
                <Avatar>
                  <AvatarFallback>W{index + 1}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        ) : null}
        <div className='grow'>
          <div className='min-h-12 px-8 py-2 text-xl font-semibold flex justify-between items-center'>
            <span className='truncate'>Wallet {walletIndex + 1}</span>
            <CustomAlertDialog
              title='Delete this Wallet?'
              desc='Are you sure you want to delete this wallet? This action cannot be undone.'
              cancelBtnText='No'
              confirmBtnText='Yes'
              confirmClickHandler={() => deleteWallet(walletIndex)}
            >
              <Button variant='ghost' className='flex gap-2 items-center'>
                <Trash className='size-4 text-destructive' />
              </Button>
            </CustomAlertDialog>
          </div>
          <div className='border-b'></div>
          <div className='py-4 px-8'>
            <div className='text-lg font-medium'>Public Key:</div>
            <div className='text-md font-light mb-4 w-full text-ellipsis overflow-hidden'>
              {walletData[walletIndex]?.publicKey}
            </div>
          </div>
          <div className='pb-6 px-8'>
            <div className='flex items-center justify-between text-lg font-medium my-1'>
              <p>Private Key:</p>
              <Button
                variant={!walletData[walletIndex]?.privateKeyVisible ? 'ghost' : 'default'}
                onClick={handlePrivateKeyVisibility}
              >
                {walletData[walletIndex]?.privateKeyVisible ? (
                  <EyeOff className='size-4' />
                ) : (
                  <Eye className='size-4' />
                )}
              </Button>
            </div>
            <div className='text-md font-light mb-4  text-ellipsis overflow-hidden'>
              {walletData[walletIndex]?.privateKeyVisible
                ? walletData[walletIndex]?.privateKey
                : walletData[walletIndex]?.privateKey.replace(/./g, '*')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
