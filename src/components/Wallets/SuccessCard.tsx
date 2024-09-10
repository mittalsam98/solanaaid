import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuccessCard({ handleStep }: { handleStep: (step: number) => void }) {
  return (
    <Card className='w-full flex flex-col items-center pb-8 pt-5'>
      <CardHeader className='text-center mb-8'>
        <CardTitle className='text-2xl'>You're all done</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <Button>Go to wallet</Button>
      </CardContent>
    </Card>
  );
}
