import SolanaLogo from '@/assets/solana-sol-logo.svg?react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getAccountInfo } from '@/lib/apiCalls';
import { AccountInfo, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Overview({ input }: { input: string }) {
  const mutation: UseMutationResult<AccountInfo<Buffer> | null, Error, string> = useMutation({
    mutationFn: (input: string) => {
      return getAccountInfo(input);
    }
  });

  useEffect(() => {
    if (input) {
      mutation.mutate(input);
    }
  }, [input]);

  console.log(mutation);

  // const fetchAccountInfo = async () => {
  //   const response = await getAccountInfo(input);
  //   console.log(response);
  // };

  return (
    <div className='w-full'>
      <Card>
        <CardHeader className='pb-2'>
          <div className='flex items-center gap-3'>
            <SolanaLogo className='h-8 w-8' />
            <CardTitle className='text-4xl mt-3'>
              {mutation?.data?.lamports ? mutation?.data?.lamports / LAMPORTS_PER_SOL : 0} SOL
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow className='p-4'>
                <TableCell className='table-cell'>Address</TableCell>
                <TableCell className='text-right'>{input}</TableCell>
              </TableRow>
              <TableRow className='p-5'>
                <TableCell className='table-cell'>Allocated Data Size </TableCell>
                <TableCell className='text-right'>{mutation.data?.size}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='table-cell'>Executable</TableCell>
                <TableCell className='text-right'>
                  {mutation?.data?.lamports ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
