
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
Chaikin Money Flow (CMF) Indicator – Onboarding
Guide
A. Overview
Chaikin Money Flow (CMF) is a volume-weighted oscillator that measures the flow of money into or out of
an asset over a lookback period (typically 20 days) 1 2 . Developed by Marc Chaikin, it builds on the
Accumulation/Distribution concept by summing Money Flow Volume over the period instead of
cumulatively 1 . The indicator oscillates above and below zero, indicating buying vs. selling pressure.
When CMF is positive, it signals accumulation, meaning buyers are dominating (net inflow of “smart
money”). When CMF is negative, it signals distribution, meaning sellers are dominating (net outflow) 3
  4 . Traders primarily use CMF to confirm trend strength (e.g. positive CMF confirming an uptrend), gauge

volume-pressure behind price moves, and spot divergences between price and money flow that may
warn of reversals 5 6 . CMF is applicable to any market with reliable volume data – stocks, forex, crypto,
commodities – though its accuracy improves with higher-volume instruments.


      ⚠ CMF is a versatile indicator that can be applied across markets (stocks, forex, crypto – anywhere
      volume is reported). However, it is not a standalone trading system but a decision-support tool best
      used alongside price analysis and other indicators. Always consider the broader context before
      acting on CMF signals.   7   8




B. Installation Instructions (TradingView)
Setting up the Chaikin Money Flow on TradingView is straightforward. You can either add the built-in CMF
indicator or use a custom script. Below is a sample Pine Script v5 implementation of CMF with comments
explaining each step:



  //@version=5
  indicator("Chaikin Money Flow (CMF) Example", overlay=false)
  length = input.int(20, title="CMF Length", minval=1)

  // 1. Money Flow Multiplier (measures close position in range for the period)
  mf_multiplier = ((close - low) - (high - close)) / (high - low)


  // 2. Money Flow Volume = Multiplier * volume of that period
  mf_volume = mf_multiplier * volume

  // 3. CMF = (Sum of Money Flow Volume over 'length') / (Sum of volume over
  'length')
  cmf = ta.sum(mf_volume, length) / ta.sum(volume, length)

  // Plot the CMF line and a zero reference line




                                                       1
  plot(cmf, color=color.green, linewidth=2, title="CMF")
  hline(0, title="Zero Line", color=color.gray, linestyle=hline.style_dotted)


To install:


     1. Open TradingView and navigate to Pine Editor. Copy-paste the above script, or simply search for
        “Chaikin Money Flow” in the built-in indicators list.
     2. Apply to Chart: If using the script, click “Add to Chart”. If using built-in, just select it – the CMF will
        appear in a separate indicator pane.
     3. Done: You should see the CMF line oscillating around zero. (Optional: In the script, we set
         overlay=false to plot in a separate pane. We also included a dotted zero line as a reference.)

Note: TradingView also provides a built-in function ta.cmf(length) to calculate CMF directly              9   10 . The

script above explicitly shows the formula for educational clarity. You can adjust the length input to suit
your strategy (shorter period = more sensitivity, longer = smoother). Ensure the asset has sufficient volume
data; otherwise, CMF readings may be less meaningful.


C. Key Components
When using the CMF indicator, familiarize yourself with its visual elements and inputs:


      • CMF Line: The primary oscillating line that represents Chaikin Money Flow values. It ranges between
        -1 and +1 (though it rarely reaches extremes) 11 . By default it might be shown as a green line when
        above zero (bullish pressure) and red when below zero (bearish pressure), or as a single colored line
        with area fills. The slope and value of this line are critical – rising or high CMF indicates increasing
        buying pressure, while falling or low CMF indicates increasing selling pressure.


      • Zero Line (Equilibrium): A horizontal line at value 0, often drawn for reference. This is the balance
        point between net buying and selling. Above 0 means net inflows (accumulation) and below 0
        means net outflows (distribution) 4 12 . Many strategies revolve around whether CMF is above or
        below this line.


      • Lookback Period (Length): An input parameter (commonly 20 or 21 days by default) that
        determines how many periods are used in the CMF calculation 13 . This period can be customized. A
        shorter length (e.g. 10) will react faster to recent volume swings but can be noisy, whereas a longer
        length (e.g. 50) will be smoother but slower to reflect changes. Traders often stick with ~20 as a
        standard unless they have reason to adjust for their asset’s behavior.


      • Fills or Color Areas (if enabled): Many charting platforms visually highlight CMF positive vs.
        negative regions. For example, the area under the CMF line might be filled green when CMF > 0 and
        red when CMF < 0 for quick visual cues 14 15 . These colored fills emphasize bullish vs. bearish
        volume pressure “at a glance.” (In our script example, you could emulate this by using fill() or
        plotting the area; by default TradingView’s built-in CMF shows an area fill). Fills do not change the
        data, but they make it easier to see sustained periods of accumulation or distribution.


      • (Optional) Moving Average or Signal Line: Some advanced implementations include a moving
        average on the CMF line (e.g. a short SMA of the CMF) to smooth out noise or to signal turns (similar
        to a “signal line” in MACD). For instance, a 20-day CMF might be plotted along with a 20-day SMA of



                                                          2
      itself – crossings or alignment of CMF vs its average can indicate improving or weakening money
      flow. This is not part of the original CMF definition, but you may encounter it in custom indicators.
      The core components, however, remain the CMF oscillator and the zero line.


D. Interpretation
What does CMF tell us? In essence, CMF gauges accumulation vs. distribution by big market players. The
interpretation boils down to whether the indicator is above or below zero, and how it behaves relative to
price:


     • CMF > 0 (Positive Money Flow): Indicates net buying pressure. Buyers are absorbing shares/
       contracts, and the closing prices tend to be in the upper part of the range on high volume 16 . This
       confirms bullish trend strength if price is rising 3 . In an uptrend, consistently positive CMF
       suggests the up-move is backed by volume (healthier trend). In a range or downtrend, a rise of CMF
       into positive territory can be an early sign of accumulation (potential trend reversal). Generally,
       maintain a bullish bias when CMF is > 0, favoring long trades or holding longs, as long as this
       condition persists.


     • CMF < 0 (Negative Money Flow): Indicates net selling pressure. Sellers dominate, with closes
       tending toward the lower end of the range on high volume. This confirms bearish trend strength if
       price is falling 17 . In a downtrend, negative CMF validates the sell-off (distribution by informed
       sellers). If price has been rising but CMF turns negative, it warns that the rally may be suspect (weak
       internals). Bias shifts bearish when CMF is < 0, favoring short setups or caution on longs.


     • Centerline Crossovers: The zero line crossover is a pivotal signal. A cross above 0 implies a shift
       from net selling to net buying pressure – often interpreted as a bullish confirmation or early
       reversal signal if sustained 18 . A cross below 0 does the opposite, flagging a shift to net selling
       (bearish) 19 . For example, if an asset was drifting down and CMF moves from negative to positive, it
       suggests buyers are stepping in, potentially foreshadowing an upturn. However, not every
       crossover is significant – brief or marginal crosses can be “whipsaws” if not accompanied by price
       breakout. Many traders set a small buffer (e.g. +0.05/-0.05) to filter out noise around zero 20 . A firm
       cross (especially after an extended time on one side) carries more weight than a momentary flick
       above/below zero.


     • Trend Strength and Confirmation: The magnitude of CMF (how far above/below zero) can affirm
       trend strength. For instance, a strongly positive CMF (say +0.25) during an uptrend confirms heavy
       accumulation – a good sign for bulls 21 . Conversely, if price is at new highs but CMF is barely above
       zero, it suggests the breakout lacks volume support (a caution sign). In practice, chartists use
       threshold levels: e.g., CMF > +0.20 = strong buying pressure, CMF < -0.20 = strong selling
       pressure, while values near 0 indicate lack of conviction or a balance of flow 22 . Use these
       thresholds to gauge how intense the accumulation or distribution is.


     • Divergence Signals: Divergence between CMF and price is a key insight. A bullish divergence
       occurs when price makes a new low or series of lower lows, but CMF traces a higher low (i.e. selling
       pressure is waning relative to the prior swing) 23 . This suggests that although price fell, the
       underlying volume flow is turning bullish (less distribution or even slight accumulation) – often a
       precursor to a rally. A bearish divergence is the opposite: price makes a higher high, but CMF
       makes a lower high or falls while price rises, indicating waning buying pressure 24 . Divergences can




                                                      3
       warn of potential reversals: smart money might be quietly exiting even as price inches up, or
       entering even as price slides down. That said, divergences alone are not a timing signal – they simply
       alert you to weakening trend internals. It often “takes a move into positive territory to indicate actual
       buying pressure” after a bullish divergence (or a move negative to confirm selling after a bearish
       divergence) 7 . In other words, confirmation by a zero-cross or price breakout is wise rather
       than trading solely on a divergence that could persist.


     • Multi-Period Analysis: It can help to observe CMF’s trend or moving average. Is CMF trending
       upward (rising peaks) or downward over several periods? For example, a gradually rising CMF during
       a consolidation hints that accumulation is quietly happening before an upside breakout. Some
       traders compare CMF to its own short moving average – if CMF is above its average and rising,
       money flow momentum is positive (and vice versa) 25 12 . Also note extreme readings: while rare, a
       CMF near +1 or -1 indicates virtually all volume in the period was one-sided (this usually only
       happens in extraordinary conditions). More commonly, peaks around +0.3 to +0.5 or troughs around
       -0.3 to -0.5 are considered quite strong. Extreme readings can sometimes precede exhaustion (e.g.,
       very high CMF might pull back when buying frenzy cools), but context is key.


I. Cheat Sheet – CMF Signals at a Glance


For quick reference, use this summary of core CMF interpretations and what they imply for strategy:


     • CMF > 0 (Above Zero) – Accumulation. Buying pressure dominates. Bias: Bullish.
       Strategy: Favor long trades; price uptrends are more trustworthy. Action: Look for continuation
       entries on dips as long as CMF stays positive (volume support). 3


     • CMF < 0 (Below Zero) – Distribution. Selling pressure dominates. Bias: Bearish.
       Strategy: Favor shorts or defensive on longs; downtrends have conviction. Action: Consider short
       rallies; price rises are suspect if CMF stays negative. 17


     • Crossing Above 0 (Negative → Positive) – Bullish Shift. Indicates a transition to net buying flow.
       Interpretation: Momentum may be turning up; an existing downtrend could be ending. Action: Watch
       for bullish confirmations (e.g. break of resistance or upturn in price). Often used as a buy signal if
       confirmed 18 .


     • Crossing Below 0 (Positive → Negative) – Bearish Shift. Indicates a transition to net selling flow.
       Interpretation: Momentum turning down; an uptrend may be losing support. Action: Consider
       defensive moves or shorts if price breakdown confirms. Often a sell signal if confirmed by price
       action 19 .


     • Bullish Divergence (Price lower low, CMF higher low) – Decreasing selling pressure amid decline.
       Interpretation: “Smart money” might be accumulating even as price falls – a reversal upward could be
       near. Action: Look for bottoming signs: e.g. CMF rising toward zero, a price double bottom or
       breakout. Go long if CMF crosses >0 or price confirms reversal. 26


     • Bearish Divergence (Price higher high, CMF lower high or falling) – Decreasing buying pressure amid
       rally.




                                                       4
       Interpretation: Distribution might be occurring behind the scenes – uptrend may be running out of
       steam. Action: Be cautious on longs; watch for price weakness. Consider short if support breaks or
       CMF dips < 0 confirming sellers taking control. 27


      • Extended High CMF (e.g. > +0.25) – Strong accumulation, but watch for overextension.
        Interpretation: Trend is strongly supported by volume. Action: Stay with the trend but monitor for any
        divergence or sudden drops in CMF which could signal buyers exhaustion.


      • Extended Low CMF (e.g. < -0.25) – Strong distribution, possible capitulation if extreme.
        Interpretation: Downtrend is strongly supported by volume (aggressive selling). Action: Short bias
        stays, but if an extreme reading begins to rise, it may indicate capitulation bottom and reversal
        potential.


(Note: The +0.25/-0.25 levels are not magic numbers but common reference points; some sources use tighter
bands like +0.05/-0.05 for minor confirmation signals 20 . Adjust thresholds based on the asset’s typical volatility
and volume patterns.)


E. General Strategy + Examples
CMF can be incorporated into trading strategies in various ways. Broadly, it excels in confirming
momentum continuations and in flagging volume-based reversals or divergences. Below we outline
three strategy archetypes with entry/exit logic and illustrative examples:


I. Momentum Continuation Strategy (Trend Following with Volume Confirmation)
- Description: This approach aims to ride strong trends – entering in the trend direction once both price
action and CMF indicate persistent momentum. Here, CMF serves to confirm that a price trend (up or down)
is backed by substantial volume (money flow), reducing the chance of false breakouts. You’re effectively
saying: “If the market is trending and big money is on the same side (CMF positive for uptrend or negative
for downtrend), I want to join that move.” 3 This strategy works best in clearly trending markets.


      • Bullish Entry Rules: Wait for an uptrend to establish (e.g. series of higher highs/lows on price).
        Ensure CMF is positive and ideally rising during the trend 16 28 . Enter long on a pullback or
        consolidation while CMF remains > 0. For example, suppose a stock is in a strong rally; CMF has been
        above +0.1 for several weeks. You might time an entry when price dips to a support (like a moving
        average) but CMF stays green, indicating the pullback is likely just profit-taking rather than true
        distribution. A specific trigger could be a bounce in price off support with CMF still positive or
        upticking (showing buyers are still active). This alignment – price resuming upward and CMF
        confirming continued accumulation – is a green light to go long.


      • Bearish Entry Rules: Mirror the above for downtrends. In a steady downtrend, CMF should be
        consistently below 0 (confirming distribution). Enter short on minor rallies towards resistance while
        CMF stays < 0. For instance, in a falling market, if price makes a lower high into a known resistance
        level and CMF, which has been negative, ticks down again, it suggests the sellers are using that
        bounce to unload more (distribution continues). That’s an opportunity to initiate a short position in
        alignment with the volume trend.


      • Exit (Stop) – Trend Invalidation: The trade is invalidated if CMF loses its supportive signal or price
        breaks the trend structure. For a long trade, if CMF falls below zero (or even sharply toward zero)



                                                         5
       after entry, it warns that buying pressure may be fading – consider tightening stops or exiting.
       Likewise, if price violates a key higher-low (for an uptrend) or key support, exit the trade. Example:
       You went long as price and CMF aligned bullish; later, price stagnates and CMF drops below 0 – that
       divergence (price flat but CMF turning negative) is a cue to exit because it suggests stealth
       distribution starting. 6 Similarly, for shorts, if CMF flips above 0 or price makes a higher high
       against you, cut the trade. Essentially, remain in the trade while the trend and CMF agreement
       persists; exit when that agreement is broken.


     • Take-Profit Considerations: In strong trends, you might ride the position until a clear opposite CMF
       signal appears. For example, if long, one might hold until CMF peaks and then falls back toward zero
       or until a bearish divergence forms (price makes higher high but CMF makes lower high – a warning
       sign to take profit). Gradual scaling out can be done if CMF shows early weakness even before
       crossing zero (e.g. two lower peaks in CMF while price is still rising). Always watch price action in
       conjunction with CMF – volume confirmation gives confidence, but price is ultimately king for
       exits.


Example Scenario: Imagine Bitcoin has been in a sustained uptrend. CMF(20) is positive for weeks,
fluctuating between +0.15 and +0.30, confirming strong accumulation. You wait for a typical dip (say 5-10%)
in price. During this dip, CMF might pull back a bit but remains > 0 (perhaps it falls from +0.25 to +0.10, but
not negative). This tells you the sell-off is likely a minor shakeout. As soon as price shows an uptick off
support and CMF starts climbing again (say from +0.10 back toward +0.15), you enter long, expecting the
uptrend to continue. You set a stop below the recent swing low. The trade progresses as hoped – price
reaches new highs and CMF surges back above +0.20, confirming the momentum. You ride the trend.
Eventually, you notice price makes a new high but CMF at that high is lower than before (a bearish
divergence), and shortly after, CMF dips under 0. You take profit on the signal that the trend’s volume
support has likely ended. This trade aligned with the momentum continuation plan and used CMF to stay
on the right side of “smart money.”


II. Volume-Based Reversal Strategy (Anticipating Turns via CMF Shifts)
- Description: This contrarian strategy seeks to catch trend reversals by monitoring when CMF indicates a
significant shift in buying/selling pressure ahead of price. Often, volume will hint at a turn before price
confirms it. The idea is to watch for extremes or unusual CMF crosses and divergences at trend turning
points. While riskier (calling tops/bottoms), it can yield early entries if done with confirmation. Essentially,
when a market has been one-sided (either trending strongly or range-bound), a sudden change in CMF behavior
can signal that the tide is turning – even before price breaks out. We use those volume clues to initiate a
reversal trade with tight risk control.


     • Bullish Reversal Entry: Look for signs of accumulation in a downtrend. In a well-established
       downtrend, price will be making lower lows and CMF typically negative. The reversal opportunity
       comes when CMF starts rising toward zero or even crosses above 0 while price is still near lows
         18 . This could happen after a climactic sell-off: for example, price makes a final low on very high

       volume, and subsequent days have CMF improving (maybe from -0.3 to -0.1 to +0.05) even though
       price hasn’t rallied much. That tells you sellers might be exhausted and buyers are stepping in
       (classic bottoming). A concrete entry trigger might be: CMF crosses from negative to positive and
       price takes out a recent swing high (confirmation that price is turning up). Enter long there, as the
       volume flow shift suggests the downtrend is likely over. Another scenario: a bullish divergence at the
       low (price low but CMF higher low) 23 – you could enter once you see a strong bullish price candle




                                                       6
       and CMF uptick, anticipating that volume support will fuel a larger reversal. In both cases, the key is
       that CMF is showing a clear change in character (from negative to positive or a steady climb),
       indicating accumulation during the base.


     • Bearish Reversal Entry: Conversely, in an uptrend nearing exhaustion, watch for distribution signs.
       Perhaps price has been rising for months; suddenly CMF, which was largely positive, starts to drop
       and even goes below 0 while price is still making marginal new highs. That suggests buyers are losing
       enthusiasm and sellers (distribution) are quietly emerging 27 . A telltale sign is a bearish divergence
       at the top: price pushes to a higher high but CMF is much lower than on the previous high or has
       turned negative. A possible entry is when CMF crosses below 0 and price breaks a key support
       level, confirming the trend reversal. One could short as soon as CMF turns negative if price shows
       any topping pattern (like a double top or trendline break), but ideally combine both for confirmation.
       Essentially, CMF flipping from green to red in an uptrend is your early warning to prepare for a
       short.


     • Exit (Stop) – False Signal: Reversal trades can be prone to false starts, so strict risk management is
       crucial. If the anticipated follow-through doesn’t happen quickly, exit. For a bullish reversal, if you
       went long on CMF > 0 but then price fails to rally and CMF slips back negative, cut the trade – the
       accumulation signal proved false. For a bearish reversal, if price doesn’t break down as expected and
       CMF jumps back above 0, abort the short. Set stops just beyond the recent extreme (e.g., for a long
       off a low, stop below that low; for a short off a peak, stop above that high). This way, if the trend
       actually continues, you exit small.


     • Example: Consider a forex pair in a sharp downtrend. It’s been grinding lower for weeks; CMF has
       been mostly below -0.1, confirming selling. Suddenly, a particularly high-volume day occurs – a large
       down day but with a long lower wick (buyers stepped in late). Over the next few days, price makes a
       slightly lower low, but CMF is rising fast, showing that despite the new price low, the intensity of
       selling is easing (bullish divergence). By the time price stabilizes, CMF crosses above 0. You initiate a
       long position as soon as price closes above a short-term resistance level, noting that CMF is now
       positive for the first time in a long while. Essentially, “whales” appear to be accumulating. The
       trade goes in your favor as the pair reverses upward. You ride it until perhaps CMF reaches an
       overbought level or until price hits a major resistance. On the flip side, if CMF had quickly fallen back
       negative, you would have bailed out. This demonstrates using CMF’s early shift to preempt a
       reversal, with confirmation to avoid pure guessing.


