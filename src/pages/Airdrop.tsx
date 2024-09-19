import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import solanaRpcCall from '@/lib/api-calls/solana-rpc-call';
import { useState } from 'react';

export default function AirDrop() {
  const [pubKey, setPubKey] = useState('77yTjEnJTN386gzYJGqfh6FzC732sg1txLmzKMToAr8F');
  const [amount, setAmount] = useState(0);
  const handleImportWallet = async () => {
    console.log('heel');
    if (pubKey || amount) {
      await solanaRpcCall.requestAirDrop(pubKey, amount);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'pubKey') setPubKey(e.target.value);
    if (e.target.id === 'amount') setAmount(parseInt(e.target.value));
  };

  return (
    <div className='h-full w-full flex justify-center items-center p-2 lg:w-[60%] xl:w-[30%]'>
      <Card className='w-full flex flex-col items-center pb-8 pt-5 '>
        <CardHeader className='text-center mb-2'>
          <CardTitle className='text-2xl'>Request Airdrop</CardTitle>
          <CardDescription className=''>Maximum two of the request per hour</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-6 p-2 w-[90%]'>
          <div className='flex gap-2'>
            <Input
              value={pubKey}
              id={'pubKey'}
              onChange={handleChange}
              className='grow'
              placeholder='Enter the public address'
            />
            <Input
              value={amount}
              id={'amount'}
              onChange={handleChange}
              className='w-24'
              placeholder='Amount'
              type='number'
            />
          </div>
          <Button disabled={!pubKey || !amount} onClick={handleImportWallet}>Air drop</Button>
        </CardContent>
      </Card>{' '}
    </div>
  );
}
