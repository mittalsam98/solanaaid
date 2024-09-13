import { create } from 'zustand';

export enum LAYOUT {
  LEFT_PANEL,
  CARD_VIEW
}

interface WalletsState {
  mnemonic: string;
  activeWalletIndex: number;
  walletData: WalletState[];
  layout: LAYOUT;
  setMnemonics: (mnemonic: string) => void;
  setActiveWalletIndex: (val: number) => void;
  setWalletData: (data: WalletState[]) => void;
  setLayout: (data: LAYOUT) => void;
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
  layout: LAYOUT.LEFT_PANEL,
  setMnemonics: (mnemonic) => set({ mnemonic }),
  setWalletData: (data) => set({ walletData: data }),
  setLayout: (layout: LAYOUT) => set({ layout: layout }),
  setActiveWalletIndex: (val: number) => set(() => ({ activeWalletIndex: val }))
}));
