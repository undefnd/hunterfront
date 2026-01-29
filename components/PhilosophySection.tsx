/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, memo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  UserX, 
  RefreshCcw, 
  FileText, 
  Target,
  Crosshair,
  Terminal
} from "lucide-react";
import { GlowSphere } from "./GlowSphere.js";
import { cn } from "../lib/utils.js";
import { CyberGlowButton } from "../App.js";

const philosophyItems = [
  {
    id: "signals",
    label: "Not a crowded signal feed.",
    detail: "Standard platforms broadcast noise. We prioritize high-conviction logic over signal frequency.",
    meta: "LOGIC_GATE: NO_NOISE_ACCEPTANCE",
    footer: "SYSTEM FILTER: DISCARDING LOW-CONVICTION NOISE",
    coord: "0x00A1",
    icon: Activity
  },
  {
    id: "repainting",
    label: "No outcome repainting.",
    detail: "Calculations are finalized upon candle close. No shifting results. What you see in backtest is what you get in production.",
    meta: "STATE_CHECK: IMMUTABLE_DATA_STREAM",
    footer: "DATA INTEGRITY: SEALING FINALIZED CANDLE STATES",
    coord: "0x00B2",
    icon: ShieldCheck
  },
  {
    id: "affiliates",
    label: "No affiliates or sponsors.",
    detail: "Our only incentive is performance. No broker kickbacks. No external influence. Pure technical sovereignty.",
    meta: "SOURCE_AUTH: ZERO_EXTERNAL_DEPENDENCY",
    footer: "ALIGNMENT: SOVEREIGN PERFORMANCE ARCHITECTURE",
    coord: "0x00C3",
    icon: UserX
  },
  {
    id: "updates",
    label: "Automated Updates.",
    detail: "Adaptive logic. The framework automatically adjusts to structural market shifts, keeping your system current as conditions evolve.",
    meta: "SYNC_ENGINE: AUTO_CALIBRATION_ON",
    footer: "UPDATE_PROTOCOL: ROLLING_INFRASTRUCTURE_SYNC",
    coord: "0x00D4",
    icon: RefreshCcw
  },
  {
    id: "docs",
    label: "Strategy Documentation.",
    detail: "Technical insight. Every parameter and logic gate is mapped out so you understand exactly how the tools work and how strategies are generated.",
    meta: "DOCS_AUTH: FULL_SYSTEM_SPEC",
    footer: "INTELLIGENCE: ARCHIVING_LOGIC_HIERARCHY",
    coord: "0x00E5",
    icon: FileText
  },
  {
    id: "edge",
    label: "Verifiable Edge.",
    detail: "Performance verification. Every strategy is stress-tested against diverse historical data to ensure results are statistically significant without overfitting testing ecosystems.",
    meta: "CORE_PROCESS: ALPHA_VERIFIED",
    footer: "PROBABILITY: EXECUTING REPEATABLE ADVANTAGE",
    coord: "0x00F6",
    icon: Target
  }
];

const SubtleGlowDot = memo(({ active }: { active?: boolean }) => {
  return (
    <div className="flex flex-1 h-full items-center justify-center relative overflow-visible z-0 min-w-[10px]">
      <div className="relative flex items-center justify-center">
        {/* Static Muted Glow layer */}
        <div 
          className={cn(
            "absolute w-6 h-6 md:w-16 md:h-16 bg-white rounded-full blur-[8px] md:blur-[20px] transition-opacity duration-1000",
            active ? "opacity-[0.05]" : "opacity-[0.01]"
          )}
        />
        {/* Core Dot layer */}
        <div 
          className={cn(
            "w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white transition-opacity duration-1000 shadow-[0_0_6px_rgba(255,255,255,0.2)]",
            active ? "opacity-30" : "opacity-5"
          )} 
        />
      </div>
    </div>
  );
});

const GlowWrapper = memo(({ children, className, active }: { children: React.ReactNode; className?: string; active?: boolean }) => (
  <motion.div
    animate={{ 
      boxShadow: active 
        ? ["0 0 20px rgba(255,255,255,0.12)", "0 0 40px rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.12)"]
        : ["0 0 5px rgba(255,255,255,0.01)", "0 0 5px rgba(255,255,255,0.01)"] 
    }}
    transition={{ duration: active ? 3 : 5, repeat: Infinity, ease: "easeInOut" }}
    className={cn(
      "relative flex items-center justify-center rounded-full shrink-0 border transition-all duration-1000 will-change-transform",
      active ? "border-white/50 bg-white/[0.08]" : "border-white/5 bg-transparent",
      className
    )}
  >
    {children}
  </motion.div>
));

