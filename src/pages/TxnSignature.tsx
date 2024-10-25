import AccountInputCard from '@/components/TxnSignatures/AccountInputCard';
import DetailsOverview from '@/components/TxnSignatures/DetailsOverview';
import ProgramLogsCard from '@/components/TxnSignatures/ProgramLogsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import solanaRpcCall from '@/lib/api-calls/solana-rpc-call';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function TxnSignature() {
  const { signature } = useParams();
  const [txnInput, setTxnInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxnInput(e.target.value);
  };

  const mutation: UseMutationResult<ParsedTransactionWithMeta | null, Error, unknown> = useMutation(
    {
      mutationFn: () => solanaRpcCall.getParsedTransaction(signature ?? '', 'devnet')
    }
  );

  useEffect(() => {
    if (signature) mutation.mutate(signature);
  }, [signature]);

  return (
    <>
      <div className='w-full sm:w-3/4  lg:w-2/4'>
        <h2 className='text-xl mb-8'>Transaction Details</h2>
        <div className='flex w-full items-center space-x-2'>
          <Input
            id='publicKey'
            onChange={handleInputChange}
            value={txnInput}
            className='w-full'
            placeholder='Search for other transaction'
          />
          <Button disabled={!txnInput} type='submit'>
            <Link to={`/tx/${txnInput}`}>
              <Search className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </div>
      {mutation.isPending ? (
        <div className='flex flex-col gap-5 w-full sm:w-3/4  lg:w-2/4'>
          <Skeleton className='w-full h-60' />
          <Skeleton className='w-full h-96' />
          <Skeleton className='w-full h-64' />
        </div>
      ) : signature ? (
        <>
          <DetailsOverview signature={signature} mutation={mutation} />
          <AccountInputCard mutation={mutation} />
          <ProgramLogsCard mutation={mutation} />
        </>
      ) : null}
    </>
  );
}
