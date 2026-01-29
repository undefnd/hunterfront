
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { RiskState, NetDriver, NetRisk } from "../../types/timeframe";

export default function TimeframeRationaleBlock({ drivers, risks }: { drivers: NetDriver[]; risks: NetRisk[] }) {
  if (drivers.length === 0 && risks.length === 0) return null;
  return (
    <div className="space-y-3 py-3 px-1 border-t border-white/5">
      {drivers.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[9px] text-white/50 uppercase font-bold tracking-widest block">Ordered Drivers</span>
          <div className="space-y-1">
            {drivers.map((d, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-[9px] text-white/40 shrink-0">[{d.source}]</span>
                <span className="text-[10px] text-white/80 leading-tight">{d.summary}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {risks.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[9px] text-rose-500/60 uppercase font-bold tracking-widest block">Active Risks</span>
          <div className="space-y-1">
            {risks.map((r, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-[9px] text-rose-500/60 shrink-0">!</span>
                <span className="text-[10px] text-amber-400/80 leading-tight">{r.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
