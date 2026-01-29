
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { cn } from "../../lib/utils";
import { Permission } from "../../types/timeframe";

const colorMap: Record<string, string> = {
  'Bullish': "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  'Mixed': "bg-amber-500/15 text-amber-400 border-amber-500/40",
  'Bearish': "bg-rose-500/15 text-rose-400 border-rose-500/40",
  // AR Location Badges: All mapped to Blue (Sky) to remove directional bias
  'Upper': "bg-sky-500/10 text-sky-400 border-sky-500/30",
  'Mid': "bg-sky-500/10 text-sky-400 border-sky-500/30",
  'Lower': "bg-sky-500/10 text-sky-400 border-sky-500/30",
};

export const StanceBadge = ({ stance, size = 'md' }: { stance: string, size?: 'sm' | 'md' }) => (
  <span className={cn(
    "border font-space-grotesk font-bold uppercase tracking-wider inline-block transition-all",
    size === 'sm' ? "px-1.5 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]",
    colorMap[stance] || colorMap.Mixed
  )}>
    {stance}
  </span>
);

export const PermissionBadge = ({ permission }: { permission: Permission }) => {
  const styles = {
    'Trade': "text-emerald-400",
    'Caution': "text-amber-400",
    'Stand Down': "text-rose-500"
  };
  return <span className={cn("text-[10px] font-bold tracking-widest uppercase", styles[permission])}>{permission}</span>;
}

export const TradeableBadge = ({ tradeable }: { tradeable: boolean }) => (
  <span className={cn(
    "px-3 py-1 border text-[10px] font-bold uppercase tracking-widest",
    tradeable ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" : "border-rose-500/50 text-rose-400 bg-rose-500/10"
  )}>
    {tradeable ? "Tradeable" : "Wait"}
  </span>
);
