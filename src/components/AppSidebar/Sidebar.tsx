import { PanelLeft, PanelRight } from 'lucide-react';
import { SIDE_NAV_ITEMS } from '@/lib/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function Sidebar() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <aside
      className={` inset-y-0 left-0 z-10 hidden border-r bg-background sm:flex sm:flex-col sm:items-center sm:justify-between pb-4 ${
        isSidebarExpanded ? 'w-56' : 'w-14'
      } transition-all duration-300`}
    >
      <div className='flex flex-col items-center gap-4 px-2 py-4'>
        <div>
          <button
            onClick={() => setSidebarExpanded(!isSidebarExpanded)}
            className='flex  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8'
          >
            {isSidebarExpanded ? (
              <div className='flex gap-2'>
                <PanelLeft className='h-5 w-5' />
              </div>
            ) : (
              <PanelRight className='h-5 w-5' />
            )}
            <span className='sr-only'>Toggle Sidebar</span>
          </button>
        </div>
        <div className='flex flex-col gap-4 items-start'>
          {SIDE_NAV_ITEMS.map((val) => {
            const IconComponent = val.icon;
            return (
              <Link key={val.path} to={val.path} className='flex items-center gap-3  text-lg '>
                <IconComponent className='h-5 w-5' />
                {isSidebarExpanded && <span className='transition-all'>{val.value}</span>}
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <div className='flex gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
                A
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
