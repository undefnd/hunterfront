
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { cn } from "../../lib/utils";
import { LayerType, LAYER_CONFIG } from "../../types/timeframe";

interface LayerTabsProps {
  activeLayer: LayerType;
  onLayerChange: (l: LayerType) => void;
  orientation?: 'horizontal' | 'vertical';
}

export default function LayerTabs({ activeLayer, onLayerChange, orientation = 'vertical' }: LayerTabsProps) {
  const layers: LayerType[] = ['layer1', 'layer2', 'layer3'];
  
  return (
    <div className={cn(
      "flex",
      orientation === 'vertical' ? "flex-col w-full" : "flex-row border-b border-white/5 bg-black/20 overflow-x-auto scrollbar-hide"
    )}>
      {layers.map((layer) => {
        const config = LAYER_CONFIG[layer];
        const isActive = activeLayer === layer;
        
        return (
          <button 
            key={layer} 
            onClick={() => onLayerChange(layer)} 
            className={cn(
              "px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap text-left",
              isActive 
                ? "text-primary border-l-2 border-primary bg-primary/5" 
                : "text-white/30 hover:text-white/60 hover:bg-white/5 border-l-2 border-transparent"
            )}
          >
            <div className="flex flex-col">
              <span className="text-[10px] opacity-50 mb-1">Layer {layer.slice(-1)}</span>
              <span className="text-xs">{config.shortName}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
