
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";
import { Tone } from "../../types/timeframe";

const toneStyles: Record<Tone, string> = {
  bull: "text-emerald-400 border-l-emerald-500 bg-emerald-500/5",
  bear: "text-rose-400 border-l-rose-500 bg-rose-500/5",
  neutral: "text-zinc-400 border-l-zinc-600 bg-zinc-900/50",
  caution: "text-amber-400 border-l-amber-500 bg-amber-500/5",
  danger: "text-rose-500 border-l-rose-600 bg-rose-600/5",
  info: "text-sky-400 border-l-sky-500 bg-sky-500/5",
};

interface SelectableRowProps {
  label: string;
  tone: Tone;
  isSelected: boolean;
  onClick: () => void;
  isIndented?: boolean;
}

/**
 * Using React.FC to properly handle reserved props like 'key' in mapped components.
 */
const SelectableRow: React.FC<SelectableRowProps> = ({ 
  label, tone, isSelected, onClick, isIndented = false 
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={(e) => e.stopPropagation()}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 text-left text-[11px] font-inter transition-all border-l-2",
        isIndented && "ml-4 w-[calc(100%-1rem)]",
        isSelected ? toneStyles[tone] : "opacity-40 border-transparent hover:opacity-100 hover:bg-white/5"
      )}
    >
      <div className={cn("w-3.5 h-3.5 border flex items-center justify-center shrink-0", isSelected ? "border-current bg-current/10" : "border-white/10")}>
        {isSelected && <Check className="w-2.5 h-2.5" />}
      </div>
      <span className="truncate uppercase tracking-tight">{label}</span>
    </button>
  );
};

export default SelectableRow;