III. Divergence Confirmation Strategy (Volume/Price Divergence Plays)
- Description: This strategy specifically capitalizes on CMF divergences to catch reversals, using the
divergence as a setup, and then waiting for confirming action to actually trade. Divergences often signal
that a trend is weakening: price and volume flow are out of sync. The goal is to identify these discrepancies
and trade only when price confirms the change, thereby combining the best of both worlds – early
warning from CMF, plus actual price reversal confirmation. This can yield high-probability entries near
turning points with relatively low risk.


     • Identifying a Divergence: First, spot a clear divergence: either Bullish divergence – price makes a
       lower low but CMF makes a higher low (less negative) 23 ; or Bearish divergence – price makes a
       higher high but CMF a lower high (or even turns negative) 24 . Mark those levels: e.g., “Price lower
       low at $50 vs prior low $52, but CMF at this new low is -0.05 vs prior -0.20 – bullish divergence noted.”




                                                      7
     • Confirmation Triggers: Rather than entering immediately on the divergence (which can persist),
       wait for triggers:


     • For a bullish divergence: a logical trigger is when CMF actually crosses above 0 after the divergence,
       and/or price breaks above its prior swing high. The rationale: the divergence hinted the downtrend
       was weakening; the zero-cross or price breakout confirms buyers have seized control. You can
       choose either or both conditions. Some traders even draw a trendline on the CMF itself – e.g.,
       connecting the declining tops on CMF – and go long when that trendline is broken, since it shows a
       momentum shift in money flow. But coupling a CMF zero-line cross with a price pattern breakout is
       more robust.

     • For a bearish divergence: similarly, one might wait for CMF to dip below 0 (if it wasn’t already) or a
       clear price breakdown (like a drop below the last swing low) before shorting. This ensures that the
       rising trend has actually cracked. The divergence was the heads-up; the trigger is the first solid
       evidence of sellers overwhelming buyers.


     • Entry & Risk: Once confirmed, enter in the direction of the anticipated reversal (long for bullish
       divergence, short for bearish). Because divergences often mark significant pivots, you can often place
       a tight stop near the extreme of the recent move. For a bullish divergence entry, a natural stop is just
       below the lowest low of the price (since if price makes yet another low, the divergence failed). For a
       bearish divergence short, stop just above the highest high. This yields favorable risk/reward – you’re
       catching a reversal early with confirmation, so reward can be the entire new trend swing, while risk is
       just a break of the recent extreme.


     • Managing/Exiting: If the trade works, CMF should move further in your favor (e.g., after a bullish
       divergence entry, CMF should stay > 0 and ideally rise; if it falters quickly, beware). One might use
       the CMF returning to neutral or opposite divergence as an exit signal. For example, after a bullish
       divergence long, ride the new uptrend until perhaps a bearish divergence appears at a new high,
       indicating the run may be ending. Or simply trail a stop as usual for trend trades. The key is you got
       in early with confirmation, so you can afford to let it run. If nothing else, consider taking partial
       profits at logical targets (like Fibonacci retracements or prior major levels) while CMF remains
       supportive.


     • Example: A stock was in an uptrend but then started topping out: it pushed to $100 (high #1) with
       CMF around +0.20. It pulled back to $90, then rallied again to a new high of $105 (high #2), but this
       time CMF only got up to +0.05 and quickly turned down – a clear bearish divergence (price higher
       high, CMF lower high). You don’t short at $105 immediately; instead you note the divergence and
       watch. Soon price fails to hold $100 and breaks below it, and around the same time CMF, which was
       already falling, goes below zero = confirmation that distribution has taken over. You short the
       stock around $98 on that confirmation (with a stop just above $105 high). The stock then declines to
       $85 over the next few weeks, with CMF deeply negative confirming your trade. You cover (exit) when
       it hits major support and CMF starts ticking up off an extreme (perhaps even showing a bullish
       divergence against the new lows). This illustrates a full cycle: using a divergence to enter near the
       top and CMF again to time an exit near the bottom.


F. Multi-Timeframe Confluence
To increase reliability, many traders use CMF in a multi-timeframe analysis framework. The idea is to align




                                                      8
the volume-flow trend on higher timeframes with signals on lower timeframes, achieving a “stacked
confirmation” before executing a trade. Different time horizons act like layers: the higher timeframe gives
the context and primary trend bias, the middle timeframe offers a refined signal in that trend
direction, and the lower timeframe pinpoints the exact entry timing. This prevents, for example, taking a
buy signal on a 15-min chart when the daily money flow is bearish – a mismatch that often fails. Instead,
you ensure the larger tide is in your favor, then catch the smaller wave.


Recommended Timeframe Combinations:


     • Swing Trading (Holding days to weeks): Use the Daily chart for the primary trend bias, 4H (or 1H)
       for signal confirmation, and 15m or 1H for execution timing. Example: Suppose on the 1-Day
       timeframe, CMF(20) is strongly positive and rising, confirming a bullish environment. On the 4-Hour
       chart, price undergoes a pullback and CMF dips slightly but stays above zero – then turns back up.
       That 4H upturn (perhaps a bullish zero cross or divergence on 4H) is your go-ahead that the swing-
       trend is reasserting. You might then drill into a 15-minute chart to actually time a precise entry (say a
       small breakout or pattern) to go long. In this scenario, 1D is your “tide” (bullish bias), 4H is the
       “current” (confirming flow in bullish direction), and 15m is the “ripple” to fine-tune entry 29
         30 . All three align long, which statistically improves success. A swing trader might also incorporate

       the Weekly chart as an even higher context (e.g., weekly CMF positive adds extra confidence to daily
       signals).


     • Day Trading (Intraday to multi-day holds): Use a 4-Hour or 1-Hour chart for the broader trend
       bias, a 15-Minute for intermediate setup, and a 5-Minute (or even 1m) for entries. For instance, if you
       trade futures intraday, you might see that on the 4H chart CMF is negative and price is in a
       downtrend (big-picture bias = short). Then on the 15m chart, you wait for a bounce that brings
       CMF(15) back to around zero or a slight positive and then rolls over (e.g., CMF fails to go positive or
       quickly goes red again while price makes a lower high) – this could be your trigger context. Finally,
       on a 5m chart, you catch the moment when that roll-over translates into an actual breakdown
       (maybe a small range break or moving average crossover) to enter the short. Here 4H says look
       short, 15m times the setup as the smaller trend turns down with volume confirming, and 5m
       gives you a precise entry point. This multi-tier confirmation keeps you trading in the path of least
       resistance across timeframes 31 32 .


     • Long-Term Investing: If using CMF for longer-term positions, one might use Weekly or Monthly
       CMF to identify major accumulation/distribution phases, and then use Daily charts to refine entries.
       For example, if the monthly CMF is deeply negative but starts to rise (indicating long-term selling
       pressure easing), and weekly CMF crosses above 0, it could signal a major bottom – one could then
       use a daily chart to pick a low-risk entry point for a long-term buy.


Guidelines for Multi-TF use: Always give the higher timeframe more weight – it defines the dominant
“flow of funds” trend. Lower timeframe CMF signals against a higher TF trend are lower probability or should
be quick scalp trades at most. For confluence, you typically want: - Higher TF CMF clearly positive or
negative (bias established), - Medium TF aligning in the same direction (or setting up to, e.g., a pullback
about to end), - Lower TF to trigger entry when it flips in that same direction.


If the timeframes disagree (e.g., daily CMF is positive but weekly is negative, or 15m gives a buy but 4H CMF
is solidly red), be cautious – either skip the trade or accept it’s counter-trend and manage aggressively.




                                                      9
Ideally, all levels should “agree” or at least not conflict. As a saying: “Trade in the direction of the current,
but also make sure the tide is with you.” This practice can significantly filter out bad trades.


Real-World Example: A trader wants to buy in an uptrending stock. The Weekly CMF is bullish, suggesting
institutions are accumulating over the past months. The Daily chart had been in a minor correction, but now
daily CMF is rising off slightly below zero toward positive, hinting the pullback is ending. On the 4H chart,
the trader spots a bullish divergence (price made a low but 4H CMF made a higher low) and now 4H CMF
just crossed above 0. This multi-timeframe evidence builds a strong case. The trader then uses the 1H chart
to fine-tune an entry – perhaps entering on a small resistance breakout – confident that both the “tides” and
“currents” support this “ripple” entry. The outcome is a high-quality swing trade leveraging volume flow on
all scales.


G. Limitations and Best Practices
No indicator is perfect. CMF, for all its useful insight, has several limitations traders should be aware of:


      • Volume Dependency & Market Type: CMF’s accuracy hinges on the asset’s volume reliability. In
        low-liquidity markets or off-hours trading, volume surges/spikes can distort CMF readings,
        leading to false signals 33 . For example, a single abnormal volume day can swing CMF positive even
        if the broader trend is unchanged. Similarly, in very volatile or trendless (choppy) conditions, CMF
        will whipsaw around zero, offering little useful information 34 . Applying a threshold (like ±0.05) can
        filter minor whipsaws but won’t eliminate them 20 . The indicator tends to work best in sustained
        trends or clear accumulation/distribution phases; it’s less reliable when price is whipsawing sideways
        on uneven volume.


      • Lagging Nature: Like most oscillators, CMF looks back over past periods – it is somewhat lagging.
        Strong signals (e.g. a high positive reading) often occur after a considerable move has happened 35 .
        It confirms but doesn’t necessarily predict. A sudden reversal in price might not immediately register
        in CMF until enough periods confirm the new trend. Traders should avoid using CMF as a sole timing
        tool for quick turns – price patterns or shorter indicators might be needed for precise entries. Use
        CMF as a contextual tool (e.g., “the environment is bullish”) rather than a rapid trigger.


      • False Signals & “Volume Noise”: CMF can sometimes give counterintuitive readings due to how
        the formula works. Gaps and large single-day ranges can “fool” the indicator. For instance, if a stock
        gaps down massively but then closes in the upper half of that day’s range, CMF for that day might be
        positive (since the close was strong relative to the day’s range) despite the overall price drop 36 .
        This could make CMF rise even though the news was bad and price fell a lot (volume came in at the
        end to buy the dip). The opposite can happen on gap ups that fade (close in lower half) – CMF can
        register as negative even if price had a big up move 37 . Such situations create disconnects between
        price and CMF 38 . To mitigate this, be cautious when you see CMF move opposite to a huge price
        move – realize it might be an anomaly of the formula. Some traders prefer Twiggs Money Flow, a
        variant that uses true range in the formula to account for gaps 39 , or simply combine CMF with
        other volume indicators to confirm validity when unusual price gaps occur.


      • Not a Standalone Indicator: Perhaps most importantly, CMF should not be used in isolation 40
         41 . It provides a snapshot of volume pressure, but price action and other indicators (momentum

        oscillators, trend indicators, support/resistance analysis) are needed to build a complete picture.
        Volume flow can diverge for a long time before price follows (or sometimes not at all). Thus, treat




                                                       10
      CMF as one component in your toolkit. In practice, many successful approaches pair CMF with a
      momentum indicator like RSI or MACD (to marry volume with price momentum) 40 . For example, a
      popular scan is CMF turning positive combined with RSI crossing above 50 for a buy signal 42 –
      volume and momentum confirming each other. In our system context, combining CMF with the
      other proprietary tools (Momentum, Average Range, Signals, Support/Resistance) will greatly
      enhance reliability 8 . CMF might tell you “volume is bullish,” but you’d still want price trend
      (Momentum+Reversion indicator) to be up, volatility/range conditions (Average Range indicator) to
      be favorable, and perhaps a signal trigger. By requiring confluence, you filter out many false
      positives that CMF alone might generate.


     • Needs Sufficient Data: Ensure you use CMF on charts with enough historical data loaded,
       especially on higher lengths. If your chart only loads 50 bars and you set CMF length to 50, the first
       reading will only appear at the end with partial info. Always load more data than your CMF period so
       that initial values stabilize (in TradingView, the indicator usually handles this but on very short
       datasets this could be an issue). Also, CMF’s interpretation on very low timeframes (e.g. 1-minute)
       can be dubious because individual trade volumes cause jitter – when day trading, it often pays to
       focus on at least 5-min or higher for CMF or use tick volume if available for forex.


H. Backtest Insights and Research Findings
What do historical tests and studies say about CMF’s effectiveness? The evidence is mixed, suggesting CMF
can add value but is not the top-performing stand-alone indicator:


     • Comparative Studies: A 2011 Stocks & Commodities magazine study by Markos Katsanos rigorously
       tested seven popular volume indicators (including CMF) over 10 years on 30 stocks 43 44 . The
       results showed all the volume-based indicators (including CMF) beat a buy-and-hold strategy in
       terms of net profit, indicating that incorporating money flow data did provide an edge 45 . However,
       CMF was middle-of-the-pack in performance. For example, in a divergence trading system test, CMF
       produced an annualized return around ~9.5%, while the top performers (like Volume Oscillator,
       Money Flow Index, and Volume Price Trend) yielded higher annual returns (~13%–15%) 46 47 . CMF
       did outperform some others (On-Balance Volume was notably worse) 48 , but it wasn’t the strongest.
       Katsanos noted that volume oscillators with longer calculations or additional price filters tended to
       catch moves with less drawdown, whereas CMF gave more frequent but sometimes smaller wins 49 .
       The takeaway: CMF can be beneficial, but other volume metrics can complement or even outshine it
       in certain strategies.


     • Academic Research: A study by Kannan et al. (2010) examined various technical indicators for stock
       market forecasting, including Chaikin Money Flow. They found that while CMF could indeed
       produce profitable signals, it was less profitable than many other common indicators such as
       moving averages, Bollinger Bands, RSI, or Stochastic Momentum Index in their tests 50 . In other
       words, CMF didn’t top the list in that comparative analysis. Another result from that study was the
       introduction of Twiggs Money Flow (an adjusted version of CMF using true range and EMA), which
       was chosen for analysis due to original CMF’s shortcomings in certain situations 39 . This suggests
       that researchers saw room for improvement in the raw CMF formula, especially regarding handling
       of gaps/volatility – aligning with the known limitations we discussed.


     • Efficiency and Predictiveness: Volume indicators like CMF attempt to capture the oft-cited idea that
       “volume precedes price.” Empirical evidence shows moderate predictive power. For instance,




                                                    11
           internal testing by some analysts found that positive CMF readings often lead price gains with about
           a 60–75% correlation, depending on the asset 51 . This means there is a tendency for price to
           eventually follow the direction of sustained money flow, but it’s not guaranteed in every instance
           (hence why confirmation is key). An institutional whitepaper (by Chaikin Analytics) supporting Marc
           Chaikin’s models noted that combining CMF with other factors can improve performance – e.g.,
           using CMF to confirm signals in a multi-factor “power gauge” model yielded better returns than price
           signals alone 7 40 .


          • Notable Use-Cases: Many traders and even some funds incorporate CMF in scanning for trade
            opportunities. For example, a common scan (also mentioned on StockCharts) is to look for stocks
            where CMF has just turned positive from negative alongside a rise in an indicator like RSI
            above 50, as this combo historically identifies improving bullish conditions 42 . Conversely, scanning
            for new CMF negatives with falling RSI finds weakening stocks 52 . These scans have been used to
            generate trade ideas that statistically outperform random picks, showing the practical value of CMF
            as part of a broader criteria.


          • Real-world Performance Caveat: While backtests show promise, they also highlight that CMF
            works best in concert with other signals. As noted earlier, relying on a single indicator (volume-
            based or otherwise) is risky. The “edge” of CMF is in confirming the health of trends and sniffing out
            anomalies (divergences). Used appropriately, it can improve win rates (by avoiding low-quality trades
            where volume doesn’t confirm) and occasionally give early warning of reversals. But used
            inappropriately (e.g., blindly trading every zero cross), it can whipsaw and underperform. Remember
            the finding: even a bullish divergence in negative territory doesn’t guarantee a rally – it might just
            mean less selling for a while 7 . Price still needs to actually turn.


In summary, research and testing underscore that CMF is a valuable supportive indicator. It tends to be
less effective alone than some price-based indicators, but adds significant context and confirmation
when combined 50 40 . To get the most out of Chaikin Money Flow, integrate it with a holistic strategy: let
it tell you when the “ undertow” of volume is aligned or at odds with price, and trade accordingly with
proper risk management. Happy trading, and may the money flow be in your favor!


Sources: The information and strategies above are drawn from a combination of classic technical analysis
resources and recent studies. Key references include ChartSchool by StockCharts (on CMF’s definition,
calculation, and use cases) 1 11 53 , TradingView & Pine Script documentation (for implementation
details) 54 55 , the Ebb+Flow volume indicator guide (for multi-timeframe and conceptual analogies) 29
 30 , and comparative analyses from Stocks & Commodities magazine and academic journals evaluating

CMF’s performance 46 50 . These sources and studies reinforce the guidance provided, ensuring you have
an evidence-based understanding of Chaikin Money Flow in your trading toolkit. Happy onboarding! 56
  7




 1    3     6   7   11   13   17   20   34   36   37   38   40   41   42    52   53   56   Chaikin Money Flow (CMF) | ChartSchool |
StockCharts.com
https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/chaikin-money-flow-
cmf




                                                                           12
 2   5    9    10   16   18   19   21   22   23   24   26   27   28   54    55   Pine Script Chaikin Money Flow - Complete
TradingView Guide
https://offline-pixel.github.io/pinescript-strategies/pine-script-ChaikinMoneyFlow.html

 4   12   14   15   25   29   30   31   32   51   [EBB+FLOW INDICATOR].pdf
file://file-MU8NH9uxsUabmVZC56HNYD

 8   33   35   [MOMENTUM + REVERSION INDICATOR].pdf
file://file-3o5wcLo49YV8UywWtiTfaX

39   50   jrmi.au.edu
https://jrmi.au.edu/index.php/jrmi/article/download/156/143

43   44   45   46   47   48   49   Comparing Seven Money Flow Indicator PDF - PDFCOFFEE.COM
https://pdfcoffee.com/comparing-seven-money-flow-indicator-pdf-pdf-free.html




                                                                           13


// --- MVWAP PDF ---


Mastering MVWAP: Advanced BTCUSD Intraday
Trading Lesson Plan
1. Understanding MVWAP – Formula and Key Differences from
VWAP/EMA
What is MVWAP: MVWAP stands for Moving Volume-Weighted Average Price. It is essentially a moving
average of the VWAP (Volume-Weighted Average Price) over a specified period 1 . In practical terms,
MVWAP takes successive VWAP values (which themselves incorporate price and volume data) and averages
them. For example, a 10-period MVWAP would compute the VWAP for each of the last 10 bars and then take
their average 1 . This produces a volume-weighted average price that “moves” with each new bar, rather
than resetting each day. The formula can be summarized as:


     • VWAP for each bar = Cumulative(Price × Volume) / Cumulative(Volume) 2 .
     • MVWAP(n) = Average of the last n VWAP values (often a simple moving average of VWAP, though some
       implementations use an EMA on VWAP).

What MVWAP captures: Like VWAP, MVWAP reflects the true average price of an asset over a period,
weighted by trading volume at each price. This means MVWAP is heavily influenced by price levels where a
lot of volume traded – it gravitates toward high-volume price zones, acting like a rolling anchor to the
market’s value. It smooths out the noise of momentary price spikes or dips by ensuring low-volume moves
don’t skew the average as much as high-volume moves do. In essence, MVWAP shows you the price most
traders have paid (on average) over the chosen window, continually updating as new volume comes in. This
makes it extremely useful in gauging real-time market equilibrium and value: if price is above MVWAP,
buyers are, on average, paying more than the recent average (potentially indicating bullish pressure), and if
price is below MVWAP, they’re paying less (bearish pressure). It’s a dynamic benchmark of “fair value” over
your selected timeframe.


MVWAP vs. daily VWAP: The classic VWAP typically resets at the start of each trading session (for stocks,
each day’s VWAP starts fresh at the opening bell). MVWAP does not reset each day – it has no daily anchor
or intraday reset, creating continuity across sessions 3 . This is crucial for 24/7 markets like crypto where a
“day” is arbitrary. MVWAP continues to track volume-weighted price beyond session boundaries, whereas
VWAP by definition restarts every session (or every day). Thus:


     • VWAP gives the volume-weighted average price for the current day/session only and starts over each
       day 4 . A new day = new VWAP calculation from scratch.
     • MVWAP gives a volume-weighted average over a rolling window of time and carries over across
       days 4 . There are no automatic resets, unless you manually anchor it or choose a specific length.
       You can customize the look-back length of MVWAP to be shorter (making it more sensitive) or longer
       (making it smoother) as needed 3 .




                                                      1
In other words, MVWAP behaves more like a traditional moving average, just volume-weighted, while VWAP
behaves more like a session-based indicator. This continuity means MVWAP can capture multi-day or multi-
session trends in the volume-weighted price, which is especially useful for crypto perpetuals that trade non-
stop. Where a daily VWAP might “forget” yesterday’s volume information at midnight, a 20-period MVWAP
on a 1H chart, for example, will still incorporate the last 20 hours of volume and price data regardless of
midnight passing.


MVWAP vs. EMA (or other MAs): An exponential moving average (EMA) or simple moving average (SMA)
uses only price data (time-weighted), whereas MVWAP uses both price and volume. Key differences:


     • Volume Influence: MVWAP will respond more to price moves that occur on high volume. In
       contrast, an EMA21 or EMA50 will move based purely on price changes (with recent prices weighted
       more for EMA). For instance, a sudden price spike on low volume might push an EMA up a bit, but
       MVWAP may hardly budge if the volume was trivial. Conversely, a high-volume push will yank
       MVWAP quickly.
     • Lag and Smoothness: MVWAP tends to be smoother when volume is steady, but it can also lag
       more than a fast EMA during low-volume drift. If price grinds up slowly on declining volume, EMAs
       will track that rise (since time is passing), but MVWAP might stay closer to the earlier volume-
       weighted price (since the move lacks volume conviction). This can keep MVWAP nearer to a range’s
       core while EMAs start to trend, acting as a filter for false moves.
     • Anchoring to Volume Nodes: MVWAP often aligns with significant volume profile levels (like Point
       of Control) because both are volume-weighted measures of value. An EMA has no knowledge of
       volume and might be higher or lower than MVWAP depending on recent volatility.

In summary, MVWAP differs from VWAP by providing a continuous, customizable volume-weighted average
(no daily reset) 3 , and it differs from standard moving averages by incorporating volume in the averaging
process. This gives the advanced intraday trader a tool that blends price and volume information into one
dynamic reference line.


2. MVWAP Behavior in Trending vs. Ranging Markets (Across
Timeframes)
Not all market conditions are equal – a key skill is recognizing whether BTCUSD is trending or ranging, and
understanding how MVWAP behaves in each scenario (on various timeframes). MVWAP can serve as a
litmus test for market structure: is price respecting the MVWAP as a support/resistance in one direction, or
is price constantly crossing back and forth (indecision)? Let’s break down the typical behaviors:


     • Trending Market: In a strong trend (either uptrend or downtrend), MVWAP will have a clear slope
       (up in an uptrend, down in a downtrend) and price will predominantly stay on one side of the
       MVWAP. For example, in a sustained uptrend, price bars will mostly hold above the MVWAP line, and
       MVWAP itself will be rising steadily. Pullbacks might dip toward MVWAP, but tend to bounce above it;
       the MVWAP often acts as a dynamic support in an uptrend. Conversely, in a downtrend, MVWAP will
       slope downward with price mostly below it, acting as a resistance on bounces. The distance between
       price and MVWAP can sometimes widen during very strong momentum moves (price “runs away”
       from the average), but as long as the trend is intact, MVWAP will lag just behind price, steadily
       following the trend. You will notice fewer MVWAP crossovers in a trending phase; if you’re watching
       a 5-minute chart in a trend day, hours might go by without price crossing the MVWAP from below to



                                                     2
      above (or vice versa). This one-sided behavior tells you the market has a directional bias. An intraday
      trend trader will use this by primarily taking trades in the trend direction whenever price approaches
      MVWAP from the correct side (e.g., buy near MVWAP in an uptrend).


     • Ranging Market: In a sideways or range-bound market, MVWAP tends to flatten out (little to no
       slope) and price will oscillate above and below it frequently. Neither bulls nor bears have sustained
       control, so the volume-weighted average price stays roughly horizontal. In these conditions, price
       crossing the MVWAP is a common occurrence – the MVWAP basically runs through the middle of
       the range, and price ping-pongs around it. For example, imagine BTCUSD stuck between $100k and
       $102k for a day: the MVWAP might hover near $101k (the mid), and as price swings up and down, it
       crosses that $101k level repeatedly. In a range, the MVWAP often lies close to the point of control
       (highest volume price) of the range. Traders can actually use MVWAP as a mean reversion tool here –
       buying when price is significantly below MVWAP and reverting upward, and selling when price is
       above MVWAP reverting downward 5 . However, due to the choppy nature, whipsaws are a risk: a
       range-bound market can produce false signals as price crosses the average back and forth 5 . It’s
       vital to combine MVWAP with other context (support/resistance levels, value area extremes, etc.) in
       ranges (more on that in the mean-reversion section).


     • Transitional Clues: Often the market shifts from range to trend or vice versa. MVWAP can give early
       clues. In a range, you might see MVWAP flat and price crossing it frequently. When an actual
       breakout trend begins, price will start to travel in one direction away from MVWAP and MVWAP will
       begin to curl and follow. If BTCUSD was sideways and then breaks out upward, you’ll see price move
       above a formerly flat MVWAP and stay above it, causing the MVWAP line to start sloping up after
       being flat. That is a sign of a transition to trending behavior. Conversely, when a trend stalls and
       becomes a range, price that was consistently above MVWAP will begin crossing below it and back up,
       and MVWAP slope will shallow out and flatten. An advanced trader watches for these changes in
       MVWAP slope and the frequency of crossovers as early warnings that market regime is changing.
       (We’ll cover specific slope and crossover signals in Section 5.)


     • Different Timeframes: MVWAP can be applied to any timeframe, and its behavior on each
       timeframe will mirror that timeframe’s structure. A useful approach is to gauge trend vs range on
       multiple timeframes. For instance, BTCUSD might be trending on a 5-minute chart, but that move
       could be just noise inside a larger 1-hour range. On a higher timeframe (1H, 4H), MVWAP will
       appear smoother and change direction less often (since it’s averaging more data). A higher
       timeframe uptrend will show a steadily rising MVWAP on the 4H with price mostly above, even if the
       5-minute chart has many small zigzags. Meanwhile, on a lower timeframe (e.g. 1m or 5m), you’ll
       see every little range and trend – MVWAP here may whip around with minor fluctuations. As an
       advanced trader, always consider the context of multiple timeframes: a flat MVWAP on the 4H (big
       range) means you should be cautious of trusting a small 5m trend – it might revert at range
       boundaries. Conversely, a strongly trending 4H MVWAP (say sloping up) means that even if the 5m
       shows a brief dip below its MVWAP (a tiny range or pullback), the larger trend likely prevails upward.
       Aligning timeframe context will be discussed in Section 6 on multi-timeframe bias.


Summary: In trending conditions, MVWAP serves as a one-sided dynamic support/resistance that price
hugs or bounces off, whereas in ranging conditions MVWAP acts more like a horizontal mean that price
oscillates around. Identifying this distinction is step one in deciding whether to employ a momentum
strategy or a mean-reversion strategy on a given day. (A quick tip: zoom out and see if MVWAP on a higher




                                                     3
timeframe is angled or flat – this can quickly tell you if that timeframe’s structure is trend or range. Then
adjust your tactics accordingly.)


3. Trading Momentum Setups with MVWAP, CMF, and EMA21/EMA50
When the market is trending, momentum setups are the way to go. Here the goal is to join the prevailing
move (up or down) using MVWAP as a guide, alongside confirmation from CMF (Chaikin Money Flow) and
the EMA stack (21 and 50 EMA). We’ll outline how to recognize a momentum scenario and how to execute
trades in that context.


Recognizing a Momentum Trend

A momentum trend is characterized by price making sustained higher highs and higher lows (in an
uptrend) or lower lows and lower highs (in a downtrend), with technical indicators aligning bullishly or
bearishly. Here’s how MVWAP and our other tools manifest momentum:


     • MVWAP: Clearly sloping in the direction of the trend, with price continually on the trend side of the
       MVWAP. In an uptrend, you’ll see MVWAP line rising and price candles mostly above it. Any dips
       toward MVWAP are short-lived. In a downtrend, MVWAP is sloping down, with price mostly below it.
       Essentially, MVWAP acts as a dynamic support in uptrends and dynamic resistance in
       downtrends – the market respects it.
     • EMA21 and EMA50: The 21 EMA (fast) will be above the 50 EMA (slow) in an uptrend (a bullish EMA
       “stack”), or 21 below 50 in a downtrend (bearish stack). The EMAs will also both be trending (angled)
       in the trend direction, not flat. A bullish momentum scenario often sees price, EMA21, EMA50, and
       MVWAP all in alignment (price > EMA21 > EMA50 > MVWAP in a strong uptrend, or price < EMA21 <
       EMA50 < MVWAP in a strong downtrend – though the exact order between EMA50 and MVWAP can
       vary, the idea is all are trending together upward or downward).
     • CMF (Chaikin Money Flow): In momentum conditions, CMF should confirm the trend by showing
       sustained money flow in the trend direction. For example, in a rally, CMF values should be
       consistently above zero (green), indicating net buying pressure (volume flowing into the asset)
       which aligns with price strength. In a selloff, CMF should be consistently below zero (red), showing
       distribution/selling pressure. Spikes in CMF can indicate surges of volume buying or selling that fuel
       the trend. Essentially, CMF tells you if the trend has volume behind it – in a healthy trend, it does.

When you see this trio line up – MVWAP trending, EMA21/50 in a bullish or bearish stack, and CMF
confirming with sustained positive or negative readings – you have a momentum setup. At this point, your
bias should be to trade with the trend (not against it). The question becomes how to enter that trend safely,
given you’re using 50–65× leverage and need precision.


Executing Momentum Trades (Step-by-Step)

In a momentum scenario, the safest entries are often on pullbacks in the direction of the trend or
breakouts from consolidation in the direction of the trend. You use MVWAP and EMAs as reference points




                                                     4
for those pullbacks, and CMF as a confirmation. Here’s a step-by-step game plan for an uptrend (bullish
momentum) – reverse the logic for a downtrend:


    1. Identify the Bias: Confirm that the higher timeframe bias is bullish. For instance, note that on the
       1H chart, price is above a rising 1H MVWAP and EMAs are bullish. (We will formalize multi-timeframe
       bias in Section 6, but it’s mentioned here because taking a 5m momentum trade is higher probability
       if the 1H/4H context is also bullish). Assume we have that: bias = long.


    2. Wait for a Pullback Toward MVWAP/EMAs: In a strong uptrend, you don’t want to chase price when
       it’s far above the MVWAP – that’s when you’re most vulnerable to a snap-back. Instead, be patient for
       the inevitable pullbacks. A typical pullback in an uptrend might see price dip from a recent high back
       toward the EMA21 or MVWAP (often these will be near each other if your MVWAP length isn’t too
       large, since both hug the trend). These pullbacks often occur when short-term profit-taking happens,
       but as long as the trend is intact, price should find support around the MVWAP or the cluster of
       EMAs. Visually, you might see a bullish flag or a small consolidation forming right around the rising
       MVWAP line.


    3. Confirmation at the Pullback: As price pulls into the support zone (say the area between EMA21
       and MVWAP), watch your indicators for confirmation that the pullback is ending and momentum is
       resuming:


    4. MVWAP hold: Ideally, price should stall and begin to turn around the MVWAP instead of slicing
       clean through it. A wick touching MVWAP and bouncing, or a small base forming above it, are good
       signs. If price barely dips to MVWAP and then a strong bullish candle prints back up, that’s a classic
       entry cue.
    5. CMF uptick: During the pullback, CMF might tick down a bit (as some selling came in), but for a long
       entry you want to see CMF either stay positive or quickly recover/ramp up again as price stabilizes.
       An increasing CMF on the very bar or two of your entry is a great signal that volume support is
       coming back (buyers stepping in on the dip).

    6. EMA alignment: Ensure EMA21 is still above EMA50 (the short-term trend hasn’t actually reversed).
       Often on a shallow pullback, EMA21 might dip toward EMA50 but remains above it. That’s fine – you
       just don’t want a full bearish crossover. In fact, a common momentum re-entry is exactly when the
       EMA21 flattens out and then curls back up off EMA50, coinciding with price climbing from MVWAP
       – that’s a sweet spot to go long.


    7. Trigger the Entry: Once you observe the above (price finding support near MVWAP, signs of buyers
       returning via CMF, and EMAs still in bullish posture), you execute your long entry. This could be as
       simple as buying as soon as price moves back above the MVWAP or above the EMA21 after the brief
       dip. Some traders also use a specific candlestick as a trigger – for example, a strong bullish engulfing
       candle off MVWAP support, or the break of a short-term trendline of the pullback. The key is you’re
       entering as momentum is resuming, not while price is still dropping. You’re effectively “buying the
       dip” to the MVWAP in an uptrend.


    8. Stop Placement: For a high-leverage intraday trade, the stop loss must be tight and logically placed.
       A common stop method is to place a stop just below the MVWAP support or recent pullback
       swing low. The rationale: if price falls below the prior swing low or clearly undercuts MVWAP




                                                      5
       support, then what you thought was a dip might be turning into a deeper reversal – your trade is
       invalid (we discuss detailed invalidation logic in Section 7). For example, if MVWAP was at $100,000
       and price bounced at $100,200, you might put a stop at ~$99,800 (just under MVWAP by a small
       margin), or below the lowest wick of that pullback. With 50× leverage, that ~$400 difference (0.4%) is
       about a 20% move on margin – which is significant, so you may even tighten it further depending on
       tolerance. The idea is to keep risk small by cutting if the MVWAP bounce fails.


    9. Ride the Momentum: If the trade works, price will quickly move away from your entry, back in the
       direction of the trend. In an ideal scenario, you’ll see price making new highs (for an uptrend) not
       long after your entry. As it does, MVWAP will also start to climb again, reflecting the new volume
       coming in at higher prices. You can use the climbing MVWAP as a guide to trail your stop up (more in
       Section 7 on trade management). Watch CMF – in a strong rally after your entry, CMF should rise
       further into positive territory, confirming that your long is supported by real buying. If instead
       everything stalls – say price goes flat and CMF starts dropping – be on alert, as momentum might be
       fading.




Example – Momentum Uptrend on BTCUSD: In the 1-hour chart above, Bitcoin is in a clear uptrend. The purple
line is EMA21, the orange line is EMA50, and the gray line is the MVWAP (20-period in this case, with
upper/lower bands in faint gray). Notice how from the left side, price broke above the MVWAP and stayed
above it as it trended higher. The EMA21 crossed above EMA50, and both are angled up, confirming bullish
momentum. During this uptrend, every pullback toward the MVWAP (gray) and EMA21 (purple) area
provided a buying opportunity. For instance, mid-chart, price dipped from ~105k down toward the MVWAP,
but held above it – those red candles found support just around the gray line. At the same time, the CMF
(green area in the lower subpanel) remained positive, indicating continued accumulation. An advanced
intraday trader could have gone long on that pullback when price started to turn up off MVWAP, riding the
next wave higher. The MVWAP itself then trended up under price, acting as a trailing support. Only once we
see price definitively fall below MVWAP and the fast EMA, with CMF turning red (as on the far right), do we
know the bullish momentum is waning. Until then, the strategy was to buy dips above MVWAP and stay
with the trend.




                                                     6
Momentum Trading Rules of Thumb

To distill the above into actionable rules for intraday momentum trades (long or short), consider the
following checklist:


     • Trade in Direction of MVWAP Slope: If MVWAP on your trading timeframe (and higher timeframe) is
       sloping up, focus on longs; if sloping down, focus on shorts. This ensures you’re going with the
       prevailing volume-backed trend, not against it.
     • Use EMA21 & EMA50 for Micro-Trend Structure: In a long setup, require EMA21 > EMA50 and both
       rising (opposite for short). The EMA stack tells you the short-term trend is intact. If they’re crossing
       frequently or flat, that’s a no-go for momentum trades (probably a range instead).
     • Enter Near MVWAP (Value Zone): Don’t buy high above MVWAP or sell far below MVWAP in a trend
       – that’s where you risk getting in at an extreme. Instead, let price come to you. Enter as close to
       MVWAP (or the confluence of MVWAP+EMA21) as possible once you see evidence of a bounce. This
       gives you a better price and a natural nearby stop level.
     • Confirm with CMF and Volume: Ensure that when you’re about to enter, the Chaikin Money Flow is
       supportive – e.g., CMF histogram ticking up from green to greener, or at least not deeply negative. If
       you see, for example, price pulling back but CMF staying >+0.10 and starting to rise again, that’s a
       green light that the dip is being bought. Also pay attention to volume spikes on the turn – a big
       volume node on the pullback low followed by rising volume on the bounce is ideal confirmation that
       momentum is resuming.
     • Mind the Time of Day (for intraday): Even for crypto which is 24/7, there are rhythm factors (e.g.,
       traditional market open times, funding rate cycles, etc.). Momentum moves often kick off when a
       new wave of traders enter (e.g., a big move at NY open). Be cautious taking a momentum trade in a
       usually slow period as it might not follow through. (This is a subtle point for advanced timing – the
       key is, when volume is expected to be high, MVWAP signals are more reliable.)
     • Avoid Overtrading Pullbacks: Not every touch of MVWAP is a buy in an uptrend. Ensure the overall
       context still supports the trend (e.g., higher timeframe hasn’t hit major resistance, no major news
       flipping sentiment, etc.). If in doubt, skip a trade – there will be many pullbacks in a trend; you don’t
       need to catch them all. Focus on quality setups (clean confluence of indicators).

Following these principles, you’ll effectively use MVWAP as your compass to navigate intraday trends, with
CMF and EMAs as complementary tools to fine-tune entries. High-leverage momentum trading becomes
much more manageable when you’re entering at a strong point of advantage (the value zone near MVWAP)
and with confirming volume flow.


4. Mean-Reversion Trades with MVWAP, VPVR, and CMF
Not every day is a trend day. In fact, many intraday sessions (and multi-hour periods on BTCUSD) are range-
bound or see abrupt reversals of short-term trends. This is where mean-reversion trading shines – betting
on price returning to an average or value zone after stretching to an extreme. MVWAP is literally an
average, so it serves as a natural “magnet” or mean in such strategies. We will integrate MVWAP with VPVR
(Volume Profile Visible Range) levels (specifically Value Area High/Low) and CMF to find high-probability
reversion setups.




                                                       7
Identifying Mean-Reversion Opportunities

A mean-reversion setup typically arises when price has swung far from the MVWAP and shows signs of
exhaustion, especially near known support/resistance or value area extremes. Key signs and conditions
include:


     • Flat or Stabilizing MVWAP: Unlike the trending scenario, here the MVWAP on the relevant
       timeframe is often flat or beginning to flatten, indicating no strong directional bias in the recent look-
       back. The market’s volume-weighted average hasn’t moved much despite price making an excursion.
       This flat MVWAP serves as the mean to which we expect price to revert. Sometimes MVWAP might
       even be slightly counter-slope to the current price move (e.g., price spikes up but MVWAP is still
       pointing slightly down or flat, lagging behind – a hint that the move isn’t fully supported by prior
       volume distribution).


     • Price Extremes (Distance from MVWAP): Look for moments when price is exceptionally far from
       the MVWAP line. You can gauge this by eye or with MVWAP’s optional standard deviation bands. If
      your MVWAP indicator has ±1σ, ±2σ bands (similar to Bollinger Bands around MVWAP), see if price is
      riding at an outer band. When price hits 2+ standard deviations from MVWAP in a range-bound
      market, it’s often overextended 6 7 . Similarly, using plain percentage or absolute terms: for
      example, if on a 15m chart BTCUSD is $500 above the 15m MVWAP in a quiet market, that might be
      extreme for that session. These conditions signal an imbalance likely to correct.


     • Volume Profile Alignment (VAH/VAL): VPVR is extremely handy to confirm whether a price extreme
       is an actionable reversal zone. Identify the Value Area High (VAH) and Value Area Low (VAL) of the
       recent range (for the visible window or a relevant session). In a balanced market, approximately 70%
       of volume occurs between VAH and VAL. If price is outside this value area (above VAH or below VAL),
       it is in statistically low-volume territory, meaning the auction is likely to fail and revert back to value.
       For instance, if BTCUSD spikes above the VAH, that area above is often low volume nodes – price
       typically doesn’t stay there unless new volume builds (which would indicate a trend breakout instead
       of reversion). A wick or hesitation around VAH followed by a move back inside the value area is a
       classic mean-reversion short signal. Likewise, a dip below VAL that fails and quickly recovers is a long
       signal. Importantly, MVWAP in such cases will usually be somewhere inside the value area (often near
       the POC, point of control). That MVWAP becomes your mean target for the reversion trade.


     • CMF and Momentum Divergence: As price hits an extreme, check if CMF diverges or weakens. In
       many blow-off moves (either an exhaustive rally or a capitulation dip), you’ll see price push to a
       higher high or lower low, but CMF fails to reach a new extreme in kind. For example, price makes a
       new high above the prior swing, but CMF is lower than it was on the previous high, or even crossing
       into negative territory despite the price high. This indicates the volume momentum is not supporting
       the price move. In a range scenario, that often precedes a reversal. Conversely, near a low, you might
       see price make a lower low but CMF is less negative (or even ticking positive) – a hint of accumulation
       at the low. Also look for sudden shifts in CMF: e.g., a strongly positive CMF quickly dropping toward
       zero while price is still high is a heads-up that the buying frenzy is done and smart money might be
       selling into it.


     • Support/Resistance Context: Although not explicitly listed in tools, an advanced trader will
       naturally be aware of key S/R levels (prior day high/low, weekly levels, pivot points, etc.). If an




                                                        8
       extreme happens to coincide with a major resistance or support, it strengthens the mean-reversion
       case. E.g., price blows off just above a known daily resistance and then stalls – likely a bull trap
       leading to reversion.


In summary, prime mean-reversion setups occur when price is well beyond its volume-weighted average
(MVWAP), at a location with poor volume support (beyond VAH/VAL), and the internals (CMF, volume,
momentum) do not confirm the sustainability of that move. Now, let’s discuss how to trade these situations.


Executing a Mean-Reversion Trade

Mean reversion trades aim to profit from price snapping back toward the mean (MVWAP). They are inherently
counter-trend relative to the immediate price swing, but they’re with the broader range equilibrium. We’ll
outline both short and long mean-reversion scenarios:


Example A: Reversion from an Overextended High (Short Trade)
Imagine BTCUSD has been ranging roughly between $100k and $105k for several hours. MVWAP on the
15m chart has been around $102.5k (flat), and the VPVR shows a clear value area roughly $100k–$104k (with
$102k POC). Suddenly, a surge of buying pushes price to $106k, above the recent range. How to trade it:


     • Step 1: Recognize the Setup: Price is now significantly above the 15m MVWAP (say MVWAP is
       $102.5k, price is $106k, that’s $3.5k or ~3.4% above the average – a large deviation for intraday BTC).
       This is above the value area (previous VAH was $104k, now we’re $2k beyond it). The MVWAP line
       might still be lingering back near $102-$103k (hasn’t caught up because volume was mostly in the
       lower range). CMF on this rally showed a brief pop, but as price hits $106k, CMF is flattening or
       dropping – perhaps buyers are exhausted. These are red flags that this move may not hold. Your
       bias flips to short (mean reversion short), expecting price to fall back toward MVWAP/value.


     • Step 2: Entry Trigger (Confirmation of Rejection): Do not blindly short just because price is high –
       wait for confirmation that the up-move is failing. This could be: a sharp reversal candle (e.g., a 15m
       shooting star or bearish engulfing off the high), or price moving back below the old VAH ($104k in this
       example) after briefly exceeding it. A great tell is if price crosses back below the upper band or back
       under a smaller timeframe MVWAP. For instance, on a 5m chart, you might see price pierce above the
       2σ band of 15m MVWAP then quickly fall back below that band or below the 5m MVWAP. Additionally,
       watch VPVR: if you see very little volume trading above $104k (thin profile) and then price starts
       coming back into that high-volume zone $102–$104k, it’s a sign the breakout failed. You could
       initiate a short as soon as price moves back into the value area, or use a specific level like the break
       of $104k support as your trigger. Sometimes the VAH itself becomes the entry level: price goes
       above VAH and then a bar closes back below VAH – you short as it re-enters the range.


     • Step 3: Stop Placement: Since this is counter to the recent mini-uptrend, place your stop at a logical
       invalidation point beyond the swing high. For example, if $106k was the spike high and you entered
       short around $104k on the drop back, you might put a stop at ~$106.5k (above the high). Essentially,
       if price returns to make new highs beyond the extreme, the mean reversion trade is invalid – the
       market might be actually breaking out into a trend (in which case, you don’t want to be short
       anymore). You can also use a volatility-based stop: e.g., above the MVWAP’s upper band or a % above
       the high. The idea is to cut losses if the extreme move continues rather than reverses.




                                                      9
     • Step 4: Profit Targets: The primary target for a mean reversion short is the MVWAP itself (the
       mean). Often price will gravitate back to the MVWAP or the high-volume node (POC) of the range. So
       in our example, a logical take-profit zone is around $102–$103k (where MVWAP/POC are). You might
       cover a majority of the position as price approaches MVWAP from above. If momentum is strong on
       the reversal (e.g., it cascades down quickly with CMF turning deeply red now as stop-losses trigger),
       you can hold a portion for a move even below MVWAP (perhaps to the opposite side of the value
       area, like the POC or VAL). But remember, MVWAP often acts like a magnet and then a support –
       price may bounce once it gets there, especially if the range holds. So it’s prudent to take profit
       around the MVWAP on a short. You could leave a runner in case it overshoots to VAL, but be ready to
       book profits.


     • Step 5: Optional – Long the Other Side: Advanced range traders will sometimes flip direction if the
       conditions warrant. For instance, if you shorted $105k->$103k successfully and price overshoots
       down to $100k (VAL) and shows exhaustion there, you might then play a long mean reversion back
       up to the mean. This essentially bracketing the range. Only do this if the indicators now reverse (e.g.,
       now price is way below MVWAP, at VAL support, CMF divergence bullish, etc.). The point is, mean
       reversion usually has two “edges” – the high extreme and the low extreme – both can be traded
       toward the middle. If you have a clear range identified, you can rinse and repeat between VAH and
       VAL with MVWAP as your gravity center.




Example – Mean Reversion Short: The 6-hour BTCUSD chart above shows a market that had trended up
strongly, then became overextended and reversed. The pink/magenta line is an MVWAP (acting similar to
a 6H VWAP here), and the horizontal volume profile on the right shows a high-volume node around 102k
(note the big clusters near 102k-104k). Price rallied to about $108k (far above the magenta MVWAP line and
above the bulk of the volume profile) and then started to drop. During the climb, CMF (middle green/red
indicator) was high, but as the price reached the top, CMF began to fall off, showing waning buy pressure.
Once price fell back below the value area high (around ~$104k) and toward the MVWAP, a mean-reversion
short was in play. Traders could have sold the lower high around $105k-$106k when it became clear the
breakout wasn’t holding. The target would be the MVWAP around $102k, which indeed acted as support




                                                     10
when price returned to it (notice how the red candle in the chart finds a floor right near the magenta
MVWAP line). This example illustrates how, after an extreme move beyond the value zone, price reverted to
the mean. Using MVWAP in conjunction with the volume profile (VAH/VAL) and CMF gave clear confirmation:
the move was overextended and not sustained by volume (thin profile above 105k, CMF dropping), making
a short reversal trade attractive.


Mean-Reversion Trade Checklist: (Use this for both longs and shorts in ranging conditions)


     • Is MVWAP flat or shallow sloping? – You want a relatively neutral MVWAP (indicating a trading range
       environment, not a runaway trend).
     • Is price far from MVWAP (extreme)? – Ideally at or beyond a 2σ MVWAP band or outside the recent
       value area. The farther from the mean, the more potential profit on reversion and the higher
       probability of snap-back 6 .
     • Are we at a value extreme (VAH/VAL or known S/R)? – If yes, the context is favorable. If price is in the
       middle of a range near MVWAP, you’re not mean reverting – you’re already at the mean! Look for
       trades at edges returning to center.
     • Is there confirmation of a turn? – Wait for price to reject the extreme: e.g., failed breakout, strong
       counter candle, break back below/above a key level. Don’t try to catch a falling knife or stand in front
       of a speeding train – you need evidence the momentum has stalled. This could be an obvious candle
       pattern or simply a lack of follow-through beyond the extreme.
     • Check CMF divergence: – If price made an extreme but CMF did not (or CMF is rapidly reverting), that’s
       a go signal. If CMF is still extremely high at a price high, be cautious – sometimes that means there’s
       still power behind the move and it could keep running. The best mean-reversion setups have CMF
       (and other momentum measures like RSI/MACD if you use them) showing weakness while price
       makes a final push.
     • Tight Stops, Logical Targets: – Because you’re counter-trend to the immediate move, use a tight stop
       beyond the extreme. The risk/reward is usually very good in these setups (small risk for decent
       reward back to mean). Set primary target at MVWAP/POC area. If that area is hit, consider if the
       opposite extreme is likely or not before deciding to hold further. Always secure some profit as price
       nears MVWAP because that’s where the counter-move might bounce.

By adhering to these guidelines, you can effectively trade the ebb and flow around MVWAP on choppy
days. In essence, you’re using MVWAP as the anchor of the range – selling above it and buying below it, with
the help of volume profile levels to refine those entry zones. This is a powerful approach for an advanced
trader who can read intraday price structure and wants to capitalize on the natural mean-reverting
tendencies of markets when they are not in strong trends.


5. MVWAP Slope, Price Distance, and EMA Crossovers as Transition
Signals
Up to now we’ve discussed strategies in trending vs ranging contexts. But how do you spot transitions or
subtle shifts in momentum? This is where paying attention to the slope of the MVWAP, the distance between
price and MVWAP, and crossovers (interactions between MVWAP and other moving averages like EMA21/50)
becomes valuable. These factors act as signals or warnings of changing conditions, helping you anticipate
trend reversals or the end of a range.




                                                      11
Reading the MVWAP Slope

We’ve hinted at this before: MVWAP’s slope is a quick gauge of trend direction and strength. A few
heuristics:


     • Rising MVWAP: Bullish bias. The steeper the rise, the stronger the recent volume-weighted uptrend.
       When MVWAP is rising at a good angle, you can interpret that as the market being in accumulation
       mode with price consistently trading at higher-than-average values. You generally only look for longs
       when MVWAP is angled up. If you are short and notice the MVWAP still climbing, know that you’re
       fighting the tide (unless price has significantly broken the trend already). Also, as long as MVWAP is
       rising, prior crossover signals (like price dips below it briefly) are less trustworthy as “short signals” –
       they might just be pullbacks.
     • Falling MVWAP: Bearish bias. Similar logic in reverse. In a downtrend, as long as MVWAP slopes
       downward, rallies into it are likely selling opportunities.
     • Flattening MVWAP: Caution/Neutral. When you observe a previously sloping MVWAP start to flatten
       out, that’s often an early warning that momentum is dying out. For example, say BTC was trending
       up and MVWAP was climbing, but over the past hour you see MVWAP’s angle shallowing – this could
       indicate that recent bars’ prices are oscillating around the average rather than staying above it. A
       flattening MVWAP often precedes a potential crossover (price crossing to the other side). It basically
       says the market’s volume-weighted trend is now neither up nor down. If you’re in a trend trade and
       MVWAP goes flat, it might be time to tighten stops or take profit, as a bigger reversal could be
       looming.
     • Inverting Slope: If MVWAP actually turns from up to down or vice versa, that’s a significant regime
       change confirmation. Suppose MVWAP was gradually flattening and now it starts sloping downward,
       that confirms bears have taken control in the window of calculation (volume now concentrating at
       lower prices). Usually by the time MVWAP clearly inverts, price has already crossed it.

In practice, one technique is to look at higher timeframe MVWAP slope for a strategic view (e.g., 1H or 4H
MVWAP slope to decide bias), and lower timeframe MVWAP slope for tactical entry (e.g., 5m MVWAP turning
up to signal an upswing starting). MVWAP slope changes can be subtle, but an experienced eye will notice
when the line that was steadily rising starts leveling off – that’s when you ask, “Is this trend possibly
ending?”


Price Distance from MVWAP – Overextension and Snapbacks

The distance between price and MVWAP is a measure of how stretched the market is relative to its volume-
weighted average price. This distance can be interpreted in absolute terms, percentage, or in standard
deviations (if your MVWAP indicator provides bands). Here’s how to use it:


     • Overbought/Overextended Signals: If price gets very far above the MVWAP, consider it overbought
       in the short-term, especially if this happens rapidly. We discussed using 2σ bands in mean reversion
       – crossing those bands means price is in statistically extreme territory 6 . Even in a strong uptrend,
       there are moments of overextension where price will momentarily pull back or go sideways to let
       MVWAP catch up. As a trader, when you see price with a large gap above the MVWAP, you might
       avoid new longs at that spot (wait for a pullback) and you might even aggressively trail your stop on
       existing longs. Conversely, shorts might start scouting an entry (with caution, as it could just be a
       sign of strength if trend persists). The main point is: the larger the gap, the greater the
       probability of a reversion move. As an advanced nuance, you can quantify “large gap” based on



                                                       12
      volatility. For example, if BTCUSD 5m typically oscillates 0.5% around its MVWAP, but now it’s 2%
      above, that’s huge. In practice, using standard deviation is convenient: price beyond 2 standard
      deviations of MVWAP is rare and usually corrects 6 .


     • Undersold/Negative Overextension: The same logic applies when price is far below MVWAP
       (market potentially oversold short-term). If you’re short and see price $1000 below MVWAP on a 1H
       chart, you should think about covering or tightening stop, because a snapback rally is likely once
       sellers exhaust. If you’re looking to buy a dip, those moments when price is significantly under the
       average (especially near a known support) are often ideal.


     • Context Matters: In a raging trend, “far” can keep getting farther (trends can stretch beyond what
       seems reasonable). So use additional context: e.g., if price is well above MVWAP and you see an RSI
       overbought or a known resistance level just hit, etc., that adds weight to a potential snapback. On
       the flip side, if price is far above MVWAP but news just hit or a parabolic move is on, be careful
       shorting blindly – extreme can become more extreme. That’s why we look for the telltale signs (like
       described in mean reversion: weakness, divergences) before acting. But distance from MVWAP is
       your first visual cue to start looking for a turn.


     • Mean Reversion vs Trend Continuation: If price repeatedly gets pulled back to MVWAP after
       stretching away, you are likely in a range or weak-trend environment where mean reversion style
       prevails. If price can stay far from MVWAP for a long time (with MVWAP eventually moving toward
       price rather than price toward MVWAP), you are in a strong trend. An advanced trader observes: are
       these deviations resolving by price snapping back or by MVWAP catching up? In the former case, play
       mean reversion; in the latter, stick with trend trades.


MVWAP and EMA Crossovers – Signaling Shifts

Crossovers involving MVWAP can be treated similarly to moving-average crossover systems, but with a
volume-weighted twist. We’ll consider a few types of crossovers:


     • Price crossing MVWAP: The simplest “crossover” is when price itself moves from one side of MVWAP
       to the other. This is often the earliest indication of a change in short-term trend. For instance,
       after a long uptrend, if BTC price finally falls below the MVWAP and stays below for more than a
       couple of bars, that is a warning that the uptrend might be done (at least for now). Many intraday
       traders use VWAP/MVWAP cross as a line in the sand: e.g., “I will only be long as long as price is above
       VWAP; if it crosses below, I exit.” Given MVWAP’s nature, a price cross by itself isn’t always a trade
       signal (because it could whipsaw in ranges), but in conjunction with slope change and other
       indicators, it’s powerful. For example, price crossing below a flattening MVWAP, accompanied by
       EMA21 crossing below EMA50, is a pretty clear trend reversal signal. Use price/MVWAP crosses to
       stay on the right side of the market: if you’re long and price closes below MVWAP, that’s an alert; if you’re
       short and price closes above MVWAP, heads up. One might even flip bias after a confirmed cross (with
       other signals aligning).


     • EMA21 & EMA50 crossing MVWAP: This is a bit more nuanced. EMAs are price-based, MVWAP is
       volume-weighted price. When an EMA crosses MVWAP, it indicates a disparity or convergence
       between time-weighted average price and volume-weighted average price. For instance, if in an uptrend
       the price was climbing fast, EMA21 will track it closely, possibly staying above MVWAP (which is




                                                        13
       slower due to volume averaging). If the uptrend loses steam, EMA21 might start coming down.
       When EMA21 crosses below MVWAP, it suggests that short-term price action has moved to the
       other side of the volume-weighted average. It often coincides with price itself crossing below
       MVWAP (since EMA21 is essentially a smoothed version of price). You can see EMA21/MVWAP cross
       as a refined signal that price has spent enough time on the opposite side to drag a moving average
       across. Similarly, EMA50 crossing MVWAP indicates a larger trend shift, since EMA50 is slower – by
       the time EMA50 crosses, the shift has been sustained for longer. Trading interpretation: A bullish
       trend might be considered officially over when the fast EMA (21) crosses below MVWAP or even more
       so when MVWAP crosses below the slow EMA (50). The latter (MVWAP < EMA50 after being above it)
       means the volume-weighted average price has now fallen below the longer-term average price – a
       strong confirmation of downtrend. In practice, you could use these crossovers as triggers or
       confirmation signals. For example, one might exit remaining long positions when MVWAP drops
       below the 50 EMA (signaling the party is truly over), or conversely, initiate a new short.


     • EMA21 crossing EMA50 (with respect to MVWAP): The classic EMA cross (21/50) is a lagging trend
       signal on its own. But its value here is when viewed relative to MVWAP’s position. If EMAs cross
       bearish (21 under 50) while price and MVWAP are also trending down, that solidifies the bearish
       regime. If EMAs cross bullish (21 over 50) and MVWAP is sloping up with price above, you have a
       confirmed bullish regime. Think of MVWAP as the filter: an EMA cross that occurs above a rising
       MVWAP or below a falling MVWAP is more trustworthy than one that occurs in a messy, flat MVWAP
       context. Also, MVWAP can sometimes cross an EMA near the same time as the EMAs cross each
       other – a cluster of crosses indicates a significant inflection point (lots of averages converging and
       then separating).


     • Multi-timeframe crossover consideration: A crossover on a higher timeframe MVWAP/EMA is a big
       deal. If, say, on a 4H chart the 4H MVWAP just crossed below the 4H 50-EMA, that’s a sign the longer-
       term trend could be turning bearish (volume-weighted price now below the 50-period average price).
       You might not wait for such a long signal to trade, but it provides strong bias context for lower
       timeframe setups.


To illustrate, consider a scenario we partly saw in the earlier charts: BTC in an uptrend, then topping out.
Initially, price was above MVWAP, EMA21 > EMA50. As distribution starts, price breaks below MVWAP. Shortly
after, EMA21 crosses below EMA50 (bearish cross) and also crosses below the now flattening MVWAP. This
cluster of events is a trend transition. A trader recognizing this could flip from a long bias to short bias at
that juncture. The MVWAP slope by then likely flattened or turned down, confirming the change.


In sum, crossover signals involving MVWAP and EMAs help you time your recognition of trend transitions:
they take the subjectivity out of “is this trend over yet?” by giving concrete events. One could set up alerts
for “MVWAP crosses below EMA50” etc., as a prompt to re-evaluate market condition. Just be aware in
sideways markets you might get many crosses (false signals). That’s why we combine slope, distance, and
crossovers together: e.g., a crossover during flat MVWAP is less meaningful; a crossover right after a big
price distance extreme and slope change is golden.




                                                      14
Practical Application of These Signals

Putting it together, here’s how you use slope, distance, and crossovers in decision-making:


     • Early Warning: You’re long in a strong trend. You notice price is extremely far above MVWAP (e.g., at
       upper band) and starting to stall, and MVWAP’s ascent is slowing. This is your cue to tighten stops or
       take partial profits. Next, price crosses below MVWAP. You exit remaining longs (as per your rules)
       and possibly probe a short. EMA21 crosses below MVWAP – now you’re pretty sure momentum has
       shifted down. You add to the short or become more aggressive in mean reversion mode. By the time
       EMA50 crosses or MVWAP slopes down, you’re already positioned for the new downtrend or at least
       completely out of longs. Essentially, you stagger your reaction: distance + slope gave the first caution,
       price/MVWAP cross gave action, EMA crosses gave confirmation.


     • Avoiding Traps: You’re eyeing a potential breakout trade, but notice MVWAP on that timeframe is
       flat and price has been oscillating around it – a choppy range. Price spikes up and EMAs might even
       cross bullish briefly, but MVWAP hasn’t budged (still flat) and quickly price comes down again.
       Because MVWAP never established a slope and the distance wasn’t maintained, you recognize this as
       likely a fake-out and avoid chasing it. A little later, perhaps MVWAP actually starts creeping up as
       volume builds, giving you more confidence the next breakout attempt might stick. By being mindful
       of the MVWAP behavior, you filtered out a false move.


     • Volume Verification via MVWAP vs EMA: Sometimes you’ll see EMA21 cross above EMA50,
       suggesting a bullish turn, but MVWAP is still below both, or barely rising. This scenario can happen if
       the price moved up on relatively light volume. The volume-weighted average hasn’t caught up to
       price-based average. This disparity can signal a weak trend. You might say “I’ll wait until MVWAP also
       gets above EMA50 or at least until MVWAP slope turns up” to validate the breakout. If that never
       happens and price falls back, you avoided a losing trade. If MVWAP does eventually climb above, that
       tells you volume came in to support the move. In essence, requiring MVWAP confirmation can keep
       you on the right side of volume-backed moves.


Remember, no single signal is 100% – but by combining them, you substantially increase your odds of
reading the market correctly. MVWAP’s slope and relation to price/EMAs is like the “body language” of the
market’s trend health: learn to read it, and you’ll anticipate many reversals or continuations before they
become obvious to everyone else.


6. Multi-Timeframe MVWAP: Framing 5m/15m Entries with 1H/4H
Bias
Advanced intraday trading often means juggling multiple timeframes. A 5-minute chart might show a nice
setup, but if it’s counter to what’s happening on the 4-hour chart, you could be walking into trouble. MVWAP
can be employed on higher timeframes to set the context or bias, and on lower timeframes to fine-tune
entries. In this section, we outline how to use the 1H and 4H MVWAP to inform your 5m/15m trade
decisions – essentially ensuring you’re trading in harmony with the bigger picture, even as you execute on the
micro level.




                                                      15
Determine Higher-Timeframe Bias with MVWAP (1H/4H)

Start by analyzing the 1-hour and 4-hour charts with MVWAP (and EMAs/CMF) to gauge the broader
trend or range. This is your top-down approach:


     • 4H MVWAP Trend: Check the slope of the MVWAP on the 4H. Is it trending up, down, or flat? Also, is
       price currently above or below the 4H MVWAP? This gives you a macro-level bias. For example, if on
       the 4H BTCUSD is well above a rising 4H MVWAP, the macro bias is bullish – the market has been in
       an uptrend on that timeframe. If price is below a falling 4H MVWAP, macro bias is bearish. If price is
       whipsawing around a flat 4H MVWAP, macro is neutral (range-bound). This 4H bias tells you which
       type of setups to prioritize on lower frames. You typically want to trade in the direction of the 4H
       bias for higher probability.


     • 1H MVWAP for Intermediate Context: The 1H will often give more granular detail than 4H and can
       sometimes lead the 4H. For instance, the 4H MVWAP might be flat, but the 1H MVWAP just turned up
       sharply – an early sign that a new trend could be forming. Or vice versa, 4H might be up but 1H
       starting to roll over, warning of a pullback. So, determine the 1H MVWAP slope and price relation as
       well. The 1H bias might confirm the 4H or might be different if the market is in transition. When
       biases conflict (say 4H up, but 1H down), you need to be more cautious or reduce size, because it
       means short-term we’re correcting against the larger trend. Often, it’s wise to defer to the higher
       timeframe (4H) unless you have reason to believe a major reversal is in progress. In conflicting cases,
       you can wait until they align again, or trade the smaller moves with tighter targets.


     • Check HTF Levels: While you’re on those higher TF charts, mark out any important levels that
       coincide with MVWAP or volume profile on them. For example, maybe on the 4H chart, the 4H
       MVWAP is confluencing with a prior swing high support at $100k – you know that zone is strong
       support. Or the 1H MVWAP might line up with the day’s VWAP or POC. These could be magnets or
       turning points intraday. Keep them noted as you go down to lower TF; they might be your entry or
       exit zones.


     • HTF CMF/EMAs: Also quickly note if 4H and 1H CMF are positive or negative, and if EMA21/50 on
       those frames are aligned bullishly or bearishly. This just adds confirmation to what MVWAP is telling
       you. E.g., 4H bias bullish is even stronger if 4H EMA21>EMA50 and CMF+; if those disagree, bias
       might be weaker. These are nuance points – MVWAP is still central for bias determination.


Aligning Lower Timeframe Entries (5m/15m) with Bias

Now that you have a sense of the big picture (e.g., “4H and 1H both bullish, we’re in a larger uptrend” or “4H
flat, 1H slightly bearish, we’re ranging/down in short-term”), you move to your execution timeframe, say 5-
minute or 15-minute chart, to actually time entries and exits. The process:


     • Pick Trade Direction Based on Bias: If the higher timeframe bias is bullish, you will prefer long
       setups on the 5m/15m. You might still take an occasional quick short scalp if conditions scream for it,
       but the bulk of your attention is on finding longs. Why? Because if the larger trend is up, dips on the
       5m are likely to get bought and give you easier profits, whereas shorting rallies is riskier (you’re
       fighting the bigger players). Conversely, if bias is bearish, focus on shorting bounces on the LTF. And




                                                     16
 if the bias is neutral/range, you can play both sides, but be mindful of the range extremes (perhaps
 use the value area highs/lows from 4H profile as ultimate bounds).


• Use HTF MVWAP as Key Levels on LTF: TradingView’s MVWAP indicator allows setting a higher
  timeframe source; alternatively, you can just mark the current value of the 1H and 4H MVWAP on
  your lower timeframe chart. These essentially act like dynamic support/resistance on your intraday
  chart. For instance, if you know the 1H MVWAP is at $102k and rising, and you’re looking at a 5m
  chart with price currently at $103k, a pullback towards $102k on the 5m might find support exactly
  around that 1H MVWAP level. It’s a high-probability bounce zone because that’s where the volume-
  weighted average of the past hour lies (likely also near a volume node). Similarly, if price is rallying
  and hits the 4H MVWAP from below, that could act as resistance – maybe a good place to take profit
  on a long or even attempt a counter-trend short. Framing entries: Suppose 4H bias is up. You see
  on the 15m chart that price is currently retracing. Rather than randomly buy, you note “the 4H
  MVWAP is at X, and 1H MVWAP at Y; I will look for the 5m/15m to bottom out around those levels.”
  This often puts you in sync with where larger traders might step in. It’s like multi-timeframe
  confluence – the small timeframe dip intersects a large timeframe average.


• Timing the Entry on 5m/15m: Once price reaches a favorable area (aligned with HTF MVWAP or
  support), apply the same tools: look for LTF MVWAP flattening or turning (if you expect a reversal) or
  holding (if trend continuation), check CMF on LTF for a turn (e.g., 5m CMF goes from negative to
  positive as price bases), and check the EMA crossover behavior. For example, let’s say 4H is bullish
  but 1H had been in a slight pullback, now you suspect the pullback is ending. On the 15m chart,
  price dips below the 15m MVWAP briefly at a known support, then starts to climb back above. EMA21
  on 15m crosses above EMA50, and 15m CMF flips green. This is your signal that the lower timeframe
  is aligning back with the higher timeframe uptrend. So you’d initiate a long on the 5m/15m as those
  triggers fire, confident that the 1H/4H tailwind will help propel the trade. Essentially, the lower
  timeframe gives the entry trigger, higher timeframe gave the direction bias and key level.


• Multi-Timeframe Example (Long): 4H MVWAP rising, price above it – bull trend in play. The 1H chart
  shows a consolidation, with 1H MVWAP flat around $50k (just an example number). Price on 1H
  dipped slightly below 1H MVWAP but is now coming back above it. On the 15m chart, that dip
  corresponded to price going below 15m MVWAP for a while, but now you see a base forming and
  price crosses back above 15m MVWAP. Suppose also that 15m CMF has been climbing, indicating
  accumulation during the consolidation. You decide to go long on a 5m bullish signal (maybe a break
  of a small range) at price $50.2k. You know that just below, around $50k, lies the 1H MVWAP (strong
  support) and the 4H trend is up – so you place your stop just below $50k, figuring if $50k (HTF
  MVWAP) is broken, your long thesis is wrong. The trade works out: price resumes the uptrend to new
  highs, and you ride it. If instead price had broken $50k, you’d take a small loss and re-evaluate
  (maybe 4H uptrend is turning – in which case you update bias).


• Multi-Timeframe Example (Short): 4H MVWAP sloping down, price below it – macro downtrend. 1H
  MVWAP also sloping down, price consistently under it. You’re looking to short intraday rallies.
  BTCUSD pops up from $100k to $102k on some short-covering bounce. On the 15m, this move took
  price from below its MVWAP to above it temporarily. But you see on the 1H chart that $102k is where
  the 1H MVWAP and perhaps the 50 EMA sit – likely a resistance. Indeed, price stalls there. You then
  watch the 5m/15m: the 15m MVWAP that had been dragged up starts to flatten, price falls back
  below it; EMA21 (5m or 15m) crosses below EMA50 as the rally dies out; and CMF on 5m turns red




                                                17
      showing sellers returning. You enter a short around $101.5k with stop above $102k (above the HTF
      MVWAP/EMA confluence that price couldn’t clear). Now you have aligned a short entry with the
      higher timeframe downtrend, effectively selling at a high of the day but one identified by multi-TF
      MVWAP analysis. Your target might be a retest of the lows (or perhaps the 4H lower Bollinger/
      MVWAP band).


     • Avoiding Countertrend Bias: If you ever find a gorgeous looking 5m setup against the HTF bias,
       consider either skipping it or treating it as a quick scalp with modest expectations. For example,
       maybe 4H trend is strongly up, but 5m shows a head-and-shoulders and you feel like shorting. That’s
       fine, but understand it’s countertrend and the 4H MVWAP (rising) below might act as support soon.
       So either avoid that short or have a very tight profit target, perhaps down to the 1H MVWAP and no
       further. A lot of advanced traders get in trouble by taking too many countertrend trades – MVWAP
       across timeframes can serve as a constant reminder of the bigger picture. It’s literally on your chart
       telling you “hey, the average price on the 4H is still below, trend is up!” If you’re countertrend, reduce
       risk or wait for more evidence.


     • Synchronization = Confidence: The best trades often come when multiple timeframes line up. Say
       the 4H MVWAP is up and currently at $100k, the 1H MVWAP is also up at $101k, and now the 15m
       MVWAP that had a small dip is curling up at $101k as well, with price at $101k. Everything is
       clustering. That might be the moment a big move launches because traders across timeframes see
       value there. You go long and indeed it rockets from $101k to $105k. This is not luck – it’s the result of
       paying attention to MVWAP on all scales and timing when they all come into play.


In summary, using multi-timeframe MVWAP means: first set your strategic bias with higher TF MVWAP
(don’t swim upstream), then execute tactically on lower TF when signals agree with that bias, using
the higher TF MVWAP levels as guideposts. It’s like having the wind at your back for your trades. This
approach increases the probability of success and often the magnitude of winners, because you’re
capturing a move that’s part of a larger trend or swing.


7. Managing Invalidation and Take-Profits with MVWAP as an
Anchor
No trade plan is complete without a solid risk and trade management component. MVWAP can also play a
central role in managing your trades once you’re in – specifically in deciding when a trade idea is
invalidated (and thus when to cut losses), and when/how to take profits. By treating the MVWAP as a
reference anchor, you ensure that your exit decisions remain grounded in the market’s real value structure
rather than emotions. Let’s break this into two parts: invalidation (stop-loss logic) and take-profit
strategy.


Invalidation: Using MVWAP for Stop Placement and Trade Failure Signals

When trading intraday with 50–65× leverage, getting the stop right is crucial – it must be tight enough to
protect you from big losses, but not so tight that normal noise stops you out prematurely. MVWAP provides




                                                      18
a logical benchmark for placing stops because if price moves beyond MVWAP in a trend trade, or fails to
revert at MVWAP in a mean-reversion trade, it often means your trade thesis is wrong.


     • Momentum Trade Invalidation: Suppose you are long in a momentum scenario, having bought a
       pullback above MVWAP (as per Section 3). In this case, MVWAP was acting as support you expected
       to hold. The trade is invalidated if price closes below the MVWAP and stays below it, especially if
       MVWAP itself starts to slope down. That’s the market telling you the uptrend is likely over or a
       deeper pullback is occurring. You should place your stop just below MVWAP (and the recent swing
       low). A common technique: if you’re trading on 5m chart, require a 5m candle close below the
       MVWAP or a certain number of points below it to consider it a break – this filters out just one tiny
       wick from stopping you. But essentially, a breach of MVWAP support is your cue to exit. The
       rationale is straightforward: as long as the trade was working, price should not go more than briefly
       below the MVWAP if it’s truly trending up. If it does, the condition that made you bullish is gone. In
       practice, say you went long at $10,200 with MVWAP at $10,150. If price falls to $10,100 and MVWAP is
       $10,160 and turning flat, you’re clearly below – exit. This save you from potentially larger losses if the
       price continues to drop. The same logic holds for shorts: if you shorted expecting price to stay below
       MVWAP (downtrend) and it climbs above and holds, your short thesis is invalid – time to cut.


     • Mean Reversion Trade Invalidation: In a mean reversion, you’re expecting a move toward the
       MVWAP. If that move fails to materialize and instead price keeps trending away, you must bail quickly
       because you’re on the wrong side of what could be a trend day. Concretely, if you shorted an
       extreme above MVWAP expecting price to fall back, but instead price bases and starts making new
       highs (MVWAP will start climbing in response), you have to concede the trade. Often, you’ll use a stop
       above the extreme or above the next band – e.g., if you shorted at the 2σ upper band, maybe stop at
       3σ or above the swing high. MVWAP helps here by providing a moving reference for “too far”. As
       an example, “I’ll short as long as price is below the upper band of MVWAP; if it crosses above the
       upper band by a significant margin, then the trend might be accelerating – get out.” Alternatively,
       one could say “If price does not revert to MVWAP within N bars, I’ll exit”, because a true mean
       reversion usually happens relatively soon after the extreme; lingering could mean a flag and
       continuation.


     • Trailing Stop with MVWAP: Another approach is to use MVWAP as a trailing stop reference. As
       your trade becomes profitable, you might trail your stop along the MVWAP (or just under it for a
       long). For instance, you’re short from an extreme and price is dropping nicely. MVWAP is now coming
       down behind price. You could decide that if price recrosses above the now-descending MVWAP, that’s
       your signal to exit (because it might mean the down move is done). This often keeps you in the trade
       longer than a static target would, allowing profits to run, yet gives a definitive exit if the move
       reverses. For a long trade, you’d trail just below the rising MVWAP. On a lower timeframe chart, you
       could even use something like “if price closes above the 5m MVWAP, exit short” etc., once you’re in
       profit and want to lock it.


     • MVWAP & EMA as Combined Stop Logic: Sometimes using MVWAP alone might whipsaw, so you
       can add confluence: e.g., “Exit long on a 5m close below MVWAP and below the EMA50” or “Exit if
       MVWAP turns downward and CMF turns red”. These combinations reduce false exits. But in fast-
       moving leveraged trading, keeping it simple often works: MVWAP break = out. It’s better to re-enter
       later than to hold and hope.




                                                      19
     • Invalidation = Hard Stop vs Soft Stop: Decide if you treat the MVWAP criteria as a hard stop (preset
       order) or a discretionary exit. Hard stops are safer for discipline. For example, if your plan is “stop out
       if price hits 1% beyond MVWAP,” you can set that immediately. A discretionary approach might say “if
       price closes an M15 candle below MVWAP, I’ll manually close.” Both can work – just ensure you follow
       it. High leverage gives little room for second-guessing, so often the hard stop at a certain level below
       MVWAP is the way to go.


Take-Profit Strategy: Using MVWAP as Target and Guide

While managing risk is primary, knowing how to lock in profits methodically is equally important. MVWAP
can guide your take-profit decisions in several ways:


     • MVWAP as a Mean Reversion Target: By definition, in any mean-reversion trade, the first target is
       the MVWAP (the mean). When price snaps back to MVWAP, a large part of the “edge” of that trade is
       realized – you foresaw it returning to average, and it did. So, for example, if you bought a dip below
       MVWAP (mean reversion long) around $100k expecting a bounce, and now price is back at MVWAP
      $102k, you should consider taking profit (at least partially) there. Often, the safest play is to exit the
      majority of position at MVWAP and keep a small runner in case it overshoots to the other side of the
      range or hits the opposite band. The reason is that MVWAP could act as resistance now (if coming
      from below) and price might stall or even reverse again at that mean. Don’t get greedy trying to hold
      a mean reversion trade for a trend move – by nature, you’re playing the oscillation, so bank the win
      near the oscillation’s center.


     • Riding Trending Trades – When to Take Profit: In momentum trades, one strategy is to use
       distance from MVWAP as a cue to take profit. For instance, you’re long in an uptrend. As price
       accelerates far above the MVWAP, you can sell into strength. Perhaps you say “I will take off half my
       position when price hits the +2σ MVWAP band or X% above MVWAP.” This is like saying, I got in near
       the mean, I’ll get out at an extreme. It’s a proactive way to realize gains before the inevitable
       pullback. If you don’t have bands, you can eyeball previous swings: if price is now much higher above
       MVWAP than it’s been all day, that’s probably a good place to scale out. Also consider VPVR: maybe
       the next high-volume node or resistance is approaching – that often coincides with an outsized gap
       between price and MVWAP as well.


     • Scaling Out vs All-Out: MVWAP can help decide scaling. For example, in a long trend trade, you
       might plan: take 1/3 off at +1σ band, another 1/3 at +2σ band, and let the last 1/3 ride with a trailing
       stop (which might be triggered when price eventually crosses below MVWAP). This way you secure
       profits progressively as the trade goes your way, using the MVWAP-derived levels as objective points.
       By the time the final portion reverses through MVWAP, you’ve captured most of the move.


     • Using Higher TF MVWAP as TP: If you entered on a 5m setup but your thesis is that the price will
       revert to the 1H MVWAP or move to where the 4H MVWAP indicates, you can set those as targets. For
       instance, you shorted an intraday pop largely because 4H MVWAP above was signaling a downtrend;
       your target could logically be the 4H MVWAP itself or the area around it on a drop. Many intraday
       traders use higher timeframe averages as profit goals – because that’s where the larger market
       might step in to counteract your trade.




                                                       20
      • CMF & Volume Clues to Take Profit: Although MVWAP is our anchor, keep an eye on CMF for exits
        too. If you’re long and approaching your target, but CMF is still strong green and price shows no
        weakness relative to MVWAP (still riding above it nicely), you might choose to hold a bit longer or
        tighten stop rather than fully exit – the trend could overshoot. However, if you see, say, price still
        rising but CMF drops sharply or diverges (buyers drying up) while you’re well above MVWAP, that’s an
        extra nudge to take profit immediately even if target is not yet hit. MVWAP won’t tell you that directly,
        but the combination of MVWAP distance + CMF divergence is quite telling.


      • Reversion to Mean after Profit: An advanced technique is after you exit a momentum trade,
        consider if a reverse trade is warranted (basically chaining a momentum trade into a mean reversion
        in the opposite direction). For example, you rode a long up, took profit when price got far above
        MVWAP. Now price starts to roll over toward MVWAP – do you flip short for the ride back down? This
        is possible if you’re quick and the conditions are right (that essentially means the trend move is done
        and we are entering a reversion). If doing this, treat it as a separate trade with its own plan (don’t
        emotionally flip unless the setup is legit). MVWAP will now serve as the target for the short, which
        might just be giving back the move it overshot. This kind of two-way trading is advanced but can be
        very profitable in choppy markets.


      • Anchored Expectations: Always ask, “Where is price relative to MVWAP now, and how far could it
        reasonably go beyond it?” This frames your potential reward going forward. If you’re long and price
        is already 3% above MVWAP in a day that usually sees 2% swings, your remaining reward is likely
        limited – take the profit. If you’re short and price is already significantly below MVWAP and
        approaching a support, don’t hold hoping for way more, unless you have reason to believe a major
        break (and even then, partial take profit is wise).


Finally, incorporate these MVWAP-based management rules into your trading plan for each trade. Before you
enter, you should know: “My stop is going just under MVWAP level X, because if we go there the setup failed.
My first target is MVWAP (or band) at level Y. If we reach Y, I’ll do Z (take partial, move stop etc.).” Planning
this in advance helps avoid emotional decisions when the heat of trading is on. It’s much easier to execute
pre-planned actions like “cover at MVWAP” than to decide on the fly while watching a fast market.



Conclusion: By constructing this lesson plan, we covered MVWAP from fundamental definition to intricate
execution tactics. You’ve learned what MVWAP is (a volume-weighted moving average that doesn’t reset
  4 ), how it behaves in trends vs ranges, and how to leverage its signals in tandem with CMF, VPVR, and

EMAs to make high-confidence trading decisions. The overarching theme is anchoring your analysis to a
volume-weighted benchmark (MVWAP): this keeps you tuned into where the market’s real value lies at
any moment. Whether you’re chasing a breakout or fading a frenzy, MVWAP grounds your strategy in
objectivity – be it entering on a pullback to MVWAP, exiting when price stretches too far from it, or using its
crossovers to confirm a trend shift. For an advanced BTCUSD perpetual trader, these techniques translate
into a more structured approach to intraday trading: you’re no longer reacting impulsively, but following a
logical sequence (identify context → execute setup → manage via MVWAP) rooted in price and volume
behavior. Practice observing these principles on your TradingView charts in replay or real-time, marking
MVWAP levels across timeframes, and you’ll start to intuitively anticipate moves (for example, you’ll catch
yourself thinking “This rally likely tops near that 4H MVWAP above” or “Volume support is at the MVWAP below, I’ll
wait for a dip there”). By internalizing this MVWAP-centric framework, you can improve your trade timing,
filter out noise, and manage risk more effectively – all of which are essential when trading high leverage on




                                                       21
intraday BTCUSD. Good luck and stay disciplined; let MVWAP be your guide and anchor in the fast-moving
crypto seas! 8



 1   2   4   5   8   Mastering VWAP and MVWAP for Smart Trading Strategies
https://tickeron.com/trading-investing-101/what-is-vwap-and-mvwap/

 3   Configuring the VWAP Pro Indicator for TradingView – Quantum Trading Indicators for TradingView
https://tradingviewindicators.quantumtrading.com/support/configuring-the-vwap-pro-indicator-for-tradingview/

 6   7   Trade Navigator | Stocks, Futures, Forex & Options Trading Platform
https://www.tradenavigator.com/platforms/plugin/mvwapbands




                                                            22


// --- MVWAP + CMF STRATEGIES PDF ---


MVWAP and CMF-Based Intraday Trading
Strategies for High-Leverage Crypto
Introduction
This report surveys short-term trading strategies that leverage Moving VWAP (MVWAP) – a rolling volume-
weighted average price – in conjunction with the Chaikin Money Flow (CMF) indicator. Drawing from peer-
reviewed research and professional trading literature in equities/forex, we focus on intraday or high-
frequency approaches adaptable to crypto markets. Each strategy’s core principles are explained, along
with how MVWAP and CMF inform entry, confirmation, or exits. We also note any empirical performance
results from studies. Finally, we identify strategy logic gaps relative to the user’s current alert flags and
propose new alert definitions (with logic and scenario keys) to cover those opportunities. The goal is to
emphasize academically grounded tactics that exploit MVWAP’s price-volume insight and CMF’s
accumulation/distribution signals while remaining practical for leveraged crypto trading (where precision is
critical).


Trend-Following Momentum Strategy (MVWAP & CMF)
Core Concept: When an asset is in a strong intraday trend, using MVWAP as a baseline can help ride
momentum. The simple rule “long above VWAP, short below VWAP” underpins many day-trading systems.
In practice, consistently trading on the trend side of VWAP yields a bias aligned with institutional flow. A
recent study by Zarattini & Aziz (2023) demonstrated a VWAP trend strategy on equity ETFs that turned \
$25k into \$192k over ~5 years (671% return vs 126% for buy-and-hold), with a Sharpe ~2.1. This highlights
the potential of a VWAP-based trend approach in improving risk-adjusted returns. Crypto markets similarly
see VWAP-respecting trends due to the constant volume flow.


Using MVWAP: In a bullish trend, price will stay above a rising MVWAP line most of the time, which acts
as a dynamic support. In a bearish trend, price stays below a falling MVWAP (dynamic resistance). The slope
of the MVWAP itself is a quick gauge of momentum – a steeply upward-sloping MVWAP reflects sustained
buying pressure, whereas a flat or wavering MVWAP suggests the trend may be weak or transitioning.
Traders often confirm a trend by ensuring price has not recently whipsawed across the MVWAP (few
crossovers in the lookback period). This aligns with the user’s regime detection: fewer MVWAP crosses =
trending regime. In a confirmed uptrend, one only looks for long entries (and vice versa for downtrends),
filtering out counter-trend trades. Notably, some professionals do the opposite in range conditions (going
long below VWAP and short above), but in a true trend that contrarian tactic fails – hence identifying the
regime is key.


Role of CMF: Chaikin Money Flow confirms trend strength by measuring volume-weighted buying vs.
selling pressure. In a healthy uptrend, CMF stays positive (often significantly > 0), indicating consistent
accumulation behind rising prices. In a downtrend, CMF should remain below 0 (distribution). If price is
trending up but CMF lapses to negative territory, it “calls into question” the uptrend’s strength 1 – an
important warning sign of a weakening trend or fake breakout. To avoid false signals, many traders set a



                                                     1
buffer around the zero line (e.g. require CMF > +0.05 for bullish confirmation, < –0.05 for bearish) 2 3 .
Strong trends often show extreme CMF values. Readings above about +0.25 (25% of volume in up-flow) or
below –0.25 indicate powerful trend pressure – such that traders can even add on minor pullback entries
confidently 4 . For example, if CMF is +0.30 and MVWAP is rising, a dip in price toward MVWAP is likely a
buying opportunity supported by robust volume flow. In practice, a “steep up” CMF slope or a sustained
high CMF value can serve as a confirmation trigger to enter or pyramid into a trend trade.


Entry & Exit Criteria: A typical momentum entry occurs on a pullback to MVWAP or an EMA in the
direction of trend, with confirming volume. For instance, in an uptrend one might wait for price to dip
toward the rising 20-bar MVWAP and show a bounce. Entry is taken once price resumes upward off the
MVWAP, confirmed by CMF remaining green (e.g. CMF stays > 0 throughout the pullback or ticks up again)
– this indicates the dip had weak selling and buyers are reasserting. Additional confirmation comes from
short-term moving averages in alignment (e.g. EMA-21 above EMA-50 in a bullish stack, consistent with
price > MVWAP). The stop-loss is usually placed just below the MVWAP (for a long trade), since a true
momentum trend should not violate that support for long. Profit-taking can be done at the next swing high
or by trailing a stop as long as price stays above MVWAP. Some strategies also exit when CMF falters – e.g.
if in a long trade and CMF drops from positive to near zero, it signals waning momentum, so one may
tighten stops or take profit. Empirically, this trend-following approach has shown strong performance,
especially when combined with volume filters. The cited VWAP-only strategy on QQQ benefitted from big
trending moves; adding a CMF condition could further improve its Sharpe by avoiding low-volume
whipsaws. Traders should note, however, that using high leverage (50× or more) demands precise timing –
waiting for that MVWAP touch and CMF confirmation is crucial to avoid being stopped out by minor noise.


Mean Reversion Strategy (MVWAP Extremes & CMF)
Core Concept: In the absence of a clear trend (when the MVWAP is flat or only gently sloped), prices
oscillating far from the MVWAP tend to revert back to the mean. MVWAP represents a volume-weighted
equilibrium price; extreme deviations from it often indicate an imbalance that may correct. This is a classic
contrarian approach: sell above the VWAP band, buy below it, expecting a snap-back to VWAP. Professional
traders recognize that on range-bound or mean-reverting days, going against moves that stretch far from
VWAP can be profitable (unlike trending days where that’s a recipe for pain). The key is to identify truly
extreme conditions and wait for confirmation that the momentum has stalled before entering a counter-
trend position.


Using MVWAP: The first criterion is a neutral MVWAP slope, indicating a trading range or sluggish trend. A
flat or shallow MVWAP means price has been oscillating around the average, not one-directionally trending.
Next, one looks for price distance from MVWAP to become unusually large. This can be quantified by
standard deviation bands (similar to Bollinger Bands but around MVWAP). A common rule: beyond ±2σ from
MVWAP is “overextended”. For example, if price spikes up to 2 standard deviations above the MVWAP, it
signals an extremely high price relative to recent volume-weighted norms – a potential short setup. The
user’s system defines such thresholds (e.g. sigma_k ~1.85–2 for flagging overextension). In practice, one
might also use volume profile levels (value area high/low) in conjunction; if price is above the recent high-
volume value zone and well above MVWAP, the context is ripe for mean reversion.


Role of CMF: Chaikin Money Flow is invaluable for confirmation in mean reversion trades. An extreme
price move is more suspect if volume flow is not supporting it. Traders look for CMF divergence at the
extremes: for instance, price makes a higher high, but CMF is lower than on the previous high (or outright




                                                     2
dropping) – this indicates waning buying pressure even as price stretches up. Such a bearish divergence is
often a go signal for a short reversion trade. If instead CMF remains extremely high (say CMF still rising or at
new highs with price), one should be cautious – strong positive CMF at a price high means persistent
inflows, and the rally could continue longer than expected. So, the ideal mean-reversion short setup is:
price far above MVWAP + evidence of buyer exhaustion (e.g. CMF rolling over from a very high value, or
multiple bearish CMF divergences across recent peaks). For a long mean-reversion (catching a falling price),
you’d analogously want price far below MVWAP with CMF no longer getting more negative (e.g. higher lows
in CMF even as price made lower lows, showing selling pressure is drying up).


Entry & Exit Criteria: Mean reversion entries are timed after the extreme move fails. Rather than blindly
shorting just because price is 2σ above MVWAP, a trader waits for price to reject the extreme level. This
could be a failed breakout (e.g. price pokes above a range high or band and then falls back), a strong
counter-trend candle, or a break back below a key level (such as dropping back under the prior range high
or VWAP itself). Essentially, evidence of momentum stalling is required – “don’t try to catch a falling knife
or stand in front of a speeding train”. Once that evidence appears and a CMF divergence is evident or CMF
has started reverting, the trader can enter the counter-trend position. For example, suppose Bitcoin surges
far above its 6h MVWAP and the volume profile’s value area, but CMF on the 5m and 15m charts has started
to decline even as the last push to new highs occurred. A mean-reversion short could be entered when price
falls back below a local support or below the VWAP of a lower timeframe, confirming the blow-off is done.
Stops are set tight, just beyond the extreme high (since if the trade is wrong, price will continue running).
Targets are typically set at or near the MVWAP itself – the mean price – or the nearest high-volume node
around it. This mean often acts as a magnet once the extreme reverts. Because these trades are counter-
trend to the immediate move, risk/reward can be very favorable: the distance from an extreme back to
MVWAP is large, while the stop (beyond the extreme) is relatively small. Empirically, mean reversion
strategies tend to work best in sideways markets or after climatic moves. Day-trading guides note that
neither pure trend-following nor pure mean-reversion holds an edge across all trades; the edge comes from
using the right approach in the right context. In crypto, which often has range-bound periods punctuated
by abrupt spikes, this strategy is especially useful. However, it should be avoided during strong trending
phases when price can remain overextended for long periods (here, the earlier momentum strategy is
preferable).


MVWAP as Dynamic Support/Resistance (“Bounce” Strategy)
Core Concept: Another intraday strategy treats the MVWAP line as a support or resistance level for price
“bounces”. In an established trend, the first pullback to the MVWAP often presents an entry; in a range,
price swinging from one side of MVWAP to the other can find short-term support/resistance at the VWAP
line. This approach overlaps with trend-following (buying dips in uptrend) and mean-reversion (selling a
rally to VWAP in a range), but it emphasizes the MVWAP touch itself as the trigger point. The logic is that
many institutional algorithms use VWAP as a benchmark; thus, price reactions are common when
touching VWAP, as big players may step in to buy below VWAP or sell above it to execute orders around the
average price. In crypto, even without a daily close, a rolling VWAP acts similarly – it’s a reference for where
the bulk of volume traded recently, so it attracts liquidity.


Using MVWAP: Traders monitor when price approaches the MVWAP from above or below. In a bullish
scenario, if price falls from above toward the MVWAP, one anticipates a bounce (support) at or near the
MVWAP level. Conversely, in a bearish scenario, a rally up into a falling MVWAP may stall or reverse
(resistance) at that average. A strategy is to buy the test of support or sell the test of resistance.




                                                       3
Notably, it’s wise to incorporate a tolerance – price might pierce slightly through the MVWAP (due to
volatility) and still reverse. The user’s configuration includes an mvwap_touch.tolerance_pct (e.g. a
fraction of σ) to decide how close is considered a valid “touch” vs. a break. Essentially, if price comes within,
say, 0.1σ of MVWAP and then turns, that counts as a bounce off the MVWAP. Some setups require the candle
to close on the original side of MVWAP (indicating the level held).


Role of CMF: Volume confirmation makes bounce trades more reliable. Ideally, during the pullback to
MVWAP in an uptrend, CMF stays positive or rises, indicating that the pullback is not backed by heavy
selling. For example, if price is above MVWAP and falling toward it, but CMF remains well above 0 (maybe it
even ticks up as price nears MVWAP), it suggests net accumulation – strong hands potentially using the dip
to buy. That increases the probability of a successful bounce. If instead CMF plunges deep into negative on
the approach to MVWAP, it warns that the support may break (significant distribution is occurring). Thus, a
bullish bounce setup is confirmed when CMF is green/strong at the bounce, whereas a bearish bounce
(short at MVWAP resistance) is better if CMF is still red/weak on the approach (indicating no real buying
interest to push through resistance). Additionally, a surge in CMF from negative to positive right as price
crosses back above MVWAP can signal that the bounce is real – essentially buyers stepping in at VWAP en
masse. In summary, CMF can filter bounces: take those supported by volume flow; be cautious or skip
those lacking it.


Entry & Exit Criteria: For a long bounce: as price touches or slightly undercuts MVWAP and then springs
back above it, the trader enters long, aiming to catch the resumption of the up-move. A specific rule could
be: if an intraday bar closes back above the MVWAP after briefly dipping below, and CMF is positive, trigger a
long. The stop goes just a bit below the low of that dip (to cover the case that it wasn’t a true bounce but
the start of a deeper drop). Profit targets might be the recent swing high or a new high if trend continues.
For a short bounce (price rallying into resistance), one could short when price pokes above MVWAP and
then falls back below it on a closing basis, with CMF negative, putting a stop just above the local peak. An
example trade: Ethereum is in a 5-minute uptrend; price pulls back from \$2000 to \$1975, which is the
current MVWAP region. As it hits MVWAP, a few candles show bottom wicks and then ETH pushes back up to
\$1985; all the while 5-min CMF stayed around +0.10 (healthy buying). A bounce trader buys in the high \
$1970s once price reclaims MVWAP, confident that MVWAP held. The exit could be at a new high (say \
$2005) or trailing. Literature highlights VWAP’s usefulness as intraday support: “VWAP acts as a potential
support or resistance level for price bounces”. In practice, this approach yields many small trades; it may
require quick reflexes (especially with leverage) but offers well-defined risk. It’s effectively a specialized case
of the momentum strategy (in trend) or a scalp in range markets – with MVWAP as the key level to watch.


Breakout and Reversal Signals (MVWAP “Pierces” with Volume)
Core Concept: A significant price crossover of the MVWAP from one side to the other often marks a
regime change. These events are often called “VWAP pierces” or breaks. For example, if price has spent
most of the session below VWAP (signaling down bias) and then crosses above MVWAP decisively, many
traders will interpret it as a bullish trend reversal signal. Conversely, falling below MVWAP after being
above it is bearish. However, not every pierce is meaningful – some are head-fakes. To filter the noise, we
look for volume-backed pierces: MVWAP crosses that coincide with surging buying/selling pressure (CMF
or other volume metrics). Academic research underscores the significance of these transitions. In the SSRN
study, a simplistic always-in strategy that flipped long when price > VWAP and short when price < VWAP
dramatically outperformed buy-and-hold. The caveat is managing whipsaws; this is where confirming
volume can help.




                                                        4
Using MVWAP: The context of a cross matters. A breakout above MVWAP after a long period below
indicates a potential shift from a bearish to bullish intraday trend. The user’s crossover_window and
range_thresh parameters reflect measuring how long price was on one side (or how many crosses occurred).
A signal is stronger if price stayed on one side for an extended period (i.e., a clean break of a previously
controlling VWAP). Many strategies require that the cross occurs after a consolidation or range near the
VWAP (to avoid chasing a late-stage trend). Some traders also look at higher timeframe MVWAPs – e.g., if
price pierces the 5-minute MVWAP upward while also above the 1-hour MVWAP, the larger trend aligns,
making the breakout more credible. In short, not all MVWAP crosses are equal – look for those that signify
a new directional move rather than noise.


Role of CMF: Chaikin Money Flow provides the volume “vote” on a VWAP pierce. An ideal bullish
breakout scenario is: price crosses above MVWAP and at the same time CMF flips from negative to positive or
spikes upward. This indicates fresh buying volume supporting the breakout. For instance, suppose a coin
was languishing below VWAP with CMF around –0.10 (selling pressure). When it finally rallies through
MVWAP, if we see CMF quickly rise toward +0.05 or higher, it’s a sign the breakout is fueled by real demand –
likely to sustain 1 . A trader could use a rule like: trigger long on MVWAP break only if 20-period CMF > +0.05.
This filters out weak crosses where price peeks above VWAP but volume flow remains bearish (those often
reverse back down). Similarly, on a breakdown below MVWAP, one looks for CMF turning red (negative) as
confirmation to short. If price crosses down but CMF is still positive high, it could be a trap (maybe a one-off
big sell order but general accumulation continues). Another volume confirmation is a CMF surge: e.g. CMF
jumping by a large amount or hitting a multi-period high on the cross. That would indicate a burst of buying
(for an upside pierce) – analogous to a volume spike on a breakout candle.


Entry & Exit Criteria: A straightforward entry rule: enter on a candle close that firmly breaks the
MVWAP, with volume confirmation. “Firmly” could mean not just 1 tick above, but say ≥0.2% above, or a
strong candle body through it, to avoid whipsaws. The user’s system might implement a short cooldown so
as not to trigger multiple alerts if price oscillates around MVWAP – e.g., only one pierce signal per bar or
per few bars. Once long (after an upward pierce), a stop can be placed back below the MVWAP or below the
breakout candle’s low. The initial target might be a recent pivot high or a certain R:R ratio, but often if this
truly is a regime shift, one can ride the new trend (possibly switching into the momentum strategy mode).
For a reversal trade, where a long was riding an uptrend and then price pierces below MVWAP, CMF
confirmation of outflows would signal an exit or even a flip to short. Indeed, using CMF as an exit: if
previously CMF was strongly positive and on the break below MVWAP it goes negative, it suggests the trend
has reversed – a good time to close longs. Performance-wise, as noted, VWAP cross strategies have
shown excellent results in studies when trends emerge. They do suffer in sideways chop, which is why
adding a volume filter or a requirement that the cross follow a period of low volatility can improve quality.
For example, one medium article suggests a combined VWAP-ATR breakout system (though ATR is beyond
our scope, the idea is similar – ensure a significant move). In summary, MVWAP pierce signals, especially
when backed by a shift in CMF, are powerful alerts for intraday trend reversals or breakouts.


CMF-Based Volume Signals (Trend Exhaustion and Reversals)
Core Concept: We now highlight strategies where Chaikin Money Flow itself drives the signal, with
MVWAP providing context or confirmation. Two important use-cases are: (1) Trend continuation via
extreme CMF – using high CMF readings to stay in trades or add positions – and (2) Mean-reversion via
CMF “exhaustion” – using unusually high/low CMF as a contrarian indicator that the price move may be




                                                       5
overdone. While CMF is not usually a standalone system, it serves as a powerful secondary indicator to time
entries/exits around MVWAP signals.


Trend Continuation (High CMF “Ride the Flow”): When CMF is persistently strong, it indicates conviction
behind the price trend. A tactic from TradingSim is to treat CMF readings above +0.25 or below –0.25 as
confirmation of a strong trend and even add to positions on minor pullbacks in that scenario 4 . For
example, if you are long and CMF climbs to +0.30, it signifies powerful accumulation – one might add on the
next small dip (perhaps a dip to an intraday EMA or to the MVWAP) confident that the buying pressure will
lift price to new highs. MVWAP can act as the guide for where to add (on a dip near MVWAP in a strong
uptrend, as discussed). The presence of extreme CMF makes one more aggressive in scaling into the trend.
Conversely, if CMF is deeply negative (e.g. –0.3) in a downtrend, a trader could pyramid into shorts on
rebounds toward resistance. Entry/exit: This approach isn’t a distinct “entry” signal, but rather a way to
manage positions: stay with the trend as long as CMF remains extremely biased. Only when CMF starts to
recede toward neutral would one stop adding or consider trimming. This logic ensures you capitalize fully
on high-volume trends.


Exhaustion Reversal (CMF Overbought/Oversold): There’s an opposing viewpoint that extremely high
CMF values are unsustainable and may precede a reversal (similar to how an RSI > 80 can mark
overbought conditions). The user’s settings define CMF exhaustion thresholds (e.g. +0.17 and –0.17)
beyond which the market is considered overextended. The idea is that when CMF reaches such an extreme,
the trend may be near a climax. For instance, if CMF hits +0.20 or more, virtually all recent volume has
been buying – a situation that cannot persist indefinitely (buyers may be “exhausted”). A strategy here is to
watch for CMF to roll off its extreme as an early signal of reversal. This often goes hand-in-hand with price
blow-offs. Suppose during a strong rally, 15-minute CMF rises to +0.25 (rare, very bullish). Price meanwhile
might be far above the MVWAP. The signal to short would not be just the high CMF, but when CMF starts
to decline from +0.25 to, say, +0.15 while price makes a final push higher. That divergence (price up but
CMF down off extreme) is a tell-tale sign of buying exhaustion, and a mean-reversion short could be
initiated even before price crosses any moving average. MVWAP still plays a role: one might target the
MVWAP on the downside or use a break of MVWAP as additional confirmation to scale in more. Similarly, a
very low CMF (e.g. –0.20) that starts to rise could foreshadow a bottom and a long reversal trade. This
approach effectively anticipates a turn using volume flow momentum.


Entry & Exit Criteria: For exhaustion entries, a prudent rule is to require a price confirmation too (to
avoid jumping in solely on an indicator turning). For example, after spotting CMF peaking and curling down,
one might wait for price to close below the short-term MVWAP or another support to confirm the down
move has begun. Alternatively, one could scale in partially on the CMF turn and add more once price
violates MVWAP. Exiting such counter-trend trades would be as usual (target mean reversion). Notably,
academic research on volume indicators supports their use in confirming trends but finds them less
effective alone. A cited study found that the basic Chaikin MF, while it “could deliver a profit,” was less
profitable than other simple indicators 5 . This reinforces that CMF works best in concert with price-
based signals like MVWAP. The two signals we detailed (trend continuation and exhaustion) show how
extreme CMF readings augment the standard strategies: either by reinforcing a strong trend bias or by
marking a climactic extreme to fade. In practice, a trader might integrate these by: if CMF > +0.20, be
biased to only long or add on dips (no shorts); once CMF falls back below +0.20 with price still high, shift
bias to neutral then to short if further confirmation appears. MVWAP logic (trends, crosses, ranges) then
takes over to trigger actual entries/exits.




                                                     6
CMF Divergence Strategy (Volume-Price Divergence)
Core Concept: Divergence between price action and CMF can provide advanced warning of reversals.
This strategy overlaps with earlier ones but is worth singling out given its prominence in technical analysis.
A bullish divergence occurs when price makes a lower low but CMF makes a higher low (selling pressure
easing), and a bearish divergence when price makes a higher high but CMF a lower high (buying pressure
weakening). Such divergences often precede a price snap-back or trend change. They are especially potent
when the price move also stretches far from an average like MVWAP, creating a condition where price is
extreme but the cause (volume flow) is not keeping up.


Using MVWAP: MVWAP provides a frame of reference to identify significant price swings for divergence
analysis. Typically, one would look at recent swing highs/lows of price relative to MVWAP: e.g., price pushed
X% above MVWAP to a peak, then pulled back toward MVWAP, then pushed to a new high above MVWAP
again. If that second push is even further from MVWAP but MVWAP’s slope is flattening and price cannot
sustain above (perhaps briefly touches a higher band but retreats), it suggests the up-move is running out
of steam. Divergence adds to this story: we check if CMF was lower on the second push than on the first. If
yes, the groundwork for a reversal is laid. In range conditions, MVWAP is roughly central, so a divergence at
range extremes (price double-topping with lower CMF, etc.) implies mean reversion back toward MVWAP is
likely.


Role of CMF: This strategy relies on CMF’s divergence. For example, suppose over the past hour Bitcoin
formed two peaks: one earlier with CMF +0.15, and a new higher peak now with CMF only +0.05. Price rose
to a higher high, but CMF shows that buying pressure was much lower the second time – a classic
bearish divergence indicating smart money was distributing as price inched up. Chartists note that such a
bullish/bearish divergence “simply shows less selling/buying pressure” in the move 6 . Crucially,
divergence is a warning, not a trigger by itself: “It takes a move into positive territory to indicate actual
buying pressure” after a bullish divergence, for example 7 . In practice, one combines divergence with a
confirming event. That might be price-based (a breakdown through support or MVWAP) or a CMF zero-line
cross. For instance, after a bullish divergence (price low vs. higher CMF low), you might wait until CMF
actually crosses above 0 to confirm buyers have taken control, then go long. By the time that happens, price
may have also broken above MVWAP. In effect, divergence plus a subsequent CMF trend shift provides a
strong buy signal.


Entry & Exit Criteria: The entry is ideally timed when both signals align: you have detected a divergence,
and then get a clear trigger like CMF crossing a threshold or price breaking a key level. For a bearish
divergence scenario, one could enter short when price falls back below MVWAP or a trend line after the
divergent high, with CMF by then turning down. The initial stop goes above the recent high (since if price
surges to a new high with volume, divergence is invalidated). For a bullish divergence, enter long when
price regains MVWAP or key resistance after the divergent low, with CMF crossing above 0 confirming
accumulation. Target can be set at the MVWAP (if playing a minor counter-trend) or farther if expecting a
full reversal of trend. Many traders also simply use divergence to manage existing positions – e.g., if holding
a long and see a bearish divergence forming at a new high, they might tighten stops or exit, even before
price signals, anticipating a reversal. This preemptive use can protect profits. From a performance angle,
divergences increase the probability of a successful reversal trade, but as with all signals, they are not 100%.
They can persist for some time (price keeps drifting to slightly higher highs while CMF drifts lower – multiple
divergences). Thus, it’s wise to incorporate a final confirmation (price or volume trigger). Nonetheless,
divergences are well-regarded in both academic and retail trader communities as a sign of internal market




                                                       7
weakening/strengthening not evident just from price. With CMF capturing volume flows, such divergences
are a fundamental check on price’s story – ensuring our trading aligns with what “big money” is doing.


Gaps in Current System & Recommended New Flags
Finally, we identify strategy conditions not explicitly covered by the user’s existing MVWAP/CMF alert flags
and propose new alerts to incorporate them. The table below summarizes each proposed alert flag, the
logic criteria to compute it, and a suggested scenario_key name.


 Proposed
                    Logic & Conditions                          Suggested scenario_key
 Alert Flag

                    Triggers when price pierces above/
                    below MVWAP after an extended
                    period on the opposite side, and CMF
 Volume-
                    shows confirming volume surge (e.g.         bullish_flow_breakout (for upward)
 Backed
                    CMF crosses above +0.05 or jumps by         <br> bearish_flow_breakdown (for
 MVWAP
                    a significant amount on an upward           downward)
 Breakout
                    cross, and vice versa for downward)
                      2 . This filters false crosses and

                    indicates a flow-supported breakout.

                    Flags when price trend and volume
                    trend diverge: e.g. price above
                    MVWAP but CMF is negative (or
                    dropping steeply), or price below
                    MVWAP but CMF is positive 1 . This
 Unconfirmed                                                    unconfirmed_uptrend (price up, flow
                    indicates an “unconfirmed” trend –
 Trend (Flow                                                    out) <br> unconfirmed_downtrend
                    possible bull/bear trap. The logic can
 Divergence)                                                    (price down, flow in)
                    require a minimum duration or
                    magnitude (e.g. CMF < –0.05 while
                    price > MVWAP for 3+ bars). It warns
                    that the prevailing price move lacks
                    volume support and may reverse.

                    An alert for extremely high or low
                    CMF reverting. Fires when CMF
                    exceeds an exhaustion threshold (e.g.
                    ≥ +0.20 or ≤ –0.20) and then turns
                    back toward zero by a set amount            flow_exhaustion_short (for high-CMF
 Flow
                    while price is still near extreme levels.   drop, short setup)
 Exhaustion
                    For instance, CMF falls from +0.22 to       <br> flow_exhaustion_long (for low-
 Reversal
                    +0.10 over a few bars, with price still     CMF rise, long setup)
                    near its high – signaling a likely
                    buying climax and reversal. Pair with
                    a price trigger (like a break below
                    MVWAP or support) for confirmation.




                                                      8
     Proposed
                          Logic & Conditions                               Suggested scenario_key
     Alert Flag

                          A specialized bounce/pullback entry
                          flag that requires volume
                          confirmation. Triggers when price
                          pulls back to within ~1× MVWAP’s
                          tolerance (touches or slightly pierces
                          MVWAP) and then rebounds, and
     Volume-
                          concurrently CMF remains strongly                 volume_supported_dip_buy
     Supported
                          biased in trend direction (e.g. CMF              <br> volume_supported_rip_sell
     Pullback
                          stayed > 0 throughout a bullish
                          pullback). This identifies high-
                          probability dip buys or relief sells
                          where MVWAP held as support/
                          resistance with institutional flow
                          backing the move.

Each of these flags addresses a potential gap in the current scenario mapping. Volume-Backed MVWAP
Breakout adds a confirmation layer to simple VWAP crosses by ensuring institutional-grade volume is
behind the move – reducing false breakouts. Unconfirmed Trend alerts traders to a lack of volume
confirmation (as taught by Chaikin and others: price up + negative CMF = suspect rally 1 ). This could
integrate with existing divergence logic, but formalizing it as its own alert can help catch cases of “stealth”
accumulation or distribution before price actually turns. The Flow Exhaustion flag makes explicit those
moments when CMF indicates a likely trend climax – something the current system may imply via extreme
labels but not directly signal as a trade setup. Finally, the Volume-Supported Pullback flag refines the
bounce logic by demanding a healthy CMF during the bounce, thereby distinguishing true support
bounces from weaker ones. We suggest the scenario_key names above for clarity, but they can be
adjusted to the naming scheme in use. Implementing these alerts would enhance the system’s coverage of
MVWAP & CMF based strategies, ensuring that valuable conditions from literature – like volume-confirmed
breakouts and volume-based non-confirmation signals – are not missed. Each alert is grounded in the
institutional logic that price moves need volume validation, aligning with the emphasis on “confirming
indicators” to filter trades for high-leverage contexts.


Overall, by integrating these strategies and alerts, traders can more confidently navigate intraday crypto
markets – staying with strong trends, fading only the most overstretched moves, and always cross-checking
price action against the story told by volume flow. 1



 1     2   3   6    7   Chaikin Money Flow (CMF) | ChartSchool | StockCharts.com
https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/chaikin-money-flow-
cmf

 4    2 Simple Strategies for Trading with the Chaikin Money Flow Indicator – – Tradingsim
https://app.tradingsim.com/blog/chaikin-money-flow-indicator/

 5    jrmi.au.edu
https://jrmi.au.edu/index.php/jrmi/article/download/156/143




                                                                9


// --- AVERAGE RANGE PDF ---


ONBOARDING DOCUMENTATION v1.0

This document is designed to help new users set up and understand the ​
Average Range indicator. The guide will walk you through its features,
interpretation, and best practices.

​



                                 - Page 1 -​
    A.​Overview


The Average Range indicator creates a dynamic, time-weighted price boundary to
identify mean reversion zones, overextensions, and high-probability reversal
points.


It answers (2) key questions:


                    1.​What is the average price range?



                    2.​How far is price stretched from
                       the average range?


It’s great for (2) things:


                    1.​Spotting when price is stretched
                       too far (mean reversion trading)



                    2.​Defining the current price range
​


⚠️ This indicator is versatile in its calculation where it can be applied to
any market (e.g. stocks, forex, crypto, or any market with sufficient price
data. ​
​
⚠️ Not a crystal ball. It is a tool for measuring deviation.




                                  - Page 2 -​
B.    Installation Instructions


     1.​Open this link: Average Range


     2.​Click “Use on Chart”​




                                                  ​


     3.​Done! ✓
​




                                    - Page 3 -​
C.   Key Components



        Component           Description           Visual Cue

Upper Bound           Defined as the ceiling




                                                  •
                      of where price can
                      either approach or
                      stretch to.​
                      ​
                      ON AVERAGE​
                                                               ​
                      ​
                      ⚠️ Price can absolutely
                      stretch beyond this
                      upper limit if momentum
                      is strong enough.
                                                  Red Circles


Lower Bound           Defined as the floor of




                                                  •
                      where price can either
                      approach or revert back
                      to.​
                      ​
                      ON AVERAGE​
                                                               ​
                      ​
                      ⚠️ Price can absolutely
                      revert below this lower
                                                 Green Circles
                      limit if momentum is
                      strong enough.

Down Arrow            Prints when price either
                      stretches above the
                      upper bound or returns
                      back into the average
                      range.
                                                    ▼      ​

                                                 Red Triangle

Up Arrow              Prints when price either
                      stretches below the
                      lower bound or returns
                      back into the average
                      range.
                                                    ▲      ​

                                                 Green Triangle




                             - Page 4 -​
D.   Interpretation
​
The Average Range doesn’t guess. It measures stretch, similarly to the guiding
lines of a highway. It helps you identify where price can reach/revert on
average, while also indicating when price is stretching beyond the norm.​


Price Location        What It Means                  General Strategy

Inside the band       Price is trading within the    With the indicator
                      normal range and normal        alone? Nothing. It
                      deviations.                    simply confirms price is
                                                     trading within the
                                                     average norm.​
                                                     ​
                                                     Reference other
                                                     indicators to identify
                                                     directional bias.

Approaching Upper     Price is approaching or at     Watch for rejection or
Bound ​               the upper boundary of the      stretch beyond.​
​                     average trading range.​        ​
or​                                                  Pullback more likely to
​                                                    occur​
Touching Upper                                       ​
Bound​                                               Prepare to long if
                                                     addl.indicator
                                                     confluence signals​


        •                                            strong momentum for
                                                     continuation of stretch
                                                     upward.​
                                                     (Signals, Ebb+Flow,
                                                     Mom/Rev)​


Above Upper Bound​    Price is stretched beyond      “Too far high” zone​
                      the upper boundary.​           ​
                      ​                              Pullback more likely to

        ▼             High deviation away from the
                      mean.
                                                     occur​
                                                     ​
                                                     (“”)




Approaching Lower     Price is approaching or at     Watch for support or
Bound ​               the lower boundary of the      stretch below.​
​                     average trading range.​        ​


                                  - Page 5 -​
or​                                                   Rebound more likely to
​                                                     occur​
Touching Lower​                                       ​
Bound​                                                Prepare to short if
                                                      addl.indicator
                                                      confluence signals​


         •                                            strong momentum for
                                                      continuation of stretch
                                                      downward.​
                                                      (Signals, Ebb+Flow,
                                                      Mom/Rev)


Below Lower Bound​     Price is stretched below the   “Too far low” zone​
                       lower boundary.​               ​
                       ​                              Rebound more likely to

         ▲             High deviation away from the
                       mean.
                                                      occur​

                                                      (“”)




 I.​   Cheat Sheet


  ●​ Price within average range​
       → use other indicators for direction bias.​


  ●​ Touching upper or lower boundary ​
       → reversion back into average range or continuation?​


  ●​ Outside of upper or lower boundary​
       → extreme stretch from the mean.​




                                   - Page 6 -​
E.    General Strategy + Examples


This indicator is designed to guide trading decisions by serving as the
mean-reversion engine that identifies the current “normal” price range.​


 I.​    Multi-Timeframe Confluence



     i. Sandwich Analogy


        Think of each time frame as a specific condiment that combine as layers
        of confirmation​
        ​
        1. Big Picture (HTF) → [Monthly, Weekly, Daily] → These show the “big
        range” — where price might range and bounce between.


        2. Medium Layer → [4H, 2H, 1H] This confirms the stretch is real.


        3. Zoomed-in (LTF) → [1H, 30m, 15m] → This gives the actionable time
        frame for when price touches or extends beyond a boundary.


     ●​ Why do this? Lower time frames can seem to be touching a boundary, but
        how does it stand up when compared to your HTFs?​
        ​     ex: ​
        ​     ​       HTF: price near or outside price band? → “main zone”​
        ​     ​       MID TFs: Does it match HTF? → confirmation layer​
        ​     ​       LTF: wait for arrow to touch/stretch as a “trigger”
                      ​
              If 4H/1D lower band is touched, and 15m/1H has room for upside? ​
              ​       ​     Look for Long opportunities.




                                      - Page 7 -​
II.​     Mean Reversion Fade
​
Fade extremes when price deviates away from the average range, assuming
confluence with other indicators for mean revision.​
​
This is the indicator’s core use case, where bands create “overextended”
zones.


    i. Entry


    ●​ Price touches/exits band → Enter on rejection/reversion back into the
         average range
            ○​ This indicator alone is not sufficient for entries itself.
               confluence with other indicators are required to increase success
               rate




                                     - Page 8 -​
ii. Exit


●​ Take profit on short at the opposite end of the band
      ○​ This indicator is great at identifying exit targets




                               - Page 9 -​
F.    Applications and Limitations


This section covers practical ways to apply this indicator across different
trading styles and timeframes, with a focus on multi-timeframe confluence. Use
these guidelines to integrate the indicator into your overall trading system
as you see fit.


    I.​   Trading Style & Timeframes



Time Frame         Trading Setup                      Use Case

Weekly                      Position Trading          Macro fades​
                                                      Month long holds

Daily                         Swing Trading           HTF reversions​
                                                      3-7 day holds

4H                            Swing Trading           HTF reversions​
                                                      3-7 day holds

1H                             Day Trading            LTF reversions
                                                      entries/exits​
                                                      intraday holds

15m                                Scalping           LTF reversions​


5m                                 Scalping           LTF reversions
​
​


​
​
​
​
​
​
​
​
​
​



                                       - Page 10 -​
II.​   Limitations


While robust, the indicator has inherent mean-reversion pitfalls. Understand
these to mitigate misinterpretation, over-reliance, and losses.​


Limitation        Description                          Interpretation

Lagging            Confirmation after a move starts    Use LTF for timing​
Nature                                                 ​
                                                       Mitigation: Confluence
                                                       between LTF & HTF
                                                       theses.

Volume               The more volume, the higher the   Avoid using against
Dependency                       accuracy​             illiquid assets
                                     ​
                     The lower the volume, the lower
                               the accuracy

False                 News gaps jump bands without     Give less
Extremes in                    reversions              decision-weight on event
Gaps                                                   days

Capped Length        Can be ineffective on very long   Tradingview only allows
                              TFs such as 1M           for a certain amount of
                                                       references and lengths.
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
          This indicator is a “stretch detector”. Not a signal generator.​
                                         ​
    Win by waiting for the reversion snap, confirming with layers and other
       indicators such as Signals, Ebb + Flow, and/or Momentum/Reversion




                                    - Page 11 -​


// --- EBB+FLOW PDF ---


ONBOARDING DOCUMENTATION v1.0

This document is designed to help new users set up and understand the ​
EBB + FLOW indicator. The guide will walk you through its features,
interpretation, and best practices.

​



                                 - Page 1 -​
    A.​Overview


Ebb and Flow is an idiom that illustrates a type of motion marked by a
repetitive pattern of coming and going or rising and falling. Think of market
action like money flowing in and flowing out in a similar wave-like fashion.​
​
Ebb + Flow measures that flow using price position and volume to show if
buyers (accumulation) or sellers (distribution) are in control.​


It answers (2) key questions:


                    1.​Is money flowing into or out of
                       the asset?



                    2.​Are buyers or sellers currently
                       in control based on volume
                       pressure?


It’s great for (3) things:


                    1.​Gauging the strength of
                       buying/selling within a trend or
                       range



                    2.​Identifying divergences



                    3.​Confirming breakouts or reversals
                       with volume-backed information
​


⚠️ This indicator is versatile in its calculation where it can be applied to
any market (e.g. stocks, forex, crypto, or any market with sufficient volume
data.




                                  - Page 2 -​
B.    Installation Instructions


     1.​Open this link: Ebb + Flow


     2.​Click “Use on Chart”​




                                                   ​


     3.​Done! ✓
​




                                     - Page 3 -​
C.   Key Components



        Component           Description        Visual Cue

Ebb & Flow Line       Flow direction           White Line


SMA Line              Simple moving average    Gray Line

Equilibrium Line      Fixed zero line that




                                               •
                      serves as the balance
                      point​
                      ​
                      Above = positive flow​
                      Below = negative flow
                                                            ​



                                               Yellow Line

Cyan Fill             Area when flow is > 0




                                               •
                                               Cyan Fill
                                                            ​




Pink Fill             Area when flow is < 0




                                               •​
                                               Pink Fill




                             - Page 4 -​
D.    Interpretation
​
Ebb + Flow shows trend pressure like a tide: ​
​
​         1) Cyan → Bullish pressure (↑)​
​         2) Pink → Bearish pressure (↓)​
​
3 second read:​
​         1) Line →   Above/below equilibrium line?​
​         2) Fill →   Bullish/Bearish fill?​
​         3) Trend → Price Confirmation or Price Divergence?​


    I.​   Where Is The Line Relative to
          Zero?




