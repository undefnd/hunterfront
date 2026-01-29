
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Kline } from './marketData';

function calculateEMA(data: number[], period: number): (number | null)[] {
  const ema: (number | null)[] = new Array(data.length).fill(null);
  if (data.length < period) return ema;
  const k = 2 / (period + 1);
  let sum = 0;
  for (let i = 0; i < period; i++) sum += data[i];
  
  const initialSMA = sum / period;
  ema[period - 1] = initialSMA;
  
  for (let i = period; i < data.length; i++) {
    const prevEma = ema[i - 1] as number;
    ema[i] = (data[i] - prevEma) * k + prevEma;
  }
  return ema;
}

function calculateRSI(data: number[], period: number = 14): (number | null)[] {
  const rsi: (number | null)[] = new Array(data.length).fill(null);
  if (data.length < period) return rsi;
  
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = data[i] - data[i - 1];
    if (diff > 0) gains += diff; else losses -= diff;
  }
  
  let avgGain = gains / period, avgLoss = losses / period;
  for (let i = period + 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi[i] = 100 - (100 / (1 + rs));
  }
  return rsi;
}

function calculateOBV(klines: Kline[]): number[] {
  const obv = new Array(klines.length).fill(0);
  for (let i = 1; i < klines.length; i++) {
    const change = klines[i].close - klines[i - 1].close;
    obv[i] = obv[i - 1] + (change > 0 ? klines[i].volume : change < 0 ? -klines[i].volume : 0);
  }
  return obv;
}

export function computeMVWAP(klines: Kline[], period: number = 20): (number | null)[] {
  const mvwap: (number | null)[] = new Array(klines.length).fill(null);
  for (let i = period - 1; i < klines.length; i++) {
    const start = Math.max(0, i - period + 1);
    let pvSum = 0, volSum = 0;
    for (let j = start; j <= i; j++) {
      const v = klines[j].volume || 1;
      pvSum += klines[j].close * v;
      volSum += v;
    }
    mvwap[i] = volSum !== 0 ? pvSum / volSum : klines[i].close;
  }
  return mvwap;
}

export function calculateCMF(klines: Kline[], period: number = 20): (number | null)[] {
  const cmf: (number | null)[] = new Array(klines.length).fill(null);
  for (let i = period - 1; i < klines.length; i++) {
    const start = Math.max(0, i - period + 1);
    let mfvSum = 0, volSum = 0;
    for (let j = start; j <= i; j++) {
      const k = klines[j];
      const range = k.high - k.low;
      const clv = range === 0 ? 0 : ((k.close - k.low) - (k.high - k.close)) / range;
      mfvSum += clv * k.volume;
      volSum += k.volume;
    }
    cmf[i] = volSum === 0 ? 0 : mfvSum / volSum;
  }
  return cmf;
}

/**
 * 3-Bar Weighted Delta for High-Sensitivity Impulse Detection
 */
function calculateWeightedImpulse(values: number[]): number {
  const n = values.length;
  if (n < 3) return 0;
  const d0 = values[n - 1] - values[n - 2];
  const d1 = values[n - 2] - values[n - 3];
  return (d0 * 3 + d1 * 1.5) / 4.5;
}

function calculateStdev(data: number[]): number {
  if (data.length < 2) return 0;
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
}

/**
 * M&R v2 Binary Candle Logic
 */
