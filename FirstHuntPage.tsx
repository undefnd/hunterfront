/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Target, 
  Waves, 
  Activity, 
  Zap, 
  Info, 
  ShieldCheck, 
  Monitor, 
  Binary, 
  BrainCircuit, 
  LayoutGrid, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Database,
  Terminal,
  RefreshCw,
  Edit3,
  ShieldAlert,
  Scale,
  Zap as BoltIcon,
  Activity as FlowIcon,
  Globe,
  PanelRight,
  ChevronDown,
  Circle,
  Triangle,
  LineChart
} from 'lucide-react';
import { cn } from './lib/utils.js';
import AnimatedBackground from './components/AnimatedBackground.js';

interface BranchStep {
  id: string;
  label: string;
  title: string;
  content: React.ReactNode;
  coord: string;
}

const PerspectiveViewport: React.FC<{ children: React.ReactNode, title: string, subtitle?: string, className?: string }> = ({ children, title, subtitle = "UPLINK_DASHBOARD_LIVE", className }) => (
  <div className={cn("w-full flex flex-col bg-zinc-950 border border-white/10 rounded-sm overflow-hidden shadow-2xl relative", className)}>
    <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02] relative z-20">
      <div className="flex items-center gap-3">
        <Monitor size={12} className="text-primary" />
        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">SPEC: {title}</span>
      </div>
      <span className="text-[7px] font-mono text-white/20">{subtitle}</span>
    </div>
    <div className="flex-1 relative flex items-center justify-center p-4 bg-[#050507] overflow-hidden">
       <div className="relative z-10 w-full flex items-center justify-center h-full">
        {children}
       </div>
       {/* UI Grid Decoration */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
    </div>
  </div>
);

