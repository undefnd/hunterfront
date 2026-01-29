/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Users, 
  Settings, 
  Lock, 
  ArrowRight, 
  PlayCircle,
  FileText,
  Activity,
  ChevronRight,
  Crosshair,
  Layers,
  BrainCircuit,
  TrendingUp,
  MousePointer2,
  RefreshCcw,
  Target,
  Monitor,
  Maximize2,
  Cpu,
  Globe,
  Compass,
  FileBox,
  Home
} from 'lucide-react';
import { cn } from './lib/utils.js';
import AnimatedBackground from './components/AnimatedBackground.js';
import { ChromeHoloButton } from './App.js';

// --- PULSING WHITE BUTTON ---
const PulsingWhiteButton = ({ label, onClick, className }: { label: string, onClick?: () => void, className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ 
      boxShadow: [
        "0 0 15px rgba(255,255,255,0.15)",
        "0 0 35px rgba(255,255,255,0.45)",
        "0 0 15px rgba(255,255,255,0.15)"
      ]
    }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    onClick={onClick}
    className={cn(
      "px-16 py-6 bg-white text-black font-space-grotesk font-black text-sm uppercase tracking-[0.5em] rounded-sm transition-all relative overflow-hidden",
      className
    )}
  >
    <span className="relative z-10">{label}</span>
  </motion.button>
);

// --- HOLO CARD (Simplified with soft glow) ---

const HoloCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1200px"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative h-[320px] w-full rounded-sm overflow-hidden cursor-pointer border border-white/10 group transition-all duration-700 bg-[#060608]",
        "hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[#08080A] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay scale-150" />
      </div>
      
      {/* Background Soft Inner Glow */}
      <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors duration-1000 z-10 pointer-events-none" />

      <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-white/20 z-40" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/20 z-40" />

      <div 
        className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
      
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-1000 z-50 pointer-events-none" />
    </motion.div>
  );
};

const QuickStartHolo = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[200px] bg-black/80 border border-white/20 rounded-sm shadow-2xl overflow-hidden backdrop-blur-md"
    >
      <div className="px-3 py-1.5 border-b border-white/10 bg-white/5 flex items-center justify-between">
         <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-white/20" />
         </div>
         <span className="text-[6px] font-black text-white/20 uppercase tracking-widest font-mono italic">uplink_sys</span>
      </div>
      <div className="p-4 space-y-1">
         {[1, 2, 3, 4, 5].map((i) => (
           <div key={i} className="h-1 bg-white/10 rounded-full w-full" style={{ width: `${Math.random() * 60 + 40}%` }} />
         ))}
      </div>
    </motion.div>
  </div>
);

const TerminalSetupHolo = () => (
  <div className="relative flex flex-col items-center gap-10 w-full h-full justify-center">
    <div className="relative w-24 h-24">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-white/10 rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
         <motion.div
           animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         >
          <RefreshCcw size={32} className="text-white opacity-80" strokeWidth={1} />
         </motion.div>
      </div>
    </div>
  </div>
);

const ShootingRangeHolo = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-10">
    <div className="relative w-48 h-32 bg-white/[0.02] border border-white/10 rounded-sm p-4 backdrop-blur-sm overflow-hidden group/viz">
       <svg viewBox="0 0 200 100" className="w-full h-full opacity-60 scale-110">
         <motion.path 
           animate={{ d: [
             "M 0 50 Q 50 10 100 50 T 200 50",
             "M 0 50 Q 50 90 100 50 T 200 50",
             "M 0 50 Q 50 10 100 50 T 200 50"
           ]}}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           fill="none" 
           stroke="white" 
           strokeWidth="1.5"
         />
       </svg>
       <motion.div 
         animate={{ x: ["10%", "90%", "10%"], y: ["20%", "80%", "20%"] }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-0 left-0"
       >
         <Target size={18} className="text-white opacity-60" />
       </motion.div>
    </div>
  </div>
);

