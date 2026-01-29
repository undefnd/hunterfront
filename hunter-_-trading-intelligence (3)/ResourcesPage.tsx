
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, Download, ShieldCheck, BookOpen, Database, TrendingUp, Info, ExternalLink, Search, Archive, FileBox, X, Binary, Waves, Zap, Crosshair } from 'lucide-react';
import { cn } from './lib/utils.js';
import AnimatedBackground from './components/AnimatedBackground.js';

interface DocumentResource {
  id: string;
  category: 'Manual' | 'Alpha' | 'System' | 'Engine';
  title: string;
  description: string;
  version: string;
  fileSize: string;
  updatedAt: string;
  icon?: React.ReactNode;
}

const RESOURCES: DocumentResource[] = [
  {
    id: 'E-01',
    category: 'Engine',
    title: 'The Anchor Protocol',
    description: 'Technical specification for the primary volume-weighted equilibrium engine. Defines the mathematical "Gravity Center" of price discovery using a rolling 20-period volume-integral calculation.',
    version: 'v2.5.1',
    fileSize: '1.2 MB',
    updatedAt: 'LIVE',
    icon: <Database size={18} />
  },
  {
    id: 'E-02',
    category: 'Engine',
    title: 'AR Topology & Probability',
    description: 'Deep-dive into the Gaussian-weighted regression engine. Explains the "h=9" bandwidth logic used to calculate 99.7% probability boundaries and non-linear "stretch" envelopes.',
    version: 'v2.5.1',
    fileSize: '3.4 MB',
    updatedAt: 'LIVE',
    icon: <Waves size={18} />
  },
  {
    id: 'E-03',
    category: 'Engine',
    title: 'EF Pressure (The Undertow)',
    description: 'Documentation for the Institutional Delivery Index. Measures Close Location Value (CLV) against individual volume profiles to identify hidden accumulation vs. cosmetic price movement.',
    version: 'v2.5.1',
    fileSize: '0.8 MB',
    updatedAt: 'LIVE',
    icon: <Zap size={18} />
  },
  {
    id: 'S-01',
    category: 'System',
    title: 'M&R Regime Hierarchy',
    description: 'The definitive guide to Binary Candle Logic. Maps the interaction between the Anchor, Fast Line, and Slow Line to define the four market states: Momentum, Reversion, Bias, and Noise.',
    version: 'v2.5.0',
    fileSize: '5.1 MB',
    updatedAt: 'FEB 2025',
    icon: <Binary size={18} />
  },
  {
    id: 'S-02',
    category: 'System',
    title: 'Triple Confluence Signals',
    description: 'Technical breakdown of the Diamond Markers. Explains the Confluence Engine scan logic identifying mismatches between Price, Internal Momentum, and Accumulation Flow.',
    version: 'v2.1.0',
    fileSize: '2.5 MB',
    updatedAt: 'JAN 2025',
    icon: <Crosshair size={18} />
  },
  {
    id: 'M-01',
    category: 'Manual',
    title: 'Hunter Strategy Handbook',
    description: 'Execution protocols for high-conviction setups. Includes SOPs for the Mean Reversion Fade, Anchor Pierce, and Momentum Continuation.',
    version: 'v2.5.1',
    fileSize: '8.4 MB',
    updatedAt: 'FEB 2025',
    icon: <BookOpen size={18} />
  }
];