Position                       Interpretation             Playbook

Above Zero (Cyan Fill)         Positive Flow​             Bullish Bias​
                               ​                          ​
                               Buyers control volume      Look for continuation
                               pressure                   entries

Below Zero (Pink Fill)         Negative Flow​             Bearish Bias​
                               ​                          ​
                               Sellers control volume     Look for breakdown short
                               pressure                   entries

Crossing Zero (↑)              Shift To Buying​           Potential Bullish
                               ​                          Reversal​
                               Buyers starting to take    ​
                               control of flow            Watch for bullish
                                                          confirmation

Crossing Zero (↓)              Shift to Selling​          Potential Bearish
                               ​                          Reversal​
                               Sellers starting to take   ​
                               control of flow            Watch for bearish
                                                          confirmation




                                       - Page 5 -​
II.​   Is There Confirmation or
       Divergence?



EF Trend            Price Action        Interpretation      Playbook
Direction

EF Rising (↑)​      Price either in     Strengthening       Bullish Bias​
​                   consolidation       flow​               ​
Above SMA           and/or forming      ​                   Look for
                    higher lows​        Momentum Building   continuation
                    (↑)                                     entries

EF Falling (↓)​     Price finding       Weakening flow​     Bearish Bias​
​                   resistance or       ​                   ​
Below SMA           showing             Momentum Fading     Exit or reverse
                    exhaustion and/or                       positions
                    forming lower
                    highs​
                    (↓)

