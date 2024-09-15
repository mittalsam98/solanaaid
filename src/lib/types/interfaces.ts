export interface Wallet {
  publicKey: string;
  privateKey: string;
  privateKeyVisible: boolean;
}
export interface SolanaPriceResponse {
  name: string;
  rank: number;
  age: number;
  color: string;
  exchanges: number;
  markets: number;
  pairs: number;
  categories: string[];
  allTimeHighUSD: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  links: {
    website: string;
    whitepaper: string;
    twitter: string;
    reddit: string;
    telegram: string;
    discord: string;
    medium: string;
    instagram: string;
    tiktok: string | null;
    youtube: string;
    linkedin: string | null;
    twitch: string | null;
    spotify: string | null;
    naver: string | null;
    wechat: string | null;
    soundcloud: string | null;
  };
  rate: number;
  volume: number;
  cap: number;
  liquidity: number;
  delta: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  };
}
