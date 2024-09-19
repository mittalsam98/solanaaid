import secureLocalStorage from 'react-secure-storage';
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
const getLocalStorageData = () => {
  const storageData = (secureLocalStorage.getItem('walletData') as string) ?? {};
  const parsedStorageData = JSON.parse(storageData);
  if (parsedStorageData) {
    return parsedStorageData;
  } else return [];
};

export const useWalletStore = create<WalletsState>()((set) => ({
  mnemonic: '',
  activeWalletIndex: 0,
  walletData: getLocalStorageData(),
  layout: LAYOUT.LEFT_PANEL,
  setMnemonics: (mnemonic) => set({ mnemonic }),
  setWalletData: (data) => {
    secureLocalStorage.setItem('walletData', JSON.stringify(data));
    return set({ walletData: data });
  },
  setLayout: (layout: LAYOUT) => set({ layout: layout }),
  setActiveWalletIndex: (val: number) => set(() => ({ activeWalletIndex: val }))
}));
