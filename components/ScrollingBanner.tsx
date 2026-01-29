
import React from "react";

const BANNER_ITEMS = [
  { coord: "0x01FF", label: "VERSION 2.5.1", status: "STABLE" },
  { coord: "0x02E1", label: "JOIN ALPHA", status: "READY" },
];

const CyberArrow = () => (
  <div className="absolute -inset-x-12 inset-y-0 flex items-center pointer-events-none z-0">
    <svg 
      viewBox="0 0 240 20" 
      className="w-full h-full -rotate-[8deg] opacity-5 group-hover:opacity-20 transition-opacity duration-700 overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="15%" stopColor="currentColor" />
          <stop offset="85%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      
      <line x1="0" y1="10" x2="240" y2="10" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 2" className="text-white/10" />
      
      <line 
        x1="20" y1="10" x2="220" y2="10" 
        stroke="url(#arrowGradient)" 
        strokeWidth="0.2" 
        className="text-white/20"
      />
    </svg>
  </div>
);

const BannerItem: React.FC<{ item: typeof BANNER_ITEMS[0] }> = ({ item }) => (
  <div className="inline-flex items-center gap-8 px-12 group relative">
    <div className="flex flex-col items-start gap-0">
      <span className="font-mono text-[9px] text-white/10 tracking-tighter shrink-0">[{item.coord}]</span>
      <span className="font-mono text-[6px] text-white/5 uppercase tracking-widest font-bold">DATA_STREAM</span>
    </div>
    
    <div className="h-[1px] w-6 bg-white/5 shrink-0" />
    
    <div className="relative inline-flex items-center gap-5">
      <CyberArrow />
      <div className="relative z-10 flex items-center gap-4 bg-white/[0.02] px-5 py-1 backdrop-blur-sm border-x border-white/5 group-hover:border-white/10 transition-all duration-500">
        <div className="relative flex items-center justify-center w-2.5 h-2.5">
          {/* Pulsating dot changed to muted emerald green */}
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500/40 animate-ping opacity-20" />
        </div>
        
        <div className="flex flex-col">
          <span className="font-mono text-[11px] text-foreground tracking-[0.2em] uppercase font-bold">
            {item.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[7px] text-white/20 uppercase tracking-[0.2em] font-bold">
              {item.status}
            </span>
            <span className="font-mono text-[7px] text-white/40 uppercase tracking-[0.1em] font-bold">
              LIVE_FEED
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ScrollingBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-white/[0.02] backdrop-blur-md py-4 border-y border-white/5">
      <div className="absolute top-[0.5px] left-0 right-0 h-[0.5px] border-t border-dashed border-white/5" />
      <div className="absolute bottom-[0.5px] left-0 right-0 h-[0.5px] border-b border-dashed border-white/5" />

      <div className="flex whitespace-nowrap animate-scroll-left w-fit py-1">
        {[1, 2, 3, 4].map((set) => (
          <div key={`set-${set}`} className="flex shrink-0">
            {BANNER_ITEMS.map((item, idx) => (
              <BannerItem key={`set-${set}-${idx}`} item={item} />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent z-20 pointer-events-none" />
      
      <div className="absolute inset-0 z-0 opacity-[0.01] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0,transparent_99%,white_100%)] bg-[length:12px_100%]" />
      </div>
    </div>
  );
}