const ShimmeringSilverIcon = memo(({ Icon }: { Icon: any }) => (
  <div className="relative group/shimmer">
    <Icon size={22} className="text-white opacity-40 group-hover/shimmer:opacity-100 transition-opacity" />
    <motion.div
      animate={{ x: [-20, 40], opacity: [0, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    >
      <div className="w-[1px] h-full bg-white blur-[1px] -rotate-12 translate-x-4 opacity-40" />
    </motion.div>
  </div>
));

const BackgroundHUD = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-10">
    <div className="relative w-full h-full max-w-[1200px] max-h-[1200px]">
      <div className="absolute inset-0 border border-white/5 rounded-full scale-100" />
      <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.8]" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.03]" />
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
      <motion.div animate={{ scale: [0.6, 1.2], opacity: [0.2, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-white/10 rounded-full" />
    </div>
  </div>
));

const StepNumber = ({ num, active }: { num: number, active: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: active ? 0.3 : 0.05, 
      y: active ? 0 : 2,
      scale: active ? 1 : 0.98
    }}
    className={cn(
      "font-mono text-[8px] md:text-[9px] font-bold mb-1.5 md:mb-3 tracking-widest transition-all duration-1000",
      active ? "text-white" : "text-white/20"
    )}
  >
    [{num}]
  </motion.div>
);

const TheatricalHeadline = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(' ');
  return (
    <div className={cn("overflow-visible", className)}>
      <motion.h3 
        className="flex flex-wrap gap-x-2 md:gap-x-4 pb-2 -mb-2"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-visible">
            <motion.span
              animate={{ y: ["100%", "0%", "0%", "100%"] }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                times: [0, 0.1, 0.9, 1],
                delay: i * 0.1 
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h3>
    </div>
  );
};

export default function PhilosophySection({ autoSimulate = false, onPoint }: { autoSimulate?: boolean, onPoint?: (x: number, y: number, click?: boolean) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const itemsRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!autoSimulate) return;
    
    let index = 0;
    const interval = setInterval(() => {
      const item = philosophyItems[index];
      setHoveredId(item.id);
      
      const element = itemsRef.current[item.id];
      if (element && onPoint) {
        const rect = element.getBoundingClientRect();
        onPoint(rect.left + 20, rect.top + 30);
      }

      index = (index + 1) % philosophyItems.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [autoSimulate, onPoint]);

  return (
    <section className="relative py-24 md:py-64 overflow-hidden bg-[#050507]">
      <BackgroundHUD />
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div className="lg:col-span-6 lg:pl-8">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[9px] text-white/20 tracking-tighter shrink-0">[0x0000]</span>
              <div className="h-[1px] w-6 bg-white/10" />
              <span className="font-mono text-[8px] md:text-[10px] text-white tracking-tight uppercase font-bold bg-white/5 px-2 py-0.5 border border-white/10 whitespace-nowrap">
                SYSTEM_ROOT: PHILOSOPHY_CORE
              </span>
            </div>
            
            <TheatricalHeadline 
              text="Structured Intelligence." 
              className="font-space-grotesk font-bold text-4xl md:text-7xl lg:text-[76px] text-white mb-6 md:mb-10 leading-[0.85] tracking-tighter"
            />

            <div className="space-y-2 max-w-sm mb-12 md:mb-16">
              <motion.p 
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
                className="font-inter font-medium text-white/90 leading-relaxed text-sm md:text-base tracking-tight"
              >
                Hunter turns complex market analysis into digestible tools and actionable, backtested strategies.
              </motion.p>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>

            {/* Pipeline nodes with improved mobile scaling */}
            <div className="relative flex items-center justify-between w-full border-t border-white/5 pt-10 md:pt-16 max-w-4xl min-h-[110px] md:min-h-[140px] overflow-visible">
              
              {/* NODE 1: RAW DATA */}
              <div className="flex flex-col items-center group w-16 md:w-32 shrink-0 relative z-10">
                <StepNumber num={1} active={activeStep === 0} />
                <div className="w-10 h-10 md:w-24 md:h-24 relative flex items-center justify-center overflow-visible">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 20],
                        y: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 20],
                        opacity: activeStep === 0 ? [0.4, 0.8, 0.4] : [0, 0.1, 0],
                        scale: activeStep === 0 ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                      className="absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.4)]"
                      style={{ width: i % 10 === 0 ? '1.5px' : '0.6px', height: i % 10 === 0 ? '1.5px' : '0.6px', left: '50%', top: '50%' }}
                    />
                  ))}
                </div>
                <div className="text-center mt-2 md:mt-5">
                  <h4 className={cn("font-space-grotesk font-bold text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-1000", activeStep === 0 ? "text-white" : "text-white/30")}>RAW DATA</h4>
                </div>
              </div>

              <SubtleGlowDot active={activeStep === 0 || activeStep === 1} />

              {/* NODE 2: HUNTER ANALYSIS */}
              <div className="flex flex-col items-center group w-16 md:w-32 shrink-0 relative z-10">
                <StepNumber num={2} active={activeStep === 1} />
                <div className="w-10 h-10 md:w-24 md:h-24 flex items-center justify-center">
                  <GlowWrapper className="w-8 h-8 md:w-20 md:h-20" active={activeStep === 1}>
                    <motion.div 
                      animate={activeStep === 1 ? { 
                        opacity: 1,
                        x: [0, 6, 6, -4, -4, 8, 0, 0],
                        y: [0, -4, -4, 6, 6, -3, 0, 0],
                        scale: [1, 1.15, 1.15, 0.9, 0.9, 1.25, 1, 1]
                      } : { 
                        opacity: 0.3,
                        x: 0,
                        y: 0,
                        scale: 1
                      }}
                      transition={{ 
                        duration: activeStep === 1 ? 5.5 : 0.8, 
                        repeat: activeStep === 1 ? Infinity : 0,
                        times: [0, 0.15, 0.25, 0.45, 0.55, 0.75, 0.85, 1], 
                        ease: "anticipate"
                      }}
                      className="flex items-center justify-center"
                    >
                      <Crosshair size={14} strokeWidth={1.5} className={cn("md:hidden transition-all duration-1000", activeStep === 1 ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "text-white/20")} />
                      <Crosshair size={26} strokeWidth={1.5} className={cn("hidden md:block transition-all duration-1000", activeStep === 1 ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" : "text-white/20")} />
                    </motion.div>
                  </GlowWrapper>
                </div>
                <div className="text-center mt-2 md:mt-5">
                  <h4 className={cn("font-space-grotesk font-bold text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-1000", activeStep === 1 ? "text-white" : "text-white/30")}>ANALYSIS</h4>
                </div>
              </div>

              <SubtleGlowDot active={activeStep === 1 || activeStep === 2} />

              {/* NODE 3: ASSESS RISK */}
              <div className="flex flex-col items-center group w-16 md:w-32 shrink-0 relative z-10">
                <StepNumber num={3} active={activeStep === 2} />
                <div className="w-10 h-10 md:w-24 md:h-24 flex items-center justify-center">
                  <div className={cn("w-full h-full border rounded-sm relative flex flex-col p-1 md:p-3 transition-all duration-1000", activeStep === 2 ? "bg-white/[0.08] border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-black/60 border-white/5")}>
                    <Terminal size={8} className={cn("transition-colors duration-1000 mb-0.5 md:mb-2 md:block hidden", activeStep === 2 ? "text-white" : "text-white/20")} />
                    <div className="space-y-0.5 md:space-y-1 font-mono text-[4px] md:text-[8px] text-left uppercase overflow-hidden">
                      <div className={cn("transition-colors duration-1000", activeStep === 2 ? "text-white/90" : "text-white/30")}>&gt; RISK: OK</div>
                      <div className={cn("transition-colors duration-1000", activeStep === 2 ? "text-white/90" : "text-white/30")}>&gt; TGT: 2.5X</div>
                    </div>
                    <motion.div animate={{ scaleX: activeStep === 2 ? 1 : 0 }} className="mt-auto h-0.5 w-full bg-white/20 origin-left" />
                  </div>
                </div>
                <div className="text-center mt-2 md:mt-5">
                  <h4 className={cn("font-space-grotesk font-bold text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-1000", activeStep === 2 ? "text-white" : "text-white/30")}>ASSESS RISK</h4>
                </div>
              </div>

              <SubtleGlowDot active={activeStep === 2 || activeStep === 3} />

              {/* NODE 4: EXECUTE */}
              <div className="flex flex-col items-center group w-16 md:w-32 shrink-0 relative z-10">
                <StepNumber num={4} active={activeStep === 3} />
                <div className="w-10 h-10 md:w-24 md:h-24 flex items-center justify-center relative">
                  <GlowSphere size="sm" tone="white" className={cn("transition-all duration-1000 scale-[0.45] md:scale-90", activeStep === 3 ? "opacity-100" : "opacity-10 grayscale-[1]")} />
                </div>
                <div className="text-center mt-2 md:mt-5">
                  <h4 className={cn("font-space-grotesk font-bold text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-1000", activeStep === 3 ? "text-white" : "text-white/30")}>EXECUTE</h4>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-6 lg:ml-auto relative flex flex-col pt-4 md:pt-12">
            <motion.div layout className="relative z-20 space-y-2.5 flex flex-col">
              {philosophyItems.map((item, index) => {
                const isHovered = hoveredId === item.id;
                const isFirstThree = index < 3;
                const hoverContainerClass = isFirstThree 
                  ? "bg-[#1a0808]/40 border-red-950/60 shadow-[0_0_30px_rgba(153,27,27,0.06)]"
                  : "bg-[#081a10]/40 border-emerald-950/60 shadow-[0_0_30px_rgba(6,78,59,0.06)]";
                const hoverDotClass = isFirstThree
                  ? "bg-red-900 shadow-[0_0_12px_rgba(153,27,27,1)] border-red-800"
                  : "bg-emerald-900 shadow-[0_0_12px_rgba(6,78,59,1)] border-emerald-800";

                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    ref={(el) => { itemsRef.current[item.id] = el; }}
                    onMouseEnter={() => !autoSimulate && setHoveredId(item.id)} 
                    onMouseLeave={() => !autoSimulate && setHoveredId(null)} 
                    className="relative group transition-all duration-300 cursor-pointer will-change-transform"
                  >
                    <div className="absolute left-[-4px] top-[30px] w-[8px] h-[8px] z-30 flex items-center justify-center">
                       <div className={cn(
                         "w-2 h-2 rounded-full border border-white/40 transition-all duration-300", 
                         isHovered ? cn("scale-[2]", hoverDotClass) : "bg-transparent scale-100"
                       )} />
                    </div>
                    <div className={cn(
                      "ml-6 md:ml-8 border p-4 md:p-5 rounded-sm transition-all duration-300", 
                      isHovered ? hoverContainerClass : "bg-white/[0.02] border-white/10"
                    )}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[8px] text-white/20 tracking-tighter">[{item.coord}]</span>
                            <span className={cn("font-mono text-[8px] block tracking-tight uppercase transition-colors duration-300 font-bold", isHovered ? "text-white" : "text-white/60")}>{item.meta}</span>
                          </div>
                          <h4 className={cn("font-space-grotesk font-bold text-base md:text-xl transition-all duration-300 tracking-tighter", isHovered ? "text-white translate-x-1" : "text-white")}>{item.label}</h4>
                        </div>
                        <div className="shrink-0 flex items-center gap-3 h-full pt-1">
                          <ShimmeringSilverIcon Icon={item.icon} />
                        </div>
                      </div>
                      <motion.div 
                        initial={false} 
                        animate={{ 
                          height: isHovered ? "auto" : 0, 
                          opacity: isHovered ? 1 : 0, 
                          marginTop: isHovered ? 10 : 0 
                        }} 
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} 
                        className="overflow-hidden will-change-[height,opacity]"
                      >
                        <div className="space-y-3">
                          <p className="text-white/85 font-inter font-medium leading-relaxed text-[12px] md:text-sm max-w-md tracking-tight">{item.detail}</p>
                          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                            <div className={cn("w-1 h-1 rounded-full animate-pulse", isFirstThree ? "bg-red-800" : "bg-emerald-800")} />
                            <span className="font-mono text-[8px] text-white/50 uppercase tracking-tight font-bold">{item.footer}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Primary Call to Action Button - Centered relative to the column blocks above */}
              <motion.div 
                layout
                className="pt-10 flex justify-center w-full"
              >
                 <div className="w-full max-w-sm pl-6 md:pl-8">
                    <CyberGlowButton 
                      label="GAIN ACCESS" 
                      variant="white"
                      glow={true}
                      onClick={() => window.open('https://whop.com/tradingindicatorsuite/trading-indicator-suite/', '_blank')}
                      statusLabel="SYS: LICENSE"
                      className="w-full"
                    />
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
