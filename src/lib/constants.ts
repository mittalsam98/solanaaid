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
    value: 'Request Airdrop',
    path: 'air-drop',
    icon: Droplets
  },
  {
    value: 'Create Token',
    path: 'create-token',
    icon: Coins
  }
];

export const LIVE_COIN_WATCH_CONNECTION_URL = 'https://api.livecoinwatch.com/coins/single';
