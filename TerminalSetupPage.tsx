/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Bookmark, CheckCircle2, ChevronRight, Monitor, LogIn, Star, Zap, AlertTriangle } from 'lucide-react';
import { cn } from './lib/utils.js';
import AnimatedBackground from './components/AnimatedBackground.js';

interface SetupStep {
  id: number;
  title: string;
  description: string;
  actionLabel: string;
  actionUrl?: string;
  visual: React.ReactNode;
}

const INDICATORS = [
  { name: 'ebb + flow', label: 'Institutional Pressure', url: 'https://www.tradingview.com/v/nkJzXXMl/' },
  { name: 'Average Range', label: 'Volatility Topology', url: 'https://www.tradingview.com/v/UwKaJm1Y/' },
  { name: 'Momentum & Reversion', label: 'Regime Engine', url: 'https://www.tradingview.com/v/l1mrDJIF/' },
  { name: 'Signals', label: 'Divergence Engine', url: 'https://www.tradingview.com/v/AcwEUTLW/' },
];

export default function TerminalSetupPage({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [clickedIndicators, setClickedIndicators] = useState<Set<number>>(new Set());

  const handleIndicatorClick = (idx: number, url: string) => {
    setClickedIndicators(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
    window.open(url, '_blank');
  };

  const steps: SetupStep[] = [
    {
      id: 1,
      title: 'Login to TradingView',
      description: 'Before deploying the Hunter toolkit, ensure you are signed into your TradingView account. A free account is sufficient for full deployment.',
      actionLabel: 'Open TradingView',
      actionUrl: 'https://www.tradingview.com/',
      visual: (
        <div className="relative w-full aspect-video bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center">
           <div className="flex flex-col items-center gap-4 opacity-40">
              <LogIn size={48} strokeWidth={1} />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Awaiting Authentication...</span>
           </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Click Indicator Link',
      description: 'Use the side bar on the right to open each indicator. Each link will take you to the official Hunter scrip page on TradingView. Click "Use On Chart" for each indicator.',
      actionLabel: 'Next Step',
      visual: (
        <div className="relative w-full aspect-video bg-zinc-900 border border-white/10 rounded-sm overflow-hidden p-8 flex flex-col gap-6">
           <div className="h-8 w-48 bg-white/5 border border-white/10 rounded-sm" />
           <div className="space-y-3">
              <div className="h-4 w-full bg-white/5 rounded-sm" />
              <div className="h-4 w-2/3 bg-white/5 rounded-sm" />
           </div>
           <div className="mt-auto flex justify-end">
              <div className="px-6 py-2 bg-primary/20 border border-primary/40 text-primary font-bold text-[9px] uppercase tracking-widest rounded-sm">Script Previewing...</div>
           </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Add to Favorites',
      description: 'On each script page, scroll down to the "Add to favorite indicators" button. This ensures the tools are available in your main indicator list.',
      actionLabel: 'Next Step',
      visual: (
        <div className="relative w-full aspect-video bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center">
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="px-8 py-4 bg-white/5 border border-white/20 rounded-sm flex items-center gap-4 group"
           >
              <Star size={20} className="text-primary fill-primary shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <span className="font-space-grotesk font-bold text-lg text-white uppercase tracking-tighter">Add to Favorite Indicators</span>
           </motion.div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Deployment Complete',
      description: 'The Hunter Toolkit is now synced to your TradingView account. You can now return to your desk and begin high-conviction analysis.',
      actionLabel: 'Return to Desk',
      visual: (
        <div className="relative w-full aspect-video bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex flex-col items-center justify-center gap-6">
           <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-emerald-400" />
           </div>
           <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">Sync Protocol Successful</span>
        </div>
      )
    }
  ];

  const activeStep = steps[currentStep - 1];

  const handleAction = () => {
    if (currentStep === 4) {
      onComplete();
    } else {
      if (activeStep.actionUrl) {
        window.open(activeStep.actionUrl, '_blank');
      }
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="h-screen bg-[#050507] text-foreground flex flex-col font-mono selection:bg-primary/20 overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="h-16 border-b border-white/10 px-6 md:px-12 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Back to Desk</span>
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white tracking-[0.3em] uppercase">Terminal Setup</span>
            <span className="text-[7px] text-white/20 uppercase tracking-widest">Protocol Alignment // v2.5.1</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
           {steps.map(s => (
             <div key={s.id} className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  currentStep === s.id ? "bg-white scale-125 shadow-[0_0_8px_white]" : 
                  currentStep > s.id ? "bg-emerald-500" : "bg-white/10"
                )} />
             </div>
           ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-16 lg:p-24 relative z-10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-[0.4em]">Step 0{currentStep} / 04</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
              <h1 className="text-4xl md:text-6xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">
                {activeStep.title}.
              </h1>
              <p className="text-white/50 text-sm md:text-base font-inter leading-relaxed max-w-xl">
                {activeStep.description}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {activeStep.visual}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-6 pt-8">
              <button 
                onClick={handleAction}
                className="px-12 py-5 bg-white text-black font-space-grotesk font-black text-[14px] uppercase tracking-[0.3em] rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3"
              >
                {activeStep.actionLabel}
                <ChevronRight size={18} />
              </button>

              {currentStep === 4 && (
                <button 
                  onClick={() => window.open('https://discord.com/invite/hunterhq', '_blank')}
                  className="px-12 py-5 bg-orange-500 text-white font-space-grotesk font-black text-[14px] uppercase tracking-[0.3em] rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(249,115,22,0.2)] flex items-center gap-3"
                >
                  <span className="text-lg">⚠️</span>
                  GET HELP
                </button>
              )}
              
              {currentStep > 1 && (
                <button 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Previous Step
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar: Indicator Stack */}
        <aside className="hidden lg:flex w-80 border-l border-white/5 bg-black/40 backdrop-blur-xl flex-col shrink-0 z-40">
           <div className="p-8 border-b border-white/5">
              <div className="flex items-center gap-3 mb-1">
                 <Zap size={14} className="text-primary" />
                 <span className="text-[9px] text-white/40 font-bold uppercase tracking-[0.4em]">Deployment_Stack</span>
              </div>
              <h3 className="text-xl font-space-grotesk font-black text-white tracking-tighter uppercase">Indicators.</h3>
           </div>
           
           <div className="flex-1 p-4 space-y-2">
              {INDICATORS.map((indicator, idx) => {
                const isClicked = clickedIndicators.has(idx);
                const isStepTwo = currentStep === 2;

                return (
                  <motion.button
                    key={indicator.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleIndicatorClick(idx, indicator.url)}
                    className="w-full text-left p-6 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all group relative overflow-hidden flex items-center gap-4"
                  >
                     {/* Numbered Badge */}
                     <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                        <motion.div 
                          animate={(!isClicked && isStepTwo) ? { opacity: [1, 0.4, 1], scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={cn(
                            "absolute inset-0 rounded-full border transition-all duration-500",
                            isClicked 
                              ? "bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" 
                              : "bg-white/5 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                          )}
                        />
                        <span className={cn(
                          "relative z-10 text-[12px] font-black transition-colors duration-500",
                          isClicked ? "text-emerald-400" : "text-white"
                        )}>
                          {idx + 1}
                        </span>
                     </div>

                     <div className="flex flex-col gap-1 relative z-10 flex-1">
                        <span className={cn("text-[11px] font-black text-white uppercase tracking-widest group-hover:text-primary transition-colors", isClicked && "text-emerald-400/80")}>{indicator.name}</span>
                        <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{indicator.label}</span>
                     </div>
                     <ExternalLink size={12} className="shrink-0 text-white/10 group-hover:text-white/40 transition-all" />
                     
                     <motion.div 
                      whileHover={{ opacity: 0.1 }}
                      className="absolute inset-0 bg-primary opacity-0 transition-opacity" 
                     />
                  </motion.button>
                );
              })}
           </div>

           <div className="p-8 border-t border-white/5 bg-black/20">
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-sm space-y-4">
                 <div className="flex items-center gap-3">
                    <Monitor size={14} className="text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Status: Ready</span>
                 </div>
                 <p className="text-[9px] text-white/40 font-inter leading-relaxed uppercase tracking-tight">
                    All Hunter protocols are available for verified deployment. Ensure step 3 is executed for each module.
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
