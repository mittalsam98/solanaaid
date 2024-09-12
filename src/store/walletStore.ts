import { create } from 'zustand';

interface WalletsState {
  mnemonic: string;
  activeWalletIndex: number;
  walletData: WalletState[];
  setMnemonics: (mnemonic: string) => void;
  setActiveWalletIndex: (val: number) => void;
  setWalletData: (data: WalletState[]) => void;
}
interface WalletState {
  publicKey: string;
  privateKey: string;
  privateKeyVisible: boolean;
}

export const useWalletStore = create<WalletsState>()((set) => ({
  mnemonic: '',
  activeWalletIndex: 0,
  walletData: [],
  setMnemonics: (mnemonic) => set({ mnemonic }),
  setWalletData: (data) => set({ walletData: data }),
  setActiveWalletIndex: (val: number) => set(() => ({ activeWalletIndex: val }))
}));
