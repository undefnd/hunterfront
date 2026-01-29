/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, Sparkles, Waves, ShieldCheck, Scale, Loader2, BrainCircuit, Zap, Activity, AlertTriangle, Microscope, ShieldAlert, Binary, CheckCircle2, XCircle, ChevronRight, Info, Activity as FlowIcon, ListChecks, ShieldCheck as RiskIcon, FileText, Database, X, ArrowUpRight, ArrowDownRight, Globe, Menu, TrendingUp, Coins, CornerDownLeft, RefreshCw, LayoutGrid, Radio, PanelRight, Fingerprint, BookmarkCheck, ThumbsUp, ThumbsDown, History, Save, Trash2, Edit3, Clipboard, Download, Upload, Boxes, Layers, Terminal, Timer, Bot } from 'lucide-react';
import { createChart, IChartApi, ISeriesApi, LineStyle, ColorType } from 'lightweight-charts';
import { cn } from './lib/utils.js';
import { fetchHistoricalData, subscribeToTicks, getTfMs, Kline, Timeframe } from './lib/marketData.js';
import { computeIndicators } from './lib/indicators.js';
import { GoogleGenAI, Type } from "@google/genai";
import { KNOWLEDGE_BASE } from './lib/knowledgeBase.js';
import { LAYER_CONFIG, createEmptyTimeframeData, LayerData, LayerType } from './types/timeframe.js';
import { useTimeframeAnalysis, computeLayerOutcome } from './hooks/useTimeframeAnalysis.js';
import { computeTimeframeNet } from './lib/analysisEngine.js';

const TIMEFRAMES: Timeframe[] = ['5m', '15m', '30m', '1h', '2h', '4h', '1d', '3d', '1w'];

const ASSET_PAIRS = [
  { symbol: 'BTCUSDT', label: 'BTC/USDT', desc: 'Bitcoin / Tether' },
  { symbol: 'ETHUSDT', label: 'ETH/USDT', desc: 'Ethereum / Tether' },
  { symbol: 'SOLUSDT', label: 'SOL/USDT', desc: 'Solana / Tether' },
  { symbol: 'BNBUSDT', label: 'BNB/USDT', desc: 'Binance Coin' },
  { symbol: 'XRPUSDT', label: 'XRP/USDT', desc: 'Ripple' },
  { symbol: 'ADAUSDT', label: 'ADA/USDT', desc: 'Cardano' },
  { symbol: 'AVAXUSDT', label: 'AVAX/USDT', desc: 'Avalanche' },
  { symbol: 'LINKUSDT', label: 'LINK/USDT', desc: 'Chainlink' },
  { symbol: 'DOTUSDT', label: 'DOT/USDT', desc: 'Polkadot' },
  { symbol: 'NEARUSDT', label: 'NEAR/USDT', desc: 'Near Protocol' },
  { symbol: 'HYPEUSDT', label: 'HYPE/USDT', desc: 'HYPE/USDT Perpetual Contract' },
];

// 27-TRIAD MATRIX DEFINITIONS
const TRIAD_LABELS: Record<string, string> = {
  "B/B/B": "ALIGNED BULLISH",
  "B/B/M": "BULLISH BIAS, DEGRADED CONFIRMATION",
  "B/B/S": "EARLY INFLECTION DOWN",
  "B/M/B": "RANGE DIGESTION (BULL)",
  "B/M/M": "UNCLEAR (Leans Bullish)",
  "B/M/S": "SECONDARY COUNTERFLOW",
  "B/S/B": "STRUCTURAL SPLIT",
  "B/S/M": "CONFLICTING STRUCTURE, NO EDGE",
  "B/S/S": "TREND LAGGING DOWN",
  "M/B/B": "SEQUENCE FORMING (BULL)",
  "M/B/M": "UNCLEAR (MTF Bullish Only)",
  "M/B/S": "PRIMARY COUNTERFLOW",
  "M/M/B": "UNCLEAR (LTF Bullish Only)",
  "M/M/M": "STRUCTURAL FRICTION",
  "M/M/S": "UNCLEAR (LTF Bearish Only)",
  "M/S/B": "UNCLEAR (Opposing Ends)",
  "M/S/M": "UNCLEAR (MTF Bearish Only)",
  "M/S/S": "SEQUENCE FORMING (BEAR)",
  "S/B/B": "TREND LAGGING UP",
  "S/B/M": "CONFLICTING STRUCTURE, NO EDGE",
  "S/B/S": "STRUCTURAL SPLIT (BEAR-LEANING)",
  "S/M/B": "UNCLEAR (Opposing Ends)",
  "S/M/M": "UNCLEAR (Leans Bearish)",
  "S/M/S": "RANGE DIGESTION (BEAR)",
  "S/S/B": "EARLY INFLECTION UP",
  "S/S/M": "BEARISH BIAS, DEGRADED CONFIRMATION",
  "S/S/S": "ALIGNED BEARISH"
};

const STANCE_MAP: Record<string, string> = {
  Bullish: 'B',
  Bearish: 'S',
  Mixed: 'M'
};

const getStanceFromRegime = (regime: number) => {
  if (regime === 1) return 'Bullish';
  if (regime === -1) return 'Bearish';
  return 'Mixed';
};

const COLORS = {
  BULL_BLUE: '#B0E0E6',
  BEAR_PINK: '#BA55D3',
  MVWAP_PURPLE: '#8A2BE2',
  EMA21_BLUE: '#B0E0E6',
  EMA50_GRAY: '#A9A9A9',
  SIGNAL_BULL: '#008000',
  SIGNAL_BEAR: '#DC143C',
  PASTEL_BULL: '#86b3ec',
  PASTEL_BEAR: '#e63055',
  RANGE_UPPER: 'rgba(199, 21, 133, 0.3)', 
  RANGE_LOWER: 'rgba(32, 178, 170, 0.3)', 
  EF_BULL: '#10b981',
  EF_BEAR: '#f43f5e',
  EQUILIBRIUM: 'rgba(251, 191, 36, 0.4)', 
  TREND_LINE: 'rgba(255, 255, 255, 0.3)',
  VOLUME_BULL: 'rgba(134, 179, 236, 0.35)', 
  VOLUME_BEAR: 'rgba(230, 48, 85, 0.35)' 
};

