
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useState, useEffect } from 'react';
import { LayerType, LayerData, TimeframeData, createEmptyTimeframeData, LAYER_CONFIG } from '../types/timeframe.js';
import { computeTimeframeNet } from '../lib/analysisEngine.js';

export interface Workspace {
  id: string;
  market: string;
  state: Record<LayerType, LayerData>;
}

const DEFAULT_WORKSPACES: Workspace[] = [
  { id: '1', market: 'BTC/USDT', state: { layer1: {}, layer2: {}, layer3: {} } },
  { id: '2', market: 'ETH/USDT', state: { layer1: {}, layer2: {}, layer3: {} } },
  { id: '3', market: 'HYPE/USDT', state: { layer1: {}, layer2: {}, layer3: {} } },
];

export function useTimeframeAnalysis() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    const saved = localStorage.getItem('hunter_workspaces_v2');
    return saved ? JSON.parse(saved) : DEFAULT_WORKSPACES;
  });
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => {
    return localStorage.getItem('hunter_active_workspace_id') || DEFAULT_WORKSPACES[0].id;
  });
  const [activeLayer, setActiveLayer] = useState<LayerType>('layer1');

  useEffect(() => {
    localStorage.setItem('hunter_workspaces_v2', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem('hunter_active_workspace_id', activeWorkspaceId);
  }, [activeWorkspaceId]);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const updateMarket = (newMarket: string) => {
    setWorkspaces(prev => prev.map(w => 
      w.id === activeWorkspaceId ? { ...w, market: newMarket } : w
    ));
  };

  const updateTimeframe = (layer: LayerType, tf: string, field: keyof TimeframeData, value: any) => {
    setWorkspaces(prev => prev.map(w => {
      if (w.id !== activeWorkspaceId) return w;
      return {
        ...w,
        state: {
          ...w.state,
          [layer]: {
            ...w.state[layer],
            [tf]: {
              ...(w.state[layer][tf] || createEmptyTimeframeData()),
              [field]: value
            }
          }
        }
      };
    }));
  };

  return { 
    workspaces,
    activeWorkspace, 
    activeWorkspaceId,
    setActiveWorkspaceId,
    updateMarket, 
    activeLayer, 
    setActiveLayer, 
    state: activeWorkspace.state, 
    updateTimeframe 
  };
}

export function computeLayerOutcome(layerData: LayerData, layer: LayerType) {
  const config = LAYER_CONFIG[layer];
  const stances: Record<string, any> = {};
  let scoreSum = 0;
  let hasStandDown = false;

  config.timeframes.forEach(tf => {
    const data = layerData[tf] || createEmptyTimeframeData();
    const res = computeTimeframeNet(layer, data);
    stances[tf] = res;
    scoreSum += res.score;
    if (res.permission === 'Stand Down') hasStandDown = true;
  });

  const avg = scoreSum / config.timeframes.length;
  return { 
    outcome: hasStandDown ? 'Wait/Stand Down' : 'Calculated',
    tradeable: !hasStandDown && Math.abs(avg) >= 0.2,
    stances 
  };
}