const MetricBox = ({ label, value, colorClass = "text-white" }: { label: string, value: string, colorClass?: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[8px] text-white/30 font-black uppercase tracking-widest">{label}</span>
    <span className={cn("text-xs font-bold tabular-nums tracking-wider", colorClass)}>{value}</span>
  </div>
);

const TacticalMiniCard = ({ label, ideal, realistic, inval, colorClass }: { label: string, ideal: string, realistic: string, inval: string, colorClass: string }) => (
  <div className={cn("p-4 bg-zinc-900/60 border border-white/5 rounded-sm space-y-3 w-full", colorClass.includes('emerald') ? 'bg-emerald-500/[0.02]' : 'bg-rose-500/[0.02]')}>
    <span className={cn("text-[8px] font-black uppercase tracking-widest", colorClass)}>[ {label} ]</span>
    <div className="grid grid-cols-2 gap-4">
      <MetricBox label="IDEAL" value={ideal} colorClass={colorClass} />
      <MetricBox label="REALISTIC" value={realistic} colorClass="text-zinc-400" />
    </div>
    <div className="pt-2 border-t border-white/5">
      <MetricBox label="INVAL" value={inval} colorClass="text-rose-500" />
    </div>
  </div>
);

// Simplified Momentum Icons for Guide
const GuideZzZ = () => (
  <div className="text-white/20 font-black text-[10px] tracking-tighter">ZzZ</div>
);

const GuideBolt = () => (
  <BoltIcon size={12} className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
);

const GuideRocket = ({ inverted = false }: { inverted?: boolean }) => (
  <div className={cn("text-lg", inverted && "rotate-180 scale-x-[-1]")}>🚀</div>
);

const MockARSlider = ({ pricePos = 40, anchorPos = 65 }: { pricePos?: number, anchorPos?: number }) => (
  <div className="flex flex-col gap-4 w-full group pt-2">
    <div className="flex items-center gap-3">
      <span className="text-[7px] font-black text-white/40 uppercase w-4 tracking-tighter shrink-0">AR</span>
      <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-[1px] h-3 bg-purple-500/80 z-10" style={{ left: `${anchorPos}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white] z-20 border border-black" style={{ left: `${pricePos}%` }} />
        <div className="absolute -top-3 left-0 text-[5px] font-bold text-white/10">L</div>
        <div className="absolute -top-3 right-0 text-[5px] font-bold text-white/10">U</div>
      </div>
    </div>
  </div>
);

export default function FirstHuntPage({ onBack, onEnterDashboard }: { onBack: () => void, onEnterDashboard: () => void }) {
  const [activeStepId, setActiveStepId] = useState('core-four');
  const [hoveredFeedbackId, setHoveredFeedbackId] = useState<string | null>(null);

  const steps: BranchStep[] = [
    {
      id: 'core-four',
      label: '01',
      coord: '0x00FF',
      title: 'A. KEY DATA INSIGHTS.',
      content: (
        <div className="space-y-12">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-inter max-w-4xl">
              The Hunter Analysis Terminal is a <span className="text-white font-bold">multi-layer intelligence</span> hub designed to <span className="text-white font-bold">process</span> price data into high-conviction and actionable strategies.
            </p>
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-sm">
              <p className="text-xs text-white/60 font-inter leading-relaxed uppercase tracking-tight">
                <span className="text-primary font-black">SYSTEM OVERVIEW:</span> Key Data Insights serve as the heartbeat of the terminal. By monitoring these four departmental metrics in real-time, the system can identify the structural health of a move before it enters an execution phase.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Zap className="text-purple-500" />, 
                label: 'M&R REGIME BIAS', 
                metrics: [
                  { label: 'STATUS', ctx: 'Identifies if the current regime is expansionary or corrective.' },
                  { label: 'TO ANCHOR', ctx: 'Measures proximity to the 20-bar mean to find value entries.' },
                  { label: 'ANCHOR MOMENTUM', ctx: 'Tracks if the equilibrium center is rising or falling.' }
                ],
                desc: 'Defines the structural regime relative to the Anchor equilibrium center.'
              },
              { 
                icon: <Waves className="text-sky-400" />, 
                label: 'AR POSITION', 
                metrics: [
                  { label: 'LOCATION', ctx: 'Maps current position within the Gaussian probability cloud.' },
                  { label: 'AR SIZE', ctx: 'Gauges current volatility intensity and range expansion potential.' },
                  { label: 'TO UPPER/LOWER', ctx: 'Mathematical distance to statistical floor/ceiling targets.' }
                ],
                desc: 'Maps topology using Gaussian envelopes to detect mathematical overextensions.'
              },
              { 
                icon: <Target className="text-primary" />, 
                label: 'SIGNALS', 
                metrics: [
                  { label: 'MARKER', ctx: 'Binary conviction filter (Hollow/Filled) for mismatch detection.' },
                  { label: '5-BAR HISTORY', ctx: 'Identifies if structure is flipping or in a mature trend.' }
                ],
                desc: 'Forensic markers indicating hidden momentum and volume mismatches.'
              },
              { 
                icon: <Scale className="text-emerald-500" />, 
                label: 'INSTITUTIONAL PRESSURE', 
                metrics: [
                  { label: 'EF DOMINANCE', ctx: 'Confirms if professional size is buying the bid or hitting ask.' },
                  { label: 'EF MOMENTUM', ctx: 'Predicts imminent expansion via impulse velocity vectors.' }
                ],
                desc: 'Tracks volume-weighted inflow and delivery intensity (EF).'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-sm space-y-5 group hover:border-white/20 transition-all flex flex-col h-full shadow-lg">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="text-right">
                    <span className="text-[7px] font-mono text-white/20 block uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">INSIGHT_0{i+1}</span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <h4 className="text-[12px] font-black text-white uppercase tracking-[0.1em] leading-tight">{item.label}</h4>
                  
                  <div className="space-y-4">
                    {item.metrics.map(m => (
                      <div key={m.label} className="space-y-1">
                        <span className="text-[8px] font-mono font-bold text-primary/60 uppercase tracking-widest block">{m.label}:</span>
                        <p className="text-[10px] text-white/30 font-inter leading-relaxed uppercase">{m.ctx}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                   <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" />
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest font-black">MODULE: ACTIVE</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'left-column',
      label: '02',
      coord: '0x01AA',
      title: 'B. SENTINEL SCANNER.',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight leading-none">The Broadcast Console</h3>
              <p className="text-[12px] text-white/50 leading-relaxed font-inter">
                The scanner monitors your entire watchlist simultaneously, identifying structural confluence and high-probability deviations across the global market.
              </p>
            </div>
            
            <div className="space-y-3">
              {/* Card 1: Sentinel Cluster */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Globe size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Structural Alignment</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Real-time status monitoring of trend regimes across four key timeframes (15m, 1h, 4h, 1d). Green/Red indicators reveal global trend harmony.
                      </p>
                    </div>
                </div>
              </div>

              {/* Card 2: AR Topology Alerts */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Waves size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">AR Topology Alerts</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Automated triggers flag when price hits its statistical floor or ceiling on the 1H timeframe. Critical for identifying extreme value sweeps.
                      </p>
                    </div>
                </div>
              </div>

              {/* Card 3: Momentum Pulse */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Zap size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-2 flex-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Institutional Velocity</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Visual tracking of professional volume pressure. These icons update per asset to show impulse acceleration or dormant flow states.
                      </p>
                      {/* Visual Key */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-sm justify-center">
                           <GuideZzZ />
                           <span className="text-[7px] text-white/40 font-black">FLAT</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-sm justify-center">
                           <GuideBolt />
                           <span className="text-[7px] text-white/40 font-black">PULSE</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-sm justify-center">
                           <GuideRocket />
                           <span className="text-[7px] text-white/40 font-black">THRUST</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <PerspectiveViewport title="Sentinel Scanner" subtitle="LEFT_COLUMN_COMPONENT" className="min-h-[400px]">
              <div className="w-72 border border-white/10 bg-zinc-950/90 rounded-sm flex flex-col shadow-2xl overflow-hidden">
                 <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] text-white font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-1"><Globe size={10} className="text-primary" /> Scanner</span>
                      <span className="text-[7px] text-white/20 uppercase tracking-widest font-mono">confluence_broadcast_v2</span>
                    </div>
                    <PanelRight size={14} className="text-white/20" />
                 </div>
                 <div className="flex-1 p-4 space-y-2 bg-[#050507]">
                    {[
                      { pair: 'BTC/USDT', dots: ['bg-emerald-500', 'bg-emerald-500', 'bg-emerald-500', 'bg-emerald-500'], emoji: <GuideRocket />, active: true, ar: 'TOUCH_U' },
                      { pair: 'ETH/USDT', dots: ['bg-rose-500', 'bg-rose-500', 'bg-zinc-700', 'bg-zinc-700'], emoji: <GuideBolt />, active: false, ar: 'TOUCH_L' },
                      { pair: 'SOL/USDT', dots: ['bg-zinc-700', 'bg-zinc-700', 'bg-zinc-700', 'bg-zinc-700'], emoji: <GuideZzZ />, active: false, ar: null }
                    ].map((item, i) => (
                      <div key={item.pair} className={cn("p-4 rounded-sm border flex flex-col gap-3 transition-all", item.active ? "bg-white/10 border-white/40" : "bg-white/[0.02] border-white/5 opacity-50")}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.pair}</span>
                             {item.ar && <span className="text-[6px] font-black bg-amber-500 text-black px-1 py-0.5 rounded-sm tracking-tighter">1H_{item.ar}</span>}
                           </div>
                           <div className="scale-75">{item.emoji}</div>
                        </div>
                        <div className="flex gap-2 p-1.5 bg-white/5 rounded-full border border-white/5 w-fit">
                           {item.dots.map((dot, idx) => (
                             <div key={idx} className={cn("w-1.5 h-1.5 rounded-full", dot)} />
                           ))}
                        </div>
                      </div>
                    ))}
                 </div>
                 <div className="p-4 mt-auto border-t border-white/5 bg-black/40 space-y-3">
                    <div className="w-full py-2.5 bg-primary/10 border border-primary/40 text-primary text-[9px] font-black uppercase tracking-widest text-center">CALIBRATION SYNC</div>
                 </div>
              </div>
            </PerspectiveViewport>
          </div>
        </div>
      )
    },
    {
      id: 'visual-core',
      label: '03',
      coord: '0x02BB',
      title: 'C. THE VISUAL CORE.',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">The Interactive Chart</h3>
              <p className="text-sm text-white/50 leading-relaxed font-inter">
                Unlike static charts, the Hunter core visualizes <span className="text-white font-bold">Structural Regimes</span>. It automatically colors candles and draws probability clouds based on multi-factor analysis.
              </p>
            </div>
            
            <div className="space-y-3">
              {/* Card 1: Momentum Fills */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm group hover:border-white/20 transition-all">
                <div className="flex gap-4 items-start">
                    <div className="w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Bullish Momentum Fills</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Adaptive background fills provide instant structural context. Cyan fills confirm buyers have established dominance.
                      </p>
                    </div>
                </div>
              </div>

              {/* Card 2: Reversion Envelopes */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm group hover:border-white/20 transition-all">
                <div className="flex gap-4 items-start">
                    <div className="w-4 h-4 rounded-full bg-purple-600 shadow-[0_0_8px_#9333ea] shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Mean Reversion Envelopes</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Integrated volume-weighted curves identify value nodes. Essential for timing high-probability entries near the mean.
                      </p>
                    </div>
                </div>
              </div>

              {/* Card 3: Topology Boundaries */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm group hover:border-white/20 transition-all">
                <div className="flex gap-4 items-start">
                    <div className="w-4 h-4 rounded-full border border-white/40 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Gaussian Topology Boundaries</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Dynamic probability clouds map session extremes. boundaries define exhaustion zones for imminent snap-back triggers.
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <PerspectiveViewport title="Visualization Hub" subtitle="MAIN_CHART_CORE" className="min-h-[400px]">
              <div className="w-full max-w-xl aspect-video bg-black/90 border border-white/10 rounded-sm relative overflow-hidden flex flex-col shadow-2xl group/chart">
                {/* Chart Header */}
                <div className="p-3 border-b border-white/5 flex items-center justify-between bg-black/40">
                   <div className="flex gap-2">
                     {['5M', '15M', '1H', '4H'].map(tf => (
                       <div key={tf} className={cn("px-2.5 py-1 text-[8px] font-black border transition-all", tf === '1H' ? "bg-white text-black border-white" : "text-white/20 border-white/5")}>{tf}</div>
                     ))}
                   </div>
                   <div className="flex gap-2 items-center">
                     <LineChart size={12} className="text-primary/40" />
                     <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Interactive_Feed</span>
                   </div>
                </div>
                
                {/* Chart Content */}
                <div className="flex-1 relative flex items-center justify-center">
                   {/* Background Gradient Fill (Regime) */}
                   <div className="absolute inset-0 bg-gradient-to-t from-sky-400/[0.08] via-transparent to-transparent pointer-events-none" />
                   
                   {/* SVG Chart Elements */}
                   <svg className="w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Mean Reversion Envelope Curve */}
                      <path 
                        d="M 0 80 Q 50 30 100 80" 
                        fill="none" 
                        stroke="#9333ea" 
                        strokeWidth="3" 
                        className="opacity-80 drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                      />
                      
                      {/* Price Action Path (Dashed) */}
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M 0 65 L 15 70 L 30 55 L 45 75 L 60 50 L 75 85 L 90 70 L 100 80" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4"
                        className="opacity-60"
                      />
                      
                      {/* Gaussian Cloud Boundaries (Hints) */}
                      <path d="M 0 20 Q 50 10 100 20" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-10" />
                      <path d="M 0 95 Q 50 90 100 95" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-10" />
                   </svg>
                   
                   {/* Focal Point Crosshair */}
                   <div className="absolute inset-0 pointer-events-none opacity-10">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                   </div>
                </div>
                
                {/* Chart Footer Indicator */}
                <div className="h-10 border-t border-white/5 bg-black/40 px-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                     <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.3em]">Momentum_Confirmed</span>
                   </div>
                   <span className="text-[7px] font-mono text-white/10 uppercase tracking-widest font-black">v2.5.1_STABLE</span>
                </div>
              </div>
            </PerspectiveViewport>
          </div>
        </div>
      )
    },
    {
      id: 'intelligence-feedback',
      label: '04',
      coord: '0x04DD',
      title: 'D. INTELLIGENCE FEEDBACK.',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight leading-none">The Synthesis Engine</h3>
              <p className="text-[12px] text-white/50 leading-relaxed font-inter">
                This master console converts abstract data into human-readable <span className="text-white font-bold">Trading Intelligence</span>. Hover over each module to see the logic.
              </p>
            </div>
            <div className="space-y-1.5">
               {[
                 { id: 'command', label: 'EXECUTION COMMAND', desc: 'THE FINAL MASTER VERDICT.', icon: <Terminal size={14} className="text-primary"/> },
                 { id: 'tactical', label: 'TACTICAL STRATEGIES', desc: 'THREE-POINT EXECUTION MAPPING.', icon: <LayoutGrid size={14} className="text-primary"/> },
                 { id: 'thesis', label: 'DIRECTOR THESIS', desc: 'THE COGNITIVE REASONING CORE.', icon: <BrainCircuit size={14} className="text-primary"/> },
                 { id: 'quant', label: 'QUANT ENGINE', desc: 'STATISTICAL EDGE CALCULATOR.', icon: <Binary size={14} className="text-primary"/> },
                 { id: 'risk', label: 'RISK PROTOCOLS', desc: 'ACTIVE SAFETY MONITORING.', icon: <ShieldCheck size={14} className="text-primary"/> }
               ].map(m => (
                 <div 
                   key={m.id} 
                   onMouseEnter={() => setHoveredFeedbackId(m.id)}
                   className={cn(
                     "px-4 py-3 border transition-all duration-300 rounded-sm flex items-center gap-4 group cursor-help",
                     hoveredFeedbackId === m.id ? "bg-white/[0.06] border-white/30" : "border-white/5 bg-white/[0.02]"
                   )}
                 >
                    <div className={cn(
                      "p-2.5 rounded-sm shrink-0 transition-colors",
                      hoveredFeedbackId === m.id ? "bg-primary text-black" : "bg-white/5 text-primary"
                    )}>{m.icon}</div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest transition-colors",
                        hoveredFeedbackId === m.id ? "text-primary" : "text-white"
                      )}>{m.label}</span>
                      <span className="text-[8px] text-white/20 uppercase tracking-tighter leading-tight font-mono">{m.desc}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col items-stretch">
            <AnimatePresence mode="wait">
              {hoveredFeedbackId ? (
                <motion.div 
                  key={hoveredFeedbackId} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full"
                >
                  <PerspectiveViewport 
                    title={hoveredFeedbackId.toUpperCase()} 
                    subtitle={`MODULE_SPEC_${hoveredFeedbackId.toUpperCase()}`}
                    className="h-full min-h-[420px]"
                  >
                    <div className="flex flex-col gap-6 w-full max-w-xl h-full justify-center">
                       {hoveredFeedbackId === 'command' && (
                         <div className="p-8 bg-emerald-500/5 border-l-4 border-emerald-500 space-y-4 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">EXECUTION_COMMAND</span>
                            <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-tighter">
                              ACCUMULATE_BULLISH <br className="sm:hidden" /> EXPANSION
                            </h4>
                            <div className="h-px w-full bg-white/10" />
                            <p className="text-[11px] text-white/60 font-inter italic leading-relaxed uppercase">
                              The final master verdict. Transforms every telemetry layer into a single binary directive: Accumulate, Distribute, or Stand Down based on unified structural confluence.
                            </p>
                            <div className="absolute top-0 right-0 p-2 opacity-5"><Terminal size={64} /></div>
                         </div>
                       )}

                       {hoveredFeedbackId === 'tactical' && (
                         <div className="flex flex-col gap-4">
                            <TacticalMiniCard label="PRIMARY_LONG" ideal="$97,230" realistic="$96,850" inval="$96,100" colorClass="text-emerald-400" />
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm text-center">
                               <p className="text-[10px] text-white/40 font-mono uppercase leading-relaxed">
                                 Refined execution protocol mapping **Ideal** (Extremes), **Realistic** (Confirmation), and **Invalidation** (Mathematics). Tailored to current volatility and topology.
                               </p>
                            </div>
                         </div>
                       )}

                       {hoveredFeedbackId === 'thesis' && (
                         <div className="p-8 bg-zinc-950/80 border border-white/10 rounded-sm space-y-6 shadow-2xl relative">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4 justify-center">
                               <BrainCircuit size={16} className="text-primary/60" />
                               <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">WHY THE SETUP EXISTS</span>
                            </div>
                            <p className="text-[12px] text-white/70 italic leading-relaxed font-inter border-l-2 border-primary/20 pl-6 text-center md:text-left">
                               "Consensus established. Price holds the <span className="text-white font-bold">Anchor Equilibrium</span> while institutional pressure <span className="text-emerald-400">(Rocket)</span> initiates expansion. Downside risk is statistically mitigated."
                            </p>
                            <p className="text-[9px] text-white/20 uppercase tracking-widest font-mono text-center">The cognitive reasoning core linking multi-layer shifts to institutional flow.</p>
                         </div>
                       )}

                       {hoveredFeedbackId === 'quant' && (
                         <div className="p-8 bg-zinc-950/80 border border-white/10 rounded-sm space-y-8 shadow-2xl">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4 justify-center">
                               <Binary size={16} className="text-sky-400" />
                               <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">STATISTICAL_EDGE</span>
                            </div>
                            <div className="space-y-4">
                               <div className="flex justify-between items-end">
                                  <MetricBox label="CONFLUENCE" value="84.2%" colorClass="text-emerald-400" />
                                  <span className="text-[9px] font-black text-emerald-400/40 uppercase">HIGH_CONFLUENCE</span>
                               </div>
                               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: '84.2%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                               </div>
                               <p className="text-[10px] text-white/50 uppercase leading-relaxed font-mono text-center md:text-left">
                                 The statistical edge calculator. Analyzes all active indicators—Regime, Topology, and Intensity—against live price action to determine the mathematical confluence for expansion.
                               </p>
                            </div>
                         </div>
                       )}

                       {hoveredFeedbackId === 'risk' && (
                         <div className="p-8 bg-zinc-950/80 border border-amber-500/20 rounded-sm space-y-8 shadow-2xl">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4 justify-center">
                               <ShieldAlert size={18} className="text-amber-500" />
                               <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">SAFETY_CHECK_PROTOCOL</span>
                            </div>
                            <div className="space-y-4 flex flex-col items-center">
                               <div className="flex items-center justify-center gap-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-sm w-full overflow-hidden">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                                  <span className="text-[11px] font-bold text-white uppercase tracking-tight text-center">
                                    VALUE_TEST <br className="sm:hidden" /> IN_PROGRESS
                                  </span>
                               </div>
                               <p className="text-[11px] text-white/60 leading-relaxed font-inter uppercase text-center">
                                 Active safety monitoring. Scans for structural friction, exhaustion risks, and value-test overlaps to warn against high-exposure entries or liquidity gaps.
                               </p>
                            </div>
                         </div>
                       )}
                    </div>
                  </PerspectiveViewport>
                </motion.div>
              ) : (
                <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                  <PerspectiveViewport title="SYNTHESIS HUB" subtitle="AWAITING_COMPONENT_HOVER" className="h-full min-h-[420px]">
                    <div className="flex flex-col items-center gap-6 opacity-20 group">
                      <BrainCircuit size={64} strokeWidth={1} className="text-white group-hover:scale-110 transition-transform duration-700" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em]">Hover components for logic breakdown</span>
                    </div>
                  </PerspectiveViewport>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )
    },
    {
      id: 'monitor',
      label: '05',
      coord: '0x05EE',
      title: 'E. SYSTEM MONITOR.',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">The Right System Monitor</h3>
              <p className="text-sm text-white/50 leading-relaxed font-inter">
                This column tracks every timeframe simultaneously. It identifies when the <span className="text-white font-bold">Consensus TRIAD</span> is aligned or conflicting.
              </p>
            </div>
            
            <div className="space-y-3">
              {/* Card 1: Multi-TF */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Layers size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Multi-Timeframe Logic</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Don't trade in isolation. The monitor alerts you when your execution timeframe is fighting against the macro horizon.
                      </p>
                    </div>
                </div>
              </div>

              {/* Card 2: EF Momentum */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Scale size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-2 flex-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">EF Momentum Profile</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Institutional velocity is tracked per timeframe. These symbols represent impulse acceleration.
                      </p>
                      {/* Momentum Visualization */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white/5 rounded-sm">
                           <GuideZzZ />
                           <span className="text-[7px] text-white/40 font-black">DORMANT</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white/5 rounded-sm">
                           <GuideBolt />
                           <span className="text-[7px] text-white/40 font-black">IMPULSE</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white/5 rounded-sm">
                           <GuideRocket />
                           <span className="text-[7px] text-white/40 font-black">EXPANSION</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>

              {/* Card 3: Signals Integration */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Zap size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-2 flex-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Forensic Signal Integration</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Forensic Diamond markers appear right next to each timeframe label when confluence is detected.
                      </p>
                      {/* Signal Integration Visualization */}
                      <div className="p-3 bg-black/40 border border-white/5 rounded-sm flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-white">4H</span>
                           <div className="text-emerald-400 font-black text-[12px] drop-shadow-[0_0_8px_currentColor]">◆</div>
                         </div>
                         <span className="text-[7px] text-white/20 font-mono">CONFLUENCE_LIT</span>
                      </div>
                    </div>
                </div>
              </div>

              {/* Card 4: Price to Anchor Slider */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <div className="flex gap-4 items-start">
                    <Waves size={16} className="text-primary shrink-0 mt-1" />
                    <div className="space-y-2 flex-1">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Average Range Position</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
                        Visual representation of price (dot) relative to the Anchor (purple line) within the statistical range boundaries (L and U).
                      </p>
                      <MockARSlider pricePos={35} anchorPos={60} />
                    </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <PerspectiveViewport title="System Monitor" subtitle="RIGHT_COLUMN_COMPONENT" className="min-h-[400px]">
               <div className="w-80 border border-white/10 bg-zinc-950/90 rounded-sm flex flex-col shadow-2xl">
                 <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/20 font-black uppercase">Monitor_Root</span>
                      <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">SYSTEM_STATE</span>
                    </div>
                    <RefreshCw size={12} className="text-white/20" />
                 </div>
                 <div className="p-4 space-y-6">
                    <div className="space-y-3">
                       <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Tactical</span>
                       {['4h', '2h', '1h'].map((tf, i) => (
                         <div key={tf} className="p-4 border border-white/5 bg-white/[0.01] flex flex-col gap-3 rounded-sm group">
                           <div className="flex justify-between items-center w-full">
                             <div className="flex items-center gap-3">
                               <span className="text-[11px] font-black text-white uppercase">{tf}</span>
                               {i === 0 && <div className="text-emerald-400 font-black text-[12px] drop-shadow-[0_0_5px_currentColor]">◆</div>}
                             </div>
                             <div className="flex items-center gap-4">
                               <div className="scale-90 opacity-80">
                                 {i === 0 ? <GuideRocket /> : i === 1 ? <GuideBolt /> : <GuideZzZ />}
                                </div>
                                <div className={cn("px-2.5 py-1 text-[9px] font-black rounded-sm border", i === 2 ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400")}>{i === 2 ? "BEAR" : "BULL"}</div>
                             </div>
                           </div>
                           <MockARSlider pricePos={i === 0 ? 30 : i === 1 ? 55 : 85} anchorPos={i === 0 ? 60 : i === 1 ? 40 : 20} />
                         </div>
                       ))}
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-2">
                       <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">TRIAD_OUTCOME:</span>
                       <div className="text-[10px] font-black text-white uppercase tracking-widest">SEQUENCE FORMING (BULL)</div>
                    </div>
                 </div>
               </div>
            </PerspectiveViewport>
          </div>
        </div>
      )
    }
  ];

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="h-screen bg-[#050507] text-foreground flex flex-col font-mono selection:bg-primary/20 overflow-hidden">
      <AnimatedBackground />

      <header className="h-20 border-b border-white/10 px-8 md:px-12 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-8">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors flex items-center gap-3">
            <ArrowLeft size={24} />
            <span className="text-xs font-black uppercase tracking-[0.3em] hidden sm:inline">BACK_TO_HQ</span>
          </button>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-[0.4em] uppercase">QUICK START GUIDE</span>
            <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-mono">MODULE_TYPE: INTERACTIVE_ONBOARDING</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden lg:flex w-80 border-r border-white/5 bg-black/40 flex-col shrink-0 z-40">
           <div className="p-10 border-b border-white/5 bg-black/20">
              <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.6em] block mb-3">System Path</span>
              <h3 className="text-2xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">Modules.</h3>
           </div>
           
           <div className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide">
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={cn(
                    "w-full flex items-center gap-6 p-5 transition-all duration-500 group relative rounded-sm border text-left",
                    activeStepId === step.id 
                      ? "bg-white/5 border-white/20 opacity-100" 
                      : "border-transparent opacity-30 hover:opacity-100 hover:bg-white/[0.02]"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                    activeStepId === step.id ? "bg-primary border-primary shadow-[0_0_15px_white]" : "bg-black border-white/20"
                  )}>
                    {activeStepId === step.id && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                  </div>
                  <div className="flex flex-col items-start">
                     <span className={cn("text-[9px] font-black tracking-[0.4em] uppercase", activeStepId === step.id ? "text-primary" : "text-white/40")}>Step {step.label}</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-left">{step.id.replace(/-/g, ' ')}</span>
                  </div>
                </button>
              ))}
           </div>
           <div className="p-10 border-t border-white/5 bg-black/20">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                    animate={{ width: `${((steps.findIndex(s => s.id === activeStepId) + 1) / steps.length) * 100}%` }}
                    className="h-full bg-primary shadow-[0_0_10px_white]" 
                 />
              </div>
           </div>
        </aside>

        <main className="flex-1 overflow-y-auto scrollbar-hide relative z-10 bg-[#08080A]/80 p-10 md:p-24">
           <div className="max-w-6xl mx-auto space-y-16">
              <AnimatePresence mode="wait">
                 <motion.div
                    key={activeStepId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="space-y-16"
                 >
                    <div className="space-y-6">
                       <div className="flex items-center gap-6">
                          <span className="text-sm font-black text-primary uppercase tracking-[0.6em] whitespace-nowrap">Dashboard Module {activeStep.label}</span>
                          <div className="h-[1px] flex-1 bg-white/10" />
                          <span className="text-[10px] font-mono text-white/20">[{activeStep.coord}]</span>
                       </div>
                       <h2 className="text-4xl md:text-6xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-[0.85]">
                          {activeStep.title}.
                       </h2>
                    </div>
                    <div className="relative">{activeStep.content}</div>
                    <div className="pt-16 border-t border-white/5 flex justify-between items-center">
                       {steps.findIndex(s => s.id === activeStepId) > 0 ? (
                         <button 
                           onClick={() => setActiveStepId(steps[steps.findIndex(s => s.id === activeStepId) - 1].id)}
                           className="text-xs font-black text-white/30 hover:text-white uppercase tracking-[0.5em] transition-all"
                         >
                           ← PREV_MODULE
                         </button>
                       ) : <div />}

                       {steps.findIndex(s => s.id === activeStepId) < steps.length - 1 ? (
                         <button 
                           onClick={() => setActiveStepId(steps[steps.findIndex(s => s.id === activeStepId) + 1].id)}
                           className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.5em] rounded-sm hover:scale-[1.03] transition-all flex items-center gap-4 group"
                         >
                           NEXT_MODULE
                           <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                         </button>
                       ) : (
                         <motion.button 
                           onClick={onEnterDashboard}
                           animate={{ 
                             boxShadow: [
                               "0 0 20px rgba(255,255,255,0.2)", 
                               "0 0 50px rgba(255,255,255,0.6)", 
                               "0 0 20px rgba(255,255,255,0.2)"
                             ]
                           }}
                           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                           className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-sm hover:scale-105 active:scale-95 transition-all shadow-2xl"
                         >
                           ENTER ANALYSIS TERMINAL
                         </motion.button>
                       )}
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>
        </main>
      </div>
    </div>
  );
}