const HOTSPOTS = [
  { id: 'market-selector', title: 'Market Selector', desc: 'Toggle between pairs and sync your command settings.', icon: <TrendingUp size={14} />, pos: { top: '35%', left: '8%' }, align: 'left' },
  { id: 'key-data-insights', title: 'Key Data Insights', desc: 'Real-time telemetry for M&R, AR, and Institutional Flow.', icon: <Zap size={14} />, pos: { top: '22%', left: '45%' }, align: 'center' },
  { id: 'chart-timeframe', title: 'Interactive Core', desc: 'Dynamic visualization of structural market regimes.', icon: <Crosshair size={14} />, pos: { top: '65%', left: '42%' }, align: 'center' },
  { id: 'system-monitor', title: 'System Monitor', desc: 'Multi-timeframe consensus tracking identifies global alignment.', icon: <Layers size={14} />, pos: { top: '50%', left: '88%' }, align: 'right' }
];

const DashboardPreview = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 px-4 font-inter">
      <div className="relative aspect-[21/9] w-full bg-[#040406] border border-white/10 rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10 group overflow-visible">
        
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute left-0 top-0 bottom-0 w-[18%] border-r border-white/5 bg-white/[0.01]">
              <div className="p-4 space-y-3 opacity-20">
                <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                <div className="h-8 w-full border border-white/10 rounded-sm" />
                <div className="h-8 w-full border border-white/10 rounded-sm" />
              </div>
           </div>
           <div className="absolute top-0 left-[18%] right-0 h-[15%] border-b border-white/5 bg-white/[0.01]" />
           <div className="absolute top-[15%] left-[18%] right-[25%] bottom-0 flex flex-col p-4 gap-4">
              <div className="h-[20%] grid grid-cols-4 gap-3 opacity-10">
                <div className="border border-white/20 rounded-sm" />
                <div className="border border-white/20 rounded-sm" />
                <div className="border border-white/20 rounded-sm" />
              </div>
              <div className="flex-1 border border-white/5 rounded-sm bg-white/[0.005] relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 40">
                  <path d="M0 20 Q 25 10 50 20 T 100 20" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
           </div>
           <div className="absolute right-0 top-0 bottom-0 w-[25%] border-l border-white/5 bg-white/[0.01]">
              <div className="p-4 space-y-6 opacity-20">
                <div className="h-3 w-2/3 bg-white/20 rounded-full" />
                <div className="space-y-2">
                  <div className="h-16 w-full border border-white/10 rounded-sm" />
                  <div className="h-16 w-full border border-white/10 rounded-sm" />
                </div>
              </div>
           </div>
        </div>

        {HOTSPOTS.map((node) => (
          <div key={node.id} className="absolute z-20" style={{ top: node.pos.top, left: node.pos.left }}>
            <div onMouseEnter={() => setActiveHotspot(node.id)} onMouseLeave={() => setActiveHotspot(null)} className="relative cursor-help">
               <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
                transition={{ duration: 3, repeat: Infinity }} 
                className="w-4 h-4 rounded-full bg-white/20 border border-white/60 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]"
               >
                 <div className="w-1 h-1 rounded-full bg-white" />
               </motion.div>
               <AnimatePresence>
                 {activeHotspot === node.id && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 5, scale: 0.95 }} 
                    className={cn(
                      "absolute z-[100] w-60 p-5 bg-zinc-950/95 border border-white/20 rounded-sm shadow-2xl space-y-2 pointer-events-none backdrop-blur-2xl", 
                      node.align === 'left' && "left-8 -top-4", 
                      node.align === 'right' && "right-8 -top-4", 
                      node.align === 'center' && "left-1/2 -translate-x-1/2 mt-6", 
                      node.align === 'bottom' && "bottom-8 left-1/2 -translate-x-1/2"
                    )}
                   >
                     <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                       <span className="text-white/40">{node.icon}</span>
                       <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{node.title}</h4>
                     </div>
                     <p className="text-[10px] text-white/50 leading-relaxed font-semibold">{node.desc}</p>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SIDEBAR DATA ---
const SIDEBAR_TOPICS = [
  { id: 'getting-started', label: 'HQ HOMEPAGE', icon: <Home size={16} /> },
  { id: 'terminal-setup', label: 'TERMINAL SETUP', icon: <Terminal size={16} /> },
  { id: 'indicator-logic', label: 'DOCUMENTATION', icon: <Activity size={16} /> },
  { id: 'backtesting', label: 'BACKTESTING', icon: <Activity size={16} /> },
  { id: 'risk-management', label: 'RISK MANAGEMENT', icon: <ShieldCheck size={16} /> },
  { id: 'account-license', label: 'ACCOUNT & LICENSE', icon: <Settings size={16} /> },
  { id: 'privacy-security', label: 'PRIVACY & SECURITY', icon: <Lock size={16} /> },
];

export default function GettingStartedPage({ 
  onBack, 
  onEnterDashboard, 
  onEnterTerminalSetup,
  onEnterIndicatorLogic,
  onEnterFirstHunt,
  onEnterComingSoon
}: { 
  onBack: () => void, 
  onEnterDashboard: () => void,
  onEnterTerminalSetup: () => void,
  onEnterIndicatorLogic: () => void,
  onEnterFirstHunt: () => void,
  onEnterComingSoon: () => void
}) {
  const [activeTopic, setActiveTopic] = useState('getting-started');

  const handleTopicClick = (id: string) => {
    if (id === 'terminal-setup') onEnterTerminalSetup();
    else if (['indicator-logic', 'm&r', 'signals', 'shooting-range'].includes(id)) onEnterIndicatorLogic();
    else if (['backtesting', 'risk-management'].includes(id)) onEnterComingSoon();
    else if (id === 'first-hunt') onEnterFirstHunt();
    else setActiveTopic(id);
  };

  const guides = [
    { 
      id: 'first-hunt', 
      title: 'Quick Start Guide', 
      desc: "A tactical orientation for new operators. Master the core interface logic, signal hierarchies, and execution workflows in minutes.", 
      tag: 'DEPLOYMENT', 
      content: <QuickStartHolo /> 
    },
    { 
      id: 'terminal-setup', 
      title: 'Terminal Setup', 
      desc: "Synchronize your command center. Step-by-step instructions to integrate the Hunter toolkit directly into your live TradingView environment.", 
      tag: 'SYNC', 
      content: <TerminalSetupHolo /> 
    },
    { 
      id: 'shooting-range', 
      title: 'Shooting Range', 
      desc: "High-fidelity technical rehearsals. Deep-dive into indicator logic gates and stress-test your system against historical price action.", 
      tag: 'LOGIC', 
      content: <ShootingRangeHolo /> 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-foreground flex overflow-hidden selection:bg-white/10 font-inter relative">
      <AnimatedBackground />

      {/* Global Page HUD Brackets */}
      <div className="fixed top-8 left-8 w-4 h-4 border-l border-t border-white/20 z-[60] pointer-events-none" />
      <div className="fixed top-8 right-8 w-4 h-4 border-r border-t border-white/20 z-[60] pointer-events-none" />
      <div className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-white/20 z-[60] pointer-events-none" />
      <div className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-white/20 z-[60] pointer-events-none" />

      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl shrink-0 z-50 relative">
        <div className="h-16 flex items-center px-8 border-b border-white/5">
          <span className="font-space-grotesk font-black text-xl tracking-tighter text-white uppercase">HUNTER</span>
        </div>
        
        <div className="flex-1 py-8 px-4 space-y-8">
          <div>
            <nav className="space-y-1">
              {SIDEBAR_TOPICS.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <button 
                    onClick={() => handleTopicClick(item.id)} 
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all group",
                      activeTopic === item.id 
                        ? "text-white bg-white/5" 
                        : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn("transition-colors", activeTopic === item.id ? "text-primary" : "text-white/20 group-hover:text-white/40")}>{item.icon}</span>
                      {item.label}
                    </div>
                    <ChevronRight size={12} className={cn("transition-opacity", activeTopic === item.id ? "opacity-100" : "opacity-0")} />
                  </button>
                  {/* Persistent sidebar action item */}
                  {item.id === 'terminal-setup' && (
                    <button 
                      onClick={onEnterDashboard}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary/40 hover:text-primary transition-all group"
                    >
                      <Monitor size={16} className="text-primary/40 group-hover:text-primary transition-colors" />
                      LAUNCH TERMINAL
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div>
            <span className="font-mono text-[9px] text-white/20 font-bold uppercase tracking-[0.3em] px-4 mb-4 block">Support</span>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold tracking-wider text-white/40 hover:text-white transition-all"><FileText size={16} className="text-white/20" /> Changelog</button>
              <button onClick={() => window.open('https://discord.com/invite/hunterhq', '_blank')} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold tracking-wider text-white/40 hover:text-white transition-all"><Users size={16} className="text-white/20" /> Discord Hub</button>
            </nav>
          </div>
        </div>
        <div className="p-6 border-t border-white/5">
          <button onClick={onBack} className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors font-inter">← Back to Desk</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-hide relative z-10">
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 md:px-12 bg-black/40 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest font-mono">System_Online</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 space-y-24">
          <section className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-space-grotesk font-bold text-white tracking-tighter uppercase leading-[0.85] flex items-center">
                Hunter_HQ
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
                  className="inline-block w-[14px] h-[0.85em] bg-white ml-3 translate-y-[0.1em]"
                />
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {guides.map(guide => (
                <div key={guide.id} className="flex flex-col gap-6 group">
                  <HoloCard onClick={() => handleTopicClick(guide.id)}>{guide.content}</HoloCard>
                  <div className="space-y-2 px-1">
                    <div className="flex items-center gap-3">
                       <span className="font-mono text-[9px] text-primary uppercase font-black tracking-widest">[{guide.tag}]</span>
                       <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <h3 className="font-space-grotesk font-bold text-xl text-white uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{guide.title}</h3>
                    <p className="text-[11px] text-white/40 leading-relaxed line-clamp-3 font-inter">{guide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 pt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] font-mono">TERMINAL_MAP</span>
                <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white tracking-tighter uppercase leading-none">TERMINAL HOTSPOT.</h2>
                <p className="text-[11px] text-white/40 tracking-widest max-sm:text-[10px] text-left font-inter">
                  Explore the terminal with a quick hotspot check relative to the UI structural layout.
                </p>
              </div>
            </div>
            
            <div className="bg-[#050507] border border-white/5 rounded-sm p-4 md:p-8 relative group shadow-inner overflow-hidden">
              <motion.div 
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-white/[0.05] z-20 pointer-events-none"
              />
              <DashboardPreview />
            </div>
            
            <div className="flex justify-center pt-8">
              <PulsingWhiteButton 
                label="LAUNCH TERMINAL" 
                onClick={onEnterDashboard} 
              />
            </div>
          </section>

          <section className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 pb-24">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-16 h-16 bg-white/[0.03] rounded-full border border-white/5 flex items-center justify-center">
                <Activity size={24} className="text-white/20" />
              </div>
              <div className="space-y-1">
                <h3 className="font-space-grotesk font-bold text-3xl text-white uppercase tracking-tighter leading-none">Need Support?</h3>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest font-mono">Official Discord community available 24/7 for technical questions and support.</p>
              </div>
            </div>
            
            <button onClick={() => window.open('https://discord.com/invite/hunterhq', '_blank')} className="px-12 py-5 bg-white/5 border border-white/15 text-white font-space-grotesk font-bold text-[11px] uppercase tracking-[0.4em] rounded-sm hover:bg-white hover:text-black transition-all">
              Access Community Support
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
