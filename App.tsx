/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import ScrollingBanner from './components/ScrollingBanner.js';
import PhilosophySection from './components/PhilosophySection.js';
import MethodologySection from './components/MethodologySection.js';
import EnvironmentsSection from './components/EnvironmentsSection.js';
import SynthesisEngineSection from './components/SynthesisEngineSection.js';
import FAQSection from './components/FAQSection.js';
import TimeframeAnalysisPage from './TimeframeAnalysisPage.js';
import DashboardPage from './DashboardPage.js';
import VisualMediaPage from './VisualMediaPage.js';
import GettingStartedPage from './GettingStartedPage.js';
import TerminalSetupPage from './TerminalSetupPage.js';
import IndicatorLogicPage from './IndicatorLogicPage.js';
import IndicatorDetailPage from './IndicatorDetailPage.js';
import FirstHuntPage from './FirstHuntPage.js';
import AnimatedBackground from './components/AnimatedBackground.js';
import { GlowSphere } from './components/GlowSphere.js';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, XCircle, Loader2, Lock, Terminal, ShieldAlert, ExternalLink, Globe, Twitter, Crosshair, Play, BookOpen, LogOut, ChevronRight, X as XIcon, CornerDownLeft, Construction, ArrowRight, Monitor } from 'lucide-react';
import { cn } from './lib/utils.js';

const VALID_CODES = ['JABBEN', 'PUCK-TEST1'];

const HUDTelemetry = () => null;

const ComingSoonPage = ({ onBack }: { onBack: () => void }) => (
  <div className="h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 text-center space-y-8 relative overflow-hidden font-mono">
    <AnimatedBackground />
    <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <Construction size={40} strokeWidth={1} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-space-grotesk font-black uppercase tracking-tighter italic">Under Construction.</h2>
        <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
          This intelligence module is currently being calibrated for systemic stability. Access will be granted in a future deployment.
        </p>
      </div>
      <button 
        onClick={onBack}
        className="px-8 py-3 bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] rounded-sm hover:scale-105 transition-all"
      >
        Return to Command
      </button>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none" />
  </div>
);

/**
 * Polished Chrome & Monochromatic Holographic Button
 * High-contrast metallic reflection
 */
