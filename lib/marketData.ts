
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Kline {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '1d' | '3d' | '1w';

const TF_MINUTES: Record<string, number> = {
  '1m': 1, '5m': 5, '15m': 15, '30m': 30,
  '1h': 60, '2h': 120, '4h': 240, '1d': 1440, '1w': 10080
};

export function getTfMs(tf: Timeframe): number {
  return (TF_MINUTES[tf] || 60) * 60 * 1000;
}

/**
 * Robust fetch utility with multiple proxies and exponential retry logic.
 */
async function fetchWithProxy(targetUrl: string, retries = 2): Promise<any> {
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
    `https://thingproxy.freeboard.io/fetch/${targetUrl}`
  ];

  for (let attempt = 0; attempt <= retries; attempt++) {
    for (const proxy of proxies) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(proxy, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const text = await response.text();
          let result;
          try {
            if (proxy.includes('allorigins')) {
              const json = JSON.parse(text);
              result = typeof json.contents === 'string' ? JSON.parse(json.contents) : json.contents;
            } else {
              result = JSON.parse(text);
            }
          } catch (e) {
             // If JSON parse fails, maybe it's the raw string we need
             result = JSON.parse(text);
          }
          if (result) return result;
        }
      } catch (e) {
        continue;
      }
    }
    // Exponential backoff before retry
    if (attempt < retries) await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
  }
  throw new Error("Connection Failure: All gateways exhausted.");
}

export async function fetchHistoricalData(symbol: string, timeframe: Timeframe = '1h', limit: number = 500): Promise<Kline[]> {
  try {
    const ticker = symbol.toUpperCase().replace('-', '');
    const baseUrl = `https://api.binance.com/api/v3/klines?symbol=${ticker}&interval=${timeframe}&limit=${limit}`;
    const data = await fetchWithProxy(baseUrl);
    
    if (Array.isArray(data)) {
      return data.map((d: any) => ({
        time: d[0],
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
        volume: parseFloat(d[5])
      }));
    }
  } catch (e) {
    console.error("Historical Data Fetch Failed:", e);
  }
  return [];
}

export async function fetchAllPairs(): Promise<{symbol: string, name: string}[]> {
  try {
    const baseUrl = 'https://api.binance.com/api/v3/ticker/price';
    const data = await fetchWithProxy(baseUrl);
    
    if (Array.isArray(data)) {
      return data
        .filter(p => p.symbol.endsWith('USDT'))
        .map(p => ({
          symbol: p.symbol,
          name: p.symbol.replace('USDT', '')
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 50); 
    }
  } catch (e) {
    console.error("Pair Discovery Error:", e);
  }
  
  return [
    { symbol: 'BTCUSDT', name: 'BTC' },
    { symbol: 'ETHUSDT', name: 'ETH' },
    { symbol: 'SOLUSDT', name: 'SOL' },
    { symbol: 'BNBUSDT', name: 'BNB' }
  ];
}

export function subscribeToTicks(symbol: string, onTick: (tick: { price: number, volume: number, time: number }) => void) {
  const ticker = symbol.toLowerCase().replace('-', '');
  const wsUrl = `wss://stream.binance.com:9443/ws/${ticker}@trade`;
  let ws: WebSocket | null = null;
  let isClosing = false;

  const connect = () => {
    if (isClosing) return;
    try {
      ws = new WebSocket(wsUrl);
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg && msg.p) {
          onTick({
            price: parseFloat(msg.p),
            volume: parseFloat(msg.q),
            time: msg.T
          });
        }
      };
      ws.onclose = () => { if (!isClosing) setTimeout(connect, 5000); };
      ws.onerror = () => ws?.close();
    } catch (e) {
      console.error("WebSocket Error:", e);
    }
  };

  connect();
  return () => { isClosing = true; if (ws) ws.close(); };
}
