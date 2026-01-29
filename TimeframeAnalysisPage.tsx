
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTimeframeAnalysis } from "./hooks/useTimeframeAnalysis.js";
// Fix: Add LayerType to imports
import { LayerType, LAYER_CONFIG, createEmptyTimeframeData } from "./types/timeframe.js";
import LayerTabs from "./components/timeframe/LayerTabs.js";
import TimeframeColumn from "./components/timeframe/TimeframeColumn.js";
import { interpretMR_Simplified } from "./lib/analysisEngine.js";
import { ArrowLeft, Database, Download, Share2, MousePointer2, Briefcase, PanelLeftClose, PanelLeftOpen, LayoutDashboard, Search, Menu, TrendingUp } from "lucide-react";
import { cn } from "./lib/utils.js";

// NEW 27-TRIAD MATRIX DEFINITIONS
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

function getStanceSimple(stance: string): string {
  if (stance === 'Bullish') return "Bullish";
  if (stance === 'Bearish') return "Bearish";
  return "Mixed / Unclear";
}

function gradeEnvironmentV3(inputs: {
  stances: { tf1: string; tf2: string; tf3: string };
}): { label: string; tone: 'bull' | 'bear' | 'caution' | 'neutral' } {
  const { tf1, tf2, tf3 } = inputs.stances;
  const key = `${STANCE_MAP[tf1] || 'M'}/${STANCE_MAP[tf2] || 'M'}/${STANCE_MAP[tf3] || 'M'}`;
  const label = TRIAD_LABELS[key] || "UNCLEAR (STRUCTURAL FRICTION)";
  
  let tone: 'bull' | 'bear' | 'caution' | 'neutral' = 'neutral';
  if (label.includes('BULL') || label.includes('UP')) tone = 'bull';
  else if (label.includes('BEAR') || label.includes('DOWN')) tone = 'bear';
  else if (label.includes('UNCLEAR') || label.includes('CONFLICTING')) tone = 'caution';
  
  return { label, tone };
}

