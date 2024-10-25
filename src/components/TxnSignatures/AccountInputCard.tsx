import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { UseMutationResult } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { SolBalance } from '../CommonComponents/SolBalance';

export default function AccountInputCard({
  mutation
}: {
  mutation: UseMutationResult<ParsedTransactionWithMeta | null, Error, unknown>;
}) {
  const transactionData = mutation?.data;
  if (!transactionData) {
    return null;
  }

  const { meta, transaction } = transactionData;
  const { message } = transaction;

  if (!meta) {
    return 'Error';
  }

  //   const accountRows = message.accountKeys.map((account, index) => {
  //     const pre = meta.preBalances[index];
  //     const post = meta.postBalances[index];
  //     const pubkey = account.pubkey;
  //     const key = account.pubkey.toBase58();
  //     const delta = new BigNumber(post).minus(new BigNumber(pre));

  //     return (
  //       <tr key={key}>
  //         <td>{index + 1}</td>
  //         <td>
  //           <Address pubkey={pubkey} link fetchTokenLabelInfo />
  //         </td>
  //         <td>
  //           <BalanceDelta delta={delta} isSol />
  //         </td>
  //         <td>
  //           <SolBalance lamports={post} />
  //         </td>
  //         <td>
  //           {index === 0 && <span className='badge bg-info-soft me-1'>Fee Payer</span>}
  //           {account.signer && <span className='badge bg-info-soft me-1'>Signer</span>}
  //           {account.writable && <span className='badge bg-danger-soft me-1'>Writable</span>}
  //           {message.instructions.find((ix) => ix.programId.equals(pubkey)) && (
  //             <span className='badge bg-warning-soft me-1'>Program</span>
  //           )}
  //           {account.source === 'lookupTable' && (
  //             <span className='badge bg-gray-soft me-1'>Address Table Lookup</span>
  //           )}
  //         </td>
  //       </tr>
  //     );
  //   });

  return (
    <Card className='w-full sm:w-3/4  lg:w-2/4'>
      <CardHeader className='pb-2'>
        <CardTitle>Account Input(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead className=''>Pre Balance (SOL)</TableHead>
              <TableHead className=''>Post Balance (SOL)</TableHead>
              <TableHead className=''>Change (SOL)</TableHead>
              <TableHead className=''>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {message.accountKeys.map((account, index) => {
              const delta = new BigNumber(meta.postBalances[index]).minus(
                new BigNumber(meta.preBalances[index])
              );

              return (
                <TableRow>
                  <TableCell className='table-cell'>{account?.pubkey.toBase58()}</TableCell>
                  <TableCell className=''>
                    <SolBalance lamports={meta.preBalances[index]} />
                  </TableCell>
                  <TableCell className=''>
                    <SolBalance lamports={meta.postBalances[index]} />
                  </TableCell>
                  <TableCell className=''>
                    <SolBalance lamports={delta.toNumber()} />
                  </TableCell>
                  <TableCell className=''>
                    {index === 0 && <span className='badge bg-info-soft me-1'>Fee Payer</span>}
                    {account.signer && <span className='badge bg-info-soft me-1'>Signer</span>}
                    {account.writable && (
                      <span className='badge bg-danger-soft me-1'>Writable</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
