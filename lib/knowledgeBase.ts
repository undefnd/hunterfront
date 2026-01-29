
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * HUNTER KNOWLEDGE BASE (SYSTEMIC GROUNDING)
 * Compressed intelligence from technical manuals, mathematical engine, and interpretation logic.
 * Ebb + Flow is derived from Chaikin Money Flow (CMF).
 * Anchor is derived from Moving Volume-Weighted Average Price (MVWAP).
 */

export const HUNTER_CORE_MANUAL = `
[HUNTER_SYSTEM_ARCHITECTURE_V2.5]
- M&R (Momentum & Reversion): The Master Regime Engine.
- Components: 
  * Fast Line (21): Cyan. Reactive momentum tracker.
  * Slow Line (50): Dark Gray. Broad trend identifier.
  * Anchor (MVWAP): Purple. Volume-weighted equilibrium gravity center.
- Fills:
  * Cyan Fill (Momentum): Price trading ABOVE Anchor. Bullish pressure.
  * Purple Fill (Reversion): Price trading BELOW Anchor. Bearish pressure.
- M&R Visual Stack Logic:
  * Strong Bull [+++]: 1.Price > 2.Anchor > 3.Fast > 4.Slow. (Confirmed Momentum)
  * Bullish Bias [+]: 1.Slow > 2.Price > 3.Fast > 4.Anchor. (Early Trend or Pullback)
  * Bearish Bias [-]: 1.Anchor > 2.Fast > 3.Price > 4.Slow. (Early Breakdown or Reversion)
  * Strong Bear [---]: 1.Slow > 2.Fast > 3.Anchor > 4.Price. (Confirmed Reversion)
- AR (Average Range): Topology Mapping. Gaussian envelopes (h=9).
- Signals: Diamond markers identify Confluence.
- ebb + flow (EF/CMF): Institutional Delivery Index. Measures volume-weighted flow.
`;

export const HUNTER_MATHEMATICAL_LOGIC = `
[ENGINE_MATHEMATICS_INTERNAL]
- ANCHOR PROTOCOL (MVWAP): Rolling volume-weighted equilibrium point. Unlike daily VWAP, it provides 24/7 continuity without session resets, making it superior for crypto perpetuals.
- EBB + FLOW (CMF): A volume-weighted oscillator measuring net inflow/outflow.
  * Correlation: Positive flow values have a 60–75% statistical correlation with subsequent price gains.
  * Intensity: Values > ±0.20 represent "Strong Institutional Control."
- REGIME CLASSIFICATION: Uses Binary Candle Logic to finalize states upon candle close. No repainting allowed.
- TOPOLOGY BANDWIDTH: Gaussian weighting (h=9, mult=3) ensures 99.7% of price distribution is captured within "The Cloud."
`;

export const HUNTER_INTERPRETATION_RULES = `
[INTERPRETATION_ENGINE_PROTOCOLS]
- "Firm" Reclaim: Requires a close >=0.2% beyond the Anchor Line.
- Support/Resistance Test: Triggered when Price is within 0.1% distance of the Anchor.
- Zero-Line Buffer: Crossovers require a ±0.05 magnitude buffer to filter out noise/whipsaws.
- Overextension (Exhaustion): Price hitting ±2σ Gaussian bands indicates extreme stretch and high probability of snap-back to the Anchor.
- Divergence Nuance: 
  * Bullish Divergence can occur anywhere and signal a rally.
  * If a Bullish Divergence occurs while Price is below a flat or falling Anchor, the rally will likely face immediate resistance at the Anchor.
- CHARACTER CHANGE: A shift in Flow from negative to positive (or a steady climb) during a price base is the early signal of institutional accumulation.
`;

export const STRATEGY_PROTOCOLS = `
[EXECUTION_PROTOCOLS]
1. MOMENTUM CONTINUATION (RIDE THE FLOW): 
   - Enter when momentum is confirmed [+++] and price pulls back to Anchor support.
   - VALIDATION: Volume-Supported Pullback (Price within 0.1σ of Anchor + Flow stays > 0).
2. REVERSION PULLBACK (THE FADE):
   - Enter short when price trades underneath Anchor and finds continuous resistance.
   - VALIDATION: Anchor rejection + Flow dropping below the -0.05 buffer.
3. ANCHOR PIERCE (FLOW-SUPPORTED BREAKOUT):
   - Entry on character change (Flow flip/surge > +0.05) + Candle close firmly (>0.2%) above the Anchor.
4. UNCONFIRMED TREND (THE TRAP):
   - Price rising above Anchor while Flow is negative or dropping. This is a cosmetic retail rally lacking institutional support.
5. FLOW EXHAUSTION (BUYING CLIMAX):
   - Flow hits an extreme (>+0.25) then rolls over toward zero while price pushes to a final high. This precedes exhaustion reversals.
`;

export const CONFLUENCE_HIERARCHY = `
[MULTI_TIMEFRAME_ALIGNMENT]
- HTF (Horizon): Swing Trend ID. Defines the "Main Room."
- MTF (Tactical): Position context and structural confirmation.
- LTF (Execution): Timing, triggers, and entry arriving.
`;

export const KNOWLEDGE_BASE = {
  manual: HUNTER_CORE_MANUAL,
  logic: HUNTER_MATHEMATICAL_LOGIC,
  engine: HUNTER_INTERPRETATION_RULES,
  strategies: STRATEGY_PROTOCOLS,
  confluence: CONFLUENCE_HIERARCHY
};
