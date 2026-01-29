
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, memo, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils.js";
import { Terminal, Crosshair, Zap, Search, Info, MousePointer2 } from "lucide-react";

interface LogicChoice {
  id: string;
  label: string;
  tone: 'bull' | 'bear' | 'neutral' | 'caution';
  impact: number;
}

const REGIME_CHOICES: LogicChoice[] = [
  { id: 'strong_mom_up', label: 'Strong Momentum ↑↑', tone: 'bull', impact: 3 },
  { id: 'mom_bias_up', label: 'Momentum Bias ↑', tone: 'bull', impact: 2 },
  { id: 'mixed', label: 'Mixed / Transitional ↔', tone: 'neutral', impact: 0 },
  { id: 'rev_bias_down', label: 'Reversion Bias ↓', tone: 'bear', impact: -2 },
  { id: 'strong_rev_down', label: 'Strong Reversion ↓↓', tone: 'bear', impact: -3 },
];

const VOLATILITY_CHOICES: LogicChoice[] = [
  { id: 'upper', label: 'At Upper Boundary', tone: 'caution', impact: -0.5 },
  { id: 'mid', label: 'At Mid Range', tone: 'neutral', impact: 0 },
  { id: 'lower', label: 'At Lower Boundary', tone: 'bull', impact: 0.5 },
];

const SIGNAL_CHOICES: LogicChoice[] = [
  { id: 'bull_hollow', label: 'Bullish Divergence ◇', tone: 'bull', impact: 1 },
  { id: 'bull_filled', label: 'Bullish Divergence ◆', tone: 'bull', impact: 1.5 },
  { id: 'no_sig', label: 'No Active Signals', tone: 'neutral', impact: 0 },
  { id: 'bear_hollow', label: 'Bearish Divergence ◇', tone: 'bear', impact: -1 },
  { id: 'bear_filled', label: 'Bearish Divergence ◆', tone: 'bear', impact: -1.5 },
];

const FLOW_CHOICES: LogicChoice[] = [
  { id: 'buyers', label: 'Above Zero (Buyers)', tone: 'bull', impact: 1.5 },
  { id: 'near_zero', label: 'Near Zero Line', tone: 'neutral', impact: 0 },
  { id: 'sellers', label: 'Below Zero (Sellers)', tone: 'bear', impact: -1.5 },
];

const StepHeader = ({ index, title }: { index: string; title: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="w-0.5 h-2 bg-white/20" />
    <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold">
      {index}. {title}
    </span>
  </div>
);

const LogicStep = ({ 
  choices, 
  selectedId, 
  onSelect,
  optionRefs
}: { 
  choices: LogicChoice[]; 
  selectedId: string | null; 
  onSelect: (id: string) => void;
  optionRefs?: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
}) => (
  <div className="grid grid-cols-1 gap-1">
    {choices.map((choice) => {
      const isSelected = selectedId === choice.id;
      return (
        <button
          key={choice.id}
          ref={(el) => { if (optionRefs) optionRefs.current[choice.id] = el; }}
          onClick={() => onSelect(choice.id)}
          className={cn(
            "w-full px-3 py-2 text-left transition-all border flex items-center justify-between group rounded-sm",
            isSelected 
              ? (choice.tone === 'bull' ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" :
                 choice.tone === 'bear' ? "bg-rose-500/10 border-rose-500/40 text-rose-400" :
                 choice.tone === 'caution' ? "bg-amber-500/10 border-amber-500/40 text-amber-400" :
                 "bg-white/10 border-white/40 text-white")
              : "bg-white/[0.01] border-white/5 text-white/20 hover:bg-white/[0.03] hover:text-white/50"
          )}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.1em]">{choice.label}</span>
          <div className={cn(
            "w-1 h-1 rounded-full transition-all border",
            isSelected ? "bg-current shadow-[0_0_8px_currentColor] border-transparent" : "bg-transparent border-white/10"
          )} />
        </button>
      );
    })}
  </div>
);