const SentinelStatusCluster = ({ state }: { state?: any }) => {
  const tfs = ['15m', '1h', '4h', '1d'] as const;
  
  const getDotStyles = (tone: string) => {
    let colorClass = 'bg-zinc-700';
    let shadow = '';
    if (tone === 'emerald') {
      colorClass = 'bg-emerald-500';
      shadow = 'shadow-[0_0_8px_rgba(16,185,129,0.5)]';
    } else if (tone === 'rose') {
      colorClass = 'bg-rose-500';
      shadow = 'shadow-[0_0_8px_rgba(244,63,94,0.5)]';
    } else if (tone === 'amber') {
      colorClass = 'bg-amber-500';
      shadow = 'shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    }

    return cn("w-2 h-2 rounded-full transition-all duration-700", colorClass, shadow);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2.5 items-center bg-white/[0.04] px-2.5 py-2 rounded-full border border-white/5">
        {tfs.map(tf => {
          const regime = state?.regimes?.[tf];
          return (
            <div key={tf} className={getDotStyles(regime)} title={`${tf} Regime`} />
          );
        })}
      </div>
      <div className="flex gap-2.5 items-center px-2.5">
        {tfs.map(tf => {
          const signal = state?.signals?.[tf];
          const hasSignal = signal !== 0 && signal !== undefined;

          return (
            <div key={tf} className="w-2 flex justify-center">
              {hasSignal ? (
                <div className={cn(
                  "text-[11px] font-black drop-shadow-[0_0_8px_currentColor] leading-none transition-all",
                  signal > 0 ? "text-emerald-400" : "text-rose-400"
                )}>
                  {Math.abs(signal) === 2 ? '◆' : '◇'}
                </div>
              ) : (
                <div className="w-1 h-1 rounded-full bg-white/5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ConsensusHUD = ({ indicators }: { indicators: any }) => {
  if (!indicators) return <div className="mt-4"><div className="h-1 bg-white/5 rounded-full" /></div>;
  
  const { price, anchor, upper, lower } = indicators;
  const arRange = upper - lower;
  
  const getArPos = (val: number) => arRange === 0 ? 50 : Math.min(100, Math.max(0, ((val - lower) / arRange) * 100));
  const priceArPos = getArPos(price);
  const anchorArPos = getArPos(anchor);

  return (
    <div className="flex flex-col gap-4 mt-4 w-full group">
      <div className="flex items-center gap-3">
        <span className="text-[7px] font-black text-white/40 uppercase w-4 tracking-tighter shrink-0">AR</span>
        <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full relative group-hover:bg-white/[0.08] transition-colors">
          <div className="absolute top-1/2 -translate-y-1/2 w-[1px] h-3 bg-purple-500/80 z-10" style={{ left: `${anchorArPos}%` }} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white] z-20 border border-black" style={{ left: `${priceArPos}%` }} />
          <div className="absolute -top-3 left-0 text-[5px] font-bold text-white/10">L</div>
          <div className="absolute -top-3 right-0 text-[5px] font-bold text-white/10">U</div>
        </div>
      </div>
    </div>
  );
};

const SignalDiamond = ({ signal, isCaution }: { signal: number, isCaution?: boolean }) => {
  if (signal === 0) {
    if (isCaution) return <span className="text-[14px] leading-none drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">⚠️</span>;
    return <div className="w-1.5 h-1.5 rounded-full bg-white/20" />;
  }
  const isTriple = Math.abs(signal) === 2;
  const isBull = signal > 0;
  
  return (
    <div className={cn(
      "flex items-center justify-center font-black text-[14px]",
      isBull ? "text-emerald-400" : "text-rose-400",
      "drop-shadow-[0_0_8px_currentColor]"
    )}>
      {isTriple ? '◆' : '◇'}
    </div>
  );
};

const DreamingZzZ = ({ scale = 1 }: { scale?: number }) => (
  <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
    <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute w-12 h-12 bg-white/20 blur-xl rounded-full" />
    <span className="text-2xl relative z-10 font-black text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">ZzZ</span>
    <AnimatePresence>
      {[0, 1, 2].map((i) => (
        <motion.span key={i} initial={{ opacity: 0, scale: 0.5, y: 0, x: 0 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 0.8], y: -40, x: Math.sin(i) * 15 }} transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }} className="absolute text-[10px] text-white/40 font-black">z</motion.span>
      ))}
    </AnimatePresence>
  </div>
);

const ElectricBolt = ({ scale = 1 }: { scale?: number }) => (
  <div className="relative flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
    <motion.div animate={{ opacity: [0.2, 0.7, 0.3, 0.9, 0.1], scale: [1, 1.15, 0.95, 1.1, 1] }} transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }} className="absolute w-12 h-12 bg-amber-400/30 blur-xl rounded-full" />
    <motion.div animate={{ x: [-1, 1, -1, 0], y: [1, -1, 0, 1] }} transition={{ duration: 0.05, repeat: Infinity }}>
      <span className="text-2xl relative z-10 text-amber-400 drop-shadow-[0_0_15px_#f59e0b]">⚡</span>
    </motion.div>
  </div>
);

const ThrustingRocket = ({ inverted = false, scale = 1 }: { inverted?: boolean, scale?: number }) => (
  <div className={cn("relative flex items-center justify-center", inverted && "rotate-180 scale-x-[-1]")} style={{ transform: `scale(${scale})` }}>
    <motion.div animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute w-14 h-14 bg-orange-500/30 blur-2xl rounded-full" />
    <motion.div animate={{ x: [-1.5, 1.5], y: [1, -1] }} transition={{ duration: 0.08, repeat: Infinity, repeatType: "mirror" }}>
      <span className="text-3xl relative z-10 drop-shadow-[0_0_20px_#f97316]">🚀</span>
    </motion.div>
    <AnimatePresence>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 1, y: 15 }} animate={{ opacity: [0, 0.8, 0], scale: [1, 0.2], y: 45 }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} className="absolute w-2 h-2 rounded-full bg-orange-500 blur-[2px]" />
      ))}
    </AnimatePresence>
  </div>
);

/**
 * Text formatter to handle mixed case and singular highlights
 */
const formatAiText = (text: string, forceVerdictColor: string | null = null) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      if (forceVerdictColor) return <strong key={i} className={cn("font-black tracking-tighter", forceVerdictColor)}>{content}</strong>;
      return (
        <strong 
          key={i} 
          className="font-black text-white bg-white/10 px-1.5 py-0.5 rounded-[2px] border border-white/20 inline-block align-baseline leading-none mx-[2px] shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all hover:bg-white/20"
        >
          {content}
        </strong>
      );
    }
    return part;
  });
};

