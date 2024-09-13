import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LAYOUT, useWalletStore } from '@/store/walletStore';
import { ChevronRight, List, PanelLeft, Settings } from 'lucide-react';
import { CustomAlertDialog } from '../CustomAlertDialog';
import { SeedPhraseDisplay } from './SeedPhrase';

export function WalletSettingPopover({ handleStep }: { handleStep: (step: number) => void }) {
  const setActiveWalletIndex = useWalletStore((state) => state.setActiveWalletIndex);
  const setWalletData = useWalletStore((state) => state.setWalletData);

  const clearWallets = () => {
    setWalletData([]);
    setActiveWalletIndex(0);
    handleStep(0);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Settings className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60'>
        <div className='flex flex-col gap-3'>
          <div className='text-md font-medium'>Manage Wallet Settings</div>
          {/* Reveal Seed Phrase Menu item */}
          <RevealSeedPhraseMenuItem />
          {/* Change Layout Menu item */}
          <ChangeLayoutMenuItem />
          {/* Delete all wallets Menu item */}
          <CustomAlertDialog
            title='Delete all Wallets?'
            desc='Are you sure you want to delete all the wallets? This action cannot be undone.'
            cancelBtnText='No'
            confirmBtnText='Yes'
            confirmClickHandler={clearWallets}
          >
            <div className='flex justify-between items-center p-2 rounded-md hover:bg-red-100 hover:cursor-pointer'>
              <div className='text-sm'>Delete all Wallets </div>
              <ChevronRight className='size-4' />
            </div>
          </CustomAlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const ChangeLayoutMenuItem = () => {
  const setLayout = useWalletStore((state) => state.setLayout);
  const layout = useWalletStore((state) => state.layout);
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem className='border-b-0' value='change_layout'>
        <AccordionTrigger className='hover:no-underline	rounded-md border-b-0 hover:bg-slate-100 p-0 '>
          <div className='flex justify-between items-center p-2 rounded-md hover:bg-slate-100 hover:cursor-pointer'>
            <div className='text-sm'>Change View Layout </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='flex justify-around mt-3'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => {
                    setLayout(LAYOUT.LEFT_PANEL);
                  }}
                  variant={layout == LAYOUT.LEFT_PANEL ? 'default' : 'outline'}
                >
                  <PanelLeft className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-'>Left Panel View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => {
                    setLayout(LAYOUT.CARD_VIEW);
                  }}
                  variant={layout == LAYOUT.CARD_VIEW ? 'default' : 'outline'}
                >
                  <List className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-'>Card View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const RevealSeedPhraseMenuItem = () => {
  const mnemonic = useWalletStore((state) => state.mnemonic);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='flex justify-between items-center p-2 cursor-pointer rounded-md hover:bg-slate-100 hover:cursor-pointer'>
          <div className='text-sm'>Reveal Seed Phrase</div>
          <ChevronRight className='size-4' />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle className='text-2xl'>Secret Recovery Phase</AlertDialogTitle>
        <AlertDialogDescription className='text-yellow-700'>
          This phrase can be used to recover your wallet. These are confidential, do not share it
          with anyone! <span className='italic'>(Hover to reveal)</span>
        </AlertDialogDescription>
        <SeedPhraseDisplay mnemonic={mnemonic} className='blur-sm hover:blur-none	' />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
