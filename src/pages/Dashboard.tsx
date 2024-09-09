import {
  Copy,
  Home,
  LineChart,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

export const description =
  'An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.';

export function Dashboard() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
          <Link
            to='#'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          >
            <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Home className='h-5 w-5' />
                <span className='sr-only'>Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <ShoppingCart className='h-5 w-5' />
                <span className='sr-only'>Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Package className='h-5 w-5' />
                <span className='sr-only'>Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Users2 className='h-5 w-5' />
                <span className='sr-only'>Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <LineChart className='h-5 w-5' />
                <span className='sr-only'>Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Analytics</TooltipContent>
          </Tooltip>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link
                  to='#'
                  className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                >
                  <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                  <span className='sr-only'>Acme Inc</span>
                </Link>
                <Link
                  to='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Home className='h-5 w-5' />
                  Dashboard
                </Link>
                <Link to='#' className='flex items-center gap-4 px-2.5 text-foreground'>
                  <ShoppingCart className='h-5 w-5' />
                  Orders
                </Link>
                <Link
                  to='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Package className='h-5 w-5' />
                  Products
                </Link>
                <Link
                  to='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Users2 className='h-5 w-5' />
                  Customers
                </Link>
                <Link
                  to='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <LineChart className='h-5 w-5' />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          Recent Orders
          <div className='relative ml-auto flex-1 md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
                A
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
              <Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
                <CardHeader className='pb-3'>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className='max-w-lg text-balance leading-relaxed'>
                    Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful
                    Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
              <Card x-chunk='dashboard-05-chunk-1'>
                <CardHeader className='pb-2'>
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className='text-4xl'>$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xs text-muted-foreground'>+25% from last week</div>
                </CardContent>
              </Card>
              <Card x-chunk='dashboard-05-chunk-2'>
                <CardHeader className='pb-2'>
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className='text-4xl'>$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xs text-muted-foreground'>+10% from last month</div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
              <CardHeader className='flex flex-row items-start bg-muted/50'>
                <div className='grid gap-0.5'>
                  <CardTitle className='group flex items-center gap-2 text-lg'>
                    Order Oe31b70H
                    <Button
                      size='icon'
                      variant='outline'
                      className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                    >
                      <Copy className='h-3 w-3' />
                      <span className='sr-only'>Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className='ml-auto flex items-center gap-1'>
                  <Button size='sm' variant='outline' className='h-8 gap-1'>
                    <Truck className='h-3.5 w-3.5' />
                    <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='outline' className='h-8 w-8'>
                        <MoreVertical className='h-3.5 w-3.5' />
                        <span className='sr-only'>More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className='p-6 text-sm'>
                <div className='grid gap-3'>
                  <div className='font-semibold'>Order Details</div>
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className='flex items-center justify-between font-semibold'>
                      <span className='text-muted-foreground'>Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>

                <div className='grid gap-3'>
                  <div className='font-semibold'>Customer Information</div>
                  <dl className='grid gap-3'>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground'>Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground'>Email</dt>
                      <dd>
                        <a href='mailto:'>liam@acme.com</a>
                      </dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground'>Phone</dt>
                      <dd>
                        <a href='tel:'>+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
                <div className='text-xs text-muted-foreground'>
                  Updated <time dateTime='2023-11-23'>November 23, 2023</time>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
