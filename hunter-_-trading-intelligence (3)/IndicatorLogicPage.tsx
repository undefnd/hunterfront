/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground.js';
import { MomentumChart, RangeChart, FlowChart } from './components/EnvironmentsSection.js';

interface LogicTopic {
  id: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
  coord: string;
}

const FunnelVisual = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-2">
    <div className="w-24 h-6 border border-white/20 bg-white/10 skew-x-[-20deg]" />
    <div className="w-16 h-6 border border-white/20 bg-white/10 skew-x-[-20deg]" />
    <div className="w-8 h-6 border border-white/20 bg-white/10 skew-x-[-20deg]" />
  </div>
);

const LOGIC_TOPICS: LogicTopic[] = [
  {
    id: 'timeframe-funnel',
    title: 'TIMEFRAME FUNNEL',
    desc: 'Establish multi-timeframe confluence across three distinct phases: Horizon, The Hunt, and The Apex.',
    visual: <FunnelVisual />,
    coord: '0x05EE',
  },
  {
    id: 'm&r',
    title: 'M&R LOGIC',
    desc: "The world's most powerful regime-detection engine. Defines directional bias and trend health using Binary Candle Logic.",
    visual: <MomentumChart />,
    coord: '0x03CC',
  },
  {
    id: 'average-range',
    title: 'AVERAGE RANGE',
    desc: 'How to define price extension vs normal deviations using Gaussian-weighted probability envelopes.',
    visual: <RangeChart />,
    coord: '0x02BB',
  },
  {
    id: 'ebb-flow',
    title: 'EBB + FLOW',
    desc: 'Measures institutional pressure behind price action. Identifying high-intensity accumulation zones.',
    visual: <FlowChart />,
    coord: '0x01DD',
  }
];

export default function IndicatorLogicPage({ onBack, onSelectIndicator }: { onBack: () => void, onSelectIndicator: (id: string) => void }) {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-foreground flex flex-col font-mono selection:bg-primary/20 overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="h-16 border-b border-white/10 px-6 md:px-12 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Back to HQ</span>
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white tracking-[0.3em] uppercase">Documentation</span>
            <span className="text-[7px] text-white/20 uppercase tracking-widest">Technical Specifications // v2.5.1</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 md:p-12 lg:p-24">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex items-center gap-4 justify-center lg:justify-start">
               <div className="h-px w-8 bg-white/20" />
               <span className="text-[10px] font-bold text-primary uppercase tracking-[0.5em]">SYSTEM_CORE: LOGIC_GATEWAYS</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">
              INDICATOR DOCUMENTATION.
            </h1>
            <p className="text-white/40 text-sm md:text-lg max-w-2xl font-inter leading-relaxed mx-auto lg:mx-0">
              Deep-dive into the technical logic and frameworks defining the Hunter ecosystem. Each module is a layer in the multi-confluence decision stack.
            </p>
          </div>

          {/* The Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOGIC_TOPICS.map((topic, idx) => (
              <motion.div 
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                onClick={() => onSelectIndicator(topic.id)}
                className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-sm flex flex-col group transition-all cursor-pointer min-h-[480px] hover:bg-white/[0.04]"
              >
                {/* Circular Animated Icon Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-10 group-hover:scale-105 transition-transform duration-500 perspective-1000">
                  <div className="absolute inset-0 rounded-full border border-white/5 bg-white/[0.03] group-hover:border-white/20 transition-colors backdrop-blur-sm" />
                  <div className="absolute inset-2 rounded-full flex items-center justify-center bg-[#08080A]/80 z-10" style={{ transform: 'translateZ(0)' }}>
                    <div className="w-full h-full scale-90">
                      {topic.visual}
                    </div>
                  </div>
                  {/* Decorative Scan Ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-6px] border border-dashed border-white/5 rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2 opacity-30">
                    <span className="font-mono text-[9px] tracking-widest uppercase">[{topic.coord}]</span>
                    <div className="h-px w-4 bg-white" />
                  </div>
                  <h3 className="font-space-grotesk font-bold text-xl md:text-2xl text-white tracking-tighter uppercase leading-tight group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="font-inter text-xs text-white/40 leading-relaxed min-h-[4.5em]">
                    {topic.desc}
                  </p>
                </div>

                <div className="pt-8 mt-auto border-t border-white/5 flex items-center justify-between group/link">
                  <button className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] group-hover:text-primary transition-colors flex items-center gap-3">
                    EXPLORE LOGIC 
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed top-1/4 -right-96 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none opacity-40" />
      <div className="fixed bottom-1/4 -left-96 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none opacity-40" />
    </div>
  );
}