const TacticalCard = ({ label, strategy, tone }: { label: string, strategy: any, tone: 'bull' | 'bear' }) => {
  if (!strategy) return null;
  const isBull = tone === 'bull';
  return (
    <div className={cn(
      "p-5 border rounded-sm space-y-4 bg-white/[0.02] shadow-xl",
      isBull ? "border-emerald-500/20" : "border-rose-500/20"
    )}>
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <span className={cn("text-[10px] font-black uppercase tracking-widest", isBull ? "text-emerald-400" : "text-rose-400")}>
          {label}
        </span>
        <span className="text-[8px] text-white/20 font-mono uppercase tracking-widest">{strategy.conviction}</span>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Ideal Entry</span>
            <span className="text-[13px] font-black text-white tabular-nums tracking-wider">${strategy.idealEntry?.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Realistic</span>
            <span className="text-[13px] font-black text-zinc-400 tabular-nums tracking-wider">${strategy.realisticEntry?.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[8px] text-rose-500/60 uppercase font-black tracking-[0.2em]">Invalidation</span>
            <div className="h-px flex-1 mx-4 bg-rose-500/10" />
            <span className="text-[13px] font-black text-rose-500 tabular-nums tracking-wider">${strategy.stop?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 bg-black/20 p-3 rounded-sm">
        {/* Increased font size for strategy rationale summary */}
        <p className="text-[12px] text-white/40 leading-relaxed font-inter italic tracking-tight">{formatAiText(strategy.rationale)}</p>
      </div>
    </div>
  );
};

const DeptSection = ({ title, icon, data, color = "text-primary" }: { title: string, icon: React.ReactNode, data: any, color?: string }) => {
  if (!data) return null;
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 pb-2 border-b border-white/10 shrink-0">
        <div className={cn("shrink-0", color)}>{icon}</div>
        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      <div className="flex-1 space-y-4">
        <ul className="space-y-3">
          {data.points?.map((p: string, i: number) => (
            <li key={i} className="flex gap-3 items-start">
              <span className={cn("text-[10px] font-black mt-0.5 shrink-0", color)}>{i + 1}.</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-inter font-medium">{formatAiText(p)}</p>
            </li>
          ))}
        </ul>
        {/* Summary moved right below the points with increased font size */}
        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm">
          <p className="text-[11px] text-white/40 font-inter italic leading-relaxed tracking-tight">{formatAiText(data.summary)}</p>
        </div>
      </div>
    </div>
  );
};

function MetricCard({ title, icon, children }: { title: string; icon: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4 space-y-3 shadow-xl">
      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
        <div className="text-white/40 shrink-0">{icon}</div>
        <h3 className="text-[9px] font-black text-white uppercase tracking-0.3em truncate">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function MiniMetric({ label, value, color = "text-white/60" }: { label: string, value: any, color?: string }) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold">
      <span className="text-white/20 uppercase tracking-widest mr-2 shrink-0">{label}</span>
      <span className={cn("tabular-nums text-right break-all", color)}>{typeof value === 'number' ? value.toFixed(2) : value}</span>
    </div>
  );
}

function InteractiveChart({ klines, indicators }: { klines: Kline[], indicators: any }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const priceChartRef = useRef<IChartApi | null>(null);
  const efChartRef = useRef<IChartApi | null>(null);
  
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const anchorFillRef = useRef<ISeriesApi<"Area"> | null>(null);
  const anchorLineRef = useRef<ISeriesApi<"Line"> | null>(null);
  const fastRef = useRef<ISeriesApi<"Line"> | null>(null);
  const slowRef = useRef<ISeriesApi<"Line"> | null>(null);
  const upperARRef = useRef<ISeriesApi<"Line"> | null>(null);
  const lowerARRef = useRef<ISeriesApi<"Line"> | null>(null);
  const efBaselineRef = useRef<ISeriesApi<"Baseline"> | null>(null);
  const zeroLineRef = useRef<ISeriesApi<"Line"> | null>(null);
  const efResTrendRef = useRef<ISeriesApi<"Line"> | null>(null);
  const efSupTrendRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const priceChart = createChart(chartContainerRef.current.children[0] as HTMLElement, {
      layout: { background: { type: ColorType.Solid, color: '#050507' }, textColor: '#8A8A8E', fontFamily: 'JetBrains Mono, monospace' },
      grid: { vertLines: { color: 'rgba(255, 255, 255, 0.02)' }, horzLines: { color: 'rgba(255, 255, 255, 0.02)' } },
      rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.08)', autoScale: true },
      timeScale: { visible: false }, 
    });
    const efChart = createChart(chartContainerRef.current.children[1] as HTMLElement, {
      layout: { background: { type: ColorType.Solid, color: '#050507' }, textColor: '#8A8A8E', fontFamily: 'JetBrains Mono, monospace' },
      grid: { vertLines: { color: 'rgba(255, 255, 255, 0.02)' }, horzLines: { color: 'rgba(255, 255, 255, 0.02)' } },
      rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.08)', autoScale: true },
      timeScale: { borderColor: 'rgba(255, 255, 255, 0.08)', timeVisible: true },
    });
    priceChart.timeScale().subscribeVisibleLogicalRangeChange(range => efChart.timeScale().setVisibleLogicalRange(range!));
    efChart.timeScale().subscribeVisibleLogicalRangeChange(range => priceChart.timeScale().setVisibleLogicalRange(range!));
    
    const candleSeries = (priceChart as any).addCandlestickSeries({ borderVisible: false });
    const volumeSeries = (priceChart as any).addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: 'volume' });
    priceChart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
    const anchorFill = (priceChart as any).addAreaSeries({ topColor: 'rgba(138, 43, 226, 0.15)', bottomColor: 'rgba(138, 43, 226, 0)', lineColor: COLORS.MVWAP_PURPLE, lineWidth: 0, priceLineVisible: false });
    const upperAR = (priceChart as any).addLineSeries({ color: COLORS.RANGE_UPPER, lineWidth: 2, lineStyle: LineStyle.Solid, priceLineVisible: false });
    const lowerAR = (priceChart as any).addLineSeries({ color: COLORS.RANGE_LOWER, lineWidth: 2, lineStyle: LineStyle.Solid, priceLineVisible: false });
    const anchorLine = (priceChart as any).addLineSeries({ color: COLORS.MVWAP_PURPLE, lineWidth: 2, priceLineVisible: false });
    const fast = (priceChart as any).addLineSeries({ color: COLORS.EMA21_BLUE, lineWidth: 1, priceLineVisible: false });
    const slow = (priceChart as any).addLineSeries({ color: COLORS.EMA50_GRAY, lineWidth: 1, priceLineVisible: false });
    const efBaseline = (efChart as any).addBaselineSeries({ baseValue: { type: 'price', price: 0 }, topLineColor: COLORS.EF_BULL, topFillColor1: 'rgba(16, 185, 129, 0.3)', topFillColor2: 'rgba(16, 185, 129, 0.05)', bottomLineColor: COLORS.EF_BEAR, bottomFillColor1: 'rgba(244, 63, 94, 0.05)', bottomFillColor2: 'rgba(244, 63, 94, 0.3)', lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
    const zeroLine = (efChart as any).addLineSeries({ color: COLORS.EQUILIBRIUM, lineWidth: 1, lineStyle: LineStyle.Solid, priceLineVisible: false, lastValueVisible: false });
    const efResTrend = (efChart as any).addLineSeries({ color: COLORS.TREND_LINE, lineWidth: 1, lineStyle: LineStyle.Dashed, priceLineVisible: false });
    const efSupTrend = (efChart as any).addLineSeries({ color: COLORS.TREND_LINE, lineWidth: 1, lineStyle: LineStyle.Dashed, priceLineVisible: false });

    priceChartRef.current = priceChart; efChartRef.current = efChart; candleSeriesRef.current = candleSeries; volumeSeriesRef.current = volumeSeries; anchorFillRef.current = anchorFill; anchorLineRef.current = anchorLine; fastRef.current = fast; slowRef.current = slow; upperARRef.current = upperAR; lowerARRef.current = lowerAR; efBaselineRef.current = efBaseline; zeroLineRef.current = zeroLine; efResTrendRef.current = efResTrend; efSupTrendRef.current = efSupTrend;

    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || !priceChartRef.current || !efChartRef.current) return;
      const { width, height } = entries[0].contentRect;
      priceChartRef.current.applyOptions({ width, height: height * 0.7 });
      efChartRef.current.applyOptions({ width, height: height * 0.3 });
    });
    resizeObserver.observe(chartContainerRef.current);
    return () => { resizeObserver.disconnect(); priceChart.remove(); efChart.remove(); };
  }, []);

  useEffect(() => {
    if (!candleSeriesRef.current || !klines || klines.length === 0) return;
    const times = klines.map(k => (k.time / 1000) as any);
    if (indicators) {
      const candleData = klines.map((k, i) => {
        const regime = indicators.regimes[i];
        const color = regime === 1 ? COLORS.PASTEL_BULL : regime === -1 ? COLORS.PASTEL_BEAR : (k.close >= k.open ? COLORS.BULL_BLUE : COLORS.BEAR_PINK);
        return { time: times[i], open: k.open, high: k.high, low: k.low, close: k.close, color: color, wickColor: color, borderColor: color };
      });
      candleSeriesRef.current.setData(candleData);
      const volumeData = klines.map((k, i) => {
        const isUp = k.close >= k.open;
        const color = isUp ? COLORS.PASTEL_BULL : COLORS.PASTEL_BEAR;
        const r = parseInt(color.slice(1, 3), 16); const g = parseInt(color.slice(3, 5), 16); const b = parseInt(color.slice(5, 7), 16);
        return { time: times[i], value: k.volume, color: `rgba(${r}, ${g}, ${b}, 0.35)` };
      });
      volumeSeriesRef.current?.setData(volumeData);
      const mapLine = (arr: number[]) => (arr || []).map((val, i) => ({ time: times[i], value: val })).filter(d => d.value !== null);
      anchorFillRef.current?.setData(mapLine(indicators.anchor)); anchorLineRef.current?.setData(mapLine(indicators.anchor)); fastRef.current?.setData(mapLine(indicators.fast)); slowRef.current?.setData(mapLine(indicators.slow)); upperARRef.current?.setData(mapLine(indicators.range.upper)); lowerARRef.current?.setData(mapLine(indicators.range.lower)); efBaselineRef.current?.setData(mapLine(indicators.flow)); zeroLineRef.current?.setData(times.map(t => ({ time: t, value: 0 })));
      const lastHighs = indicators.flowTrend.highs.slice(-2); if (lastHighs.length === 2) efResTrendRef.current?.setData([{ time: times[lastHighs[0].idx], value: lastHighs[0].val }, { time: times[lastHighs[1].idx], value: lastHighs[1].val }]);
      const lastLows = indicators.flowTrend.lows.slice(-2); if (lastLows.length === 2) efSupTrendRef.current?.setData([{ time: times[lastLows[0].idx], value: lastLows[0].val }, { time: times[lastLows[1].idx], value: lastLows[1].val }]);
      const markers = indicators.signals.map((s: number, i: number) => {
        if (s === 0) return null;
        const isTriple = Math.abs(s) === 2;
        return { time: times[i], position: s > 0 ? 'belowBar' : 'aboveBar', color: s > 0 ? COLORS.SIGNAL_BULL : COLORS.SIGNAL_BEAR, shape: 'diamond', text: isTriple ? '◆' : '◇', size: isTriple ? 1 : 0 };
      }).filter(Boolean);
      
      (candleSeriesRef.current as any).setMarkers(markers);
      (efBaselineRef.current as any)?.setMarkers(markers);
    }
  }, [klines, indicators]);

  return (
    <div ref={chartContainerRef} className="absolute inset-0 w-full h-full flex flex-col">
       <div className="flex-1 w-full" />
       <div className="h-[30%] w-full border-t border-white/5 relative">
         <div className="absolute top-2 left-4 z-20 flex items-center gap-2">
            <FlowIcon size={10} className="text-white/40" />
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">ebb + flow (EF)</span>
         </div>
       </div>
    </div>
  );
}

