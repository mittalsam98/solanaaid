import { LIVE_COIN_WATCH_CONNECTION_URL } from '../constants';
import { SolanaPriceResponse } from '../types/interfaces';

export const getSolanaPrice = async (price: string): Promise<SolanaPriceResponse> => {
  try {
    const response = await fetch(LIVE_COIN_WATCH_CONNECTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_LIVE_COIN_WATCH_KEY
      },
      body: JSON.stringify({
        currency: price,
        code: 'SOL',
        meta: true
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const res = await response.json();
    return res; // Return the actual response
  } catch (error) {
    console.error('Error fetching Solana price:', error);
    throw error; // Optionally re-throw the error for further handling
  }
};