EF Rising Above     Price bouncing on   Building positive   Bullish signal​
Zero (↑)            support​            flow​               ​
                    ​                   ​                   Consider longs if
                    Price forming       Increasing Buy      supported by
                    higher lows ​       Pressure​           volume
                    ​                   ​
                    Price breaking      Bulls taking
                    resistances​        control of volume
                    (↑)

EF Falling Below​   Price rejecting     Building negative   Bearish signal​
Zero (↓)            against             flow​               ​
                    resistance ​        ​                   Consider shorts
                    ​                   Increasing Sell​    if supported by
                    Price forming       Pressure​           volume
                    lower highs​        ​
                    ​                   Bears taking
                    Price breaking      control of volume
                    support​
                    (↓)

EF making higher    Price making        Bullish             Bullish bias​
lows (↑)​           lower lows (↓)      Divergence Above    Momentum Flip​
​                                       Equilibrium​        ​
[ABOVE ZERO]                            ​                   Prepare for
                                        Hidden strength     upside
                                        despite price       continuation and


                                   - Page 6 -​
                                      weakness​            exit any shorts.
                                      ​
                                      Bears are trying
                                      to take control
                                      but Bulls
                                      maintain control
                                      of volume
                                      pressure

EF making higher   Price making       Bullish              Bearish Bias​
lows (↑)​          lower lows (↓)     Divergence Below     Momentum Flip​
​                                     Equilibrium​         ​
[BELOW ZERO]                          ​                    Prepare for a
                                      Hidden strength​     bullish reversal
                                      despite price        but maintain
                                      weakness​            caution as sell
                                      ​                    pressure is
                                      Bulls are buying     dominant.
                                      the weakness​
                                      ​
                                      Bears are losing
                                      steam but
                                      maintain control
                                      of volume
                                      pressure