const DocumentCard: React.FC<{ doc: DocumentResource }> = ({ doc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative border p-6 md:p-8 rounded-sm transition-all duration-500 bg-black/40 backdrop-blur-sm",
        isHovered ? "border-white/30 bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.05)]" : "border-white/10"
      )}
    >
      <div className="flex flex-col h-full gap-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded-sm",
                doc.category === 'Manual' ? "text-sky-400 border-sky-400/30 bg-sky-400/10" :
                doc.category === 'Engine' ? "text-primary border-primary/30 bg-primary/10" :
                doc.category === 'System' ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
              )}>
                {doc.category}
              </span>
              <span className="text-[9px] text-white/20 font-mono tracking-widest uppercase">ID: {doc.id}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-space-grotesk font-bold text-white tracking-tight leading-none group-hover:text-primary transition-colors">
              {doc.title}
            </h3>
          </div>
          <div className="shrink-0 p-3 bg-white/5 border border-white/10 rounded-sm">
             {doc.icon || <FileText size={18} className="text-white/40 group-hover:text-white transition-colors" />}
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed font-inter line-clamp-3">
          {doc.description}
        </p>

        <div className="mt-auto space-y-6">
          <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-4">
             <div className="flex flex-col gap-1">
                <span className="text-[7px] text-white/20 font-black uppercase tracking-[0.2em]">Version</span>
                <span className="text-[10px] text-white/60 font-bold font-mono">{doc.version}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[7px] text-white/20 font-black uppercase tracking-[0.2em]">Data Type</span>
                <span className="text-[10px] text-white/60 font-bold font-mono">{doc.fileSize}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[7px] text-white/20 font-black uppercase tracking-[0.2em]">Last Sync</span>
                <span className="text-[10px] text-white/60 font-bold font-mono">{doc.updatedAt}</span>
             </div>
          </div>

          <button className="w-full py-4 flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm relative overflow-hidden group/btn">
            <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
            Download Protocol
            <motion.div 
              animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ResourcesPage({ onBack, isIntegrated = false }: { onBack: () => void, isIntegrated?: boolean }) {
  const [filter, setFilter] = useState<'All' | 'Manual' | 'Engine' | 'System'>('All');
  const [search, setSearch] = useState('');

  const filteredDocs = RESOURCES.filter(doc => {
    const matchesFilter = filter === 'All' || doc.category === filter;
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || 
                          doc.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={cn(
      "text-foreground flex flex-col font-mono selection:bg-primary/20 overflow-hidden",
      isIntegrated ? "h-full w-full bg-transparent" : "h-screen bg-[#050507]"
    )}>
      {!isIntegrated && <AnimatedBackground />}
      
      {/* Header */}
      <header className={cn(
        "h-16 border-b border-white/10 px-6 md:px-12 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50",
        isIntegrated && "px-8 border-none"
      )}>
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{isIntegrated ? 'Back to Intel' : 'Return to Hub'}</span>
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white tracking-[0.3em] uppercase">Intelligence Archive</span>
            <span className="text-[7px] text-white/20 uppercase tracking-widest">Grounding Reference // v2.5.1</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-sm border border-white/10">
              <Archive size={14} className="text-white/40" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Secure Data Vault Active</span>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-transparent p-6 md:p-12 pt-4">
          <div className="max-w-[1400px] mx-auto space-y-12">
            
            {/* Title & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_white]" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.5em]">SYSTEM_GROUNDING_REFERENCE</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-[0.9]">
                  Knowledge <br/> Base.
                </h1>
                <p className="text-white/40 text-sm md:text-base max-w-xl font-inter leading-relaxed">
                  The definitive technical archive for the Hunter ecosystem. All documentation is synchronized with the latest Engine Math (Indicators.ts) and System Logic (KnowledgeBase.ts).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-sm shrink-0">
                 <div className="flex flex-col">
                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Documentation</span>
                    <span className="text-2xl font-space-grotesk font-black text-white leading-none">{RESOURCES.length}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Protocol Sync</span>
                    <span className="text-2xl font-space-grotesk font-black text-white leading-none">ACTIVE</span>
                 </div>
              </div>
            </div>

            {/* Controls */}
            <div className="sticky top-0 z-30 bg-[#050507]/90 backdrop-blur-md py-6 border-y border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center">
               <div className="flex flex-wrap items-center gap-2">
                 {(['All', 'Manual', 'Engine', 'System'] as const).map((cat) => (
                   <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border",
                      filter === cat 
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                        : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white"
                    )}
                   >
                     {cat}
                   </button>
                 ))}
               </div>

               <div className="relative w-full md:w-96 group">
                 <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   placeholder="SEARCH_THE_ARCHIVE..."
                   className="w-full bg-white/[0.02] border border-white/10 px-12 py-3 font-mono text-[11px] text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all rounded-sm uppercase tracking-widest"
                 />
               </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 pb-24">
              <AnimatePresence mode="popLayout">
                {filteredDocs.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </AnimatePresence>

              {filteredDocs.length === 0 && (
                <div className="col-span-full py-32 flex flex-col items-center justify-center gap-6 opacity-20">
                   <FileBox size={80} strokeWidth={1} />
                   <span className="text-[12px] font-black uppercase tracking-[0.5em]">No matching protocol found</span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {!isIntegrated && (
        <>
          <div className="fixed top-1/4 -right-64 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="fixed bottom-1/4 -left-64 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}
    </div>
  );
}