export default function TimeframeAnalysisPage({ onBack, onSwitchView, activeView }: { onBack: () => void; onSwitchView?: (v: 'analysis' | 'dashboard') => void; activeView?: string }) {
  const { workspaces, activeWorkspace, activeWorkspaceId, setActiveWorkspaceId, updateMarket, activeLayer, setActiveLayer, state, updateTimeframe } = useTimeframeAnalysis();
  const config = LAYER_CONFIG[activeLayer];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea')) return;
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="h-screen bg-[#0A0A0C] text-foreground flex flex-col selection:bg-primary/20 overflow-hidden font-mono">
      <header className="h-14 border-b border-white/10 px-4 md:px-6 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-md p-1">
             <button 
               onClick={() => onSwitchView?.('analysis')}
               className={cn(
                 "w-10 h-8 flex items-center justify-center rounded transition-all",
                 activeView === 'analysis' ? "bg-white text-black" : "text-white/40 hover:text-white"
               )}
             >
               <TrendingUp size={16} strokeWidth={2.5} />
             </button>
             <button 
               onClick={() => onSwitchView?.('dashboard')}
               className={cn(
                 "w-10 h-8 flex items-center justify-center rounded transition-all",
                 activeView === 'dashboard' ? "bg-white text-black" : "text-white/40 hover:text-white"
               )}
             >
               <LayoutDashboard size={16} strokeWidth={2.5} />
             </button>
          </div>

          <div className="h-6 w-px bg-white/10 mx-1" />

          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={cn("p-1.5 transition-colors", isSidebarOpen ? "text-primary" : "text-white/40 hover:text-white")}>
            <Menu size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
           <div className="hidden lg:flex items-center gap-2 mr-4 opacity-50">
             <MousePointer2 size={12} className="text-white" />
             <span className="text-[10px] uppercase tracking-widest font-bold text-white">Grab Stage</span>
           </div>
           
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded border border-white/10">
            <Database size={14} className="text-white/40" />
            <input 
              value={activeWorkspace.market} 
              onChange={e => updateMarket(e.target.value)} 
              placeholder="TICKER" 
              className="bg-transparent border-none text-[12px] font-bold uppercase text-white placeholder:text-white/20 tracking-widest focus:ring-0 w-24 font-mono" 
            />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <motion.aside 
          initial={false} 
          animate={{ 
            width: isSidebarOpen ? 288 : 0, 
            opacity: isSidebarOpen ? 1 : 0,
            x: isSidebarOpen ? 0 : -20 
          }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }} 
          className={cn(
            "border-r border-white/10 flex flex-col bg-zinc-950/90 md:bg-zinc-950/40 backdrop-blur-xl shrink-0 overflow-hidden z-40",
            "absolute md:relative inset-y-0 left-0 md:translate-x-0"
          )}
        >
          <div className="p-6 border-b border-white/10 w-72"><DeskStatusHUD layerData={state} layer={activeLayer} /></div>
          <div className="flex-1 overflow-y-auto scrollbar-hide w-72">
            <div className="px-6 py-4">
              <span className="text-[9px] text-white/50 font-bold tracking-[0.3em] uppercase block mb-4 flex items-center gap-2"><Briefcase size={10} className="text-primary" /> Active Workspaces</span>
              <div className="space-y-1 mb-8">
                {workspaces.map(w => (
                  <button key={w.id} onClick={() => { setActiveWorkspaceId(w.id); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={cn("w-full px-4 py-3 text-left transition-all rounded-sm flex items-center justify-between border", activeWorkspaceId === w.id ? "bg-primary/10 border-primary/40 text-white shadow-[0_0_15px_rgba(79,209,197,0.1)]" : "bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.05] hover:text-white/80")}>
                    <span className="text-[11px] font-bold uppercase tracking-widest truncate">{w.market || "UNTITLED"}</span>
                    {activeWorkspaceId === w.id && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                  </button>
                ))}
              </div>
              <span className="text-[9px] text-white/50 font-bold tracking-[0.3em] uppercase block mb-4">Selection Depth</span>
              <LayerTabs activeLayer={activeLayer} onLayerChange={setActiveLayer} orientation="vertical" />
            </div>
          </div>
          <div className="p-6 border-t border-white/10 bg-black/40 w-72">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                <span className="text-white/40">MANUAL TRADING DESK</span>
                <span className="text-primary">LIVE ANALYSIS</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-primary/40" />
              </div>
            </div>
          </div>
        </motion.aside>

        {isSidebarOpen && window.innerWidth < 768 && (
          <div className="absolute inset-0 bg-black/60 z-30" onClick={() => setIsSidebarOpen(false)} />
        )}

        <main ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)} onMouseMove={handleMouseMove} className={cn("flex-1 overflow-x-auto overflow-y-auto scrollbar-hide bg-[#08080A] transition-all relative", isDragging ? "cursor-grabbing" : "cursor-grab")}>
          <AnimatePresence mode="wait">
            <motion.div key={`${activeWorkspaceId}-${activeLayer}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex h-full min-w-max">
              {config.timeframes.map(tf => (
                <TimeframeColumn key={tf} timeframe={tf} data={state[activeLayer]?.[tf] || createEmptyTimeframeData()} layer={activeLayer} onUpdate={(f, v) => updateTimeframe(activeLayer, tf, f, v)} />
              ))}
              <div className="min-w-[100px] h-full" />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function DeskStatusHUD({ layerData, layer }: any) {
  const config = LAYER_CONFIG[layer as LayerType];
  const tfs = config.timeframes;

  const getEnvironment = () => {
    const data = layerData[layer] || {};
    const tf1 = data[tfs[0]] || createEmptyTimeframeData();
    const tf2 = data[tfs[1]] || createEmptyTimeframeData();
    const tf3 = data[tfs[2]] || createEmptyTimeframeData();
    
    if (!tf1.regime_classification && !tf2.regime_classification && !tf3.regime_classification) return null;
    
    const res1 = interpretMR_Simplified(tf1);
    const res2 = interpretMR_Simplified(tf2);
    const res3 = interpretMR_Simplified(tf3);
    
    const inputs = {
      stances: { tf1: res1.stance, tf2: res2.stance, tf3: res3.stance }
    };
    return gradeEnvironmentV3(inputs);
  };
  const env = getEnvironment();
  return (
    <div className="space-y-4">
      <div className="flex flex-col min-h-[42px]">
        <span className="text-[10px] text-white/90 font-bold tracking-widest uppercase mb-1.5">Layer Consensus</span>
        {env ? (
          <motion.div 
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <div className={cn("w-2.5 h-2.5 rounded-full", env.tone === 'bull' ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : env.tone === 'bear' ? "bg-rose-500 shadow-[0_0_8px_#f43f5e]" : env.tone === 'caution' ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]" : "bg-zinc-500")} />
            <span className={cn("text-[13px] font-bold tracking-tight uppercase leading-tight", env.tone === 'bull' ? "text-emerald-400" : env.tone === 'bear' ? "text-rose-400" : env.tone === 'caution' ? "text-amber-400" : "text-zinc-400")}>{env.label}</span>
          </motion.div>
        ) : (
          <span className="text-[12px] text-white/70 uppercase tracking-widest font-bold animate-pulse">Input Required...</span>
        )}
      </div>
    </div>
  );
}