function computeRegimes(closes: number[], fast: (number | null)[], slow: (number | null)[], anchor: (number | null)[]) {
  const regimes = new Array(closes.length).fill(0);
  let currentRegime = 0;

  for (let i = 0; i < closes.length; i++) {
    const c = closes[i];
    const f = fast[i];
    const s = slow[i];
    const a = anchor[i];

    if (f === null || s === null || a === null) {
      regimes[i] = 0;
      continue;
    }

    const priceAboveMvwap = c > a;
    const priceAboveFast = c > f;
    const priceAboveSlow = c > s;

    const strongBull = priceAboveMvwap && priceAboveFast && priceAboveSlow;
    const bullBias = priceAboveMvwap && priceAboveFast && !priceAboveSlow;
    const bearBias = !priceAboveMvwap && !priceAboveFast && priceAboveSlow;
    const strongBear = !priceAboveMvwap && !priceAboveFast && !priceAboveSlow;

    const bullStruct = strongBull || bullBias;
    const bearStruct = strongBear || bearBias;

    if (bullStruct) currentRegime = 1;
    else if (bearStruct) currentRegime = -1;

    regimes[i] = currentRegime;
  }
  return regimes;
}

/**
 * Swing HL Logic (Liquidity)
 */
function computeSwings(klines: Kline[], length: number = 14) {
  const resistance = new Array(klines.length).fill(null);
  const support = new Array(klines.length).fill(null);
  
  let currentRes = null;
  let currentSup = null;

  for (let i = length; i < klines.length - length; i++) {
    let isPH = true;
    for (let j = 1; j <= length; j++) {
      if (klines[i].high < klines[i-j].high || klines[i].high < klines[i+j].high) {
        isPH = false; break;
      }
    }
    if (isPH) currentRes = klines[i].high;

    let isPL = true;
    for (let j = 1; j <= length; j++) {
      if (klines[i].low > klines[i-j].low || klines[i].low > klines[i+j].low) {
        isPL = false; break;
      }
    }
    if (isPL) currentSup = klines[i].low;

    if (currentRes && klines[i].close > currentRes) currentRes = null;
    if (currentSup && klines[i].close < currentSup) currentSup = null;

    resistance[i] = currentRes;
    support[i] = currentSup;
  }
  return { resistance, support };
}

export function detectSignalsExact(klines: Kline[], rsi: (number | null)[], obv: number[], rsi_lb: number, obv_lb: number) {
  const n = klines.length;
  const signals = new Array(n).fill(0);
  
  const getHb = (data: (number | null)[], lb: number, idx: number) => {
    let bestVal = -Infinity; let bestIdx = 0;
    for (let j = 0; j < lb; j++) { 
      const val = data[idx - j];
      if (idx - j >= 0 && val !== null && val >= bestVal) { bestVal = val; bestIdx = j; } 
    }
    return bestIdx;
  };
  const getLb = (data: (number | null)[], lb: number, idx: number) => {
    let bestVal = Infinity; let bestIdx = 0;
    for (let j = 0; j < lb; j++) { 
      const val = data[idx - j];
      if (idx - j >= 0 && val !== null && val <= bestVal) { bestVal = val; bestIdx = j; } 
    }
    return bestIdx;
  };

  let run_max = 0, run_max_rsi = 0, run_min = 0, run_min_rsi = 0;
  let run_max_price_obv = 0, run_max_obv = 0, run_min_price_obv = 0, run_min_obv = 0;

  const max_history = new Array(n).fill(0);
  const min_history = new Array(n).fill(0);
  const max_price_obv_history = new Array(n).fill(0);
  const min_price_obv_history = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const close = klines[i].close;
    const rsi_val = rsi[i];
    const obv_val = obv[i];
    
    if (rsi_val === null) continue;

    const hb_rsi = getHb(rsi, rsi_lb, i);
    const lb_rsi = getLb(rsi, rsi_lb, i);
    const hb_obv = getHb(obv as (number | null)[], obv_lb, i);
    const lb_obv = getLb(obv as (number | null)[], obv_lb, i);

    if (hb_rsi === 0) { run_max = close; run_max_rsi = rsi_val; }
    if (lb_rsi === 0) { run_min = close; run_min_rsi = rsi_val; }
    if (hb_obv === 0) { run_max_price_obv = close; run_max_obv = obv_val; }
    if (lb_obv === 0) { run_min_price_obv = close; run_min_obv = obv_val; }

    if (close > run_max) run_max = close;
    if (rsi_val > run_max_rsi) run_max_rsi = rsi_val;
    if (close < run_min) run_min = close;
    if (rsi_val < run_min_rsi) run_min_rsi = rsi_val;
    if (close > run_max_price_obv) run_max_price_obv = close;
    if (obv_val > run_max_obv) run_max_obv = obv_val;
    if (close < run_min_price_obv) run_min_price_obv = close;
    if (obv_val < run_min_obv) run_min_obv = obv_val;

    max_history[i] = run_max;
    min_history[i] = run_min;
    max_price_obv_history[i] = run_max_price_obv;
    min_history[i] = run_min_price_obv;

    if (i > 2) {
      const prevRsi = rsi[i-1];
      if (prevRsi === null) continue;
      
      const divbear = (max_history[i-1] > max_history[i-2]) && (prevRsi < run_max_rsi) && (rsi_val <= prevRsi);
      const divbull = (min_history[i-1] < min_history[i-2]) && (prevRsi > run_min_rsi) && (rsi_val >= prevRsi);
      const divbear_obv = (max_price_obv_history[i-1] > max_price_obv_history[i-2]) && (obv[i-1] < run_max_obv) && (obv_val <= obv[i-1]);
      const divbull_obv = (min_price_obv_history[i-1] < min_price_obv_history[i-2]) && (obv[i-1] > run_min_obv) && (obv_val >= obv[i-1]);

      const both_bear = divbear && divbear_obv;
      const both_bull = divbull && divbull_obv;

      if (both_bear) signals[i] = -2;
      else if (divbear) signals[i] = -1;
      else if (both_bull) signals[i] = 2;
      else if (divbull) signals[i] = 1;
    }
  }
  return signals;
}