EF making lower    Price making ​     Bearish              Bullish Bias​
highs (↓)​         Higher highs (↑)   Divergence Above     Momentum Flip​
​                                     Equilibrium​         ​
[ABOVE ZERO]                          ​                    Prepare for a
                                      Hidden weakness​     bearish reversal
                                      despite price        but maintain
                                      strength​            caution as buy
                                      ​                    pressure is
                                      Bears are selling    dominant.​
                                      into the strength​
                                      ​
                                      Bulls are losing
                                      steam but
                                      maintain control
                                      of volume
                                      pressure

EF making lower    Price making ​     Bearish              Bearish Bias​
highs (↓)​         Higher highs (↑)   Divergence Below     Momentum Flip​
​                                     Equilibrium​         ​
[BELOW ZERO]                          ​                    Prepare for



                                - Page 7 -​
                                        Hidden weakness    downside
                                        despite price      continuation and
                                        strength​          exit any longs.
                                        ​
                                        Bears selling
                                        into the strength​
                                        ​
                                        Bulls are trying
                                        to take control
                                        but Bears
                                        maintain control
                                        of volume
                                        pressure.



III.​   Cheat Sheet



EF               Price Action   EF:Zero Line    General          General
                                                Interpretation   Action Bias

        (↑)​          (↑)           Above       Dominant Buy     Look for
                                                Pressure​        Longs
                                                ​
                                                Trend
                                                Confirmation

        (↓)           (↓)           Above       Dominant Buy     Look for
                                                Pressure​        Shorts​
                                                ​                ​
                                                Trend            Caution that
                                                Confirmation     Bullish
                                                                 pressure is
                                                                 dominant

        (↑)           (↑)       Crossing (↑)    Bulls taking     Bullish
                                                control of       Signal​
                                                volume           ​
                                                pressure         Look for
                                                                 Longs​
                                                                 ​
                                                                 Caution of
                                                                 fakeouts

        (↓)           (↓)       Crossing (↓)    Bears taking     Bearish
                                                control of       Signal​
                                                volume           ​



                                  - Page 8 -​
                          pressure        Look for
                                          Shorts​
                                          ​
                                          Caution of
                                          fakeouts

