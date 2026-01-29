
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import {
  LayerType,
  TimeframeData,
  Stance,
  RiskState,
  Permission,
  Confidence,
  LAYER_WEIGHTS,
  NetDriver,
  NetRisk,
  ComputedResults,
} from "../types/timeframe.js";

export type { NetDriver, NetRisk };

export const SIGNALS_PRESENCE_NONE_ID = 'presence_none';

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

const stanceFromScore = (score: number, threshold: number): Stance => {
  if (score >= threshold) return "Bullish";
  if (score <= -threshold) return "Bearish";
  return "Mixed";
};

export type MRDerived = {
  stance: Stance;
  score: number;
  anchorLabel: string;
  regime: string;
  flags: string[];
  risk: RiskState;
};

/**
 * Hunter SOP: Regime Classification
 * 1. Strong Momentum ↑↑  →  [Price > Fast, Slow, & Anchor]
 * 2. Momentum Bias ↑     →  [Price > Anchor & (Price < Fast or Slow)]
 * 3. Mixed / Transitional ↔
 * 4. Reversion Bias ↓    →  [Price < Anchor & (Price > Fast or Slow)]
 * 5. Strong Reversion ↓↓ →  [Price < Fast, Slow, & Anchor]
 */
export function interpretMR_Hunter(tf: TimeframeData): MRDerived {
  const regimeScore: Record<string, number> = {
    strong_momentum_up: +3,
    momentum_bias_up: +2,
    mixed_transitional: 0,
    reversion_bias_down: -2,
    strong_reversion_down: -3,
  };
  
  const baseScore = clamp(regimeScore[tf.regime_classification] ?? 0, -3, 3);
  const stance = stanceFromScore(baseScore, 1);
  const parent = tf.price_vs_anchor;
  const child = tf.price_vs_anchor_child;
  
  let anchorStatus = "Neutral";
  if (parent === "above_anchor") {
    anchorStatus = child === "extended_above" ? "Extended Above" : child === "testing_support" ? "Support Test" : "Accepted Above";
  } else if (parent === "below_anchor") {
    anchorStatus = child === "extended_below" ? "Extended Below" : child === "testing_resistance" ? "Resistance Test" : "Accepted Below";
  }

  return { 
    stance, 
    score: baseScore, 
    anchorLabel: anchorStatus, 
    regime: tf.regime_classification.replace(/_/g, ' ').toUpperCase(),
    flags: [], 
    risk: (anchorStatus.includes('Test') || anchorStatus.includes('Extended')) ? "Caution" : "OK" 
  };
}

export function interpretMR_Simplified(tf: TimeframeData) {
  const res = interpretMR_Hunter(tf);
  return {
    stance: res.stance,
    anchorLabel: res.anchorLabel
  };
}

export function computeTimeframeNet(layer: LayerType, tf: TimeframeData): ComputedResults {
  const { computed } = computeFullTimeframe(layer, tf);
  return computed;
}

export function computeFullTimeframe(layer: LayerType, tf: TimeframeData) {
  const mr = interpretMR_Hunter(tf);
  
  const arLoc = tf.ar_location || "mid_range";
  const efDom = tf.ef_dominance || "near_zero";
  
  const sig = {
    direction: (tf.signal_presence || []).some(s => s.toLowerCase().includes('bull')) ? 'Up' : (tf.signal_presence || []).some(s => s.toLowerCase().includes('bear')) ? 'Down' : 'None',
    primaryLabel: tf.signal_presence && tf.signal_presence.length > 0 ? (tf.signal_presence[0] === SIGNALS_PRESENCE_NONE_ID ? 'NO SIGNALS' : tf.signal_presence[0].replace(/_/g, ' ').toUpperCase()) : 'NO SELECTION',
    locationLabel: tf.signal_location ? tf.signal_location.replace(/_/g, ' ').toUpperCase() : '',
  };

  const computed: ComputedResults = {
    netStance: mr.stance,
    confidence: Math.abs(mr.score) > 2 ? "High" : "Low",
    score: mr.score / 3,
    permission: mr.risk === "OK" ? "Trade" : "Caution",
    risks: [mr.risk],
    flags: [],
    rationale: {
      drivers: [{ source: "MR", contribution: mr.score, summary: `Regime: ${mr.regime}` }],
      risks: mr.risk === "Caution" ? [{ tag: "STRUCT_RISK", severity: "Caution", detail: `Anchor Context: ${mr.anchorLabel}` }] : [],
      reversionSummary: null
    }
  };

  return { 
    mr, 
    computed,
    ar: { 
      band: arLoc.includes('upper') ? 'Upper' : arLoc.includes('lower') ? 'Lower' : 'Mid',
      detail: tf.ar_location_child ? tf.ar_location_child.replace(/_/g, ' ').toUpperCase() : '',
      risk: arLoc.includes('stretching') ? 'Caution' : 'OK'
    },
    sig,
    ef: { 
      dominance: efDom.includes('above') ? 'Buyers' : 'Sellers', 
      value: tf.ef_verdict || '0.00',
      signalLabel: tf.signal_presence && tf.signal_presence.length > 0 ? 'SIGNALS DETECTED' : 'NO SIGNALS',
      pressureLabel: tf.ef_behavior ? tf.ef_behavior.replace(/_/g, ' ').toUpperCase() : 'NEUTRAL',
      stance: efDom.includes('above') ? 'Bullish' : efDom.includes('below') ? 'Bearish' : 'Mixed',
      divergenceLabel: tf.ef_divergence !== 'none' ? tf.ef_divergence.replace(/_/g, ' ').toUpperCase() : 'NO DIVERGENCE'
    }
  };
}
