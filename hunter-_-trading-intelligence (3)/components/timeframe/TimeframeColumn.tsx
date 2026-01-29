
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { 
  LAYER_CONFIG, 
  MR_REGIME_OPTIONS, 
  PRICE_VS_ANCHOR_OPTIONS, 
  AR_LOCATION_OPTIONS, 
  SIGNALS_PRESENCE_OPTIONS, 
  SIGNALS_LOCATION_OPTIONS, 
  EF_DOMINANCE_OPTIONS, 
  EF_BEHAVIOR_OPTIONS, 
  EF_DIVERGENCE_OPTIONS,
  EF_VERDICT_OPTIONS, 
  type TimeframeData, 
  type LayerType 
} from "../../types/timeframe";
import { computeFullTimeframe, SIGNALS_PRESENCE_NONE_ID } from "../../lib/analysisEngine";
import CollapsibleSection from "./CollapsibleSection";
import SelectableRow from "./SelectableRow";
import { StanceBadge, PermissionBadge } from "./StanceBadge";
import TimeframeRationaleBlock from "./TimeframeRationaleBlock";
import { Maximize2, Minimize2 } from "lucide-react";

interface TimeframeColumnProps {
  timeframe: string;
  data: TimeframeData;
  layer: LayerType;
  onUpdate: (f: keyof TimeframeData, v: any) => void;
}

const mrRegimeAbbrev: Record<string, string> = {
  "strong_momentum_up": "Strong Momentum ↑↑",
  "momentum_bias_up": "Momentum Bias ↑",
  "mixed_transitional": "Mixed / Trans",
  "reversion_bias_down": "Reversion Bias ↓",
  "strong_reversion_down": "Strong Reversion ↓↓"
};