(↑)   (↓)     Above       Dominant Buy    Momentum
                          Pressure​       Flip​
                          ​               ​
                          Trend           Look for
                          Exhaustion​     Longs


(↑)   (↓)     Below       Dominant Sell   Momentum
                          Pressure​       Flip​
                          ​               ​
                          Trend           Look for
                          Exhaustion      Longs​
                                          ​
                                          Caution
                                          Bears
                                          Dominate
                                          Volume
                                          Pressure​
                                          ​
                                          Exit Shorts

(↓)   (↑)     Above       Dominant Buy    Momentum
                          Pressure​       Flip​
                          ​               ​
                          Trend           Look For
                          Exhaustion      Shorts​
                                          ​
                                          Caution
                                          Bulls
                                          Dominate
                                          Volume
                                          Pressure​
                                          ​
                                          Exit Longs

(↓)   (↑)     Below       Dominant Sell   Momentum
                          Pressure​       Flip​
                          ​               ​
                          Trend           Look for
                          Exhaustion      Shorts




            - Page 9 -​
E.    General Strategy + Examples


Ebb + Flow shows how bullish and bearish tides flow in and out, gauging volume
pressure for accumulation (ebb in) or distribution (flow out). It shines in
spotting shifts in buyer/seller control.​


 I.​    Multi-Timeframe Confluence



     i. Ocean Analogy


        Continuing the theme, think of each time frame as water movement within
        the ocean. Instead of looking at one timeframe (like 15m), you reference
        bigger and smaller ones to see if they all agree on flow direction.​
        ​
        Think of it as layers of confirmation:​
        ​
        1. The Tides (HTF) ​
        → [Monthly, Weekly, Daily] ​
        → These show the “larger tides” – the main bias


        2. The Currents (MTF)​
        → [4H, 2H, 1H] ​
        → Do the “currents” confirm the “larger tides” – confirmation layer


        3. The Ripples (LTF) ​
        → [1H, 30m, 15m, 5m]
        → The quick “surface waves” that give the exact “go” signal to surf or
        duck (entry/exit).


     ●​ Why do this? Lower time frames alone don’t provide enough confirmation,
        while longer timeframes hold more weight.​
        ​     ex: ​
        ​     ​       HTF: big slow waves moving upward above 0 → “main direction”​
        ​     ​       MID TFs: Does it match HTF? yes → confirmation layer​
        ​     ​       LTF: ripples are about to flip positive → “trigger”




                                     - Page 10 -​
