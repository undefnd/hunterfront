
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils.js";

interface GlowSphereProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  tone?: "white" | "emerald" | "amber" | "rose";
}

export const GlowSphere: React.FC<GlowSphereProps> = ({ size = "md", className, tone = "white" }) => {
  const containerSizes = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const coreSizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colors = {
    white: {
      gradient: "rgba(255,255,255,0.12)",
      bloom: "rgba(255,255,255,0.25)",
      core: "#FFFFFF",
      shadow: "rgba(255,255,255,0.4)",
      border: "border-white/10"
    },
    emerald: {
      gradient: "rgba(16,185,129,0.12)",
      bloom: "rgba(16,185,129,0.25)",
      core: "#10b981",
      shadow: "rgba(16,185,129,0.5)",
      border: "border-emerald-500/20"
    },
    amber: {
      gradient: "rgba(245,158,11,0.12)",
      bloom: "rgba(245,158,11,0.25)",
      core: "#f59e0b",
      shadow: "rgba(245,158,11,0.5)",
      border: "border-amber-600/20"
    },
    rose: {
      gradient: "rgba(244,63,94,0.12)", 
      bloom: "rgba(244,63,94,0.3)",
      core: "#f43f5e",
      shadow: "rgba(244,63,94,0.6)",
      border: "border-rose-500/30"
    }
  };

  const activeColor = colors[tone];
  const ringDuration = 12; 
  const numRings = 3;
  const stagger = ringDuration / numRings;

  return (
    <div className={cn("relative flex items-center justify-center overflow-visible rounded-full select-none", containerSizes[size], className)}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible rounded-full">
        
        {/* Layer 1: Wide Soft Ambient Glow (No Blur, Radial Gradient Only) */}
        <div 
          className="absolute w-[600%] h-[600%] rounded-full opacity-60 pointer-events-none" 
          style={{ 
            background: `radial-gradient(circle, ${activeColor.gradient} 0%, transparent 70%)`,
            transform: 'translateZ(0)'
          }}
        />

        {/* Layer 2: Medium Bloom (Lower Blur to prevent artifacting) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[200%] h-[200%] rounded-full blur-[40px] pointer-events-none mix-blend-screen"
          style={{ 
            backgroundColor: activeColor.bloom,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />

        {/* Layer 3: Radiating Signal Lines */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 4.5], opacity: [0, 0.15, 0] }}
            transition={{ duration: ringDuration, repeat: Infinity, delay: i * stagger, ease: "linear" }}
            className={cn("absolute w-full h-full border rounded-full will-change-transform", activeColor.border)}
          />
        ))}
      </div>
      
      {/* Central Core with Sharp Glow */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={cn("rounded-full z-10 relative will-change-transform shadow-lg", coreSizes[size])}
        style={{ 
          backgroundColor: activeColor.core,
          boxShadow: `0 0 30px ${activeColor.shadow}`,
          filter: 'brightness(1.1)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};
