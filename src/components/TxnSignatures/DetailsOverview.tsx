import { SolBalance } from '@/components/CommonComponents/SolBalance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import solanaRpcCall from '@/lib/api-calls/solana-rpc-call';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailsOverview() {
  const { signature } = useParams();
  const mutation: UseMutationResult<ParsedTransactionWithMeta | null, Error, unknown> = useMutation(
    {
      mutationFn: () => solanaRpcCall.getParsedTransaction(signature ?? '', 'devnet')
    }
  );

  useEffect(() => {
    if (signature) mutation.mutate(signature);
  }, [signature]);

  {
    console.log(mutation);
  }

  const fee = mutation?.data?.meta?.fee;
  const computeUnitsConsumed = mutation?.data?.meta?.computeUnitsConsumed;
  const transaction = mutation?.data?.transaction;
  const blockhash = transaction?.message.recentBlockhash;
  const blockTime = mutation?.data?.blockTime;
  const version = mutation?.data?.version;
  const slot = mutation?.data?.slot;

  return (
    <Card className='w-full sm:w-3/4  lg:w-2/4'>
      <CardHeader className='pb-2'>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='table-cell'>Signature</TableCell>
              <TableCell className='text-right text-ellipsis w-32 overflow-hidden'>
                {signature}
              </TableCell>
            </TableRow>
            {blockTime && (
              <TableRow>
                <TableCell className='table-cell'>Timestamp </TableCell>
                {/* @ts-ignore */}
                <TableCell className='text-right'>{`${format(
                  blockTime * 1000,
                  'MMMM dd, yyyy'
                )} at ${format(blockTime * 1000, 'hh:mm:ss')}`}</TableCell>
              </TableRow>
            )}
            {slot && (
              <TableRow>
                <TableCell className='table-cell'>Slot</TableCell>
                <TableCell className='text-right'>{slot?.toLocaleString('en-US')}</TableCell>
              </TableRow>
            )}
            {blockhash && (
              <TableRow>
                <TableCell className='table-cell'> Recent Blockhash</TableCell>
                <TableCell className='text-right'>{blockhash}</TableCell>
              </TableRow>
            )}
            {fee && (
              <TableRow>
                <TableCell className='table-cell'>Fee (SOL)</TableCell>
                <TableCell className='text-right'>
                  <SolBalance lamports={fee} />
                </TableCell>
              </TableRow>
            )}
            {computeUnitsConsumed && (
              <TableRow>
                <TableCell className='table-cell'>Compute units consumed</TableCell>
                <TableCell className='text-right'>
                  {computeUnitsConsumed?.toLocaleString('en-US')}
                </TableCell>
              </TableRow>
            )}
            {version && (
              <TableRow>
                <TableCell className='table-cell'>Transaction Version</TableCell>
                <TableCell className='text-right'>{version}</TableCell>
              </TableRow>
            )}
            {/* <TableRow>
              <TableCell className='table-cell'></TableCell>
              <TableCell className='text-right'>{}</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