The tides and currents say UP, but we wait for the right wave to show to enter.
Once LTF flips positive, we will be ready to ride that long momentum wave.


II.​   Trend Confluence Strategy
​
Trade with the dominant flow direction, using EF as the pressure gauge.
Positive flows often lead price (60-75%) correlation in asset prices.


    i.1D - The Tides




                                   - Page 11 -​
i.4H - The Currents




                      - Page 12 -​
- Page 13 -​
i.15m - The Ripples




                      - Page 14 -​
III.​   Divergence   Strategy (Advanced)
​
Spotting conflicting direction between price and EF for reversal strategies.
Divergences are one of its most powerful features for spotting the hidden
tides and shifts within market movements—— almost like a lie detector. Price
might scream uptrend, but if EF is slowly flowing out, the trend could be on
borrowed time.


    i.1D - The Tides




                                   - Page 15 -​
F.    Applications and Limitations


This section covers practical ways to apply this indicator across different
trading styles and timeframes, with a focus on multi-timeframe confluence. Use
these guidelines to integrate the indicator into your overall trading system
as you see fit.


    I.​   Trading Style & Timeframes



Time Frame         Trading Setup                      Use Case

Weekly                      Position Trading          Macro fades​
                                                      Month long holds

Daily                         Swing Trading           HTF reversions​
                                                      3-7 day holds

