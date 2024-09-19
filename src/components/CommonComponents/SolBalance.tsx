import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function lamportsToSol(lamports: number | bigint): number {
  if (typeof lamports === 'number') {
    return lamports / LAMPORTS_PER_SOL;
  }

  let signMultiplier = 1;
  if (lamports < 0) {
    signMultiplier = -1;
  }

  const absLamports = lamports < 0 ? -lamports : lamports;

  const lamportsString = absLamports?.toString(10)?.padStart(10, '0');
  const splitIndex = lamportsString.length - 9;
  const solString = lamportsString.slice(0, splitIndex) + '.' + lamportsString.slice(splitIndex);
  return signMultiplier * parseFloat(solString);
}

export function SolBalance({
  lamports,
  maximumFractionDigits = 9
}: {
  lamports: number | bigint;
  maximumFractionDigits?: number;
}) {
  return (
    <span>
      <span className='text-md '></span>
      <span className='font-monospace'>
        ◎{Intl.NumberFormat('en-US', { maximumFractionDigits }).format(lamportsToSol(lamports))}
      </span>
    </span>
  );
}