const ConsensusCell: React.FC<{ timeframe: string; layer: string; indicators: any; onSelect: (tf: Timeframe, data: any) => void }> = ({ timeframe, layer, indicators, onSelect }) => {
  const getSignature = () => {
    if (!indicators) return 'REG:? / AR:? / S:◇';
    const reg = indicators.regime === 1 ? 'M' : indicators.regime === -1 ? 'R' : 'N';
    const arSigSize = indicators.upper - indicators.lower;
    const relPos = arSigSize === 0 ? 50 : ((indicators.price - indicators.lower) / arSigSize) * 100;
    let arSig = 'M';
    if (relPos > 90) arSig = 'U';
    else if (relPos < 10) arSig = 'L';
    const sSig = indicators.signal !== 0 ? '◆' : '◇';
    return `REG:${reg} / AR:${arSig} / S:${sSig}`;
  };

  const stance = indicators ? (indicators.regime === 1 ? 'Bullish' : indicators.regime === -1 ? 'Bearish' : 'Mixed') : 'Mixed';
  
  const auraStyles = useMemo(() => {
    if (!indicators || !indicators.flow) return { boxShadow: 'none' };
    const intensity = Math.abs(indicators.flow); 
    const spread = Math.min(15, intensity * 60); 
    const opacity = Math.min(0.25, intensity * 0.8);
    const color = stance === 'Bullish' ? `rgba(16,185,129,${opacity})` : stance === 'Bearish' ? `rgba(244,63,94,${opacity})` : 'transparent';
    return { boxShadow: `0 0 ${spread}px ${color}` };
  }, [indicators, stance]);

  const isCaution = useMemo(() => {
    if (!indicators) return false;
    return Math.abs(indicators.flow) <= 0.02;
  }, [indicators, stance]);

  const momentumEmoji = useMemo(() => {
    if (!indicators?.slopeMetrics) return "";
    const { regime } = indicators.slopeMetrics;
    if (regime === 'ACCEL_UP') return "🚀";
    if (regime === 'ACCEL_DOWN') return "📉";
    if (regime === 'INFLECT_UP' || regime === 'INFLECT_DOWN') return "⚡";
    return "💤";
  }, [indicators]);

  return (
    <div 
      onClick={() => indicators && onSelect(timeframe as Timeframe, indicators)}
      style={auraStyles}
      className={cn(
        "bg-white/[0.03] border border-white/10 p-5 rounded-sm flex flex-col group hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer shadow-lg active:scale-[0.98]"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-black text-white transition-colors uppercase tracking-widest leading-none">
              {timeframe.toUpperCase()}
            </span>
            <SignalDiamond signal={indicators?.signal || 0} isCaution={isCaution} />
          </div>
          <span className="text-[10px] font-bold text-white/30 group-hover:text-primary transition-colors font-mono tracking-tighter">{getSignature()}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[18px] opacity-80 group-hover:opacity-100 transition-opacity">
            {momentumEmoji}
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-sm border font-black text-[10px] tracking-[0.2em] shadow-sm",
            stance === 'Bullish' ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400" :
            stance === 'Bearish' ? "bg-rose-500/15 border-rose-500/40 text-rose-400" :
            "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
          )}>
            {stance === 'Bullish' ? 'BULL' : stance === 'Bearish' ? 'BEAR' : 'NEUT'}
          </div>
        </div>
      </div>
      
      <ConsensusHUD indicators={indicators} />
    </div>
  );
};