4H                            Swing Trading           HTF reversions​
                                                      3-7 day holds

1H                             Day Trading            LTF reversions
                                                      entries/exits​
                                                      intraday holds

15m                                Scalping           LTF reversions​


5m                                 Scalping           LTF reversions
​
​


​
​
​
​
​
​
​
​
​
​



                                       - Page 16 -​
II.​   Limitations


While robust, the indicator has inherent volume pitfalls. Understand these to
mitigate misinterpretation, over-reliance, and losses.​


Limitation      Description                                Interpretation

Volume               The more volume, the higher the       Avoid using against
Dependency                       accuracy​                 illiquid assets
                                     ​
                     The lower the volume, the lower
                               the accuracy

False                 News gaps jump bands without         Give less
Extremes in                    reversions                  decision-weight on event
Gaps                                                       days

Capped Length        Can be ineffective on very long       Tradingview only allows
                              TFs such as 1M               for a certain amount of
                                                           references and lengths.

Divergence            Not all divergences reverse          Confirm with volume and
False                                                      confluence with other
Positives                                                  indicators to increase
                                                           strength
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
                                         ​
Price moves rhythmically in a wave-like fashion. Ebb + Flow helps identify the
                             strength in each movement.​
                                         ​
 Win by aligning with strong pressure shifts, confirming with layers and other
       indicators such as Signals, Ebb + Flow, and/or Momentum/Reversion




                                    - Page 17 -​


// --- MOMENTUM + REVERSION PDF ---


ONBOARDING DOCUMENTATION v1.0

This document is designed to help new users set up and understand the ​
Momentum + Reversion indicator. The guide will walk you through its
features, interpretation, and best practices.




                                 - Page 1 -​
   A.​Overview


The Momentum & Reversion indicator is a technical analysis that helps traders
both identify and emphasize price momentum and reversion environments. It
provides visual cues through colored fills, plotted lines, and dynamic labels
to assess whether the market is in a:


                    1.​Strong Bullish Trend



                    2.​Strong Bearish Trend



                    3.​Biased Directionally



                    4.​Showing Mixed Signals




⚠️ This indicator is versatile in its calculation where it can be applied to
any market (e.g. stocks, forex, crypto, or any market with volume data. It is
not a standalone trading system but a decision-support tool.




                                  - Page 2 -​
B.    Installation Instructions


     1.​Open this link: Momentum & Reversion Indicator


     2.​Click “Use on Chart”​




                                                         ​


     3.​Done! ✓
​




                                    - Page 3 -​
C.   Key Components



         Component          Description           Visual Cue

Fast                  Represents and reacts to
                      shorter-term trends​                ​
                      ​                                ​
                      Smooths recent price         Cyan Line
                      action

Slow                  Represents and reacts to
                      medium-term trends​                  ​
                      ​                                 ​
                      Captures broader trend     Dark Gray Line

Anchor                Acts as the the dynamic
                      support/resistance ​                ​
                      ​                                ​
                      Identifies conviction of    Purple Line
                      value trend

Price vs. Fill​       Background fill between          ​
(Momentum)            close and Anchor,                ​
                      showing immediate                ​
                      momentum bias​                   ​
                      ​
                      Bullish pressure: price             ​
                      is trading above the             ​
                      anchor with general          Cyan Fill
                      expectations of
                      continuation upward if
                      momentum lines hold
                      support against price

Price vs. Fill​       Background fill between          ​
(Reversion)           close and Anchor,                ​
                      showing immediate                ​
                      reversion bias​                  ​
                      ​                                ​
                      Bearish pressure: price
                      is trading below the                ​
                      anchor with general              ​
                      expectations of             Purple Fill
                      continuation downward if
                      momentum lines hold
                      resistance against price



                             - Page 4 -​
D.   Interpretation
​
The core value from utilizing this indicator comes from understanding how
price positions itself relative to each line and combined stack.​


Market Bias           Visual Stack        Interpretation      General Strategy

Strong Bull​          1.Price ​           Strong upward       Long-biased for
(+++)                 2.Anchor​           momentum​           position entries ​
                      3.Fast​             ​                   ​
                      4.Slow​             Price leading all   Confirmation in
                                          components​         holding long
                                          ​                   positions or
                      ​                   Confirmed           exiting short
                      [PRICE]​            momentum trend      positions​
                                                              ​
                           ​                                  Watch for
                                                              overextension
                                                              above and
                          ​                                   reversion back
                                                              into anchor
                                                              support​
                                                              ​
                                                              Confirmed
                                                              Momentum Trend​


Bullish Bias​         1.Slow​             Bullish bias        Long biased if
(+)                   2.Price​            short-term, but     volume supports​
                      3.Fast​             below medium-term   ​
                      4.Anchor​           trend​              Caution on
                                          ​                   pullbacks​
                                          Possible            ​
                      ​                   reversion upward    Momentum Start


                           ​
                      [PRICE]​


                          ​


                           ​


Mixed Bias​           Price > Anchor​     Conflicting         Neutral​
                      ​                   signals​            ​
                      But < Fast + Slow   ​                   Wait for clarity

                                     - Page 5 -​
                                    Short-term           or​
                                    weakness despite​    ​
                                    ​                    Range Trading
                                    Anchor Support

Mixed Bias      Price < Anchor​     Conflicting          Neutral​
                ​                   signals​             ​
                But > Fast + Slow   ​                    Potential
                                    Momentum positive​   reversion to
                                    ​                    Anchor​
                                    Anchor Resistance    ​
                                                         Potential​
                                                         Resistance
                                                         against Anchor​
                                                         ​
                                                         Range Trading

Bearish Bias​   1. Anchor           Bearish bias         Consider shorts​
(-)             2. Fast             short-term, but      ​
                3. Price            above medium-term    Monitor for
                4. Slow​            trend​               resistance and
                ​                   ​                    continuation
                                    Possible             downward​
                     ​              reversion            ​
                                    downward             Reversion start

                     ​
                [PRICE]​




Strong Bear​    1. Slow​            Strong downward      Short-biased for
(---)           2. Fast​            reversion​           position entries
                3. Anchor​          ​
                4. Price​           Price lagging all    Confirmation in
                ​                   components ​         holding short
                                    ​                    positions or
                     ​              Confirmed            exiting long
                                    reversion trend      positions​
                                                         ​
                    ​                                    Confirmation in
                                                         holding short
                     ​                                   positions​
                [PRICE]​                                 ​
                                                         Confirmed
                                                         Reversion Trend




                             - Page 6 -​
    I.​   Cheat Sheet



     i. Momentum Bias



     ●​ Cyan Fill (     ) + Price above lines = Look for continuation trades.
     ●​ Long entries above/on Anchor line.


     ii. Reversion Bias



     ●​ Purple Fill (     ) + Price below lines = Look for pullbacks or reversal
     ●​ Short entries below/against Anchor line.


     iii. Momentum Start

     ●​ Price is finding support on the Anchor line (     ) and is starting to
          curl upward/crossing above Fast + Slow lines.
     ●​ Long entries near or on Anchor line.


     iv. Reversion Start



     ●​ Price is finding resistance against the Anchor line (     ) and is
          starting to curl downward/crossing below Fast + Slow lines.




E.    General Strategy + Examples


This indicator is designed to guide trading decisions by classifying market
conditions into two environments: ​
​
​         1. Bullish Momentum ​
​         2. Bearish Reversion​
​
The general strategy revolves around aligning trades with the prevailing bias
while managing risk through confirmations such as:​
​


                                      - Page 7 -​
​         1. Volume​
​         2. Price reaction against line stack


    I.​   Momentum Continuation




     i. Description


          Capitalize on strong trends by entering when momentum has been
          confirmed, aiming for continuation until signs of weakness or
          invalidation.​


     ii. Entry


     ●​ As price trends upward, momentum has been confirmed by the indicator’s
          Cyan fill.
     ●​ Price continuously finds support on Anchor / Fast / Slow lines

                                      - Page 8 -​
●​ Long entries are most optimal near Anchor support


                                     Price

                                  Anchor Line

                                   Fast Line

                                   Slow Line




ii. Invalidation/Exit


●​ As price loses steam in its trend upward, invalidation occurs when price
   fails to find support on the Anchor line and succeedingly finds
   resistance against it.
●​ Continuous resistance against either the Anchor line, Fast Line, or Slow
   Line serves as invalidation.
●​ Visual Stack:​


                                  Anchor Line

                                  - Page 9 -​
                               Price

                             Fast Line

                             Slow Line




II.​   Reversion Pullback




                            - Page 10 -​
i. Description


   Reversion environments are identified when price trades underneath the
   Anchor line. Continuous resistance against the Anchor line confirms that
   price is either starting a pullback or continuing a downtrend.​


ii. Entry


●​ As price continuously finds resistance against the Anchor line, the
   potentiality for a reversion pullback increases.
●​ Price continuously finds resistance, on Anchor and respective lines are
   starting to curl down.
●​ Once the Anchor line crosses below the Fast and Slow line.




●​ Visual Stack:

                                Slow Line

                              - Page 11 -​
                                Fast Line

                               Anchor Line

                                  Price




ii. Invalidation/Exit


●​ As price approaches the Anchor line from underneath with higher lows and
   price reclaims support on the Anchor line.
●​ Succeedingly, Price finds support on the Fast line.​
   ​


●​ Visual Stack:​


                                Slow Line


                              - Page 12 -​
                                     Fast Line

                                       Price

                                       Price




F.   Applications and Limitations


This section covers practical ways to apply this indicator across different
trading styles and timeframes, with a focus on multi-timeframe confluence. Use

                                    - Page 13 -​
these guidelines to integrate the indicator into your overall trading system
as you see fit.


    I.​   Multi-Timeframe Confluence



Time Frame          Time Outlook                         Use Case

Weekly               Primary trend over the course of    Swing Trend ID
                                1-2 months

Daily               Trend over the course of 1-4 weeks   Swing Trend ID

4H                  Trend over the course of 1-2 weeks   Swing Trend ID

1H                   Trend over the course of 1-5 days   Position Entry/Exit

15m                  Trend over the course of 1-2 days   Position Entry/Exit

5m                      Trend over the course of 1 day   Position Entry/Exit
​
Example:​
​         1W: Strong Momentum -> Look for long-biased entries​
​         1D: Strong Momentum -> Look for long-biased entries​
​         4H: Mixed Signals -> Wait for confirmation​
​         1H: Strong Reversion -> Wait for price to sweep Anchor line​
​         15m: Weakening Reversion -> Enter on Anchor Line sweep/bounce​


​
​
​
​
​
​
​
​
​
​


II.​      Limitations


While powerful, the indicator has constraints. Understanding them prevents
over-reliance and false confidence.​


                                       - Page 14 -​
Limitation       Description                           Interpretation

Lagging                   All components are           Use to identify the
Nature                     backward-looking​           environment, ​
                                   ​                   ​
                    Strong signals often serve as      You must combine with
                     confirmation of environment       other indicators to use

Volume             The more volume, the higher the     Low volume environments
Dependency                     accuracy​               provide false signals,
                                   ​                   noise, and extrapolated
                   The lower the volume, the lower     scenarios
                             the accuracy

False              Price briefly crosses Anchor but    A sweep can be rejected​
Breakouts                      reverses                ​
                                                       Requires close
                                                       above/below + volume
                                                       confirmation

Indicator           The indicator by itself is not     Utilizing Average Range,
Confluence                    sufficient​              Ebb+Flow, and S/R are
                                   ​                   required to plan
                  Requires confluence with the whole   entry/exits with higher
                  system for higher accuracy/success   success
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
                                        ​
             This indicator is a bias engine, not a signal generator.​
                                        ​
                 Trade the structure. Let the indicator confirm.



                                   - Page 15 -​


// --- SIGNALS PDF ---


ONBOARDING DOCUMENTATION v1.0

This document is designed to help new users set up and understand the ​
Signals indicator. The guide will walk you through its features,
interpretation, and best practices.

​



                                 - Page 1 -​
    A.​Overview


Think of market trends and price movement like a car engine where the parts of
the engine are price, momentum, and volume. If they aren’t in sync, the engine
can stall. ​
​
Signals spots those “mismatches” using momentum and volume data to flag
potential reversals or weaknesses.​


It answers (2) key questions:


                    1.​Is there a divergence signaling a
                       potential reversal?



                    2.​Is it confirmed by momentum
                       and/or volume exhaustion?


It’s great for (3) things:


                    1.​Detecting hidden bullish/bearish
                       shifts in trends



                    2.​Confirming reversals with
                       multi-indicator alignment



                    3.​Filtering weak trends before they
                       break
​


⚠️ This indicator is versatile in its calculation where it can be applied to
any market (e.g. stocks, forex, crypto, or any market with sufficient volume
data and price data. Not a standalone trading system but a decision-support
tool.




                                  - Page 2 -​
B.    Installation Instructions


     1.​Open this link: Signals


     2.​Click “Use on Chart”​




                                                ​


     3.​Done! ✓
​




                                  - Page 3 -​
C.   Key Components



        Component           Description            Visual Cue

Strong Bull​          Divergence in both
(“++”)                momentum and volume​
                      ​
                                                      ◆​
                      High-conviction reversal    Green Diamond​
                      up
                                                     Filled


Strong Bear​          Divergence in both
(“--”)                momentum and volume​
                      ​
                                                      ◆​
                                                  Red Diamond​
                      High conviction reversal​
                                                    Filled
                      down

Momentum Bull​
(“+”)
                      Divergence in momentum
                      only​                           ◇​
                      ​                           Green Diamond​
                      Moderate conviction            Hollow
                      reversal up

Momentum Bear​
(“-”)
                      Divergence in momentum
                      only​                           ◇​
                      ​                           Red Diamond​
                      Moderate conviction​          Hollow
                      reversal down




                             - Page 4 -​
D.    Interpretation
​
Signals spots divergence between price and momentum/volume. Price action may
say one thing, but momentum/volume say another similarly to Ebb + Flow.​


    I.​   Where Is The Line Relative to
          Zero?



Label                         Interpretation             Playbook

Strong Bull​                  Strong Conviction​         Enter long if volume
                              ​                          follows through to the
◆                             Bullish reversal where
                              price is forming support
                                                         upside


Strong Bear​                  Strong Conviction​         Enter short if volume
                              ​                          follows through to the
◆                             Bearish reversal where
                              price is rejecting
                                                         downside

                              resistance

Momentum Bull​                Moderate Conviction​       Watch for confirmation ​

◇                             ​
                              Bullish reversal
                                                         If multiple signals
                                                         flash, enter long at
                                                         support

Momentum Bear​                Moderate Conviction​       Watch for confirmation​

◇                             ​
                              Bearish reversal
                                                         ​
                                                         If multiple signals
                                                         flash, enter short at
                                                         resistance




E.    General Strategy + Examples


Signals is a divergence engine, using both momentum and volume to detect
hidden trend weaknesses for reversals or continuations. It is exceptionally
strong at flagging when momentum and/or volume are not analogous with price
action.


    I.​   Multi-Timeframe Confluence




                                       - Page 5 -​
   i. Court Analogy


     Similarly aforementioned in other documents, the idea of multi-time
     frame confluence means using the Signals indicator with reference to
     multiple chart timeframes at the same time to make stronger, more
     confident decisions. ​
     ​
     This time we are going to use a court analogy where supporting evidence
     helps build a defense case. Reference bigger and smaller timeframes to
     see if they all “agree” to build a strong, supporting case.​
     ​
     Think of it as layers of evidence for confirmation:​
     ​
     1. The Big Case (HTF) ​
     → [Weekly, Daily]​
     → These show the “major proofs” – higher confidence timeframes


     2. The First Person Witness (MTF)​
     → [4H, 2H, 1H] ​
     → These represent “first-person accounts” in the big case’s strength.


     3. The Clues (LTF) ​
     → [1H, 30m, 15m, 5m]
     → The fine details that give the exact “verdict” signal.


  ●​ Why do this? Lower time frames alone don’t provide enough confirmation,
     while longer timeframes hold more weight.​
     ​     ex: ​
     ​     ​       HTF: no signal​
     ​     ​       MID TFs: 1 hollow bearish signal​
     ​     ​       LTF 1H: 1 hollow bearish signals, 2 filled bearish signals​
     ​     ​       LTF 15m: 3 filled bearish signals


While HTF did not confirm the move, there was a momentum divergence on the 4H,​
2 hollow/filled bearish signals on the 1H, 3 filled bears signals on the 15min.​
    We have sufficient information that a reversal downward is in the mix.




                                     - Page 6 -​
II.​   Trend Reversal
​
While multi-timeframe confluence is important, multi-indicator confluence is
just as important. Below is a clear example in


    i.1D - The Big Case
​
​      *for sake of the example, assume that red diamond has not printed.​
​      This is for reference to multi-indicator confluence




                                   - Page 7 -​
    i.4H - The Witness


​     Base Case given that 1D did not have any signals​
​     1H served as confirmation layer




                                                          ​




                                  - Page 8 -​
- Page 9 -​
    i.15m - The Ripples
​
​     4H and 1H confirm bias, we use the 15m to enter off of 2-3 ​
​     confirmations with confluence of other indicators in the system.




                                  - Page 10 -​
F.   Applications and Limitations



 I.​   Limitations


While robust, the indicator has inherent volume pitfalls. Understand these to
mitigate misinterpretation, over-reliance, and losses.​


Limitation      Description                            Interpretation

False Signals    Strong trends ignore divergences      If price is trending up
In Trends                                              or down with momentum,
                                                       fading hollow diamonds
                                                       with other indicator
                                                       confluence is very
                                                       important

Lagging              Signals upon that divergence is   May flash in/out based
Detection                  currently unfolding         on whether price
                                                       confirms divergence move

Volume               The more volume, the higher the   Avoid using against
Dependency                       accuracy​             illiquid assets
                                     ​
                     The lower the volume, the lower
                               the accuracy

False                 News gaps jump bands without     Give less
Extremes in                    reversions              decision-weight on event
Gaps                                                   days

Capped Length        Can be ineffective on very long   Tradingview only allows
                              TFs such as 1M           for a certain amount of
                                                       references and lengths.

Divergence            Not all divergences reverse      Confirm with volume and
False                                                  confluence with other
Positives                                              indicators to increase
                                                       strength
                                         ​
 Signals is your divergence detector. Signalling you to pay careful attention.​
                                         ​



                                    - Page 11 -​
Win by waiting and reacting swiftly to confirmed, filled divergence, and with
              confluence to ALL indicators within the system.




                                - Page 12 -​
