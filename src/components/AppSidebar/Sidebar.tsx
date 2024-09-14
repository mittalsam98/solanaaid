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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={`inset-y-0 left-0 z-10 hidden border-r bg-background sm:flex sm:flex-col sm:items-center sm:justify-between pb-4 ${
        isSidebarExpanded ? 'w-52' : 'w-14'
      } transition-all duration-300`}
    >
      <div className='w-full flex flex-col items-center gap-4 '>
        <div className='border-b w-full px-2 py-2 flex justify-center '>
          <button
            onClick={() => setSidebarExpanded(!isSidebarExpanded)}
            className='flex  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8'
          >
            {isSidebarExpanded ? (
              <div className='flex gap-2'>
                <PanelLeft className='h-6 w-6 text-black' />
              </div>
            ) : (
              <PanelRight className='h-6 w-6 text-black' />
            )}
            <span className='sr-only'>Toggle Sidebar</span>
          </button>
        </div>
        <div className='flex flex-col gap-5 items-start py-4'>
          {SIDE_NAV_ITEMS.map((val) => {
            const IconComponent = val.icon;
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={() => navigate(`/${val.path}`)} // Navigate to the absolute path
                      className='flex items-center gap-3  text-lg '
                    >
                      <IconComponent className='h-6 w-6 text-black' />
                      {isSidebarExpanded && (
                        <span className='text-sm transition-all'>{val.value}</span>
                      )}
                    </div>{' '}
                  </TooltipTrigger>
                  <TooltipContent>{val.value}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
