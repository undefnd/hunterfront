
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { motion } from "framer-motion";
import { Crosshair, Terminal } from "lucide-react";
import { cn } from "../lib/utils.js";

const ConnectingLine = () => (
  <div className="hidden md:block flex-1 h-[1px] relative overflow-visible mx-2">
    {/* Soft Glow Base - White */}
    <div className="absolute inset-0 bg-white/20 blur-[1px]" />
    <div className="absolute inset-0 bg-white/10" />
    
    {/* Traveling Pulse - Soft White */}
    <motion.div 
      animate={{ left: ["-50%", "150%"], opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-1px] bottom-[-1px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[2px]"
    />
    
    {/* Central Dot for Detail */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-1 h-1 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
    </div>
  </div>
);

const GlowWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    animate={{ 
      boxShadow: [
        "0 0 20px rgba(255,255,255,0.01)", 
        "0 0 40px rgba(255,255,255,0.04)", 
        "0 0 20px rgba(255,255,255,0.01)"
      ] 
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className={cn(
      "relative flex items-center justify-center rounded-full shrink-0 border border-white/10 bg-transparent",
      className
    )}
  >
    {children}
  </motion.div>
);

export default function ClaritySection() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Main Pipeline Layout */}
        <div className="relative flex flex-col md:flex-row items-start justify-center max-w-7xl mx-auto mb-16">
          
          {/* NODE 1: RAW DATA */}
          <div className="flex flex-col items-center group w-48 shrink-0">
            {/* Visual Container */}
            <div className="w-28 h-28 relative flex items-center justify-center">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [
                      (Math.random() - 0.5) * 60, 
                      (Math.random() - 0.5) * 100, 
                      (Math.random() - 0.5) * 60
                    ],
                    y: [
                      (Math.random() - 0.5) * 60, 
                      (Math.random() - 0.5) * 100, 
                      (Math.random() - 0.5) * 60
                    ],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 2
                  }}
                  className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  style={{ 
                    width: i % 5 === 0 ? '3px' : '1px', 
                    height: i % 5 === 0 ? '3px' : '1px', 
                    left: '50%', 
                    top: '50%' 
                  }}
                />
              ))}
            </div>
            {/* Label Container */}
            <div className="text-center mt-6 space-y-1">
              <h4 className="font-space-grotesk font-bold text-[11px] text-white tracking-[0.4em] uppercase">RAW DATA</h4>
              <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest font-light">unfiltered noise</p>
            </div>
          </div>

          <div className="hidden md:flex h-28 items-center flex-1">
            <ConnectingLine />
          </div>

          {/* NODE 2: HUNTER */}
          <div className="flex flex-col items-center group w-48 shrink-0">
            <GlowWrapper className="w-28 h-28">
              <div className="relative flex items-center justify-center w-full h-full bg-transparent">
                <motion.div 
                  animate={{ 
                    x: [0, 10, -8, 5, 0], 
                    y: [0, -12, 10, -5, 0],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center bg-transparent"
                >
                  <Crosshair size={32} strokeWidth={1.5} className="text-white opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </motion.div>
                <div className="absolute inset-2 border border-white/5 rounded-full pointer-events-none" />
              </div>
            </GlowWrapper>
            <div className="text-center mt-6 space-y-1">
              <h4 className="font-space-grotesk font-bold text-[11px] text-white tracking-[0.4em] uppercase">Hunter</h4>
              <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest font-light">analysis engine</p>
            </div>
          </div>

          <div className="hidden md:flex h-28 items-center flex-1">
            <ConnectingLine />
          </div>

          {/* NODE 3: ASSESS RISK */}
          <div className="flex flex-col items-center group w-48 shrink-0">
            <div className="w-28 h-28 flex items-center justify-center">
              <div className="w-full h-22 bg-black/60 border border-white/10 rounded-sm relative flex flex-col p-3 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <Terminal size={10} className="text-white/30" />
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="space-y-1.5 font-mono text-[7px] text-left leading-none uppercase">
                  <div className="flex gap-2">
                    <span className="text-white/20">&gt;</span>
                    <span className="text-white/60 tracking-widest">target:</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/20">&gt;</span>
                    <span className="text-white/60 tracking-widest">risk_calc:</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/20">&gt;</span>
                    <span className="text-white/60 tracking-widest">inval:</span>
                  </div>
                </div>
                <motion.div 
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-auto h-[1px] w-full bg-white/10" 
                />
              </div>
            </div>
            <div className="text-center mt-6 space-y-1">
              <h4 className="font-space-grotesk font-bold text-[11px] text-white tracking-[0.4em] uppercase">ASSESS RISK</h4>
              <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest font-light">directive & planned</p>
            </div>
          </div>

          <div className="hidden md:flex h-28 items-center flex-1">
            <ConnectingLine />
          </div>

          {/* NODE 4: EXECUTE */}
          <div className="flex flex-col items-center group w-48 shrink-0">
            {/* Reduced visual size for fourth node */}
            <div className="w-28 h-28 relative flex items-center justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [0.5, 1.8],
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 1.3,
                    ease: "easeOut"
                  }}
                  className="absolute inset-4 border border-white/20 rounded-full"
                />
              ))}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 10px rgba(255,255,255,0.4)",
                    "0 0 25px rgba(255,255,255,0.8)",
                    "0 0 10px rgba(255,255,255,0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-6 bg-white rounded-full z-10" 
              />
            </div>
            <div className="text-center mt-6 space-y-1">
              <h4 className="font-space-grotesk font-bold text-[11px] text-white tracking-[0.4em] uppercase leading-tight">EXECUTE</h4>
              <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest font-light">focus & clarity</p>
            </div>
          </div>

        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-inter text-sm md:text-xl text-white/30 tracking-tight max-w-xl mx-auto leading-relaxed text-center"
        >
          Don't go into battle alone. <br/>
          <span className="text-white font-bold tracking-normal">Let Hunter handle the heavy lifting.</span>
        </motion.p>
      </div>
    </section>
  );
}
