import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import solanaRpcCall from '@/lib/api-calls/solana-rpc-call';
import { ConfirmedSignatureInfo } from '@solana/web3.js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Transaction({ input }: { input: string }) {
  const mutation: UseMutationResult<Array<ConfirmedSignatureInfo>, Error, string> = useMutation({
    mutationFn: (input: string) => solanaRpcCall.getSignaturesForAddress(input, 'devnet')
  });

  useEffect(() => {
    if (input) mutation.mutate(input);
  }, [input]);

  return (
    <Card className='w-full'>
      <CardHeader className='px-7'>
        <CardTitle>Transaction</CardTitle>
        <CardDescription>Transaction History of the account </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Signature</TableHead>
              <TableHead className='hidden sm:table-cell'>Timestamp</TableHead>
              <TableHead className='hidden sm:table-cell'>Status</TableHead>
              <TableHead className='hidden md:table-cell'>Date</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='bg-accent'>
              <TableCell>
                <div className='font-medium'>Liam Johnson</div>
                <div className='hidden text-sm text-muted-foreground md:inline'>
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>Sale</TableCell>
              <TableCell className='hidden sm:table-cell'>Fulfilled</TableCell>
              <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
              <TableCell className='text-right'>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='font-medium'>Olivia Smith</div>
                <div className='hidden text-sm text-muted-foreground md:inline'>
                  olivia@example.com
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>Refund</TableCell>
              <TableCell className='hidden sm:table-cell'>Declined</TableCell>
              <TableCell className='hidden md:table-cell'>2023-06-24</TableCell>
              <TableCell className='text-right'>$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='font-medium'>Noah Williams</div>
                <div className='hidden text-sm text-muted-foreground md:inline'>
                  noah@example.com
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>Subscription</TableCell>
              <TableCell className='hidden sm:table-cell'>Fulfilled</TableCell>
              <TableCell className='hidden md:table-cell'>2023-06-25</TableCell>
              <TableCell className='text-right'>$350.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='font-medium'>Emma Brown</div>
                <div className='hidden text-sm text-muted-foreground md:inline'>
                  emma@example.com
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>Sale</TableCell>
              <TableCell className='hidden sm:table-cell'>Fulfilled</TableCell>
              <TableCell className='hidden md:table-cell'>2023-06-26</TableCell>
              <TableCell className='text-right'>$450.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='font-medium'>Liam Johnson</div>
                <div className='hidden text-sm text-muted-foreground md:inline'>
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>Sale</TableCell>
              <TableCell className='hidden sm:table-cell'>Fulfilled</TableCell>
              <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
              <TableCell className='text-right'>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='font-medium'>Liam Johnson</div>
                <div className='hidden text-sm text-muted-foreground md:inline'>
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>Sale</TableCell>
              <TableCell className='hidden sm:table-cell'>Fulfilled</TableCell>
              <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
              <TableCell className='text-right'>$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
