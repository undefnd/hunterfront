
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type LayerType = 'layer1' | 'layer2' | 'layer3';

export const LAYER_CONFIG = {
  layer1: {
    name: 'Layer 1 (Horizon)',
    shortName: 'Horizon',
    timeframes: ['1w', '3d', '1d'] as const,
    mrLabel: 'M&R Macro',
    signalsLabel: 'Signals Macro',
    hasArVerdict: false,
    hasEfVerdict: false,
  },
  layer2: {
    name: 'Layer 2 (Tactical)',
    shortName: 'Tactical',
    timeframes: ['4h', '2h', '1h'] as const,
    mrLabel: 'M&R Tactical',
    signalsLabel: 'Signals Tactical',
    hasArVerdict: true,
    hasEfVerdict: true,
  },
  layer3: {
    name: 'Layer 3 (Execution)',
    shortName: 'Execution',
    timeframes: ['30m', '15m', '5m'] as const,
    mrLabel: 'M&R Execution',
    signalsLabel: 'Signals Execution',
    hasArVerdict: true,
    hasEfVerdict: true,
  },
} as const;

export type Tone = 'bull' | 'bear' | 'neutral' | 'caution' | 'danger' | 'info';

export interface TonedOption {
  value: string;
  label: string;
  tone: Tone;
  children?: TonedOption[];
}

export const MR_REGIME_OPTIONS: TonedOption[] = [
  { value: 'strong_momentum_up', label: 'Strong Momentum ↑↑', tone: 'bull' },
  { value: 'momentum_bias_up', label: 'Momentum Bias ↑', tone: 'bull' },
  { value: 'mixed_transitional', label: 'Mixed / Transitional', tone: 'caution' },
  { value: 'reversion_bias_down', label: 'Reversion Bias ↓', tone: 'bear' },
  { value: 'strong_reversion_down', label: 'Strong Reversion ↓↓', tone: 'bear' },
];

export const PRICE_VS_ANCHOR_OPTIONS: TonedOption[] = [
  {
    value: 'above_anchor',
    label: 'Above Anchor',
    tone: 'bull',
    children: [
      { value: 'extended_above', label: 'Extended Above', tone: 'caution' },
      { value: 'testing_support', label: 'Support Test', tone: 'bull' },
      { value: 'reclaim_sweep', label: 'Reclaim Attempt', tone: 'bull' },
    ]
  },
  {
    value: 'below_anchor',
    label: 'Below Anchor',
    tone: 'bear',
    children: [
      { value: 'extended_below', label: 'Extended Below', tone: 'caution' },
      { value: 'testing_resistance', label: 'Resistance Test', tone: 'bear' },
      { value: 'reclaim_rejection', label: 'Failed Reclaim', tone: 'bear' },
      { value: 'above_fast_line', label: 'Above Fast Line', tone: 'caution' },
    ]
  },
];

export const AR_LOCATION_OPTIONS: TonedOption[] = [
  {
    value: 'upper_zone',
    label: 'Upper Zone',
    tone: 'info',
    children: [
      { value: 'upper_near', label: 'Near Boundary', tone: 'info' },
      { value: 'upper_approaching', label: 'Approaching Boundary', tone: 'info' },
      { value: 'upper_stretching', label: 'Stretching Above', tone: 'info' },
    ]
  },
  { value: 'mid_range', label: 'Mid Range', tone: 'info' },
  {
    value: 'lower_zone',
    label: 'Lower Zone',
    tone: 'info',
    children: [
      { value: 'lower_near', label: 'Near Boundary', tone: 'info' },
      { value: 'lower_approaching', label: 'Approaching Boundary', tone: 'info' },
      { value: 'lower_stretching', label: 'Stretching Below', tone: 'info' },
    ]
  },
];

export const SIGNALS_PRESENCE_OPTIONS: TonedOption[] = [
  { value: 'presence_none', label: 'NO SIGNALS', tone: 'info' },
  { value: 'bull_div_hollow', label: 'BULLISH DIVERGENCE ◇', tone: 'bull' },
  { value: 'bull_div_filled', label: 'BULLISH DIVERGENCE ◆', tone: 'bull' },
  { value: 'bear_div_hollow', label: 'BEARISH DIVERGENCE ◇', tone: 'bear' },
  { value: 'bear_div_filled', label: 'BEARISH DIVERGENCE ◆', tone: 'bear' },
];

export const SIGNALS_LOCATION_OPTIONS: TonedOption[] = [
  { value: 'near_mr', label: 'At Anchor', tone: 'neutral' },
  { value: 'near_ar', label: 'At Range', tone: 'neutral' },
  { value: 'mid_range', label: 'Mid', tone: 'info' },
  { value: 'other', label: 'Other', tone: 'neutral' },
];

export const EF_DOMINANCE_OPTIONS: TonedOption[] = [
  { value: 'above_zero', label: 'Above Zero (Buyers)', tone: 'bull' },
  { value: 'below_zero', label: 'Below Zero (Sellers)', tone: 'bear' },
  { value: 'near_zero', label: 'Near Zero Line', tone: 'neutral' },
];

export const EF_BEHAVIOR_OPTIONS: TonedOption[] = [
  { value: 'trending_up', label: 'Trending Up ↑', tone: 'bull' },
  { value: 'flat', label: 'Flat / Inactive', tone: 'neutral' },
  { value: 'trending_down', label: 'Trending Downward ↓', tone: 'bear' },
];

