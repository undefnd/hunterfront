/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, LayoutGrid, BrainCircuit, Binary, ShieldCheck, Monitor, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils.js';

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

const TacticalMiniCard = ({ label, entry, inval, colorClass }: { label: string, entry: string, inval: string, colorClass: string }) => (
  <div className={cn("p-4 bg-zinc-900/60 border border-white/5 rounded-sm space-y-3 w-full", colorClass.includes('emerald') ? 'bg-emerald-500/[0.02]' : 'bg-rose-500/[0.02]')}>
    <span className={cn("text-[8px] font-black uppercase tracking-widest", colorClass)}>[ {label} ]</span>
    <div className="grid grid-cols-2 gap-4">
      <MetricBox label="IDL ENTRY" value={entry} colorClass={colorClass} />
      <MetricBox label="INVAL" value={inval} colorClass="text-zinc-500" />
    </div>
  </div>
);

export default function SynthesisEngineSection() {
  const [hoveredId, setHoveredId] = useState<string>('command');
  const terminalRef = useRef<HTMLDivElement>(null);

  const modules = [
    { id: 'command', label: 'EXECUTION COMMAND', short: 'COMMAND', desc: 'The final master verdict.', icon: <Terminal size={14} /> },
    { id: 'tactical', label: 'TACTICAL STRATEGIES', short: 'TACTICAL', desc: 'Precise execution mapping.', icon: <LayoutGrid size={14} /> },
    { id: 'thesis', label: 'DIRECTOR THESIS', short: 'THESIS', desc: 'The cognitive reasoning core.', icon: <BrainCircuit size={14} /> },
    { id: 'quant', label: 'QUANT ENGINE', short: 'QUANT', desc: 'Statistical edge calculator.', icon: <Binary size={14} /> },
    { id: 'risk', label: 'RISK PROTOCOLS', short: 'RISK', desc: 'Active safety monitoring.', icon: <ShieldCheck size={14} /> }
  ];

  const handleSelection = (id: string) => {
    setHoveredId(id);
    if (window.innerWidth < 1024) {
      terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative py-24 md:py-48 bg-[#050507] overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col mb-16 space-y-4">
          <div className="flex items-center gap-4">
             <span className="font-mono text-[9px] text-white/20 tracking-tighter shrink-0">[0x0040]</span>
             <div className="h-[1px] w-8 bg-white/10" />
             <span className="font-mono text-[10px] text-white tracking-widest uppercase font-bold bg-white/5 px-3 py-1 border border-white/10">
                SYSTEM_ROOT: HUNTER_INTELLIGENCE
             </span>
          </div>
          <h2 className="font-space-grotesk font-black text-4xl md:text-7xl text-white leading-[0.9] tracking-tighter uppercase">
            HUNTER <br/> INTELLIGENCE.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 items-start">
          {/* Left Column: Module Selection */}
          <div className="lg:col-span-4 space-y-6">
            <p className="font-inter font-medium text-white/40 leading-relaxed text-sm md:text-base tracking-tight mb-8">
              This master console automatically converts abstract multi-layer telemetry into <span className="text-white font-bold">readable trading intelligence</span> allowing traders to focus more on execution.
            </p>
            <div className="space-y-2 hidden lg:block">
               {modules.map((m) => (
                 <div 
                   key={m.id} 
                   onMouseEnter={() => setHoveredId(m.id)}
                   className={cn(
                     "px-5 py-4 border transition-all duration-300 rounded-sm flex items-center gap-5 cursor-help",
                     hoveredId === m.id ? "bg-white/[0.06] border-white/30" : "border-white/5 bg-white/[0.01]"
                   )}
                 >
                    <div className={cn(
                      "p-3 rounded-sm shrink-0 transition-colors",
                      hoveredId === m.id ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-white/5 text-white/40"
                    )}>{m.icon}</div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[12px] font-space-grotesk font-black uppercase tracking-widest transition-colors",
                        hoveredId === m.id ? "text-primary" : "text-white"
                      )}>{m.label}</span>
                      <span className="text-[9px] text-white/20 uppercase tracking-tighter leading-tight font-space-grotesk font-bold">{m.desc}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Visualization Viewport */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-[460px] scroll-mt-24" ref={terminalRef}>
            
            {/* Mobile Tab Navigation */}
            <div className="lg:hidden sticky top-16 z-50 mb-6 bg-black/80 backdrop-blur-md border border-white/10 p-1 flex items-center justify-around rounded-sm shadow-xl overflow-x-auto scrollbar-hide">
              {modules.map((m) => (
                <button 
                  key={m.id}
                  onClick={() => handleSelection(m.id)}
                  className={cn(
                    "px-4 py-2.5 text-[9px] font-space-grotesk font-bold uppercase tracking-widest transition-all rounded-sm whitespace-nowrap",
                    hoveredId === m.id ? "bg-white text-black" : "text-white/40"
                  )}
                >
                  {m.short}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div 
                  key={hoveredId} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <PerspectiveViewport 
                    title={hoveredId.toUpperCase()} 
                    subtitle={`MODULE_SPEC_${hoveredId.toUpperCase()}`}
                    className="h-full"
                  >
                    <div className="flex flex-col gap-8 w-full max-w-xl h-full justify-center p-2 md:p-6">
                       {hoveredId === 'command' && (
                         <div className="p-4 md:p-10 bg-emerald-500/5 border-l-4 border-emerald-500 space-y-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">EXECUTION_COMMAND</span>
                            <h4 className="text-lg md:text-3xl font-space-grotesk font-black text-emerald-400 uppercase tracking-tighter">
                              ACCUMULATE_BULLISH <br className="sm:hidden" /> EXPANSION
                            </h4>
                            <div className="h-px w-full bg-white/10" />
                            <p className="text-[12px] text-white/60 font-inter italic leading-relaxed uppercase">
                              The final master verdict. Transforms every telemetry layer into a single binary directive: Accumulate, Distribute, or Stand Down based on unified structural confluence.
                            </p>
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03]"><Terminal size={120} /></div>
                         </div>
                       )}

                       {hoveredId === 'tactical' && (
                         <div className="flex flex-col gap-6">
                            <TacticalMiniCard label="PRIMARY_LONG" entry="$97,230" inval="$95,400" colorClass="text-emerald-400" />
                            <div className="p-4 md:p-8 bg-white/[0.02] border border-white/5 rounded-sm">
                               <p className="text-[11px] text-white/40 font-mono uppercase leading-relaxed text-center">
                                 Precise execution mapping. Generates mathematical 'Realistic' and 'Ideal' entry nodes, hard invalidation levels, and take-profit targets tailored to current volatility and topology.
                               </p>
                            </div>
                         </div>
                       )}

                       {hoveredId === 'thesis' && (
                         <div className="p-4 md:p-10 bg-zinc-950/80 border border-white/10 rounded-sm space-y-8 shadow-2xl relative">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-6 justify-center">
                               <BrainCircuit size={20} className="text-primary/60" />
                               <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">WHY THE SETUP EXISTS</span>
                            </div>
                            <p className="text-[14px] text-white/70 italic leading-relaxed font-inter border-l-2 border-primary/20 pl-8 text-center md:text-left">
                               "Consensus established. Price holds the <span className="text-white font-bold">Anchor Equilibrium</span> while institutional pressure <span className="text-emerald-400">(Rocket)</span> initiates expansion. Downside risk is statistically mitigated."
                            </p>
                            <p className="text-[10px] text-white/20 uppercase tracking-widest font-mono text-center">The cognitive reasoning core linking multi-layer shifts to institutional flow.</p>
                         </div>
                       )}

                       {hoveredId === 'quant' && (
                         <div className="p-4 md:p-10 bg-zinc-950/80 border border-white/10 rounded-sm space-y-10 shadow-2xl">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-6 justify-center">
                               <Binary size={20} className="text-sky-400" />
                               <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">STATISTICAL_EDGE</span>
                            </div>
                            <div className="space-y-6">
                               <div className="flex justify-between items-end">
                                  <MetricBox label="CONFLUENCE" value="84.2%" colorClass="text-emerald-400" />
                                  <span className="text-[10px] font-black text-emerald-400/40 uppercase">HIGH_CONFLUENCE</span>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: '84.2%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
                               </div>
                               <p className="text-[11px] text-white/50 uppercase leading-relaxed font-mono text-center md:text-left">
                                 The statistical edge calculator. Analyzes all active indicators—Regime, Topology, and Intensity—against live price action to determine the mathematical confluence for expansion.
                               </p>
                            </div>
                         </div>
                       )}

                       {hoveredId === 'risk' && (
                         <div className="p-4 md:p-10 bg-zinc-950/80 border border-amber-500/20 rounded-sm space-y-10 shadow-2xl">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-6 justify-center">
                               <ShieldAlert size={22} className="text-amber-500" />
                               <span className="text-[11px] font-black text-amber-500 uppercase tracking-widest">SAFETY_CHECK_PROTOCOL</span>
                            </div>
                            <div className="space-y-6 flex flex-col items-center">
                               <div className="flex items-center justify-center gap-5 p-4 md:p-6 bg-amber-500/5 border border-amber-500/20 rounded-sm w-full overflow-hidden">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                                  <span className="text-[11px] md:text-[13px] font-bold text-white uppercase tracking-tight text-center">
                                    VALUE_TEST <br className="sm:hidden" /> IN_PROGRESS
                                  </span>
                               </div>
                               <p className="text-[12px] text-white/60 leading-relaxed font-inter uppercase text-center">
                                 Active safety monitoring. Scans for structural friction, exhaustion risks, and value-test overlaps to warn against high-exposure entries or liquidity gaps.
                               </p>
                            </div>
                         </div>
                       )}
                    </div>
                  </PerspectiveViewport>
                </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}