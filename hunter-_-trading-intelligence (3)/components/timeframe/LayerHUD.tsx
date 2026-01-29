
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { LayerType, LAYER_CONFIG, LayerData } from "../../types/timeframe";
import { StanceBadge, TradeableBadge, PermissionBadge } from "./StanceBadge";
import { computeLayerOutcome } from "../../hooks/useTimeframeAnalysis";

export default function LayerHUD({ layerData, layer }: { layerData: LayerData, layer: LayerType }) {
  const config = LAYER_CONFIG[layer];
  const { outcome, tradeable, stances } = computeLayerOutcome(layerData, layer);

  return (
    <div className="bg-white/[0.02] border-y border-white/5 py-4 px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Timeframe Consensus</span>
          <div className="flex gap-4">
            {config.timeframes.map(tf => (
              <div key={tf} className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/20">{tf}</span>
                <StanceBadge stance={stances[tf]?.netStance || 'Mixed'} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center border-l border-white/5 md:pl-8">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Layer Outcome</span>
          <StanceBadge stance={outcome} size="md" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Trade Permission</span>
          <TradeableBadge tradeable={tradeable} />
        </div>
      </div>
    </div>
  );
}
