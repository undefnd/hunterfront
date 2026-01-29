/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { GlowSphere } from './GlowSphere.js';
import { cn } from '../lib/utils.js';
import ScrollingBanner from './ScrollingBanner.js';

const CinematicFlare = ({ className }: { className?: string }) => (
  <motion.div 
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className={cn("absolute rounded-full bg-white/5 blur-[120px] pointer-events-none", className)}
  />
);

const DataWaterfall = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden flex justify-around">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ 
          duration: 15 + Math.random() * 20, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 10 
        }}
        className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white to-transparent"
      />
    ))}
  </div>
);

const KineticHeadline = ({ text, delay = 0, opacity = "text-white" }: { text: string; delay?: number; opacity?: string }) => {
  const letters = Array.from(text);
  
  return (
    <div className="flex flex-wrap">
      {letters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden whitespace-pre">
          <motion.span
            initial={{ y: "110%", opacity: 0, rotateX: 90 }}
            animate={{ 
              y: ["110%", "0%", "0%", "110%"], 
              opacity: [0, 1, 1, 0],
              rotateX: [90, 0, 0, -90]
            }}
            transition={{ 
              duration: 8, 
              delay: delay + (i * 0.03), 
              repeat: Infinity,
              times: [0, 0.12, 0.88, 1],
              ease: [0.22, 1, 0.36, 1] 
            }}
            className={cn("inline-block font-space-grotesk font-bold text-5xl sm:text-6xl md:text-6xl lg:text-6xl leading-[0.85] tracking-tighter uppercase", opacity)}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default function MarketingHero() {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#050507] overflow-hidden flex items-center">
      {/* Background Theatrical Layers */}
      <div className="absolute inset-0 z-0">
        <DataWaterfall />
        <CinematicFlare className="w-[800px] h-[800px] -top-1/4 -left-1/4" />
        <CinematicFlare className="w-[600px] h-[600px] -bottom-1/4 -right-1/4 opacity-10" />
        
        {/* Scanning Grid Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 relative">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col text-left"
        >
          <motion.div 
            animate={{ width: [0, 60, 60, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
            className="h-[2px] bg-white mb-12 shadow-[0_0_15px_white]"
          />
          
          <div className="space-y-2 mb-10">
            <KineticHeadline text="HUNTER" delay={0} />
          </div>

          <motion.p 
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, 20]
            }}
            transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1], delay: 0.6 }}
            className="font-space-grotesk text-lg md:text-xl text-white/60 max-w-lg mb-12 leading-tight tracking-tight"
          >
            Trading intelligence toolkit for <span className="text-white">high-conviction</span> decision making and actionable insight.
          </motion.p>

          <motion.div 
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.8 }}
            className="relative w-full max-w-xl"
          >
            <ScrollingBanner />
          </motion.div>
        </motion.div>

        {/* Right Column: High-Drama Orb Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Rotating Theatrical HUD Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[120%] h-[120%] border border-dashed border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[140%] h-[140%] border border-white/5 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-white/20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-white/20" />
          </motion.div>

          {/* Central Theatrical Orb */}
          <div className="relative group cursor-crosshair">
            <GlowSphere size="xl" tone="white" className="scale-110 md:scale-125" />
            
            {/* Focal Point Markers */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-px h-[200%] bg-white/[0.03] absolute" />
              <div className="h-px w-[200%] bg-white/[0.03] absolute" />
              
              <div className="absolute -top-12 -left-12 font-mono text-[8px] text-white/20 tracking-widest uppercase">
                [ VISUAL_UPLINK_01 ]
              </div>
              <div className="absolute -bottom-12 -right-12 font-mono text-[8px] text-white/20 tracking-widest uppercase">
                [ STATUS: OPTIMAL ]
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Horizontal Beam */}
      <motion.div 
        animate={{ 
          opacity: [0, 0.3, 0],
          top: ["20%", "80%", "20%"]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
      />
    </div>
  );
}