export function computeNWE(data: number[], h: number = 9, mult: number = 3) {
  const n = data.length;
  const upper: (number | null)[] = new Array(n).fill(null);
  const lower: (number | null)[] = new Array(n).fill(null);
  if (n < 50) return { upper, lower };
  const length = Math.min(500, n);
  const srcHist = data.slice(n - length, n).reverse();
  const nwe = new Array(length).fill(0);
  let saeTotal = 0;
  const getGaussWeight = (dist: number, hVal: number) => Math.exp(-(Math.pow(dist, 2) / (Math.pow(hVal, 2) * 2.0)));
  for (let i = 0; i < length; i++) {
    let sumW = 0, sumWeight = 0;
    for (let j = 0; j < length; j++) {
      const w = getGaussWeight(Math.abs(i - j), h);
      sumW += srcHist[j] * w;
      sumWeight += w;
    }
    const y2 = sumWeight === 0 ? srcHist[i] : sumW / sumWeight;
    nwe[i] = y2;
    saeTotal += Math.abs(srcHist[i] - y2);
  }
  const sae = (saeTotal / length) * mult;
  for (let i = 0; i < length; i++) {
    const barPos = n - 1 - i;
    upper[barPos] = nwe[i] + sae;
    lower[barPos] = nwe[i] - sae;
  }
  return { upper, lower };
}

function computeEFTrend(ef: (number | null)[], length: number = 5) {
  const highs = [];
  const lows = [];
  for (let i = length; i < ef.length - length; i++) {
    const val = ef[i];
    if (val === null) continue;
    
    let isH = true; let isL = true;
    for (let j = 1; j <= length; j++) {
      const nextVal = ef[i+j];
      const prevVal = ef[i-j];
      if (nextVal === null || prevVal === null) continue;
      
      if (val <= prevVal || val <= nextVal) isH = false;
      if (val >= prevVal || val >= nextVal) isL = false;
    }
    if (isH) highs.push({ idx: i, val: val });
    if (isL) lows.push({ idx: i, val: val });
  }
  return { highs, lows };
}