const ConsensusLayer: React.FC<{ layer: string; title: string; subtitle: string; scannerData: Record<string, any>; onSelect: (tf: Timeframe, data: any) => void }> = ({ layer, title, subtitle, scannerData, onSelect }) => {
  const config = LAYER_CONFIG[layer as keyof typeof LAYER_CONFIG];
  
  const outcomeData = useMemo(() => {
    const tfs = config.timeframes.map(tf => tf.toLowerCase());
    const activeTfs = tfs.map(tf => scannerData[tf]).filter(Boolean);
    
    if (activeTfs.length < config.timeframes.length) return { label: "CALIBRATING...", tone: 'neutral' };
    
    const triadPermutation = activeTfs.slice(0, 3).map(tf => STANCE_MAP[getStanceFromRegime(tf.regime)]).join('/');
    const outcomeLabel = TRIAD_LABELS[triadPermutation] || triadPermutation;
    
    let tone: 'bull' | 'bear' | 'caution' | 'neutral' = 'neutral';
    if (outcomeLabel.includes('BULL') || outcomeLabel.includes('UP')) tone = 'bull';
    else if (outcomeLabel.includes('BEAR') || outcomeLabel.includes('DOWN')) tone = 'bear';
    else if (outcomeLabel.includes('UNCLEAR') || outcomeLabel.includes('CONFLICTING')) tone = 'caution';

    return { label: outcomeLabel, tone };
  }, [scannerData, config]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 border-l-4 border-white/20 pl-4 py-1">
        <h4 className="text-[14px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em]">{subtitle}</p>
        <span className={cn(
          "text-[9px] font-black uppercase tracking-widest mt-1 min-h-[1em] drop-shadow-[0_0_8px_currentColor]",
          outcomeData.tone === 'bull' ? "text-emerald-400" :
          outcomeData.tone === 'bear' ? "text-rose-400" :
          outcomeData.tone === 'caution' ? "text-amber-400" : "text-white/40"
        )}>
          OUTCOME: {outcomeData.label.toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3">
         {config.timeframes.map((tf) => (
           <ConsensusCell key={tf} timeframe={tf} layer={layer} indicators={scannerData[tf.toLowerCase()]} onSelect={onSelect} />
         ))}
      </div>
    </div>
  );
}

export default function DashboardPage({ onBack, onSwitchView, activeView }: { onBack: () => void; onSwitchView: (v: 'analysis' | 'dashboard') => void; activeView: string }) {
  const [selectedTicker, setSelectedTicker] = useState('BTCUSDT');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(window.innerWidth >= 1280);
  const [selectedTf, setSelectedTf] = useState<Timeframe>('1h');
  const [tickerPrices, setTickerPrices] = useState<Record<string, number>>({});
  const [klines, setKlines] = useState<Kline[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannerData, setScannerData] = useState<Record<string, any>>({});
  
  const [sentinelPulse, setSentinelPulse] = useState<Record<string, { 
    regimes: Record<string, string>,
    signals: Record<string, number>,
    ar1h_label: string,
    flow15m: string
  }>>({});

  const { state: workbenchState } = useTimeframeAnalysis();
  const [aiReports, setAiReports] = useState<Record<string, any>>({});

  const activeAsset = useMemo(() => ASSET_PAIRS.find(a => a.symbol === selectedTicker) || ASSET_PAIRS[0], [selectedTicker]);
  const activeReport = useMemo(() => aiReports[`${selectedTicker}-${selectedTf}`], [aiReports, selectedTicker, selectedTf]);

  const runFullMarketScan = async (ticker: string) => {
    if (scanning) return;
    setScanning(true);
    const tfs: Timeframe[] = ['1w', '3d', '1d', '4h', '2h', '1h', '30m', '15m', '5m'];
    for (const tf of tfs) {
      try {
        const data = await fetchHistoricalData(ticker, tf, 200);
        if (data && data.length > 100) {
          const indicators = computeIndicators(data);
          if (indicators) {
            const last = data.length - 1;
            setScannerData(prev => ({
              ...prev,
              [tf.toLowerCase()]: {
                price: data[last].close,
                regime: indicators.regimes[last],
                upper: indicators.range.upper[last],
                lower: indicators.range.lower[last],
                signal: indicators.signals[last],
                anchor: indicators.anchor[last],
                flow: indicators.flow[last],
                fast: indicators.fast[last],
                slow: indicators.slow[last],
                slopeMetrics: indicators.flowSlopeMetrics[last],
                anchorSlopeMetrics: indicators.anchorSlopeMetrics[last],
                flowTrend: indicators.flowTrend
              }
            }));
          }
        }
      } catch (e) { console.warn(`Scan failed for ${tf}`); }
    }
    setScanning(false);
  };

  useEffect(() => {
    let isMounted = true;
    const runSentinelScan = async () => {
      while (isMounted) {
        for (const asset of ASSET_PAIRS) {
          if (!isMounted) break;
          
          const sentinelTfs = ['15m', '1h', '4h', '1d'] as const;
          const pulse: any = { regimes: {}, signals: {}, ar1h_label: 'MID', flow15m: 'FLAT' };
          
          for (const tf of sentinelTfs) {
            try {
              const data = await fetchHistoricalData(asset.symbol, tf as Timeframe, 150);
              if (data && data.length > 50) {
                const indicators = computeIndicators(data);
                if (indicators) {
                  const lastIdx = data.length - 1;
                  const regime = indicators.regimes[lastIdx];
                  pulse.regimes[tf] = regime === 1 ? 'emerald' : regime === -1 ? 'rose' : 'amber';
                  
                  const signalLast = indicators.signals[lastIdx];
                  const signalPrev = indicators.signals[lastIdx - 1];
                  pulse.signals[tf] = signalLast !== 0 ? signalLast : (signalPrev !== 0 ? signalPrev : 0);

                  if (tf === '1h') {
                    const price = data[lastIdx].close;
                    const upper = indicators.range.upper[lastIdx];
                    const lower = indicators.range.lower[lastIdx];
                    const range = (upper || 0) - (lower || 0);
                    const pos = range === 0 ? 50 : ((price - (lower || 0)) / range) * 100;
                    if (pos >= 97) pulse.ar1h_label = 'TOUCH_U';
                    else if (pos <= 3) pulse.ar1h_label = 'TOUCH_L';
                  }

                  if (tf === '15m') {
                    pulse.flow15m = indicators.flowSlopeMetrics[lastIdx]?.regime || 'FLAT';
                  }
                }
              }
            } catch (e) {}
          }
          
          if (isMounted) setSentinelPulse(prev => ({ ...prev, [asset.symbol]: pulse }));
          await new Promise(r => setTimeout(r, 600)); 
        }
        await new Promise(r => setTimeout(r, 30000)); 
      }
    };

    runSentinelScan();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => { runFullMarketScan(selectedTicker); }, [selectedTicker]);

  useEffect(() => {
    const interval = setInterval(() => {
      runFullMarketScan(selectedTicker);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedTicker]);

  const loadMarketData = async (ticker: string, tf: Timeframe) => {
    setLoading(true);
    try {
      const data = await fetchHistoricalData(ticker, tf, 500); 
      if (data && data.length > 0) setKlines(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { loadMarketData(selectedTicker, selectedTf); }, [selectedTf, selectedTicker]);

  useEffect(() => {
    const unsub = subscribeToTicks(selectedTicker, (tick) => {
      setTickerPrices(prev => ({ ...prev, [selectedTicker]: tick.price }));
      setKlines(prev => {
        if (!prev || prev.length === 0) return prev;
        const last = prev[prev.length - 1]; const tfMs = getTfMs(selectedTf); const candleStart = Math.floor(tick.time / tfMs) * tfMs;
        if (last.time === candleStart) {
          const updated = [...prev]; updated[updated.length - 1] = { ...last, close: tick.price, high: Math.max(last.high, tick.price), low: Math.min(last.low, tick.price) }; return updated;
        } else if (tick.time > last.time + tfMs) {
          return [...prev.slice(1), { time: candleStart, open: tick.price, high: tick.price, low: tick.price, close: tick.price, volume: tick.volume }];
        }
        return prev;
      });
    });
    return () => unsub();
  }, [selectedTf, selectedTicker]);

  const indicators = useMemo(() => klines.length > 0 ? computeIndicators(klines) : null, [klines]);
  
  const currentValues = useMemo(() => {
    if (!indicators || !klines || klines.length === 0) return null;
    const last = klines.length - 1;
    const price = klines[last].close;
    const anchor = indicators.anchor[last];
    const upper = indicators.range.upper[last];
    const lower = indicators.range.lower[last];
    const currentFlow = indicators.flow[last];
    const slopeMetrics = indicators.flowSlopeMetrics[last];
    const anchorMetrics = indicators.anchorSlopeMetrics[last];

    const recentSignalsList = (indicators.signals || []).slice(Math.max(0, last - 5), last + 1)
      .map((s: number, i: number, arr: number[]) => {
        const barIdx = last - (arr.length - 1 - i);
        if (s === 0) return null;
        return `Bar-${last - barIdx}: ${s > 0 ? 'BULL' : 'BEAR'}${Math.abs(s) === 2 ? '_TRIPLE' : '_DIV'}`;
      })
      .filter(Boolean);
    const recentSignals = recentSignalsList.length > 0 ? recentSignalsList.join(', ') : 'NONE';

    const arSize = (upper || 0) - (lower || 0);
    const relPos = arSize === 0 ? 50 : ((price - (lower || 0)) / arSize) * 100;
    
    let arLocationLabel = "Mid Range";
    let arLocationColor = "text-sky-400";
    if (relPos > 100) { arLocationLabel = "Upper Stretching"; arLocationColor = "text-amber-400"; }
    else if (relPos >= 97) { arLocationLabel = "Touching Upper Boundary"; arLocationColor = "text-amber-400"; }
    else if (relPos >= 70) { arLocationLabel = "Upper Zone"; arLocationColor = "text-sky-400"; }
    else if (relPos >= 30) { arLocationLabel = "Mid Range"; arLocationColor = "text-sky-400"; }
    else if (relPos >= 3) { arLocationLabel = "Lower Zone"; arLocationColor = "text-sky-400"; }
    else if (relPos >= 0) { arLocationLabel = "Touching Lower Boundary"; arLocationColor = "text-amber-400"; }
    else { arLocationLabel = "Lower Stretching"; arLocationColor = "text-amber-400"; }

    const distToAnchor = anchor ? ((price / anchor) - 1) * 100 : 0;
    const distToAnchorDiscrete = anchor ? Math.abs(price - anchor) : 0;
    
    let dominanceStatus = "Flat / Neutral";
    if (currentFlow < -0.15) dominanceStatus = "Heavy Institutional Distribution";
    else if (currentFlow < -0.05) dominanceStatus = "Institutional Distribution";
    else if (currentFlow > 0.15) dominanceStatus = "Heavy Institutional Accumulation";
    else if (currentFlow > 0.05) dominanceStatus = "Institutional Accumulation";

    let flowTrendStr = "Flat / Dormant";
    let momentumSymbol = 'zzz';
    if (slopeMetrics) {
      const { regime } = slopeMetrics;
      if (regime === 'ACCEL_UP') { flowTrendStr = "Strong Upward Expansion"; momentumSymbol = 'rocket'; }
      else if (regime === 'ACCEL_DOWN') { flowTrendStr = "Strong Downward Expansion"; momentumSymbol = 'rocket-inverted'; }
      else if (regime === 'INFLECT_UP') { flowTrendStr = "Impulse Rising"; momentumSymbol = 'bolt'; }
      else if (regime === 'INFLECT_DOWN') { flowTrendStr = "Impulse Falling"; momentumSymbol = 'bolt'; }
    }

    return { 
      price, anchor, relPos, arLocationLabel, arLocationColor, distToAnchor, distToAnchorDiscrete, arSize, 
      flow: currentFlow, flowMomentum: momentumSymbol,
      dominanceStatus, flowTrendStr, regime: indicators.regimes[last],
      signal: indicators.signals[last],
      fast: indicators.fast[last], slow: indicators.slow[last],
      upper: upper || 0, lower: lower || 0,
      slopeMetrics,
      anchorMomentum: anchorMetrics?.regime || 'FLAT',
      recentSignals
    };
  }, [klines, indicators]);

  const runAIAnalysis = async (ticker?: string, tf?: Timeframe, overrideValues?: any) => {
    const activeTf = tf || selectedTf;
    const activeTicker = ticker || selectedTicker;
    const activeVals = overrideValues || currentValues;
    if (!activeVals || analyzing) return;
    
    setAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const telemetryString = `
        ASSET: ${activeTicker} | TIMEFRAME: ${activeTf}
        DATA: ${JSON.stringify(activeVals)}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `
          Persona: You are the HUNTER MASTER MENTOR. You simplify the complex and explain logic with pedagogical clarity.
          
          DIRECTIVE: 
          - Provide deep narrative context and extensive technical reasoning. 
          - IMPORTANT: Body text MUST be in Sentence Case. Avoid all-caps blocks.
          - CRITICAL: Highlight exactly ONE key actionable phrase (2-4 words) per bullet point using **double asterisks**.
          - CRITICAL: In the executionVerdict 'context' field and strategies 'rationale' field, you MUST highlight exactly ONE core actionable insight with **double asterisks**.
          - Synthesize the relationship between institutional flow and structural topology into a cohesive 'story' of current market mechanics.

          CRITICAL TACTICAL EXECUTION RULES:
          1. SHORT SIDE (BEAR SIDE):
             - **Ideal Entry** (Sniper): Calculated strictly at the Upper AR Boundary (Price Extreme).
             - **Realistic Entry** (Confirmation): Calculated near or slightly above the Anchor (MVWAP).
             - **Invalidation**: Anchor reclaim and bounce.
          2. LONG SIDE (BULL SIDE):
             - **Ideal & Realistic Entries**: Both must be conditional on a Firm Anchor Reclaim (Close Above).
             - **Invalidation**: Calculated strictly just below the Anchor.

          INTELLECTUAL PROPERTY OBFUSCATION RULES:
          - Refer to the 21 EMA strictly as the "Fast Line".
          - Refer to the 50 EMA strictly as the "Slow Line".
          - Refer to the MVWAP strictly as the "Anchor" or "Equilibrium Gravity".
          - Refer to Gaussian Envelopes strictly as "AR Topology" or "Average Range".

          ESTABLISH THREE DISTINCT PILLARS OF ANALYSIS:
          1. DIRECTOR THESIS: A robust narrative explaining the current "Why". Factor in the tension between Regime stability and Topology volatility.
          2. QUANTITATIVE ANALYSIS: Detailed breakdown of the "How Much". Reference distances and momentum vectors explicitly.
          3. RISK PROFILE: Comprehensive scenario mapping of "What If". Use descriptive IF-THEN logic to define systemic failure points.

          Context: ${activeTicker} on ${activeTf}.
          KnowledgeBase: ${JSON.stringify(KNOWLEDGE_BASE)}
          Telemetry: ${telemetryString}
          
          REQUIRED_JSON_SCHEMA: {
            director: { points: string[], summary: string },
            quant: { points: string[], summary: string },
            risk: { points: string[], summary: string },
            executionVerdict: { command: string, context: string, conviction: string },
            strategies: { 
               long: { idealEntry: number, realisticEntry: number, stop: number, tp1: number, tp2: number, conviction: string, rationale: string },
               short: { idealEntry: number, realisticEntry: number, stop: number, tp1: number, tp2: number, conviction: string, rationale: string }
            }
          }
        `,
        config: { temperature: 0.1, responseMimeType: "application/json" }
      });
      const report = JSON.parse(response.text);
      setAiReports(prev => ({ ...prev, [`${activeTicker}-${activeTf}`]: report }));
    } catch (err) { console.error(err); } finally { setAnalyzing(false); }
  };

  const handleSidebarTfClick = (tf: Timeframe, indicators: any) => {
    setSelectedTf(tf);
    
    const arSigSize = indicators.upper - indicators.lower;
    const relPos = arSigSize === 0 ? 50 : ((indicators.price - indicators.lower) / arSigSize) * 100;
    let arLoc = "Mid Range";
    if (relPos > 100) arLoc = "Upper Stretching";
    else if (relPos >= 97) arLoc = "Touching Upper Boundary";
    else if (relPos >= 70) arLoc = "Upper Zone";
    else if (relPos >= 30) arLoc = "Mid Range";
    else if (relPos >= 3) arLoc = "Lower Zone";
    else if (relPos >= 0) arLoc = "Touching Lower Boundary";
    else arLoc = "Lower Stretching";

    const vals = {
      ...indicators,
      arLocationLabel: arLoc,
      distToAnchor: indicators.anchor ? ((indicators.price / indicators.anchor) - 1) * 100 : 0,
      flowTrendStr: "Scanning...",
      anchorMomentum: indicators.anchorSlopeMetrics?.regime || 'FLAT',
      recentSignals: "Bar-0: " + (indicators.signal !== 0 ? (indicators.signal > 0 ? 'BULL' : 'BEAR') : 'NONE')
    };
    runAIAnalysis(selectedTicker, tf, vals);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    if (window.innerWidth < 1280) setIsRightSidebarOpen(false);
  };

  const getVerdictStyles = (command?: string) => {
    const cmd = (command || "").toUpperCase();
    if (cmd.includes('LONG') || cmd.includes('BUY') || cmd.includes('ACCUMULATE') || cmd.includes('CONTINUATION')) return { text: "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]", border: "border-l-emerald-500", bg: "bg-emerald-500/5" };
    if (cmd.includes('SHORT') || cmd.includes('SELL') || cmd.includes('DISTRIBUTE') || cmd.includes('FADE') || cmd.includes('ANTICIPATION')) return { text: "text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]", border: "border-l-rose-500", bg: "bg-rose-500/5" };
    return { text: "text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]", border: "border-l-amber-500", bg: "bg-amber-500/5" };
  };

  const getAnchorMomColor = (mom: string) => {
    if (mom === 'RISING') return 'text-emerald-400';
    if (mom === 'FALLING') return 'text-rose-400';
    return 'text-white/40';
  };

  return (
    <div className="h-screen bg-[#050507] text-foreground flex flex-col font-mono overflow-hidden">
      <header className="h-14 border-b border-white/10 px-4 md:px-6 flex items-center justify-between bg-black/80 backdrop-blur-xl shrink-0 z-[100]">
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors"><ArrowLeft size={18} /></button>
          <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-md p-1">
             <button onClick={() => onSwitchView('analysis')} className={cn("w-8 h-7 md:w-10 md:h-8 flex items-center justify-center rounded transition-all", activeView === 'analysis' ? "bg-white text-black" : "text-white/40 hover:text-white")}><Target size={14} /></button>
             <button onClick={() => onSwitchView('dashboard')} className={cn("w-8 h-7 md:w-10 md:h-8 flex items-center justify-center rounded transition-all", activeView === 'dashboard' ? "bg-white text-black" : "text-white/40 hover:text-white")}><Waves size={14} /></button>
          </div>
          <div className="h-6 w-px bg-white/10 mx-1 hidden xs:block" />
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={cn("p-1.5 transition-colors rounded hover:bg-white/5", isSidebarOpen ? "text-primary bg-white/5" : "text-white/40 hover:text-white")}><Menu size={18} /></button>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10 text-white font-bold tracking-widest text-[10px] md:text-[12px] uppercase">
            {activeAsset.desc}
          </div>
          
          <div className="text-[12px] md:text-[15px] font-black text-white tabular-nums tracking-widest bg-white/5 px-2 md:px-3 py-1 rounded border border-white/10 sm:ml-[-8px]">
            ${(tickerPrices[selectedTicker] || (klines.length > 0 ? klines[klines.length-1].close : 0))?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} className={cn("p-1.5 transition-colors rounded hover:bg-white/5", isRightSidebarOpen ? "text-primary bg-white/5" : "text-white/40 hover:text-white")}><PanelRight size={18} /></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-[110] lg:hidden backdrop-blur-sm"
              />
              <motion.aside 
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                className="fixed lg:relative top-0 left-0 bottom-0 w-[280px] border-r border-white/10 flex flex-col bg-zinc-950 lg:bg-zinc-950/40 backdrop-blur-xl shrink-0 overflow-hidden z-[120] h-full"
              >
                <div className="p-6 border-b border-white/10 w-[280px] flex justify-between items-center">
                  <div className="flex flex-col gap-0 leading-none">
                    <span className="text-[11px] text-white font-bold tracking-[0.2em] uppercase block flex items-center gap-2 leading-tight"><Globe size={10} className="text-primary" /> Scanner</span>
                    <span className="text-[8px] text-white/20 uppercase tracking-widest font-mono leading-tight mt-1">confluence_broadcast_v2</span>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white"><X size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-hide w-[280px] py-4 px-6 space-y-2">
                  {ASSET_PAIRS.map(asset => {
                    const pulse = sentinelPulse[asset.symbol];
                    const regimes = pulse?.regimes ? Object.values(pulse.regimes) : [];
                    const allAligned = regimes.length === 4 && regimes.every(r => r !== 'amber' && r === regimes[0]);
                    const isArTouching = pulse && (pulse.ar1h_label === 'TOUCH_U' || pulse.ar1h_label === 'TOUCH_L');
                    
                    const isAligned = allAligned || isArTouching;
                    const glowClass = isAligned ? "shadow-[0_0_20px_rgba(245,158,11,0.35)] border-amber-500/60 bg-amber-500/[0.05]" : "bg-white/[0.02] border-white/5";

                    return (
                      <button 
                        key={asset.symbol} 
                        onClick={() => { setSelectedTicker(asset.symbol); if(window.innerWidth < 1024) setIsSidebarOpen(false); }} 
                        className={cn(
                          "w-full px-4 py-4 text-left transition-all rounded-sm flex items-center justify-between border group relative",
                          selectedTicker === asset.symbol ? "bg-white/10 border-white/30 text-white" : cn("text-white/40 hover:text-white/80", glowClass)
                        )}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black uppercase tracking-widest leading-none group-hover:text-primary transition-colors">{asset.label}</span>
                            {isArTouching && (
                              <span className="text-[7px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded-sm tracking-tighter animate-pulse">
                                1H_{pulse.ar1h_label}
                              </span>
                            )}
                          </div>
                          <SentinelStatusCluster state={pulse} />
                        </div>
                        
                        <div className="flex items-center gap-3">
                           {pulse && (
                              <div className="opacity-60 group-hover:opacity-100 transition-opacity flex flex-col items-center">
                                <div className="scale-75 mb-1">
                                  {pulse.flow15m === 'ACCEL_UP' && <ThrustingRocket scale={1.2} />}
                                  {pulse.flow15m === 'ACCEL_DOWN' && <ThrustingRocket inverted scale={1.2} />}
                                  {(pulse.flow15m === 'INFLECT_UP' || pulse.flow15m === 'INFLECT_DOWN') && <ElectricBolt scale={1.2} />}
                                  {pulse.flow15m === 'FLAT' && <DreamingZzZ scale={0.7} />}
                                </div>
                              </div>
                           )}
                           {selectedTicker === asset.symbol && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="p-6 border-t border-white/10 w-[280px] space-y-4">
                   <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm">
                      <p className="text-[8px] text-primary/60 font-black uppercase leading-relaxed">System monitoring top 20 tickers for structural alignment.</p>
                   </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#08080A]">
          <div className="p-4 md:p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="M&R REGIME BIAS" icon={<Zap size={14}/>}>
                <div className="space-y-4">
                  <MiniMetric label="STATUS" value={currentValues?.regime === 1 ? 'BULLISH' : 'BEARISH'} color={currentValues?.regime === 1 ? "text-emerald-400" : "text-rose-400"} />
                  <div className="grid grid-cols-1 gap-1 border-y border-white/5 py-4">
                    <MiniMetric 
                      label="TO ANCHOR" 
                      value={currentValues ? `${currentValues.price < currentValues.anchor ? '+' : '-'}${Math.abs(currentValues.distToAnchor).toFixed(2)}%` : '---'} 
                      color={currentValues ? (currentValues.price < currentValues.anchor ? "text-emerald-400" : "text-rose-400") : "text-white/60"} 
                    />
                    <MiniMetric label="ANCHOR PRICE" value={currentValues?.anchor} color="text-purple-500" />
                    <MiniMetric label="MOMENTUM" value={currentValues?.anchorMomentum || 'FLAT'} color={getAnchorMomColor(currentValues?.anchorMomentum || 'FLAT')} />
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="AR POSITION" icon={<Waves size={14}/>}>
                <div className="space-y-4">
                  <MiniMetric label="LOCATION" value={currentValues?.arLocationLabel || '---'} color={currentValues?.arLocationColor || "text-sky-400"} />
                  <div className="grid grid-cols-1 gap-1 border-y border-white/5 py-4">
                    <MiniMetric label="AR SIZE" value={currentValues ? `$${currentValues.arSize.toFixed(2)}` : '---'} color="text-white/40" />
                    <MiniMetric label="TO UPPER" value={currentValues ? `${currentValues.price ? (((currentValues.upper/currentValues.price)-1)*100).toFixed(2) : '0.00'}%` : '---'} color="text-emerald-500" />
                    <MiniMetric label="TO LOWER" value={currentValues ? `${currentValues.price ? (((currentValues.lower/currentValues.price)-1)*100).toFixed(2) : '0.00'}%` : '---'} color="text-rose-500" />
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="SIGNALS" icon={<Target size={14}/>}>
                <div className="space-y-4">
                    <div className="flex justify-between items-center h-10 px-3 bg-white/[0.03] border border-white/5 rounded-sm">
                      <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Marker</span>
                      <span className={cn("text-[11px] font-black", currentValues?.signal > 0 ? "text-emerald-400" : currentValues?.signal < 0 ? "text-rose-400" : "text-white/20")}>{currentValues?.signal !== 0 ? (Math.abs(currentValues?.signal) === 2 ? '◆ TRIPLE' : '◇ DIV') : 'NONE'}</span>
                    </div>
                </div>
              </MetricCard>

              <MetricCard title="INSTITUTIONAL PRESSURE" icon={<Scale size={14}/>}>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={cn("text-xl font-black tabular-nums", currentValues?.flow > 0 ? "text-emerald-400" : currentValues?.flow < 0 ? "text-rose-400" : "text-white/60")}>{currentValues?.flow?.toFixed(3)}</span>
                      <div className="h-10 w-10 flex items-center justify-center scale-75 md:scale-100">
                        {currentValues?.flowMomentum === 'zzz' && <DreamingZzZ />}
                        {currentValues?.flowMomentum === 'bolt' && <ElectricBolt />}
                        {currentValues?.flowMomentum === 'rocket' && <ThrustingRocket />}
                        {currentValues?.flowMomentum === 'rocket-inverted' && <ThrustingRocket inverted />}
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-3 space-y-1">
                      <MiniMetric label="DOMINANCE" value={currentValues?.dominanceStatus} color="text-white/60" />
                      <MiniMetric label="MOMENTUM" value={currentValues?.flowTrendStr} color="text-sky-400" />
                    </div>
                </div>
              </MetricCard>
            </div>

            <div className="bg-black border border-white/10 rounded-sm h-[400px] md:h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4"><Loader2 size={32} className="text-primary animate-spin" /><span className="text-[10px] font-bold text-white tracking-[0.4em] uppercase">Connecting to Stream...</span></div>
                </div>
              ) : <InteractiveChart klines={klines} indicators={indicators} />}
              <div className="absolute top-4 left-4 flex items-center gap-1 md:gap-2 z-30 flex-wrap max-w-[95%]">
                {TIMEFRAMES.map(tf => (
                  <button key={tf} onClick={() => setSelectedTf(tf)} className={cn("px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest border transition-all", selectedTf === tf ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white")}>{tf}</button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/30 font-black tracking-[0.4em] uppercase">MENTOR_UPLINK</span>
                  <h3 className="text-lg font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">Intelligence Feedback {analyzing && "(SCANNING...)"}</h3>
                </div>
                <button onClick={() => runAIAnalysis()} disabled={analyzing || !currentValues} className={cn("px-4 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all w-full sm:w-auto", analyzing ? "bg-white/5 text-white/20 cursor-not-allowed" : "bg-primary text-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]")}>
                  {analyzing ? <Loader2 size={12} className="animate-spin" /> : <BrainCircuit size={12} />}
                  {analyzing ? 'ANALYZING...' : 'RUN_INTEL'}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeReport ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="xl:col-span-4 space-y-6">
                       <div className={cn("p-6 rounded-sm border-l-4 space-y-4 shadow-2xl backdrop-blur-md", getVerdictStyles(activeReport.executionVerdict?.command).bg, getVerdictStyles(activeReport.executionVerdict?.command).border)}>
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">EXECUTION_COMMAND</span>
                            <span className="text-[9px] font-black text-white/30 uppercase font-mono tracking-widest">{activeReport.executionVerdict?.conviction || "MEDIUM"}</span>
                          </div>
                          <h4 className={cn("text-xl md:text-2xl font-space-grotesk font-black uppercase tracking-tighter", getVerdictStyles(activeReport.executionVerdict?.command).text)}>{activeReport.executionVerdict?.command || "AWAITING_VERDICT"}</h4>
                          {/* Increased font size for execution verdict context summary */}
                          <p className="text-[12px] font-inter text-white/70 italic leading-relaxed">{formatAiText(activeReport.executionVerdict?.context || "")}</p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                         <TacticalCard label="BULL_SIDE" strategy={activeReport.strategies?.long} tone="bull" />
                         <TacticalCard label="BEAR_SIDE" strategy={activeReport.strategies?.short} tone="bear" />
                       </div>
                    </div>
                    <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <DeptSection title="Director Thesis" icon={<Bot size={14}/>} data={activeReport.director} />
                      <DeptSection title="Quantitative Analysis" icon={<Binary size={14}/>} data={activeReport.quant} color="text-sky-400" />
                      <DeptSection title="Risk Profile" icon={<RiskIcon size={14}/>} data={activeReport.risk} color="text-amber-400" />
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-20 border border-white/5 border-dashed rounded-sm flex flex-col items-center justify-center opacity-20 text-center space-y-4">
                    {analyzing ? <Loader2 size={48} className="animate-spin text-primary" /> : <ShieldAlert size={48} strokeWidth={1} />}
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">{analyzing ? "running analysis..." : "Awaiting Intelligence Directive"}</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {isRightSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsRightSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-[110] lg:hidden backdrop-blur-sm"
              />
              <motion.aside 
                initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                className="fixed lg:relative top-0 right-0 bottom-0 w-[320px] border-l border-white/10 flex flex-col bg-zinc-950 lg:bg-zinc-950/40 backdrop-blur-xl shrink-0 overflow-hidden z-[120] h-full"
              >
                <div className="w-[320px] flex flex-col h-full">
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/30 font-black tracking-[0.4em] uppercase">MONITOR_ROOT</span>
                      <h3 className="text-xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">SYSTEM_STATE</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => runFullMarketScan(selectedTicker)}
                        disabled={scanning}
                        className={cn(
                          "p-2 rounded-full transition-all border border-white/10",
                          scanning ? "bg-white/5 opacity-50 cursor-not-allowed" : "bg-white/5 hover:bg-white/10 hover:border-white/30"
                        )}
                      >
                        <RefreshCw size={16} className={cn("text-white/60", scanning && "animate-spin")} />
                      </button>
                      <button onClick={() => setIsRightSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white"><X size={16} /></button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-10">
                    <ConsensusLayer layer="layer1" title="Horizon" subtitle="Macro Environment" scannerData={scannerData} onSelect={handleSidebarTfClick} />
                    <ConsensusLayer layer="layer2" title="Tactical" subtitle="Weekly/Daily Environment" scannerData={scannerData} onSelect={handleSidebarTfClick} />
                    <ConsensusLayer layer="layer3" title="Execution" subtitle="Intraday Environment" scannerData={scannerData} onSelect={handleSidebarTfClick} />
                  </div>
                  
                  <div className="p-6 border-t border-white/10 bg-black/40">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                          <span>TIMEFRAME CONFLUENCE</span>
                          <span className="text-primary flex items-center gap-1.5"><Terminal size={10} /> Live Sync</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-primary/60" />
                        </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
