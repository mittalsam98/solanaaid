import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import solanaRpcCall from '@/lib/api-calls/solana-rpc-call';
import { ConfirmedSignatureInfo } from '@solana/web3.js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { formatRelative } from 'date-fns';
import { Copy, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export default function Transaction({
  input,
  setLoading
}: {
  input: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [txn, setTxns] = useState<ConfirmedSignatureInfo[]>([]);
  const [lastFetchedTxn, setLastFetchedTxn] = useState<string>('');

  const mutation: UseMutationResult<
    Array<ConfirmedSignatureInfo>,
    Error,
    { input: string; before?: string }
  > = useMutation({
    mutationFn: ({ input, before }) =>
      solanaRpcCall.getSignaturesForAddress(input, 10, 'devnet', before),
    onSuccess: (res) => {
      const lastTxn = res[res.length - 1]?.signature;
      setLastFetchedTxn(lastTxn);
      setTxns((tsx) => [...tsx, ...res]);
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    }
  });

  useEffect(() => {
    setLoading(mutation.isPending);
  }, [mutation.isPending]);

  useEffect(() => {
    setTxns([]);
    if (input) mutation.mutate({ input });
  }, [input]);

  const loadMoreClickHandler = () => {
    mutation.mutate({ input, before: lastFetchedTxn });
  };

  return (
    <Card className='w-full'>
      <CardHeader className='px-7'>
        <CardTitle>Transaction</CardTitle>
        <CardDescription>Transaction History of the account</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col justify-center items-center'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Signature</TableHead>
              <TableHead className=''>Block</TableHead>
              <TableHead className='hidden sm:table-cell'>Timestamp</TableHead>
              <TableHead className='hidden text-right sm:table-cell'>Status</TableHead>
            </TableRow>
          </TableHeader>
          {mutation.isPending && (
            <TableBody>
              {Array(3)
                .fill('')
                .map((_) => (
                  <TableRow>
                    <TableCell>
                      <Skeleton className='w-full h-[30px] my-2' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='w-full h-[30px] my-2' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='w-full h-[30px] my-2' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='w-full h-[30px] my-2' />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
          <TableBody>
            {txn?.map((datum) => (
              <TableRowComp key={datum.signature} datum={datum} />
            ))}
          </TableBody>
        </Table>
        <Button onClick={loadMoreClickHandler} className='mt-12 w-2/4'>
          {mutation.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {mutation.isPending ? 'Loading' : 'Load more'}
        </Button>
      </CardContent>
    </Card>
  );
}
const handleCopy = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
    toast('Copied signature hash phrase to clipboard!');
  } catch (error) {
    toast('Uh oh! Something went wrong.');
  }
};
// Updated TableRowComp to use forwardRef properly
const TableRowComp = ({ datum }: { datum: ConfirmedSignatureInfo }) => {
  return (
    <>
      <TableRow>
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className='flex items-center gap-3 '>
                  <Copy onClick={() => handleCopy(datum.signature)} className='h-4 w-4' />
                  <Link to={`/tx/${datum.signature}`}>
                    <div className='font-medium text-ellipsis overflow-hidden w-80'>
                      {datum.signature}
                    </div>
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent className='text-xl'>{datum.signature}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell>
          <div className='font-medium'>{datum?.slot?.toLocaleString()}</div>
        </TableCell>
        <TableCell className='hidden sm:table-cell'>
          {datum?.blockTime ? formatRelative(datum.blockTime * 1000, new Date()) : 'N/A'}
        </TableCell>
        <TableCell className='hidden sm:table-cell text-right'>
          {datum?.err === null ? (
            <span className='bg-[#1690311A] text-[#169031] font-semibold px-2 py-1 rounded-full'>
              <small>Confirmed</small>
            </span>
          ) : (
            <span className='bg-[#F21F111A] font-semibold text-[#F21F11] px-2 py-1 rounded-full'>
              <small>Error</small>
            </span>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

TableRowComp.displayName = 'TableRowComp';
