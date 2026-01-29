
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils.js";
import AnimatedBackground from "./AnimatedBackground.js";
import { CyberGlowButton } from "../App.js";

const systems = [
  {
    id: "momentum",
    label: "Momentum & Reversion",
    shortLabel: "M&R",
    coord: "0x01AA",
    meta: "CONTEXT_ENGINE: REGIME_DETECTION",
    boldDescription: "Defines the market regime and directional bias.",
    descriptions: [
      "Isolates the dominant trend direction by anchoring volume-weighted averages to key market cycles.",
      "Uses a simplified binary logic to distinguish between a healthy trend and a high-risk reversal."
    ],
    footer: "SYSTEM_PROCESS: ANCHORED_BIAS_VALIDATION",
    color: "#FFFFFF"
  },
  {
    id: "range",
    label: "Average Range",
    shortLabel: "Average Range",
    coord: "0x01BB",
    meta: "VOLATILITY_SCAN: THRESHOLD_MAPPING",
    boldDescription: "Defines price extension vs normal deviations.",
    descriptions: [
      "Calculates dynamic probability boundaries to define exhaustion zones and expansion targets.",
      "Identifies statistical extremes where price is likely to exhaust its current move and return to its average."
    ],
    footer: "SYSTEM_PROCESS: DEVIATION_EXTREME_DETECTION",
    color: "#FFFFFF"
  },
  {
    id: "signals",
    label: "Signals",
    shortLabel: "Signals",
    coord: "0x01CC",
    meta: "LOGIC_GATE: DIVERGENCE_SCAN",
    boldDescription: "Detects imbalances before expansion occurs.",
    descriptions: [
      "Highlights moments where momentum and volume diverge from price action.",
      "Filters out market noise to pinpoint the exact moments where internal strength is at odds with price."
    ],
    footer: "SYSTEM_PROCESS: MOMENTUM_VOLUME_CONFLUENCE",
    color: "#FFFFFF"
  },
  {
    id: "flow",
    label: "ebb + flow",
    shortLabel: "Flow",
    coord: "0x01DD",
    meta: "FLOW_ANALYSIS: PRESSURE_TRACKING",
    boldDescription: "Measures institutional pressure behind price action.",
    descriptions: [
      "Reveals whether buyers or sellers are in control, and when that control is shifting.",
      "Tracks the hidden momentum behind every candle to see if the big players are actually stepping in or stepping out."
    ],
    footer: "SYSTEM_PROCESS: INSTITUTIONAL_DELIVERY_CHECK",
    color: "#FFFFFF"
  }
];

const COLORS = {
  BULL_BLUE: "#38bdf8",
  BEAR_RED: "#ef4444",
  MVWAP_PURPLE: "#8A2BE2",
  EMA21_CYAN: "#B0E0E6",
  EMA50_GRAY: "#A9A9A9",
  RANGE_UPPER: "#ec4899",
  RANGE_LOWER: "#2dd4bf",
  SILVER: "#e2e8f0",
  SIGNAL_UP: "#22c55e",
  SIGNAL_DOWN: "#ef4444",
  EQUILIBRIUM: "#fbbf24",
};

