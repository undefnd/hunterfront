
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Price {
  symbol: string;
  price: string;
}

export interface Kline {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Robust fetch utility with proxy fallbacks
 */
async function fetchWithFallback(targetUrl: string, retries = 1): Promise<any> {
  const proxies = [
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
  ];

  for (let attempt = 0; attempt <= retries; attempt++) {
    for (const proxy of proxies) {
      try {
        const url = `${proxy}${proxy.includes('allorigins') ? `&_t=${Date.now()}` : ''}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data) return data;
        }
      } catch (e) {}
    }
  }
  throw new Error('All proxy attempts failed');
}

export async function fetchPrices(): Promise<Price[]> {
  try {
    const targetUrl = `https://api.binance.us/api/v3/ticker/price`;
    return await fetchWithFallback(targetUrl);
  } catch (e) {
    console.error('Binance.US Price Error:', e);
    return [];
  }
}

export async function fetchKlines(symbol: string, interval: string = '1h', limit: number = 500): Promise<Kline[]> {
  try {
    const ticker = symbol.toUpperCase().replace('-', '');
    const targetUrl = `https://api.binance.us/api/v3/klines?symbol=${ticker}&interval=${interval}&limit=${limit}`;
    const data = await fetchWithFallback(targetUrl);
    
    if (!Array.isArray(data)) return [];
    
    return data.map((d: any) => ({
      time: d[0],
      open: parseFloat(d[1]),
      high: parseFloat(d[2]),
      low: parseFloat(d[3]),
      close: parseFloat(d[4]),
      volume: parseFloat(d[5]),
    }));
  } catch (e) {
    console.error('Binance.US Klines Error:', e);
    return [];
  }
}

export function subscribeToPrice(symbol: string, onPrice: (p: number) => void) {
  try {
    const ticker = symbol.toLowerCase().replace('-', '');
    const wsUrl = `wss://stream.binance.us:9443/ws/${ticker}@ticker`;
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg && msg.c) {
        onPrice(parseFloat(msg.c));
      }
    };
    
    return () => ws.close();
  } catch (e) {
    console.error('WS Setup Error:', e);
    return () => {};
  }
}