export function computeIndicators(klines: Kline[]) {
  if (klines.length < 100) return null;
  const closes = klines.map(k => k.close);
  const fast = calculateEMA(closes, 21);
  const slow = calculateEMA(closes, 50);
  const anchor = computeMVWAP(klines, 20);
  
  const rsi = calculateRSI(closes, 14);
  const obv = calculateOBV(klines);
  const flow = calculateCMF(klines, 20);
  
  const n = flow.length;
  const flowImpulses = new Array(n).fill(0);
  const anchorImpulses = new Array(n).fill(0);
  const efSlopeMetrics = new Array(n).fill(null);
  const anchorSlopeMetrics = new Array(n).fill(null);

  // Absolute Noise Floors
  const FLOW_ABS_THRESHOLD = 0.035;
  const ANCHOR_REL_THRESHOLD = 0.00005; // 0.005% change per bar for Anchor to be non-flat

  for (let i = 4; i < n; i++) {
    // Flow Impulse
    const flowSlice = flow.slice(i - 4, i + 1).map(v => v || 0);
    const flowV0 = calculateWeightedImpulse(flowSlice);
    const flowVPrev = i > 5 ? flowImpulses[i - 1] : flowV0;
    const flowAccel = flowV0 - flowVPrev;
    flowImpulses[i] = flowV0;
    
    // Anchor Impulse
    const anchorSlice = anchor.slice(i - 4, i + 1).map(v => v || 0);
    const anchorV0 = calculateWeightedImpulse(anchorSlice);
    anchorImpulses[i] = anchorV0;

    if (i >= 34) {
      // 1. EF Classification (Rocket / Electricity / ZzZ)
      const currentFlow = flow[i] || 0;
      const flowHistory = flowImpulses.slice(i - 29, i + 1);
      const flowStd = calculateStdev(flowHistory);
      const flowVSign = Math.sign(flowV0);
      const flowASign = Math.sign(flowAccel);
      const flowPosSign = Math.sign(currentFlow);
      const flowAbsV = Math.abs(flowV0);

      let flowRegime = 'FLAT';
      if (flowAbsV >= FLOW_ABS_THRESHOLD && flowAbsV >= 0.75 * flowStd) {
        const isExpanding = (flowVSign === flowPosSign);
        const isAccelerating = (flowVSign === flowASign);
        if (isExpanding && isAccelerating && flowAbsV > 1.5 * flowStd) {
          flowRegime = flowVSign > 0 ? 'ACCEL_UP' : 'ACCEL_DOWN';
        } else {
          flowRegime = flowVSign > 0 ? 'INFLECT_UP' : 'INFLECT_DOWN';
        }
      }
      efSlopeMetrics[i] = { slope: flowV0, accel: flowAccel, std: flowStd, regime: flowRegime };

      // 2. Anchor Classification (Rising / Falling / Flat)
      const currentAnchor = anchor[i] || 1;
      const anchorRelV = anchorV0 / currentAnchor;
      const anchorHistory = anchorImpulses.slice(i - 29, i + 1);
      const anchorStd = calculateStdev(anchorHistory);
      const anchorAbsV = Math.abs(anchorV0);

      let anchorRegime = 'FLAT';
      if (Math.abs(anchorRelV) > ANCHOR_REL_THRESHOLD && anchorAbsV > 0.5 * anchorStd) {
        anchorRegime = anchorV0 > 0 ? 'RISING' : 'FALLING';
      }
      anchorSlopeMetrics[i] = { slope: anchorV0, regime: anchorRegime };
    }
  }

  return {
    fast,
    slow,
    anchor,
    regimes: computeRegimes(closes, fast, slow, anchor),
    swings: computeSwings(klines, 14),
    range: computeNWE(closes, 9, 3),
    flow: flow,
    flowSlopeMetrics: efSlopeMetrics,
    anchorSlopeMetrics: anchorSlopeMetrics,
    flowTrend: computeEFTrend(flow, 8),
    signals: detectSignalsExact(klines, rsi, obv, 90, 40)
  };
}
