import { BadgePlus, PanelLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SIDE_NAV_ITEMS } from '@/lib/constants';
import { Link } from 'react-router-dom';

export default function WalletHeader() {
  return (
    <header className='sticky top-0 z-30 flex items-center justify-between gap-4 border-b-2 px-6 py-2'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            {SIDE_NAV_ITEMS.map((val) => {
              return (
                <Link
                  key={val.path}
                  to={val.path}
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <BadgePlus className='h-5 w-5' />
                  {val.value}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      Web3 Tools
      <div className='flex gap-4'>
        {/* <WalletMultiButton className='btn btn-ghost mr-4' />*/}
        <Button> Add Wallet</Button>
      </div>
    </header>
  );
}
