import Overview from '@/components/AccountInfo/Overview';
import Transaction from '@/components/AccountInfo/Transaction';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function AccountInfo() {
  const [keyInput, setKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedKey, setSubmittedKey] = useState(''); // New state to track the submitted key

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.target.value);
  };

  const handleFetchAccountInfo = () => {
    setSubmittedKey(keyInput);
  };

  return (
    <div className='flex justify-center p-12 gap-12 w-full'>
      <Card className='w-full items-center pb-3 pt-2 max-h-52 lg:max-w-[540px]'>
        <CardContent className='w-full flex pt-4 flex-col gap-6'>
          <Label htmlFor='publicKey'>Enter the public key</Label>
          <Input
            id='publicKey'
            onChange={handleInputChange}
            value={keyInput}
            placeholder='Your public key'
          />
          <Button disabled={loading || !keyInput} onClick={handleFetchAccountInfo}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Get Account Info
          </Button>
        </CardContent>
      </Card>
      <Tabs defaultValue='overview' className='grow flex flex-col items-center'>
        <TabsList className='h-12 grid w-full max-w-[500px] px-2 grid-cols-2'>
          <TabsTrigger className='py-2 px-4' value='overview'>
            Overview
          </TabsTrigger>
          <TabsTrigger className='py-2 px-4' value='transaction'>
            Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='flex justify-center w-full'>
          <Overview input={submittedKey} setLoading={setLoading} />
        </TabsContent>
        <TabsContent value='transaction' className='flex justify-center w-full'>
          <Transaction input={submittedKey} setLoading={setLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
