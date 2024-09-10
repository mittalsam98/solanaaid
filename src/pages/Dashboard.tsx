
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';


export const description =
  'An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.';

export function Dashboard() {
  return (
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
        </div>
      </div>
      <div>
        {/* <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
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
      </div>
    </CardContent>
    <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
      <div className='text-xs text-muted-foreground'>
        Updated <time dateTime='2023-11-23'>November 23, 2023</time>
      </div>
    </CardFooter>
  </Card> */}
      </div>
    </main>
  );
}
