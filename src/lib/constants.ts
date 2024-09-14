import { Coins, Droplets, WalletCards, WalletMinimal } from 'lucide-react';

export const SIDE_NAV_ITEMS = [
  {
    value: 'Account Info',
    path: 'account-info',
    icon: WalletMinimal
  },
  {
    value: 'Wallets',
    path: 'wallet',
    icon: WalletCards
  },
  {
    value: 'Air Drop',
    path: 'air-drop',
    icon: Droplets
  },
  {
    value: 'Create Token',
    path: 'create-token',
    icon: Coins
  }
];

export const CONNECTION_URL =
  'https://solana-devnet.g.alchemy.com/v2/-RE2vDx1oFcNjFO7_KKGdmjVkYiaXpHC';
