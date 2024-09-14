import { CONNECTION_URL } from './constants';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  AccountInfo
} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export const getAccountInfo = async (publicKey: string): Promise<AccountInfo<Buffer> | null> => {
  let wallet = new PublicKey(publicKey);

  return await connection.getAccountInfo(wallet);
};
// export const getAccountInfo = async (publicKey: string): Promise<AccountInfo<Buffer> | null> => {
//   let wallet = new PublicKey(publicKey);

//   return await connection.getAccountInfo(wallet);
// };