export const EF_DIVERGENCE_OPTIONS: TonedOption[] = [
  { value: 'none', label: 'No Divergence', tone: 'neutral' },
  { value: 'bullish_hollow', label: 'BULLISH DIVERGENCE ◇', tone: 'bull' },
  { value: 'bullish_filled', label: 'BULLISH DIVERGENCE ◆', tone: 'bull' },
  { value: 'bearish_hollow', label: 'BEARISH DIVERGENCE ◇', tone: 'bear' },
  { value: 'bearish_filled', label: 'BEARISH DIVERGENCE ◆', tone: 'bear' },
];

export const EF_VERDICT_OPTIONS: TonedOption[] = [
  { value: 'ok', label: 'Flow Supports Entry', tone: 'bull' },
  { value: 'fragile', label: 'Flow Fragile - Scale/Reduce', tone: 'caution' },
  { value: 'rejects', label: 'Flow Rejects Entry', tone: 'danger' },
];

export interface TimeframeData {
  regime_classification: string;
  price_vs_anchor: string;
  price_vs_anchor_child: string;
  price_vs_fast: string;
  mr_verdict?: string;
  ar_location: string;
  ar_location_child: string;
  ar_vs_bias?: string;
  ar_verdict?: string;
  signal_presence: string[];
  signal_location: string;
  signal_vs_bias: string;
  signals_verdict?: string;
  ef_dominance: string;
  ef_behavior: string;
  ef_divergence: string;
  ef_verdict: string;
  note: string;
}

export const createEmptyTimeframeData = (): TimeframeData => ({
  regime_classification: '',
  price_vs_anchor: '',
  price_vs_anchor_child: '',
  price_vs_fast: '',
  mr_verdict: '',
  ar_location: '',
  ar_location_child: '',
  ar_vs_bias: '',
  ar_verdict: '',
  signal_presence: [],
  signal_location: '',
  signal_vs_bias: '',
  signals_verdict: '',
  ef_dominance: '',
  ef_behavior: '',
  ef_divergence: 'none',
  ef_verdict: '',
  note: '',
});

export type Stance = 'Bullish' | 'Mixed' | 'Bearish';
export type RiskState = 'OK' | 'Caution' | 'Exhaustion' | 'No-Trade' | 'Reject';
export type ReversalBias = 'Up' | 'Down' | 'None';
export type Permission = 'Trade' | 'Caution' | 'Stand Down';
export type Confidence = 'High' | 'Medium' | 'Low';

export type MRMode = 'AcceptanceTrend' | 'ExpansionTrend' | 'Transition' | 'ReversionSetup';
export type StructureCondition = 'ContinuationLikely' | 'ContinuationFragile' | 'BreakOfStructureRisk';
export type AnchorStatus = 'Accepted Above' | 'Extended Above' | 'Support Test' | 'Reclaim Attempt' | 'Accepted Below' | 'Extended Below' | 'Resistance Test' | 'Failed Reclaim' | 'Below Anchor · Above Fast' | 'Above Anchor · Below Fast';
export type AROpportunity = 'Long-Locate' | 'Short-Locate' | 'No-Edge';
export type ARMode = 'Neutral' | 'MeanReversionFade' | 'MomentumStretch';
export type SignalDirection = 'Up' | 'Down' | 'None' | 'Conflicted';
export type SignalStrength = 'Weak' | 'Moderate' | 'Strong';
export type SignalState = 'Clean' | 'Caution' | 'Exhaustion';
export type SignalMode = 'ContinuationHealthy' | 'ContinuationAtRisk' | 'ReversalWatch' | 'ReversalLikely';

export interface MROutput {
  stance: Stance;
  risk: RiskState;
  reversalBias: ReversalBias;
  score: number;
  flags: string[];
  mode: MRMode;
  structureCondition: StructureCondition;
  anchorStatus: AnchorStatus | null;
  hint: string;
}

export interface AROutput {
  stance: Stance;
  risk: RiskState;
  reversalBias: ReversalBias;
  score: number;
  flags: string[];
  opportunity: AROpportunity;
  mode: ARMode;
  weightMultiplier: number;
  band: 'Upper' | 'Mid' | 'Lower';
  detail: string;
}

export interface SignalsOutput {
  stance: Stance;
  risk: RiskState;
  reversalBias: ReversalBias;
  score: number;
  flags: string[];
  direction: SignalDirection;
  strength: SignalStrength;
  state: SignalState;
  mode: SignalMode;
  hint: string;
  primaryLabel: string;
  contextLabel: string;
}

export interface EFOutput {
  stance: Stance;
  risk: RiskState;
  reversalBias: ReversalBias;
  score: number;
  flags: string[];
  context: string;
  intent: string;
  confidence: string;
  signalLabel: string;
}

/**
 * Analysis Drivers for explainability
 */
export type NetDriver = {
  source: "MR" | "SIG" | "EF" | "AR";
  contribution: number; 
  summary: string;
};

/**
 * Analysis Risks for explainability
 */
export type NetRisk = {
  tag: string; 
  severity: RiskState; 
  detail: string;
};

export interface TimeframeRationale {
  drivers: NetDriver[];
  risks: NetRisk[];
  reversionSummary: { direction: ReversalBias; strength: 'Strong' | 'Moderate' | 'Weak' } | null;
}

export interface ComputedResults {
  netStance: Stance;
  confidence: Confidence;
  score: number;
  permission: Permission;
  risks: RiskState[];
  flags: string[];
  rationale: TimeframeRationale;
}

export interface LayerData {
  [timeframe: string]: TimeframeData;
}

export const LAYER_WEIGHTS = {
  layer1: { mr: 0.45, ar: 0.00, sig: 0.25, ef: 0.30 },
  layer2: { mr: 0.40, ar: 0.10, sig: 0.20, ef: 0.30 },
  layer3: { mr: 0.40, ar: 0.00, sig: 0.25, ef: 0.35 },
} as const;