const AnalysisMatrix = ({ autoSimulate = false, onPoint }: { autoSimulate?: boolean, onPoint?: (x: number, y: number, click?: boolean) => void }) => {
  const [regime, setRegime] = useState<string | null>(null);
  const [vol, setVol] = useState<string | null>(null);
  const [sig, setSig] = useState<string | null>(null);
  const [flow, setFlow] = useState<string | null>(null);
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Simulation logic for Chapter 3
  useEffect(() => {
    if (!autoSimulate) return;

    let timeout: ReturnType<typeof setTimeout>;
    
    const reportPoint = (id: string) => {
      const el = optionRefs.current[id];
      if (el && onPoint) {
        const rect = el.getBoundingClientRect();
        onPoint(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
      }
    };

    const runSequence = () => {
      // Step 1: Momentum Bias
      setRegime('mom_bias_up');
      setVol(null); setSig(null); setFlow(null);
      reportPoint('mom_bias_up');
      
      timeout = setTimeout(() => {
        // Step 2: Lower Boundary
        setVol('lower');
        reportPoint('lower');
        
        timeout = setTimeout(() => {
          // Step 3: Bullish Divergence
          setSig('bull_filled');
          reportPoint('bull_filled');
          
          timeout = setTimeout(() => {
            // Step 4: Above Zero
            setFlow('buyers');
            reportPoint('buyers');
            
            timeout = setTimeout(() => {
              runSequence();
            }, 3000);
          }, 800);
        }, 800);
      }, 800);
    };

    runSequence();
    return () => clearTimeout(timeout);
  }, [autoSimulate, onPoint]);

  const verdict = useMemo(() => {
    if (!regime || !vol || !sig || !flow) return null;
    
    const r = REGIME_CHOICES.find(c => c.id === regime)!;
    const v = VOLATILITY_CHOICES.find(c => c.id === vol)!;
    const s = SIGNAL_CHOICES.find(c => c.id === sig)!;
    const f = FLOW_CHOICES.find(c => c.id === flow)!;

    const rawScore = r.impact + v.impact + s.impact + f.impact;
    const score = rawScore / 3; 

    if (score >= 1) return { label: 'BULLISH', tone: 'bull', detail: 'Confluence detected. Expansion protocol active.', confidence: 'HIGH' };
    if (score > 0.3) return { label: 'BULLISH BIAS', tone: 'bull', detail: 'Partial confluence. Proceed with caution.', confidence: 'LOW' };
    if (score <= -1) return { label: 'BEARISH', tone: 'bear', detail: 'Confluence detected. Breakdown protocol active.', confidence: 'HIGH' };
    if (score < -0.3) return { label: 'BEARISH BIAS', tone: 'bear', detail: 'Partial confluence. Counter-trend risk high.', confidence: 'LOW' };
    
    return { label: 'MIXED / NEUTRAL', tone: 'neutral', detail: 'Non-linear noise detected. Desk recommends standing down.', confidence: 'N/A' };
  }, [regime, vol, sig, flow]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]">
      <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal size={14} className="text-white/40" />
          <span className="font-space-grotesk font-bold text-[10px] text-white tracking-[0.4em] uppercase">ANALYSIS MATRIX</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[60%] p-5 md:p-6 space-y-6 md:border-r border-white/10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <StepHeader index="01" title="Environment" />
              <LogicStep choices={REGIME_CHOICES} selectedId={regime} onSelect={setRegime} optionRefs={optionRefs} />
            </div>
            
            <div>
              <StepHeader index="02" title="Volatility" />
              <LogicStep choices={VOLATILITY_CHOICES} selectedId={vol} onSelect={setVol} optionRefs={optionRefs} />
            </div>
            
            <div>
              <StepHeader index="03" title="Signals" />
              <LogicStep choices={SIGNAL_CHOICES} selectedId={sig} onSelect={setSig} optionRefs={optionRefs} />
            </div>
            
            <div>
              <StepHeader index="04" title="ebb + flow" />
              <LogicStep choices={FLOW_CHOICES} selectedId={flow} onSelect={setFlow} optionRefs={optionRefs} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] bg-zinc-950/80 p-6 md:p-8 flex flex-col justify-center relative backdrop-blur-md border-t md:border-t-0 border-white/10">
          <AnimatePresence mode="wait">
            {verdict ? (
              <motion.div 
                key="verdict"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold">NET STANCE</span>
                  <div className={cn(
                    "px-4 py-2 md:py-3 rounded-sm border font-space-grotesk font-black text-base md:text-lg tracking-[0.2em] uppercase text-center",
                    verdict.tone === 'bull' ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" :
                    verdict.tone === 'bear' ? "bg-rose-500/10 border-rose-500/40 text-rose-400" :
                    "bg-zinc-500/10 border-zinc-500/40 text-zinc-400"
                  )}>
                    {verdict.label}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest font-bold">CONFIDENCE</span>
                    <span className={cn("text-[10px] font-bold block", verdict.tone === 'bull' ? "text-emerald-500" : verdict.tone === 'bear' ? "text-rose-500" : "text-white/40")}>
                      {verdict.confidence}
                    </span>
                  </div>
                </div>

                <div className="pt-4 md:pt-6 border-t border-white/5">
                   <div className="flex items-center gap-3 mb-2">
                     <Zap size={12} className={cn(verdict.tone === 'bull' ? "text-emerald-400" : verdict.tone === 'bear' ? "text-rose-400" : "text-white/20")} />
                     <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">Engine Rationale</span>
                   </div>
                   <p className="font-mono text-[9px] md:text-[10px] text-white/50 leading-relaxed uppercase tracking-[0.1em]">{verdict.detail}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center opacity-20 gap-4 py-8 md:py-12">
                <Search size={32} className="text-white" />
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold block">Awaiting Data</span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function MethodologySection({ onLaunchAnalysis, autoSimulate = false, onPoint }: { onLaunchAnalysis?: () => void, autoSimulate?: boolean, onPoint?: (x: number, y: number, click?: boolean) => void }) {
  return (
    <section className="relative min-h-screen flex items-center py-16 md:py-32 overflow-hidden bg-[#050507] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="lg:col-span-4 lg:pl-16"
          >
            <div className="mb-6 md:mb-10 flex items-center gap-4">
              <span className="font-mono text-[9px] text-white/20 tracking-tighter shrink-0">[0x0010]</span>
              <div className="h-[1px] w-8 bg-white/10" />
              <span className="font-mono text-[10px] text-white tracking-widest uppercase font-bold bg-white/5 px-3 py-1 border border-white/10">
                SYSTEM_ROOT: STRATEGY_ARCHITECTURE
              </span>
            </div>
            
            <h3 className="font-space-grotesk font-bold text-4xl md:text-7xl text-white mb-6 md:mb-10 leading-[0.9] tracking-tighter uppercase">
              Systems <br className="hidden md:block" /> Thinking.
            </h3>
            
            <div className="space-y-6 md:space-y-8 max-w-lg mb-10 md:mb-12">
              <p className="font-inter font-medium text-white/80 leading-relaxed text-base md:text-lg">
                The Desk promotes a structured analysis workflow, ensuring that your net stance is the outcome of a repeatable system.
              </p>
            </div>

            {!autoSimulate && onLaunchAnalysis && (
              <div className="pt-2 md:pt-4">
                <button 
                  onClick={onLaunchAnalysis}
                  className="w-full md:w-auto font-space-grotesk text-[11px] text-white font-bold px-12 py-6 border border-white/20 hover:border-white transition-all duration-300 tracking-[0.4em] bg-white/5 hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] uppercase rounded-sm"
                >
                  [ LAUNCH DESK ↗ ]
                </button>
              </div>
            )}
          </motion.div>

          <div className="lg:col-span-8 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <AnalysisMatrix autoSimulate={autoSimulate} onPoint={onPoint} />
              
              <div className="mt-8 flex items-center gap-3 justify-center opacity-30 group cursor-default">
                 <MousePointer2 size={12} className="text-white" />
                 <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold">
                   {autoSimulate ? "Simulated workflow sequence active" : "Select parameters to verify confluence"}
                 </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
