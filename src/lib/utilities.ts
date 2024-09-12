import nacl from 'tweetnacl';
import { mnemonicToSeedSync } from 'bip39';
import { Wallet } from './types/interfaces';
import { useWalletStore } from '@/store/walletStore';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export function createSolanaWalletFromMnemonic(): Wallet {
  const mnemonic = useWalletStore.getState().mnemonic;
  const walletLength = useWalletStore.getState().walletData.length ?? 0;
  const seed = mnemonicToSeedSync(mnemonic);

  {
    console.log({ walletLength }, useWalletStore.getState().walletData.length);
  }

  // If wallet length is 0 it means index will be 0, if length is 1, means index will be 1
  const path = `m/44'/501'/${walletLength}'/0'`;
  const derivedSeed = derivePath(path, seed.toString('hex')).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  return {
    publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
    privateKey: bs58.encode(Keypair.fromSecretKey(secret).secretKey),
    privateKeyVisible: false
  };
}