export const MomentumChart = () => {
  const points = useMemo(() => {
    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
    return Array.from({ length: 65 }).map((_, i) => {
      const t = i / 64;
      const baseline = 500 + Math.sin(t * Math.PI) * 40;
      const transitionX = (t - 0.5) * 10; 
      const s = sigmoid(transitionX);
      const pAmplitude = 300;
      const pOffset = pAmplitude * (1 - 2 * s);
      const priceY = baseline + pOffset + (Math.random() * 14 - 7);
      const fastY = baseline + (pOffset * 0.45);
      const slowY = baseline + (pOffset * 0.75);
      const anchorY = slowY - 80 * (1 - 2 * s);
      return { priceY, anchorY, fastY, slowY, open: priceY + (Math.random() * 20 - 10), high: priceY - 25, low: priceY + 25, isBull: priceY < anchorY };
    });
  }, []);

  const step = 1000 / (points.length - 1);
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 50 1000 900" className="w-full h-full p-4" style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="bullRegime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.BULL_BLUE} stopOpacity="0.15" /><stop offset="100%" stopColor={COLORS.BULL_BLUE} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bearRegime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.BEAR_RED} stopOpacity="0.15" /><stop offset="100%" stopColor={COLORS.BEAR_RED} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d={`M ${points.map((p, i) => `${i * step},${p.priceY}`).join(' L ')} L ${[...points].reverse().map((p, i) => `${(points.length - 1 - i) * step},${p.anchorY}`).join(' L ')} Z`} fill={points[points.length-1].isBull ? "url(#bullRegime)" : "url(#bearRegime)"} />
          <path d={`M ${points.map((p, i) => `${i * step},${p.slowY}`).join(' L ')}`} fill="none" stroke={COLORS.EMA50_GRAY} strokeWidth="2.5" strokeOpacity="0.3" />
          <path d={`M ${points.map((p, i) => `${i * step},${p.fastY}`).join(' L ')}`} fill="none" stroke={COLORS.EMA21_CYAN} strokeWidth="3.5" strokeOpacity="0.5" />
          <motion.path d={`M ${points.map((p, i) => `${i * step},${p.anchorY}`).join(' L ')}`} fill="none" stroke={COLORS.MVWAP_PURPLE} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          {points.map((p, i) => {
            const x = i * step;
            const color = p.isBull ? COLORS.BULL_BLUE : COLORS.BEAR_RED;
            return (
              <g key={i}>
                <line x1={x} y1={p.high} x2={x} y2={p.low} stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
                <rect x={x - 3} y={Math.min(p.priceY, p.open) - 3} width="6" height={Math.max(8, Math.abs(p.priceY - p.open))} fill={color} />
              </g>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};

export const RangeChart = () => {
  const curveDensity = 95; 
  const points = useMemo(() => Array.from({ length: curveDensity }).map((_, i) => {
    const t = i / (curveDensity - 1);
    const drift = Math.sin(t * Math.PI * 2) * 45;
    const rangeHeight = (680 + drift) - (320 + drift);
    const rhythm = (Math.sin(t * Math.PI * 5.5 + 0.6) + 1) / 2;
    const priceY = (680 + drift) - ((0.25 + rhythm * 0.5) * rangeHeight);
    return { x: t * 1000, y: priceY, upperY: 320 + drift, lowerY: 680 + drift };
  }), []);

  const pricePath = useMemo(() => `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`, [points]);
  const upperPath = useMemo(() => `M ${points.map(p => `${p.x},${p.upperY}`).join(' L ')}`, [points]);
  const lowerPath = useMemo(() => `M ${points.map(p => `${p.x},${p.lowerY}`).join(' L ')}`, [points]);
  const cloudPath = useMemo(() => `${upperPath} L ${[...points].reverse().map(p => `${p.x},${p.lowerY}`).join(' L ')} Z`, [points, upperPath, lowerPath]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 200 1000 600" className="w-full h-full p-4">
        <defs>
          <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.path initial={{ opacity: 0, scaleY: 0.8 }} animate={{ opacity: 1, scaleY: 1 }} d={cloudPath} fill="url(#cloudGradient)" style={{ transformOrigin: 'center' }} />
          <path d={upperPath} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 6" />
          <path d={lowerPath} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 6" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: "easeInOut" }} d={pricePath} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
             {points.filter((_, i) => i % 10 === 0).map((p, i) => (
               <React.Fragment key={i}>
                 <circle cx={p.x} cy={p.upperY} r="7" fill={COLORS.RANGE_UPPER} stroke="#000" strokeWidth="1" />
                 <circle cx={p.x} cy={p.lowerY} r="7" fill={COLORS.RANGE_LOWER} stroke="#000" strokeWidth="1" />
               </React.Fragment>
             ))}
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};

export const FlowChart = () => {
  const points = useMemo(() => Array.from({ length: 70 }).map((_, i) => {
    const t = i / 69;
    const flowValue = (Math.sin(t * Math.PI * 4.5) + Math.sin(t * Math.PI * 9) * 0.3) * 300;
    const y = 500 - flowValue;
    return { x: t * 1000, y, flow: flowValue };
  }), []);

  const pathD = useMemo(() => `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`, [points]);
  const bullFill = useMemo(() => points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.flow > 0 ? p.y : 500}`).join(' ') + ` L 1000,500 L 0,500 Z`, [points]);
  const bearFill = useMemo(() => points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.flow < 0 ? p.y : 500}`).join(' ') + ` L 1000,500 L 0,500 Z`, [points]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 100 1000 800" className="w-full h-full p-4">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} d={bullFill} fill={COLORS.BULL_BLUE} />
          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} d={bearFill} fill={COLORS.BEAR_RED} />
          <line x1="0" y1="500" x2="1000" y2="500" stroke={COLORS.EQUILIBRIUM} strokeWidth="2.5" strokeOpacity="0.8" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: "easeInOut" }} d={pathD} fill="none" stroke="white" strokeWidth="2" />
        </motion.g>
      </svg>
    </div>
  );
};

