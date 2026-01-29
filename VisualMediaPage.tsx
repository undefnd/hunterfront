
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Layout, Smartphone, Terminal, Database, Activity, Target, ShieldCheck, Zap, Sparkles, BookOpen } from 'lucide-react';
import { cn } from './lib/utils.js';
import PhilosophySection from './components/PhilosophySection.js';
import MethodologySection from './components/MethodologySection.js';
import EnvironmentsSection from './components/EnvironmentsSection.js';
import FAQSection from './components/FAQSection.js';
import MarketingHero from './components/MarketingHero.js';
import PhilosophyShowcase from './components/PhilosophyShowcase.js';
import AnimatedBackground from './components/AnimatedBackground.js';

interface MediaChapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  component: (onPoint?: (x: number, y: number, click?: boolean) => void) => React.ReactNode;
  icon: React.ReactNode;
  hideOverlay?: boolean;
}

export default function VisualMediaPage({ onBack }: { onBack: () => void }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chapters: MediaChapter[] = [
    {
      id: 'marketing-hero',
      title: 'BRAND IDENTITY',
      subtitle: 'Atmospheric Hero',
      icon: <Sparkles size={16} />,
      description: 'The cinematic visual baseline for the Hunter ecosystem. High-fidelity motion design paired with uncompromising systemic clarity.',
      component: () => <MarketingHero />,
      hideOverlay: true
    },
    {
      id: 'philosophy',
      title: 'THE CORE PHILOSOPHY',
      subtitle: 'Systemic Rigor',
      icon: <Database size={16} />,
      description: 'Watch as the system prioritizes high-conviction logic over signal frequency. Our philosophy is built on immutable data streams.',
      component: () => <PhilosophySection autoSimulate={true} />
    },
    {
      id: 'toolkit',
      title: 'INDICATOR TOOLKIT',
      subtitle: 'Multi-Confluence Engine',
      icon: <Activity size={16} />,
      description: 'Explore the terminal cards as they process real-time market data. Each indicator defines a specific layer of market structure.',
      component: () => <EnvironmentsSection autoSimulate={true} />
    },
    {
      id: 'methodology',
      title: 'ANALYSIS MATRIX',
      subtitle: 'Repeatable Edge',
      icon: <Target size={16} />,
      description: 'See the transition from raw data to tactical execution. The analysis matrix synthesizes Environment, Volatility, Signals, and Flow.',
      component: () => <MethodologySection autoSimulate={true} />
    },
    {
      id: 'support',
      title: 'SYSTEM DOCUMENTATION',
      subtitle: 'Unrivaled Clarity',
      icon: <ShieldCheck size={16} />,
      description: 'Full transparency into every logic gate and parameter. We archive the logic hierarchy to ensure you understand exactly how the tools work.',
      component: () => <FAQSection />
    },
    {
      id: 'philosophy-showcase',
      title: 'SYSTEMIC SOVEREIGNTY',
      subtitle: 'High-Fidelity Core',
      icon: <BookOpen size={16} />,
      description: 'A detailed look at the core principles guiding our development. Full-screen readability for technical deep-dives.',
      component: () => <PhilosophyShowcase autoSimulate={true} />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollPos = scrollRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPos / windowHeight);
      if (index !== activeChapterIndex && index < chapters.length) {
        setActiveChapterIndex(index);
      }
    };

    const currentScrollRef = scrollRef.current;
    currentScrollRef?.addEventListener('scroll', handleScroll);
    return () => currentScrollRef?.removeEventListener('scroll', handleScroll);
  }, [activeChapterIndex, chapters.length]);

  const scrollToChapter = (index: number) => {
    scrollRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="h-screen bg-[#050507] text-foreground flex flex-col font-mono selection:bg-primary/20 overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 px-6 md:px-12 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Back to Command</span>
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white tracking-[0.3em] uppercase">Visual Media</span>
            <span className="text-[7px] text-white/20 uppercase tracking-widest">Showcase Mode // v2.5.1 STABLE</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-sm border border-white/10">
           <Zap size={14} className="text-primary animate-pulse" />
           <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Live Interaction Demo Mode</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="hidden md:flex w-72 border-r border-white/10 bg-black/40 flex-col shrink-0 z-40">
          <div className="p-8 space-y-8 flex-1">
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] block">CHAPTER_INDEX</span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>

            <nav className="space-y-4">
              {chapters.map((chapter, idx) => (
                <button 
                  key={chapter.id} 
                  onClick={() => scrollToChapter(idx)}
                  className={cn(
                    "w-full text-left group transition-all relative flex flex-col gap-1 p-4 rounded-sm border",
                    activeChapterIndex === idx 
                      ? "bg-white/5 border-white/20" 
                      : "border-transparent opacity-40 hover:opacity-100 hover:bg-white/[0.02]"
                  )}
                >
                  {activeChapterIndex === idx && (
                    <motion.div layoutId="active-indicator" className="absolute left-[-1px] top-4 bottom-4 w-[2px] bg-primary" />
                  )}
                  <div className="flex items-center gap-3">
                    <span className={cn("text-[10px] font-bold transition-colors", activeChapterIndex === idx ? "text-primary" : "text-white/40")}>
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                      {chapter.subtitle}
                    </span>
                  </div>
                  <span className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-medium ml-7 truncate">
                    {chapter.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 border-t border-white/10 bg-black/20">
             <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between">
                 <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">System Status</span>
                 <span className="text-[9px] text-emerald-500 font-bold uppercase">Ready</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-1/3 h-full bg-primary/40" 
                    />
                 </div>
               </div>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main 
          ref={scrollRef}
          className="flex-1 overflow-y-auto scroll-snap-y mandatory scrollbar-hide bg-[#050507]"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {chapters.map((chapter, idx) => {
            const isLeftSide = idx === 1 || idx === 2 || idx === 3;
            return (
              <section 
                key={chapter.id}
                className="h-screen w-full relative flex flex-col scroll-snap-align-start overflow-hidden"
                style={{ scrollSnapAlign: 'start' }}
              >
                {!chapter.hideOverlay && (
                  <div className={cn(
                    "absolute top-0 p-8 md:p-12 z-20 pointer-events-none w-full flex",
                    isLeftSide ? "left-0 justify-start" : "right-0 justify-end"
                  )}>
                    <div className={cn(
                      "space-y-4",
                      isLeftSide ? "text-left max-w-sm" : "text-right max-w-md"
                    )}>
                      <motion.div 
                        initial={{ opacity: 0, x: isLeftSide ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                          "flex items-center gap-4",
                          isLeftSide ? "justify-start" : "justify-end"
                        )}
                      >
                        <div className="w-10 h-10 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,255,255,0.05)] shrink-0 order-first">
                          {chapter.icon}
                        </div>
                        <div className={cn(
                          "flex flex-col",
                          isLeftSide ? "items-start" : "items-end"
                        )}>
                          <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">Section 0{idx + 1}</span>
                          <h2 className="text-xl md:text-2xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">
                            {chapter.title}
                          </h2>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-hidden relative">
                  <div className="h-full w-full">
                    {chapter.component()}
                  </div>
                </div>

                {/* Section Footer Progress */}
                <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between opacity-20 pointer-events-none">
                   <span className="text-[9px] font-bold uppercase tracking-[0.5em]">Scroll Down for Next Module</span>
                   <div className="flex gap-1">
                     {chapters.map((_, i) => (
                       <div key={i} className={cn("w-6 h-1 rounded-full", activeChapterIndex === i ? "bg-white" : "bg-white/20")} />
                     ))}
                   </div>
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
