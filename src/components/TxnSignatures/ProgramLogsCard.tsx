import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { UseMutationResult } from '@tanstack/react-query';

export default function ProgramLogsCard({
  mutation
}: {
  mutation: UseMutationResult<ParsedTransactionWithMeta | null, Error, unknown>;
}) {
  const rawData = mutation?.data;

  return (
    <Card className='w-full sm:w-3/4  lg:w-2/4'>
      <CardHeader className='pb-2'>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {Array.isArray(rawData?.meta?.logMessages) && rawData.meta.logMessages.length > 0
          ? rawData.meta.logMessages.map((log, index) => (
              <div key={index}>{JSON.stringify(log)}</div>
            ))
          : 'No Program Logs found'}
      </CardContent>
    </Card>
  );
}
