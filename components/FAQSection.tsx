
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils.js";
import { CyberGlowButton } from "../App.js";

const faqItems = [
  {
    id: "repaint",
    coord: "0x0F11",
    meta: "LOGIC_GATE: SIGNAL_INTEGRITY",
    question: "Will Hunter repaint or change signals after the fact?",
    answer: "Hunter signals are immutable once the candle closes, ensuring your backtest matches live production reality.",
    footer: "PROTOCOL: IMMUTABLE_CANDLE_FINALIZE",
  },
  {
    id: "platform",
    coord: "0x0F22",
    meta: "SYNC_ENGINE: SYSTEM_PLATFORM",
    question: "What platform do I need to run Hunter?",
    answer: "Hunter is optimized exclusively for TradingView, compatible across all desktop and mobile devices.",
    footer: "ENV: TRADINGVIEW_CORE_SYNC",
  },
  {
    id: "plan",
    coord: "0x0F33",
    meta: "ACCESS_LEVEL: PLAN_REQUIREMENTS",
    question: "Do I need a paid TradingView plan to use it?",
    answer: "A free TradingView account is all you need to deploy the full suite of Hunter indicators.",
    footer: "AUTH: ZERO_SUBSCRIPTION_DEPENDENCY",
  },
  {
    id: "target",
    coord: "0x0F44",
    meta: "USER_PROFILE: UNIVERSAL_ALIGNMENT",
    question: "Who is Hunter meant for?",
    answer: "Hunter helps disciplined traders cut through noise and move faster—bringing institutional-grade tools into a practical, repeatable trading workflow.",
    footer: "CORE: UNIFIED_TECHNICAL_ARCHITECTURE",
  },
  {
    id: "start",
    coord: "0x0F55",
    meta: "DEPLOYMENT: PREREQUISITES",
    question: "What do I need before I start?",
    answer: "You only need a TradingView account and access to liquid markets with reliable volume and price data.",
    footer: "STATUS: READINESS_CHECK_PASSED",
  },
  {
    id: "setup",
    coord: "0x0F66",
    meta: "SYNC_SPEED: DEPLOYMENT_OPTIMIZATION",
    question: "What’s the fastest way to set everything up?",
    answer: "Simply add the indicators to your chart and save your layout as a template for instant deployment.",
    footer: "PROCESS: ROLLING_DEPLOYMENT_ACTIVE",
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="font-space-grotesk font-bold text-3xl md:text-5xl text-white mb-4 tracking-tighter uppercase">Common Inquiries</h2>
          <div className="h-1 w-12 bg-white/20 mx-auto" />
        </div>

        <div className="space-y-4 mb-16">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={cn(
                "border rounded-sm transition-all duration-300",
                isOpen ? "bg-white/[0.04] border-white/20" : "bg-white/[0.01] border-white/5"
              )}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[8px] text-white/20 tracking-tighter">[{item.coord}]</span>
                      <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-bold">{item.meta}</span>
                    </div>
                    <span className="font-space-grotesk font-bold text-lg text-white tracking-tight">{item.question}</span>
                  </div>
                  <ChevronDown className={cn("text-white/20 group-hover:text-white transition-all", isOpen ? "rotate-180" : "rotate-0")} size={20} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 space-y-4">
                        <div className="h-[1px] w-full bg-white/5" />
                        <p className="font-inter text-white/60 leading-relaxed text-sm max-w-2xl">{item.answer}</p>
                        <div className="flex items-center gap-2 opacity-40">
                          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                          <span className="font-mono text-[8px] text-white uppercase tracking-widest font-bold">{item.footer}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
           <CyberGlowButton 
             label="GAIN ACCESS" 
             onClick={() => window.open('https://whop.com/tradingindicatorsuite/trading-indicator-suite/', '_blank')}
             statusLabel="SYS: LICENSE"
             className="min-w-[280px]"
           />
        </div>
      </div>
    </section>
  );
}
