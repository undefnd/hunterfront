
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  UserX, 
  RefreshCcw, 
  FileText, 
  Target 
} from "lucide-react";
import { cn } from "../lib/utils.js";

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

export default function PhilosophyShowcase({ autoSimulate = true }: { autoSimulate?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % philosophyItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoSimulate]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#050507] flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">
      {/* Background HUD Graphics */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-white/5 rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-4">
        {philosophyItems.map((item, index) => {
          const isActive = activeIndex === index;
          const isFirstThree = index < 3;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              animate={{
                scale: isActive ? 1.02 : 1,
                opacity: isActive ? 1 : 0.25,
                x: isActive ? 0 : -10
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              {/* Active Indicator Dot */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className={cn(
                  "w-3 h-3 rounded-full border transition-all duration-700",
                  isActive 
                    ? (isFirstThree 
                        ? "bg-rose-600 border-rose-400 shadow-[0_0_20px_#e11d48] scale-125" 
                        : "bg-emerald-600 border-emerald-400 shadow-[0_0_20px_#10b981] scale-125")
                    : "bg-transparent border-white/20 scale-75"
                )} />
              </div>

              {/* Main Card */}
              <div className={cn(
                "border p-6 md:p-8 rounded-sm transition-all duration-700 backdrop-blur-sm relative overflow-hidden",
                isActive 
                  ? (isFirstThree 
                      ? "bg-rose-950/10 border-rose-900/40 shadow-[0_0_50px_rgba(225,29,72,0.05)]" 
                      : "bg-emerald-950/10 border-emerald-900/40 shadow-[0_0_50px_rgba(16,185,129,0.05)]")
                  : "bg-white/[0.01] border-white/5"
              )}>
                {/* Glossy Overlay for Active State */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-white/20 tracking-tighter">[{item.coord}]</span>
                      <div className="h-px w-4 bg-white/10" />
                      <span className={cn(
                        "font-mono text-[10px] uppercase font-bold tracking-[0.2em]",
                        isActive ? (isFirstThree ? "text-rose-400" : "text-emerald-400") : "text-white/40"
                      )}>
                        {item.meta}
                      </span>
                    </div>

                    <h4 className="font-space-grotesk font-bold text-xl md:text-3xl text-white tracking-tight">
                      {item.label}
                    </h4>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="font-inter text-white/60 text-sm md:text-base leading-relaxed max-w-2xl py-4">
                            {item.detail}
                          </p>
                          <div className="h-px w-full bg-white/5 my-2" />
                          <div className="flex items-center gap-2 pt-2">
                            <span className={cn("animate-pulse font-bold", isFirstThree ? "text-rose-500" : "text-emerald-500")}>-</span>
                            <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-bold">
                              {item.footer}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={cn(
                    "shrink-0 p-3 rounded-sm border transition-all duration-700",
                    isActive 
                      ? (isFirstThree ? "bg-rose-500/10 border-rose-500/40 text-rose-400" : "bg-emerald-500/10 border-emerald-500/40 text-emerald-400")
                      : "bg-white/5 border-white/10 text-white/20"
                  )}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050507] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] to-transparent z-20 pointer-events-none" />
    </div>
  );
}