export const SignalsChart = () => {
  const d = "M0,750 L300,600 L600,850 L900,450 L1200,250 L1450,900 L1750,800 L2000,950";
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 2000 1000" className="absolute inset-0 w-full h-full p-4">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} d={d} fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.8" strokeLinecap="round" />
          <rect x="570" y="900" width="60" height="60" fill={COLORS.SIGNAL_UP} transform="rotate(45 600 930)" stroke="#000" strokeWidth="4" />
          <rect x="1170" y="140" width="60" height="60" fill={COLORS.SIGNAL_DOWN} transform="rotate(45 1200 170)" stroke="#000" strokeWidth="4" />
        </motion.g>
      </svg>
    </div>
  );
};

const ChartDisplay = ({ type }: { type: string }) => {
  if (type === 'momentum') return <MomentumChart />;
  if (type === 'range') return <RangeChart />;
  if (type === 'flow') return <FlowChart />;
  return <SignalsChart />;
};

export default function EnvironmentsSection({ autoSimulate = false }: { autoSimulate?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSystem = systems[activeIndex];
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % systems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoSimulate]);

  const handleSelection = (idx: number) => {
    setActiveIndex(idx);
    if (window.innerWidth < 1024) {
      terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-[#050507] overflow-hidden border-t border-white/5 py-24 md:py-32">
      <AnimatedBackground />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="space-y-1 mb-8">
              <span className="font-mono text-[9px] text-white/20 tracking-tighter block">[0x0020]</span>
              <div className="flex items-center gap-4">
                 <div className="h-px w-6 bg-white/20" />
                 <span className="font-mono text-[10px] text-white tracking-widest uppercase font-bold bg-white/5 px-2 py-0.5 border border-white/10">
                    SYSTEM_ROOT: INDICATOR_TOOLKIT
                 </span>
              </div>
            </div>

            <h2 className="font-space-grotesk font-black text-4xl md:text-7xl text-white mb-8 leading-[0.9] tracking-tighter uppercase">
              CORE <br/> ELEMENTS.
            </h2>

            <p className="font-inter font-medium text-white/40 text-sm md:text-base leading-relaxed max-w-sm mb-16">
              A multi-layer analysis framework where each indicator defines a specific structural dimension of price action.
            </p>

            {/* Tactical Selection List */}
            <div className="space-y-3 w-full max-w-md">
              {systems.map((system, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={system.id}
                    onClick={() => handleSelection(idx)}
                    className={cn(
                      "w-full text-left p-5 md:p-6 border transition-all duration-500 rounded-sm flex items-center justify-between group",
                      isActive 
                        ? "bg-white/[0.04] border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.03)]" 
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">[{system.coord}] {system.label.toUpperCase()}</span>
                      <span className={cn(
                        "font-space-grotesk font-bold text-base md:text-lg transition-colors",
                        isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}>
                        {system.label}
                      </span>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full border transition-all duration-500",
                      isActive ? "bg-white shadow-[0_0_10px_white] scale-110" : "bg-transparent border-white/10 scale-90"
                    )} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Advanced Terminal Display */}
          <div className="lg:col-span-7 flex flex-col h-full scroll-mt-24" ref={terminalRef}>
            
            {/* MOBILE ONLY: Small Navigator (Sticky) */}
            <div className="lg:hidden sticky top-20 z-50 mb-4 bg-black/80 backdrop-blur-md border border-white/10 p-1 flex items-center justify-around rounded-sm shadow-xl overflow-x-auto scrollbar-hide">
              {systems.map((system, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button 
                    key={system.id}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "px-3 py-2 text-[9px] font-bold uppercase tracking-widest transition-all rounded-sm whitespace-nowrap",
                      isActive ? "bg-white text-black" : "text-white/40"
                    )}
                  >
                    {system.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="relative h-full flex flex-col bg-black border border-white/10 rounded-sm overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_120px_rgba(255,255,255,0.18)] group/terminal">
              
              {/* Terminal Header */}
              <div className="px-6 md:px-8 py-5 md:py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] md:text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">{activeSystem.meta}</span>
                  <h3 className="font-space-grotesk font-black text-xl md:text-3xl text-white tracking-tighter uppercase leading-none">{activeSystem.label}</h3>
                </div>
                <span className="font-space-grotesk font-black text-2xl md:text-5xl text-white/5 tracking-tighter pointer-events-none select-none">
                  {activeSystem.coord}
                </span>
              </div>

              {/* Terminal Body Content */}
              <div className="flex-1 p-6 md:p-10 flex flex-col space-y-6 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <h4 className="font-space-grotesk font-bold text-base md:text-xl text-white/90 tracking-tight">
                    {activeSystem.boldDescription}
                  </h4>
                  
                  <div className="space-y-3 md:space-y-4">
                    {activeSystem.descriptions.map((desc, i) => (
                      <div key={i} className="flex gap-4 group">
                        <span className="font-mono text-[10px] text-white/20 font-black mt-1 select-none">0{i+1}</span>
                        <p className="text-[12px] md:text-base text-white/50 leading-relaxed font-inter transition-colors group-hover:text-white/80">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated Chart Interaction Area */}
                <div className="flex-1 min-h-[320px] md:min-h-[400px] relative mt-2 md:mt-4 overflow-hidden border border-white/5 rounded-sm">
                   <div className="absolute inset-0 bg-[#08080A]/40 p-4 transition-all duration-500 group-hover/terminal:shadow-[0_0_100px_rgba(255,255,255,0.15)]">
                      {/* Technical HUD Grid lines */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 z-0" />
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-0" />
                      
                      <div className="relative w-full h-full z-10 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSystem.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full h-full"
                          >
                            <ChartDisplay type={activeSystem.id} />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                   </div>
                </div>
              </div>

              {/* Terminal Metadata Footer */}
              <div className="px-6 md:px-8 py-4 md:py-5 border-t border-white/5 flex items-center justify-between bg-white/[0.01] bg-black/40">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  <span className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">
                    {activeSystem.footer}
                  </span>
                </div>
                <span className="font-mono text-[8px] md:text-[9px] text-white/20 uppercase tracking-widest font-bold">
                  PROTOCOL V2.5.1
                </span>
              </div>
            </div>

            {/* Tactical Access Call - Centered with the Visual above */}
            <div className="mt-8 md:mt-12 flex justify-center">
               <CyberGlowButton 
                 label="GAIN ACCESS" 
                 variant="white"
                 glow={true}
                 onClick={() => window.open('https://whop.com/tradingindicatorsuite/trading-indicator-suite/', '_blank')}
                 statusLabel="SYS: LICENSE"
                 className="w-full max-w-sm"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
