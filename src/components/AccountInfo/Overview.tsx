import SolanaLogo from '@/assets/solana-sol-logo.svg?react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getSolanaPrice } from '@/lib/api-calls/apiCalls';
import solanaRpcCall from '@/lib/api-calls/solana-rpc-call';
import { SolanaPriceResponse } from '@/lib/types/interfaces';
import {
  AccountInfo,
  LAMPORTS_PER_SOL,
  ParsedAccountData,
  RpcResponseAndContext
} from '@solana/web3.js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Overview({
  input,
  setLoading
}: {
  input: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currency, setCurrency] = useState('USD');

  const mutation: UseMutationResult<
    RpcResponseAndContext<AccountInfo<Buffer | ParsedAccountData> | null>,
    Error,
    string
  > = useMutation({
    mutationFn: (input: string) => solanaRpcCall.getAccountInfo(input, 'devnet'),
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    }
  });

  const getSolanaPriceMutation: UseMutationResult<SolanaPriceResponse, Error, string> = useMutation(
    {
      mutationFn: (currency) => getSolanaPrice(currency)
    }
  );

  useEffect(() => {
    setLoading(mutation.isPending || getSolanaPriceMutation.isPending);
  }, [mutation.isPending, getSolanaPriceMutation.isPending]);

  useEffect(() => {
    if (input) mutation.mutate(input);
  }, [input]);

  useEffect(() => {
    if (mutation.data?.value?.lamports && currency) {
      getSolanaPriceMutation.mutate(currency);
    }
  }, [mutation.data?.value?.lamports, currency]);

  const isLoading = mutation.isPending || getSolanaPriceMutation.isPending;

  const solanaBalance = mutation.data?.value?.lamports
    ? mutation.data?.value?.lamports / LAMPORTS_PER_SOL
    : 0;

  const convertedPrice =
    solanaBalance && getSolanaPriceMutation?.data?.rate
      ? (solanaBalance * getSolanaPriceMutation.data.rate).toFixed(2)
      : '0';

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'INR':
        return '₹';
      case 'EUR':
        return '€';
      default:
        return '$';
    }
  };

  {
    console.log(mutation);
  }

  return (
    <div className='w-full'>
      <div className='flex justify-center gap-5'>
        <Card className='mb-3 w-56'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3 justify-center'>
              <SolanaLogo className='h-8 w-8' />
              <CardTitle className='text-xl'>Balance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>
              {mutation.isPending ? (
                <Loader2 className='h-8 w-8 animate-spin' />
              ) : (
                `${solanaBalance} SOL`
              )}
            </div>
          </CardContent>
        </Card>

        <Card className='mb-3 w-56'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3 justify-center'>
              <span>Worth</span>
              <Select value={currency} onValueChange={(e) => setCurrency(e)}>
                <SelectTrigger className='w-[70px] h-[30px]'>
                  <SelectValue placeholder='Select currency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='USD'>USD</SelectItem>
                    <SelectItem value='INR'>INR</SelectItem>
                    <SelectItem value='EUR'>EUR</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className='h-8 w-8 animate-spin' />
            ) : (
              <div className='text-2xl'>
                {getCurrencySymbol(currency)}
                {convertedPrice}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overview Table */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className='table-cell'>Address</TableCell>
                <TableCell className='text-right'>{input}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='table-cell'>Allocated Data Size </TableCell>
                {/* @ts-ignore */}
                <TableCell className='text-right'>{mutation?.data?.value?.space ?? '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='table-cell'>Executable</TableCell>
                <TableCell className='text-right'>
                  {mutation.data?.value?.lamports ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
