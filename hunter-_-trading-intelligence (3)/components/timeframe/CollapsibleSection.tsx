
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children?: React.ReactNode;
  stance?: string;
  arBand?: string;
  isOpen?: boolean;
  onToggle?: (s: boolean) => void;
  defaultOpen?: boolean;
}

const getStanceColor = (stance: string) => {
  const s = stance.toLowerCase();
  
  if (
    s.includes('reversion') || 
    s.includes('bearish') || 
    s.includes('reversal') || 
    s.includes('down') ||
    s.includes('↓') ||
    s.includes('accepted below') || 
    s.includes('resistance test') || 
    s.includes('failed reclaim') ||
    s.includes('seller control') ||
    s.includes('fading')
  ) {
    return "text-rose-400 border-rose-500/30 bg-rose-500/5";
  }
  
  if (
    s.includes('momentum') || 
    s.includes('bullish') || 
    s.includes('continuation') || 
    s.includes('up') ||
    s.includes('↑') ||
    s.includes('accepted above') || 
    s.includes('support test') ||
    s.includes('buyer control') ||
    s.includes('building')
  ) {
    return "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
  }
  
  if (s.includes('caution') || s.includes('trans') || s.includes('structural risk') || s.includes('fragile')) {
    return "text-amber-400 border-amber-500/30 bg-amber-500/5";
  }
  
  if (stance === 'Bullish') return "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
  if (stance === 'Bearish') return "text-rose-400 border-rose-500/30 bg-rose-500/5";
  return "text-zinc-400 border-zinc-500/30 bg-zinc-900/40";
};

const getBandColor = (band: string) => {
  return "text-sky-400 border-sky-500/30 bg-sky-500/5";
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, children, stance, arBand, isOpen: controlledOpen, onToggle, defaultOpen = true 
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const toggle = () => {
    if (onToggle) onToggle(!isOpen);
    else setInternalOpen(!isOpen);
  };

  const label = arBand || stance;
  const isAr = !!arBand;

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button 
        onClick={toggle} 
        className="w-full flex flex-col items-start px-3 py-2.5 hover:bg-white/5 transition-all gap-1.5"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/40" />}
            <span className="font-space-grotesk text-[11px] font-bold text-foreground uppercase tracking-widest">{title}</span>
          </div>
          {isOpen && label && (
             <div className="w-1 h-1 rounded-full bg-white/10" />
          )}
        </div>
        
        {!isOpen && label && label.trim().length > 0 && (
          <div className="pl-5 w-full text-left">
            <span className={cn(
              "px-2 py-0.5 text-[9px] font-bold border uppercase inline-block leading-tight", 
              isAr ? getBandColor(label) : getStanceColor(label)
            )}>
              {label}
            </span>
          </div>
        )}
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300", 
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <div className="px-3 pb-6 space-y-4 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