const TimeframeColumn: React.FC<TimeframeColumnProps> = ({ 
  timeframe, data, layer, onUpdate 
}) => {
  const { mr, ar, sig, ef, computed } = computeFullTimeframe(layer, data);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const config = LAYER_CONFIG[layer];

  // Momentum Emoji for Column Header
  const momentumEmoji = useMemo(() => {
    if (data.ef_behavior === 'trending_up') return "🚀";
    if (data.ef_behavior === 'trending_down') return "📉";
    if (data.ef_behavior === 'flat') return "💤";
    return "";
  }, [data.ef_behavior]);

  // Structural Risk ONLY when testing anchor
  const isStructuralRisk = mr.risk === 'Caution' && (mr.anchorLabel.includes('Test') || mr.anchorLabel.includes('Reclaim'));

  // Abbreviated label for collapsed state - BLANK if no regime selected
  const regimeLabel = mrRegimeAbbrev[data.regime_classification];
  const anchorLabel = data.price_vs_anchor ? mr.anchorLabel : '';
  
  let mrCollapsedLabel = "";
  if (regimeLabel) {
    mrCollapsedLabel = anchorLabel ? `${regimeLabel} · ${anchorLabel}` : regimeLabel;
    if (isStructuralRisk) mrCollapsedLabel += " · Structural Risk";
  }

  // AR summary - blank if no selection
  const arCollapsedLabel = data.ar_location ? `${ar.band}${ar.detail ? ` · ${ar.detail}` : ''}` : "";

  // Signal summary - improved for better color mapping
  const hasSignalsSelected = data.signal_presence && data.signal_presence.length > 0;
  let sigCollapsedLabel = "";
  if (hasSignalsSelected) {
    const directionPrefix = sig.direction === 'Up' ? 'Bullish' : sig.direction === 'Down' ? 'Bearish' : '';
    sigCollapsedLabel = `${sig.primaryLabel} · ${sig.locationLabel}`;
    // Inject directional keyword if missing for the HUD color logic
    if (directionPrefix && !sigCollapsedLabel.toLowerCase().includes(directionPrefix.toLowerCase())) {
        sigCollapsedLabel = `${directionPrefix}: ${sigCollapsedLabel}`;
    }
  }

  // Ebb + Flow summary
  const hasEFSelection = data.ef_dominance || data.ef_behavior || (data.ef_divergence && data.ef_divergence !== 'none');
  const efCollapsedLabel = hasEFSelection ? (ef.signalLabel !== 'NO SIGNALS' ? `${ef.signalLabel} · ${ef.pressureLabel}` : ef.pressureLabel) : "";

  // Regime constraints for Anchor selection
  const isStrongReversion = data.regime_classification === 'strong_reversion_down';
  const isReversionBias = data.regime_classification === 'reversion_bias_down';
  const isReversionRegime = isReversionBias || isStrongReversion;
  const isMomentumRegime = data.regime_classification === 'strong_momentum_up' || data.regime_classification === 'momentum_bias_up';

  // Process Anchor options: Filter parents by regime, then filter children (specifically Above Fast Line)
  const processedAnchorOptions = PRICE_VS_ANCHOR_OPTIONS
    .filter(o => {
      if (isReversionRegime && o.value === 'above_anchor') return false;
      if (isMomentumRegime && o.value === 'below_anchor') return false;
      return true;
    })
    .map(parent => ({
      ...parent,
      children: parent.children?.filter(child => {
        if (child.value === 'above_fast_line') return isReversionBias;
        return true;
      })
    }));

  return (
    <div className="bg-white/[0.01] border-r border-white/5 flex flex-col min-w-[340px] max-w-[400px] h-full group/col">
      <div className="bg-black/60 px-6 py-5 border-b border-white/10 shrink-0 relative">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-space-grotesk text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {timeframe} {momentumEmoji && <span className="text-xl">{momentumEmoji}</span>}
            </h3>
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-0.5">TIMEFRAME STACK</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-sm">
             <button 
               onClick={() => setSectionsOpen(true)}
               title="Expand All"
               className="p-1.5 hover:bg-white/10 text-white/20 hover:text-white/60 transition-colors rounded-sm"
             >
               <Maximize2 size={12} />
             </button>
             <button 
               onClick={() => setSectionsOpen(false)}
               title="Collapse All"
               className="p-1.5 hover:bg-white/10 text-white/20 hover:text-white/60 transition-colors rounded-sm"
             >
               <Minimize2 size={12} />
             </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3 space-y-1">
        <CollapsibleSection title="Momentum & Reversion" stance={mrCollapsedLabel} isOpen={sectionsOpen} onToggle={setSectionsOpen}>
          <div className="space-y-4">
            <div className={cn(
               "px-3 py-1.5 border text-[10px] uppercase font-bold tracking-widest flex justify-between h-8 items-center",
               mr.stance === 'Bullish' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
               mr.stance === 'Bearish' ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
               "bg-white/5 border-white/10 text-white/60"
             )}>
                <span className="truncate">{regimeLabel || "NO SELECTION"}</span>
                <span className="shrink-0">{anchorLabel}</span>
            </div>

            {isStructuralRisk && (
              <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 uppercase font-bold tracking-widest flex justify-between">
                <span>STRUCTURAL RISK</span>
                <span>CAUTION</span>
              </div>
            )}
            <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Regime Classification</label>
              {MR_REGIME_OPTIONS.map(o => (
                <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.regime_classification === o.value} onClick={() => onUpdate('regime_classification', data.regime_classification === o.value ? '' : o.value)} />
              ))}
            </div>
            <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Price vs Anchor</label>
              {processedAnchorOptions.map(o => (
                <React.Fragment key={o.value}>
                  <SelectableRow label={o.label} tone={o.tone} isSelected={data.price_vs_anchor === o.value} onClick={() => { onUpdate('price_vs_anchor', data.price_vs_anchor === o.value ? '' : o.value); onUpdate('price_vs_anchor_child', ''); }} />
                  {data.price_vs_anchor === o.value && o.children?.map(c => (
                    <SelectableRow key={c.value} label={c.label} tone={c.tone} isSelected={data.price_vs_anchor_child === c.value} onClick={() => onUpdate('price_vs_anchor_child', data.price_vs_anchor_child === c.value ? '' : c.value)} isIndented />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Average Range" arBand={arCollapsedLabel} isOpen={sectionsOpen} onToggle={setSectionsOpen}>
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
               <span className="px-2 py-0.5 border border-sky-500/20 bg-sky-500/5 text-[9px] text-sky-400 font-bold uppercase tracking-widest">Band: {data.ar_location ? ar.band : "---"}</span>
               {data.ar_location && ar.risk !== 'OK' && <span className="px-2 py-0.5 border border-amber-500/40 bg-amber-500/10 text-[9px] text-amber-400 font-bold uppercase tracking-widest">Risk: {ar.risk}</span>}
            </div>
            <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">AR Location</label>
              {AR_LOCATION_OPTIONS.map(o => (
                <React.Fragment key={o.value}>
                  <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.ar_location === o.value} onClick={() => { onUpdate('ar_location', data.ar_location === o.value ? '' : o.value); onUpdate('ar_location_child', ''); }} />
                  {data.ar_location === o.value && o.children?.map(c => (
                    <SelectableRow key={c.value} label={c.label} tone={c.tone} isSelected={data.ar_location_child === c.value} onClick={() => onUpdate('ar_location_child', data.ar_location_child === c.value ? '' : c.value)} isIndented />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Signals" stance={sigCollapsedLabel} isOpen={sectionsOpen} onToggle={setSectionsOpen}>
          <div className="space-y-4">
             <div className={cn(
               "px-3 py-1.5 border text-[10px] uppercase font-bold tracking-widest flex justify-between h-8 items-center",
               sig.direction === 'Up' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
               sig.direction === 'Down' ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
               "bg-white/5 border-white/10 text-white/60"
             )}>
                <span>{sig.primaryLabel}</span>
                {sig.locationLabel && <span>{sig.locationLabel}</span>}
              </div>
            <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Presence</label>
              {SIGNALS_PRESENCE_OPTIONS.map(o => (
                <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.signal_presence.includes(o.value)} onClick={() => {
                  const current = data.signal_presence || [];
                  let next;
                  if (o.value === SIGNALS_PRESENCE_NONE_ID) {
                    // Clicking "NO SIGNALS" when already selected toggles it off
                    if (current.includes(SIGNALS_PRESENCE_NONE_ID)) {
                        next = [];
                    } else {
                        next = [SIGNALS_PRESENCE_NONE_ID];
                    }
                  } else {
                    const base = current.filter(x => x !== SIGNALS_PRESENCE_NONE_ID);
                    next = base.includes(o.value) ? base.filter(x => x !== o.value) : [...base, o.value];
                  }
                  onUpdate('signal_presence', next);
                }} />
              ))}
            </div>
            <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Location</label>
              {SIGNALS_LOCATION_OPTIONS.map(o => (
                <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.signal_location === o.value} onClick={() => onUpdate('signal_location', data.signal_location === o.value ? '' : o.value)} />
              ))}
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Ebb + Flow" stance={efCollapsedLabel} isOpen={sectionsOpen} onToggle={setSectionsOpen}>
          <div className="space-y-4">
             <div className={cn(
                "px-3 py-1.5 border text-[10px] uppercase font-bold tracking-widest flex justify-between h-8 items-center",
                ef.stance === 'Bullish' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                ef.stance === 'Bearish' ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                "bg-white/5 border-white/10 text-white/60"
              )}>
                <span className="truncate">{ef.divergenceLabel}</span>
                <span className="shrink-0">{hasEFSelection ? ef.pressureLabel : ""}</span>
              </div>
            <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Dominance</label>
              {EF_DOMINANCE_OPTIONS.map(o => (
                <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.ef_dominance === o.value} onClick={() => onUpdate('ef_dominance', data.ef_dominance === o.value ? '' : o.value)} />
              ))}
            </div>
             <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Behavior</label>
              {EF_BEHAVIOR_OPTIONS.map(o => (
                <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.ef_behavior === o.value} onClick={() => onUpdate('ef_behavior', data.ef_behavior === o.value ? '' : o.value)} />
              ))}
            </div>
             <div>
              <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">E+F Divergence</label>
              {EF_DIVERGENCE_OPTIONS.map(o => (
                <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.ef_divergence === o.value} onClick={() => onUpdate('ef_divergence', data.ef_divergence === o.value ? '' : o.value)} />
              ))}
            </div>
            {config.hasEfVerdict && (
              <div>
                <label className="text-[9px] text-white/40 uppercase font-bold tracking-widest pl-1 mb-2 block">Verdict</label>
                {EF_VERDICT_OPTIONS.map(o => (
                  <SelectableRow key={o.value} label={o.label} tone={o.tone} isSelected={data.ef_verdict === o.value} onClick={() => onUpdate('ef_verdict', data.ef_verdict === o.value ? '' : o.value)} />
                ))}
              </div>
            )}
          </div>
        </CollapsibleSection>
      </div>

      <div className="bg-black/60 p-5 border-t border-white/10 shrink-0 mt-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Net Stance</span>
            <StanceBadge stance={computed.netStance} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Confidence</span>
            <span className={cn("text-[10px] font-bold uppercase", computed.confidence === 'High' ? "text-emerald-400" : computed.confidence === 'Medium' ? "text-amber-400" : "text-rose-400")}>{computed.confidence}</span>
          </div>
          {layer !== 'layer1' && (
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Permission</span>
              <PermissionBadge permission={computed.permission} />
            </div>
          )}
          
          <TimeframeRationaleBlock drivers={computed.rationale.drivers} risks={computed.rationale.risks} />

          <div className="flex items-start gap-2 pt-2 border-t border-white/5">
            <textarea
              value={data.note || ''}
              onChange={(e) => onUpdate('note', e.target.value)}
              placeholder="Workbench notes..."
              className="w-full bg-white/5 border border-white/10 p-2 text-[10px] font-inter text-foreground resize-none h-12 focus:outline-none focus:border-primary/50 rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeframeColumn;