export const ChromeHoloButton = ({ 
  label, 
  onClick, 
  className,
  icon: Icon = ArrowRight
}: { 
  label: string; 
  onClick?: () => void; 
  className?: string;
  icon?: any;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group overflow-hidden px-16 py-6 rounded-sm transition-all duration-500",
        "border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        className
      )}
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #D1D5DB 15%, #F3F4F6 30%, #9CA3AF 45%, #4B5563 55%, #FFFFFF 100%)",
      }}
    >
      {/* Gloss Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-20" />
      
      {/* Monochromatic Holographic Shimmer Layer */}
      <motion.div 
        animate={{ 
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          background: "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        className="absolute inset-[-100%] z-10 pointer-events-none mix-blend-overlay group-hover:opacity-100 opacity-60 transition-opacity"
      />

      {/* Surface Texture (Grain) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-soft-light pointer-events-none z-10" />

      {/* Button Content */}
      <span className="relative z-30 flex items-center justify-center gap-4 font-space-grotesk font-black text-sm text-black uppercase tracking-[0.5em] drop-shadow-[0_1px_0px_rgba(255,255,255,0.8)]">
        {label}
        {Icon && <Icon size={20} className="group-hover:translate-x-1 transition-transform" />}
      </span>

      {/* Rim Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/60 z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/40 z-30" />
    </motion.button>
  );
};

export const CyberGlowButton = ({ 
  label, 
  onClick, 
  statusLabel, 
  className, 
  variant = 'white', 
  type = 'button',
  disabled = false,
  glow = true
}: { 
  label: string; 
  onClick?: () => void; 
  statusLabel?: string; 
  className?: string;
  variant?: 'white' | 'gray' | 'red' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
  glow?: boolean;
}) => {
  const variants = {
    white: { 
      bg: 'bg-white', 
      text: 'text-black', 
      border: 'border-white/20',
      shadow: glow ? 'shadow-[0_0_25px_rgba(255,255,255,0.45)]' : 'shadow-none'
    },
    gray: { 
      bg: 'bg-zinc-800', 
      text: 'text-zinc-100', 
      border: 'border-zinc-500/20',
      shadow: glow ? 'shadow-[0_0_25px_rgba(161,161,170,0.15)]' : 'shadow-none'
    },
    red: { 
      bg: 'bg-rose-950/40', 
      text: 'text-rose-400', 
      border: 'border-rose-500/20',
      shadow: glow ? 'shadow-[0_0_25px_rgba(244,63,94,0.15)]' : 'shadow-none'
    },
    outline: {
      bg: 'bg-white/5 hover:bg-white/10',
      text: 'text-white',
      border: 'border-white/10 hover:border-white/30',
      shadow: glow ? 'shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'shadow-none'
    }
  };

  const colors = variants[variant];

  return (
    <div className={cn("relative group", className)}>
      {statusLabel && (
        <div className="flex items-center gap-2 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <div className="h-[1px] w-3 bg-white/60 group-hover:bg-white" />
          <span className="font-mono text-[7px] tracking-widest uppercase text-white font-bold">{statusLabel}</span>
        </div>
      )}
      
      <div className="relative inline-block w-full">
        <motion.button
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={cn(
            "w-full relative px-4 md:px-6 py-4 font-space-grotesk font-bold text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase rounded-sm z-10 transition-all border",
            colors.bg,
            colors.text,
            colors.shadow,
            colors.border,
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </motion.button>
      </div>
    </div>
  );
};

const AuthGate = ({ onAuthorized, onCancel }: { onAuthorized: () => void; onCancel: () => void }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'granted' | 'denied'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code || status === 'verifying') return;
    
    setStatus('verifying');
    await new Promise(r => setTimeout(r, 1200));

    if (VALID_CODES.includes(code.toUpperCase())) {
      setStatus('granted');
      await new Promise(r => setTimeout(r, 1500));
      onAuthorized();
    } else {
      setStatus('denied');
      await new Promise(r => setTimeout(r, 2800));
      setStatus('idle');
      setCode('');
      // Force refocusing the hidden input so user can type again immediately
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const getGlowTone = () => {
    if (status === 'granted') return 'white';
    if (status === 'denied') return 'rose';
    return 'white';
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={handleContainerClick}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center p-6 cursor-text overflow-hidden"
    >
      <AnimatedBackground />
      
      <div className="w-full max-w-2xl flex flex-col items-center gap-6 relative z-10 overflow-visible">
        {/* Glow Sphere Wrapper - Ensuring overflow visible for blurs */}
        <div className="overflow-visible flex items-center justify-center w-80 h-80 relative mb-8">
          <motion.div
            animate={
              status === 'granted' ? { 
                scale: [1, 2.5, 4], 
                filter: ["blur(0px)", "blur(20px)", "blur(100px)"],
                opacity: [1, 1, 0] 
              } : 
              status === 'denied' ? {
                scale: [1, 1.25, 0.95, 1.25, 1],
                opacity: [1, 0.8, 1, 0.8, 1]
              } : {}
            }
            transition={{ duration: status === 'granted' ? 1.5 : 0.5, ease: "easeInOut" }}
            className="overflow-visible rounded-full"
          >
            <GlowSphere 
                size="md" 
                tone={getGlowTone()} 
                className="transition-all duration-500"
            />
          </motion.div>
        </div>

        {/* Minimal Terminal Input Area */}
        <div className="w-full flex flex-col items-center gap-6">
          <form 
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center justify-center gap-8 min-h-[140px]"
          >
            <input 
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute opacity-0 pointer-events-none"
              autoFocus
              disabled={status === 'verifying' || status === 'granted'}
            />
            
            <div className="flex items-center gap-2 font-mono text-3xl md:text-5xl tracking-[0.2em] text-white font-bold h-16">
              <span className={cn(code.length === 0 && "text-white/20 uppercase")}>
                {code.length > 0 ? code.toUpperCase() : 'ENTER_TOKEN'}
              </span>
              {/* Fix: Changed easing 'steps(1)' to 'linear' to resolve framer-motion type error */}
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-5 h-10 md:w-8 md:h-14 bg-white/70"
              />
            </div>

            {/* Subtle Enter Dashboard Action */}
            <div className="h-10">
                <AnimatePresence>
                    {(status === 'idle') && (
                        <motion.button
                            type="submit"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            whileHover={{ scale: 1.05 }}
                            className="group flex items-center gap-3 transition-all duration-300 px-6 py-2 rounded-sm border border-white/10 hover:border-white/40 bg-white/5 hover:bg-white/10"
                        >
                            <CornerDownLeft size={12} className="text-white/40 group-hover:text-primary" />
                            <span className="font-mono text-[10px] text-white uppercase tracking-[0.4em] font-bold">ENTER_DASHBOARD</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
          </form>

          {/* Feedback Layer */}
          <div className="h-12 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
                {status === 'denied' ? (
                <motion.div 
                    key="denied"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-rose-500 font-mono text-[11px] uppercase tracking-[0.4em] font-bold">
                    ERR: INVALID_IDENTITY_TOKEN
                    </span>
                    <span className="text-white/20 font-mono text-[9px] uppercase tracking-[0.2em] font-bold">PLEASE ENTER VALID TOKEN</span>
                </motion.div>
                ) : status === 'verifying' ? (
                <motion.div 
                    key="verifying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-white/40 font-mono text-[11px] uppercase tracking-[0.5em] font-bold"
                >
                    <Loader2 size={12} className="animate-spin text-white/60" />
                    <span>AUTHORIZING...</span>
                </motion.div>
                ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col items-center gap-10 mt-12 w-full relative overflow-visible">
            <motion.button
                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                    boxShadow: [
                        "0 0 20px rgba(255,255,255,0.1)", 
                        "0 0 60px rgba(255,255,255,0.5)", 
                        "0 0 20px rgba(255,255,255,0.1)"
                    ],
                    opacity: [1, 0.9, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                onClick={(e) => { e.stopPropagation(); window.open('https://whop.com/tradingindicatorsuite/trading-indicator-suite/', '_blank'); }}
                className="px-20 py-5 bg-white text-black font-space-grotesk font-black text-[15px] uppercase tracking-[0.4em] rounded-sm relative z-20 shadow-2xl transition-all"
            >
                GAIN ACCESS
            </motion.button>

            {/* Exit Action */}
            <motion.button 
                whileHover={{ opacity: 1, y: -2 }}
                onClick={(e) => { e.stopPropagation(); onCancel(); }}
                className="group flex flex-col items-center gap-3 opacity-30 transition-all hover:opacity-100"
            >
                <div className="h-[1px] w-12 bg-white/20 group-hover:bg-white/80 transition-all" />
                <span className="font-mono text-[10px] text-white uppercase tracking-[0.5em] font-bold">EXIT_SESSION</span>
            </motion.button>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="fixed top-8 left-8 w-4 h-4 border-l border-t border-white/20" />
      <div className="fixed top-8 right-8 w-4 h-4 border-r border-t border-white/20" />
      <div className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-white/20" />
      <div className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-white/20" />
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'analysis' | 'dashboard' | 'visual-media' | 'getting-started' | 'terminal-setup' | 'indicator-logic' | 'indicator-detail' | 'first-hunt' | 'coming-soon'>('landing');
  const [selectedIndicatorId, setSelectedIndicatorId] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleLaunch = () => {
    if (isAuthorized) {
      setView('getting-started');
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthorized = () => {
    setIsAuthorized(true);
    setShowAuth(false);
    setView('getting-started');
  };

  if (view === 'coming-soon') {
    return <ComingSoonPage onBack={() => setView('getting-started')} />;
  }

  if (view === 'analysis') {
    return (
      <TimeframeAnalysisPage 
        onBack={() => setView('getting-started')} 
        onSwitchView={(v) => setView(v)}
        activeView={view}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <DashboardPage 
        onBack={() => setView('getting-started')} 
        onSwitchView={(v) => setView(v)}
        activeView={view}
      />
    );
  }

  if (view === 'visual-media') {
    return (
      <VisualMediaPage 
        onBack={() => setView('landing')}
      />
    );
  }

  if (view === 'getting-started') {
    return (
      <GettingStartedPage 
        onBack={() => setView('landing')}
        onEnterDashboard={() => setView('dashboard')}
        onEnterTerminalSetup={() => setView('terminal-setup')}
        onEnterIndicatorLogic={() => setView('indicator-logic')}
        onEnterFirstHunt={() => setView('first-hunt')}
        onEnterComingSoon={() => setView('coming-soon')}
      />
    );
  }

  if (view === 'terminal-setup') {
    return (
      <TerminalSetupPage 
        onBack={() => setView('getting-started')}
        onComplete={() => setView('dashboard')}
      />
    );
  }

  if (view === 'indicator-logic') {
    return (
      <IndicatorLogicPage 
        onBack={() => setView('getting-started')}
        onSelectIndicator={(id) => {
          setSelectedIndicatorId(id);
          setView('indicator-detail');
        }}
      />
    );
  }

  if (view === 'indicator-detail') {
    return (
      <IndicatorDetailPage 
        indicatorId={selectedIndicatorId || 'm&r'}
        onBack={() => setView('indicator-logic')}
      />
    );
  }

  if (view === 'first-hunt') {
    return (
      <FirstHuntPage 
        onBack={() => setView('getting-started')}
        onEnterDashboard={() => setView('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-foreground relative selection:bg-white/10">
      <AnimatedBackground />
      <HUDTelemetry />
      
      <AnimatePresence>
        {showAuth && (
          <AuthGate 
            onAuthorized={handleAuthorized} 
            onCancel={() => setShowAuth(false)} 
          />
        )}
        {/* Fix: Corrected typo in closing tag from </AnPresence> to </AnimatePresence> */}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-[200] px-4 md:px-12 py-6 md:py-8 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center">
          <span className="font-space-grotesk font-black text-xl md:text-3xl tracking-tighter text-white uppercase cursor-pointer" onClick={() => setView('landing')}>
            HUNTER
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={handleLaunch}
            className="font-mono text-[8px] md:text-[9px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all border border-white/10 px-4 md:px-6 py-2 rounded-sm bg-white/5 hover:bg-white/10"
          >
            [ LAUNCH_DESK ]
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 md:pt-60">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 pb-24">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }} 
              className="flex flex-col text-left relative z-20"
            >
              <div className="mb-6 lg:mb-10 flex items-center justify-between lg:hidden">
                {/* Mobile Hero Visual Orb */}
                <div className="flex items-center justify-center pt-2 scale-75 md:scale-100">
                  <GlowSphere size="lg" />
                </div>
              </div>
              
              <h1 className="font-space-grotesk font-bold text-5xl sm:text-6xl md:text-6xl lg:text-6xl mb-8 md:mb-10 leading-[0.85] tracking-tighter uppercase text-white">
                HUNTER
              </h1>
              
              <p className="font-space-grotesk text-base md:text-xl text-white/60 max-w-lg mb-10 md:mb-12 leading-tight tracking-tight">
                Trading intelligence toolkit for high-conviction decision making and actionable insight.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-xl mb-12 pr-4">
                <CyberGlowButton 
                  label="LAUNCH DESK" 
                  onClick={handleLaunch} 
                  statusLabel="SYS: EXECUTE" 
                  className="flex-1" 
                />
                <CyberGlowButton 
                  label="GAIN ACCESS" 
                  variant="outline"
                  glow={false}
                  onClick={() => window.open('https://whop.com/tradingindicatorsuite/trading-indicator-suite/', '_blank')} 
                  statusLabel="SYS: LICENSE" 
                  className="flex-1" 
                />
              </div>

              <div className="relative w-full max-w-xl">
                <ScrollingBanner />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2, delay: 0.2 }} 
              className="hidden lg:flex items-center justify-center py-20 lg:relative lg:left-12"
            >
              <div className="relative">
                <GlowSphere size="xl" className="scale-110" />
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 pointer-events-none">
            <span className="font-mono text-[8px] tracking-[0.5em] uppercase font-bold">SCROLL_FOR_INTEL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        <PhilosophySection />
        <EnvironmentsSection />
        <MethodologySection onLaunchAnalysis={handleLaunch} />
        <SynthesisEngineSection />
        <FAQSection />
        
        <footer className="py-12 border-t border-white/5 bg-[#050507]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-space-grotesk font-black text-2xl md:text-3xl text-white tracking-tighter uppercase leading-none">
              HUNTER
            </div>
            <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest font-bold">
              &copy; 2025 HUNTER INDICATOR // v2.5.1 CHECKPOINT // ALL_RIGHTS_RESERVED
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
