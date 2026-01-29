/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Binary, 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Loader2, 
  Monitor, 
  RefreshCw, 
  LayoutGrid, 
  Waves, 
  Target, 
  Activity, 
  Info, 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles, 
  CornerDownLeft, 
  Circle, 
  Triangle, 
  TrendingUp, 
  HelpCircle, 
  ArrowRight, 
  ShieldAlert,
  FileText,
  Search,
  BookOpen,
  LineChart
} from 'lucide-react';
import { cn } from './lib/utils.js';
import AnimatedBackground from './components/AnimatedBackground.js';
import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE } from './lib/knowledgeBase.js';

interface BranchStep {
  id: string;
  label: string;
  title: string;
  content: React.ReactNode;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const COLORS = {
  MAGENTA: '#C71585',
  CYAN: '#20B2AA',
  WHITE: '#FFFFFF',
  AMBER: '#fbbf24'
};

// --- SHARED UI COMPONENTS ---
const PerspectiveViewport: React.FC<{ children: React.ReactNode, title: string, subtitle?: string, className?: string }> = ({ children, title, subtitle = "UPLINK_SPEC_SYNC", className }) => (
  <div className={cn("w-full flex flex-col bg-zinc-950 border border-white/10 rounded-sm overflow-hidden shadow-2xl relative", className)}>
    <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02] relative z-20">
      <div className="flex items-center gap-3">
        <Monitor size={12} className="text-primary" />
        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">SPEC: {title}</span>
      </div>
      <span className="text-[7px] font-mono text-white/20">{subtitle}</span>
    </div>
    <div className="flex-1 relative flex items-center justify-center p-4 bg-[#050507] overflow-hidden">
       <div className="relative z-10 w-full flex items-center justify-center h-full">
        {children}
       </div>
       {/* UI Grid Decoration */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
    </div>
  </div>
);

const InstructionCard = ({ icon: Icon, title, desc, tone = 'neutral' }: { icon: any, title: string, desc: string | React.ReactNode, tone?: 'bull' | 'bear' | 'neutral' | 'caution' }) => (
  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm hover:border-white/20 transition-all">
    <div className="flex gap-4 items-start">
        <Icon size={16} className={cn("shrink-0 mt-1", tone === 'bull' ? "text-emerald-400" : tone === 'bear' ? "text-rose-400" : "text-primary")} />
        <div className="space-y-1">
          <span className="text-[9px] font-black text-white uppercase tracking-widest">{title}</span>
          <div className="text-[10px] text-white/40 uppercase font-bold leading-relaxed tracking-tight">
            {desc}
          </div>
        </div>
    </div>
  </div>
);

// --- FUNNEL HELPERS ---
const ChecklistItem = ({ label, tone = 'neutral', checked = false, subItems = [] }: { label: string, tone?: 'bull' | 'bear' | 'neutral' | 'caution', checked?: boolean, subItems?: string[] }) => (
  <div className="space-y-2">
    <div className="flex items-start gap-3 group">
      <div className={cn(
        "w-4 h-4 border flex items-center justify-center rounded-sm shrink-0 transition-all mt-0.5",
        checked ? (tone === 'bull' ? "bg-emerald-500 border-emerald-400" : tone === 'bear' ? "bg-rose-500 border-rose-400" : tone === 'caution' ? "bg-amber-500 border-amber-400" : "bg-white border-white") : "border-white/20 bg-white/5"
      )}>
        <div className={cn("w-2 h-2 rounded-[1px] transition-all", checked ? (tone === 'neutral' ? "bg-black" : "bg-white") : "bg-transparent")} />
      </div>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-tight transition-colors leading-tight",
        tone === 'bull' ? "text-emerald-400/70 group-hover:text-emerald-400" :
        tone === 'bear' ? "text-rose-400/70 group-hover:text-rose-400" :
        tone === 'caution' ? "text-amber-400/70 group-hover:text-amber-400" :
        "text-white/30 group-hover:text-white/60"
      )}>{label}</span>
    </div>
    {subItems.length > 0 && (
      <div className="pl-7 space-y-1.5 border-l border-white/5 ml-2">
        {subItems.map((sub, i) => (
          <div key={i} className="flex items-center gap-3">
             <div className="w-1 h-1 rounded-full bg-white/10 shrink-0" />
             <span className="text-[9px] text-white/20 uppercase font-medium">{sub}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const LogicPanel: React.FC<{ index: string, title: string, purpose: string, children?: React.ReactNode, warning?: string }> = ({ index, title, purpose, children, warning }) => (
  <div className="bg-white/[0.01] border border-white/5 p-6 rounded-sm space-y-6 shadow-2xl group flex flex-col h-full">
    <div className="flex justify-between items-start border-b border-white/5 pb-4">
      <div className="flex flex-col gap-1">
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1">{index}. {title}</span>
        <p className="text-[10px] text-white/40 italic leading-relaxed uppercase font-inter">
          <span className="text-white/20 font-black not-italic mr-2">∫ PURPOSE:</span> {purpose}
        </p>
      </div>
    </div>
    <div className="flex-1 space-y-5">
      {children}
    </div>
    {warning && (
      <div className="pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-start gap-3 opacity-60">
          <AlertTriangle size={10} className="text-amber-500 mt-0.5" />
          <p className="text-[8px] text-amber-500 font-black uppercase tracking-widest leading-relaxed whitespace-pre-line">{warning}</p>
        </div>
      </div>
    )}
  </div>
);

const FunnelTable = ({ headers, rows, title, subtitle }: { headers: string[], rows: string[][], title: string, subtitle: string }) => (
  <div className="space-y-4">
    <div className="flex flex-col gap-0.5">
       <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">{title}</h4>
       <p className="text-[8px] text-white/30 italic uppercase font-inter tracking-widest"><span className="text-primary font-black not-italic mr-2">∫ FOCUS:</span> {subtitle}</p>
    </div>
    <div className="w-full border border-white/10 rounded-sm overflow-hidden bg-black/40">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
              {row.map((cell, j) => (
                <td key={j} className={cn("px-5 py-4 text-[10px] font-inter leading-relaxed transition-colors", j === 0 ? "text-white/80 font-bold tracking-tight" : "text-white/40 group-hover:text-white/60")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- INDICATOR HELPERS ---
const AverageRangeSimulator = ({ biasId }: { biasId: string }) => {
  const points = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => {
      const t = i / 119;
      // Drift to make boundaries curved/wavy like the toolkit
      const drift = Math.sin(t * Math.PI * 2) * 6;
      const upperY = 30 + drift; 
      const lowerY = 70 + drift;
      
      let priceY = 50 + drift;
      const zigZag = Math.sin(t * 45) * 1.5;

      if (biasId === 'ABOVE') {
        const startY = 60;
        const targetY = 22 + drift; 
        priceY = startY + (targetY - startY) * t + zigZag;
      } else if (biasId === 'BELOW') {
        const startY = 40;
        const targetY = 78 + drift; 
        priceY = startY + (targetY - startY) * t + zigZag;
      } else if (biasId === 'APP-UP') {
        const startY = 65;
        const targetY = 34 + drift; 
        priceY = startY + (targetY - startY) * t + zigZag;
      } else if (biasId === 'APP-LOW') {
        const startY = 35;
        const targetY = 66 + drift;
        priceY = startY + (targetY - startY) * t + zigZag;
      } else {
        priceY = (50 + drift) + Math.sin(t * 15) * 12 + zigZag;
      }

      return { x: t * 100, priceY, upperY, lowerY };
    });
  }, [biasId]);

  const pricePath = `M ${points.map(p => `${p.x},${p.priceY}`).join(' L ')}`;
  const upperPath = `M ${points.map(p => `${p.x},${p.upperY}`).join(' L ')}`;
  const lowerPath = `M ${points.map(p => `${p.x},${p.lowerY}`).join(' L ')}`;

  return (
    <div className="w-full h-full p-4 flex items-center justify-center relative bg-black/40">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible max-w-3xl">
        <defs>
          <linearGradient id="arFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.01" />
            <stop offset="50%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <motion.path 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          d={`${upperPath} L ${[...points].reverse().map(p => `${p.x},${p.lowerY}`).join(' L ')} Z`} 
          fill="url(#arFill)" 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          d={upperPath} 
          fill="none" 
          stroke={COLORS.MAGENTA} 
          strokeWidth="0.8" 
          strokeDasharray="2 3"
          className="opacity-40"
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          d={lowerPath} 
          fill="none" 
          stroke={COLORS.CYAN} 
          strokeWidth="0.8" 
          strokeDasharray="2 3"
          className="opacity-40"
        />
        <motion.path 
          key={biasId}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          d={pricePath} 
          fill="none" 
          stroke="white" 
          strokeWidth="0.5" 
          className="drop-shadow-[0_0_12px_white]"
        />
        <motion.circle 
          key={`head-${biasId}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          cx={100} 
          cy={points[points.length-1].priceY} 
          r="1" 
          fill="white" 
          className="drop-shadow-[0_0_8px_white]"
        />
      </svg>
    </div>
  );
};

const DepthGauge = ({ stack, title }: { stack: string[], title: string }) => {
  const labels: Record<string, string> = {
    price: 'PRICE',
    anchor: 'ANCHOR',
    fast: 'FAST',
    slow: 'SLOW',
    upper: 'UPPER',
    lower: 'LOWER',
    zero: 'ZERO_LINE',
    flow: 'EF_FLOW'
  };

  const colors: Record<string, string> = {
    price: 'bg-white text-black',
    anchor: 'bg-purple-600 text-white',
    fast: 'bg-sky-400 text-black',
    slow: 'bg-zinc-500 text-white',
    upper: 'bg-[#C71585] text-white',
    lower: 'bg-[#20B2AA] text-white',
    zero: 'bg-amber-400 text-black',
    flow: 'bg-white text-black'
  };

  return (
    <div className="w-full h-full p-8 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] block mb-1">Stack Alignment</span>
        <h5 className="text-xs font-bold text-white uppercase tracking-widest">{title}</h5>
      </div>
      <div className="flex flex-col items-center gap-3 w-40">
        {stack.map((item, i) => (
          <React.Fragment key={`${item}-${i}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "w-full py-3 px-4 rounded-sm border border-white/10 flex items-center justify-center shadow-xl text-center",
                colors[item] || "bg-white/5 text-white"
              )}
            >
              <span className="text-[10px] font-black tracking-widest leading-none">{labels[item] || item.toUpperCase()}</span>
            </motion.div>
            {i < stack.length - 1 && (
              <motion.div initial={{ height: 0 }} animate={{ height: 12 }} className="w-px bg-white/20" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const EmbeddedIntelDialogue = ({ activeModule, activeStepId, messages, setMessages }: { activeModule: string, activeStepId: string, messages: ChatMessage[], setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>> }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    const newHistory = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newHistory);
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the HUNTER MENTOR, a friendly and concise tactical guide for the "${activeModule}" module.
          Persona: Conversational, helpful, and brief. Talk like a experienced trader mentoring a peer. 
          STRICT CONSTRAINT: ONLY answer questions or discuss topics directly related to the "${activeModule}" indicator and its role in the Hunter toolkit.
          If asked about other modules or unrelated topics, politely guide them back to the "${activeModule}" context.
          Style: Keep responses brief (under 100 words). Use small bullet points for clarity. 
          Contextual Grounding: Focus on the technicals provided in the knowledge base for this specific area.
          KNOWLEDGE BASE: ${JSON.stringify(KNOWLEDGE_BASE)}`,
        },
      });
      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "PROTOCOL_ERROR: Link unstable." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM_FAILURE: Intelligence uplink dropped." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mt-20 pt-20 border-t border-white/10 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Bot size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-black text-white uppercase tracking-[0.3em]">HUNTER MENTOR</span>
            <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Module Context: {activeModule.toUpperCase()}</span>
          </div>
        </div>
        <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Logic Uplink Active</span>
        </div>
      </div>
      <div className="bg-white/[0.01] border border-white/5 rounded-sm p-8 min-h-[240px] flex flex-col gap-6 relative overflow-hidden shadow-2xl">
        <div ref={scrollRef} className="flex-1 space-y-6 max-h-[440px] overflow-y-auto scrollbar-hide">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-12 space-y-4">
              <Bot size={32} strokeWidth={1} />
              <div className="space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-[0.4em]">Mentor Standing By.</p>
                <p className="text-[9px] font-mono uppercase tracking-[0.2em]">Ask me about {activeModule} logic...</p>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={cn("flex gap-5", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-sm shrink-0 flex items-center justify-center border", msg.role === 'user' ? "bg-white/5 border-white/10 text-white/40" : "bg-primary/10 border-primary/40 text-primary")}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={cn(
                "max-w-[85%] p-5 rounded-sm font-inter text-sm leading-relaxed", 
                msg.role === 'user' ? "bg-white/[0.03] text-white/70" : "bg-primary/5 border-l-2 border-primary/40 text-white/90 shadow-lg"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4 items-center opacity-40">
              <Loader2 size={14} className="animate-spin text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Processing Intelligence...</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="relative mt-4">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${activeModule}...`}
            className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-5 px-8 text-sm font-inter focus:outline-none focus:border-primary/40 transition-all text-white placeholder:text-white/10"
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
            <CornerDownLeft size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default function IndicatorDetailPage({ indicatorId, onBack }: { indicatorId: string, onBack: () => void }) {
  const [activeStepId, setActiveStepId] = useState('overview');
  const [selectedBias, setSelectedBias] = useState<string>('');
  const [imgLoading, setImgLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const config = useMemo(() => {
    switch (indicatorId) {
      case 'timeframe-funnel':
        return {
          title: 'Timeframe Funnel',
          id: 'FUNNEL',
          coord: '0x05EE',
          isFunnel: true,
          summary: 'Establish multi-timeframe confluence across Horizon, Tactical, and Execution phases.'
        };
      case 'm&r':
        return {
          title: 'Momentum & Reversion',
          id: 'M&R',
          coord: '0x03CC',
          icon: <Activity />,
          url: 'https://www.tradingview.com/script/l1mrDJIF-Momentum-Reversion/',
          overviewImg: 'https://i.imgur.com/ky0RYEz.png',
          summary: 'The Momentum & Reversion indicator is a technical analysis layer designed to identify and emphasize market momentum and reversion environments.',
          objectives: ["Strong Bullish Trend Acceleration", "Confirmed Bearish Reversion State", "Directional Bias Identification", "High-Noise / Neutral Environment Filter"],
          biases: [
            { 
              id: '+++', 
              title: 'Strong Bull', 
              stack: ['price', 'anchor', 'fast', 'slow'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Market structure is aligned in an expansion state. Prices trade above all technical averages as buyers establish dominance.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Regime:</span> Price leads all averages + volume-weighted Anchor.</li>
                    <li className="flex gap-2">» <span className="text-white">Action:</span> Long opportunities are prioritized on Anchor pullbacks.</li>
                    <li className="flex gap-2">» <span className="text-white">Confluence:</span> Requires positive EBB + FLOW support.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/18oD9Oa.png' 
            },
            { 
              id: '+', 
              title: 'Bullish Bias', 
              stack: ['slow', 'price', 'fast', 'anchor'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">The asset is building structural strength or performing a corrective rally. Market participants are testing immediate resistance levels.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Regime:</span> Price is above Anchor but fighting micro-trend resistance.</li>
                    <li className="flex gap-2">» <span className="text-white">Goal:</span> Reclaim micro-averages to finalize full expansion.</li>
                    <li className="flex gap-2">» <span className="text-white">Note:</span> Reference M&R behavior for early character changes.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/18oD9Oa.png' 
            },
            { 
              id: 'TRANS', 
              title: 'Mixed Bias', 
              stack: ['price', 'slow', 'fast', 'anchor'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Technical equilibrium is reaching a period of structural friction and volatility contraction. Indicators are overlapping as the market enters a digestion phase.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Regime:</span> Indicators are flat and compressed.</li>
                    <li className="flex gap-2">» <span className="text-white">Risk:</span> High probability of whipsaw for execution-timeframe traders.</li>
                    <li className="flex gap-2">» <span className="text-white">Protocol:</span> Stand down until a definitive breakout is verified by M&R.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/LOJoAcf.png' 
            },
            { 
              id: '-', 
              title: 'Bearish Bias', 
              stack: ['anchor', 'fast', 'price', 'slow'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Signs of structural breakdown or a deep value pullback are emerging. Price has drifted below equilibrium as selling pressure increases.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Regime:</span> Price trades below Anchor while macro trend remains contested.</li>
                    <li className="flex gap-2">» <span className="text-white">Context:</span> First break of bullish cycle or aggressive reversion.</li>
                    <li className="flex gap-2">» <span className="text-white">Confluence:</span> Anchor rejection confirms the downside short bias.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/xDttzCE.png' 
            },
            { 
              id: '---', 
              title: 'Strong Bear', 
              stack: ['slow', 'fast', 'anchor', 'price'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Confirmed structural decay is active as selling pressure suppresses the asset. Price is lagging all system components in a clean reversion state.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Regime:</span> Price is at the bottom of the technical stack.</li>
                    <li className="flex gap-2">» <span className="text-white">Strategy:</span> Fade rallies into Anchor or Fast-line nodes.</li>
                    <li className="flex gap-2">» <span className="text-white">Warning:</span> Avoid bottom-fishing without EBB + FLOW divergence.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/9w9V4dr.png' 
            }
          ],
          components: [
            { name: 'Anchor Line', desc: 'The Purple volume-weighted equilibrium line. It serves as the primary gravity center of price action, distinguishing between healthy momentum and overextended reversion.', color: 'bg-purple-600' },
            { name: 'Fast Line', desc: 'The Cyan momentum tracker. It identifies immediate micro-trend direction, allowing for precise entries on pullbacks before broader structures shift.', color: 'bg-sky-400' },
            { name: 'Slow Line', desc: 'The Gray broad structural baseline. It defines macro trend health and acts as the ultimate boundary for identifying large-scale trend reversals.', color: 'bg-zinc-500' },
            { name: 'Bullish Regime Fill', desc: 'Cyan background shading. This visual layer confirms price acceptance above the Anchor, indicating high-conviction buying pressure and institutional accumulation.', color: 'bg-sky-400/30' },
            { name: 'Bearish Regime Fill', desc: 'Purple background shading. This visual layer confirms price suppression below the Anchor, signaling aggressive distribution and structural decay.', color: 'bg-purple-600/30' }
          ],
          strategies: [
            { title: 'Momentum Continuation', context: 'Ride the Flow', execution: 'Enter when momentum is confirmed [+++] and price pulls back to test Anchor support.', validation: 'Candle close support + EBB + FLOW alignment.', color: 'emerald' },
            { title: 'Reversion Pullback', context: 'The Fade', execution: 'Enter short when price rejects the Anchor line from below while in a bearish bias.', validation: 'Failure to reclaim Anchor + EBB + FLOW divergence.', color: 'rose' }
          ],
          limitations: [
            { label: 'Lagging Nature', desc: 'All components are backward-looking. Strong signals often serve as confirmation of environment.', interpretation: 'Use to identify the environment. You must combine with other indicators to use.' },
            { label: 'Volume Dependency', desc: 'The more volume, the higher the accuracy. The lower the volume, the lower the accuracy.', interpretation: 'Low volume environments provide false signals, noise, and extrapolated scenarios.' },
            { label: 'False Breakouts', desc: 'Price briefly crosses Anchor but reverses.', interpretation: 'A sweep can be rejected. Requires close above/below + volume confirmation.' },
            { label: 'Indicator Confluence', desc: 'The indicator by itself is not sufficient. Requires confluence with the whole system for higher accuracy/success.', interpretation: 'Utilizing Average Range, Ebb+Flow, and S/R are required to plan entry/exits with higher success.' }
          ]
        };
      case 'average-range':
        return {
          title: 'Average Range',
          id: 'AR',
          coord: '0x02BB',
          icon: <Waves />,
          url: 'https://www.tradingview.com/script/average-range-v2/',
          overviewImg: 'https://i.imgur.com/VsD0sk6.png',
          summary: 'The Average Range indicator creates a dynamic, time-weighted price boundary to identify mean reversion zones, overextensions, and high-probability reversal points.',
          questions: [
            "What is the average price range?",
            "How far is price stretched from the average range?"
          ],
          capabilities: [
            "Spotting when price is stretched too far (mean reversion trading)",
            "Defining the current price range"
          ],
          footerNote: "VERSATILE_CALC: Can be applied to stocks, forex, crypto, or any liquid market with sufficient data. Not a crystal ball. It is a tool for measuring deviation.",
          biases: [
            { 
              id: 'INSIDE', 
              title: 'Inside the Boundary', 
              stack: ['upper', 'price', 'lower'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Price is oscillating within normal range limits, signifying technical equilibrium. Market participants are in a neutral phase relative to the mean.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">State:</span> Equilibrium mode. No immediate stretch detected.</li>
                    <li className="flex gap-2">» <span className="text-white">Action:</span> Long/Short execution continues as price holds within boundaries.</li>
                    <li className="flex gap-2">» <span className="text-white">Confluence:</span> M&R alignment + EBB + FLOW direction.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/LOJoAcf.png' 
            },
            { 
              id: 'APP-UP', 
              title: 'Touching Upper Boundary', 
              stack: ['price', 'upper', 'lower'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Price has reached the upper limit of the established range. It is currently testing the statistical ceiling of the current session.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Risk:</span> Potential exhaustion of current bullish momentum.</li>
                    <li className="flex gap-2">» <span className="text-white">Scenarios:</span> Range Expansion (Breakout) or Mean Reversion (Snap-back).</li>
                    <li className="flex gap-2">» <span className="text-white">Confluence:</span> Watch for Bearish Signal marker + EBB + FLOW rejection.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/xDttzCE.png' 
            },
            { 
              id: 'ABOVE', 
              title: 'Stretching Above Boundary', 
              stack: ['price', 'upper', 'zero', 'lower'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Price is currently trading slightly beyond standard boundaries. It has deviated into an extreme statistical overextension zone.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Protocol:</span> HIGH-RISK long zone. Extreme overextension active.</li>
                    <li className="flex gap-2">» <span className="text-white">Goal:</span> Identify reversal triggers back into range center.</li>
                    <li className="flex gap-2">» <span className="text-white">Alert:</span> Down-Arrow trigger signals imminent reversion.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/xDttzCE.png' 
            },
            { 
              id: 'APP-LOW', 
              title: 'Touching Lower Boundary', 
              stack: ['upper', 'lower', 'price'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Price has reached the lower limit of the established range. It is currently testing the statistical floor of the session.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Context:</span> Potential value floor. Sellers reaching exhaustion.</li>
                    <li className="flex gap-2">» <span className="text-white">Protocol:</span> Locate absorption logic or signal divergence.</li>
                    <li className="flex gap-2">» <span className="text-white">Confluence:</span> Requires Bullish Signal marker + EBB + FLOW support.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/18oD9Oa.png' 
            },
            { 
              id: 'BELOW', 
              title: 'Stretching Below Boundary', 
              stack: ['upper', 'zero', 'lower', 'price'], 
              color: 'text-zinc-500', 
              desc: (
                <div className="space-y-4">
                  <p className="text-white/90 font-inter">Price is currently trading slightly below the lower boundary. It has deviated beyond standard range limits into extreme outlier territory.</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex gap-2">» <span className="text-white">Protocol:</span> HIGH-RISK short zone. Deep value territory.</li>
                    <li className="flex gap-2">» <span className="text-white">Action:</span> Prepare for rapid recovery toward equilibrium.</li>
                    <li className="flex gap-2">» <span className="text-white">Alert:</span> Up-Arrow trigger signals imminent snap-back.</li>
                  </ul>
                </div>
              ), 
              img: 'https://i.imgur.com/18oD9Oa.png' 
            }
          ],
          components: [
            { id: 'upper', name: 'Upper Boundary', desc: 'The ceiling of where price can approach or stretch to on average. Red circles on Tradingview. Line on Dashboard.', color: 'bg-[#C71585]', icon: 'circle' },
            { id: 'down-arrow', name: 'Down Arrow', desc: 'Prints when price stretches above upper boundary or returns into range. Red Triangle trigger.', color: 'bg-[#C71585]', icon: 'triangle-down' },
            { id: 'lower', name: 'Lower Boundary', desc: 'The floor of where price can approach or revert to on average. Green circles on Tradingview. Line on Dashboard.', color: 'bg-[#20B2AA]', icon: 'circle' },
            { id: 'up-arrow', name: 'Up Arrow', desc: 'Prints when price stretches below lower boundary or returns into range. Green Triangle trigger.', color: 'bg-[#20B2AA]', icon: 'triangle-up' }
          ],
          strategies: [
            { title: 'Mean Reversion Fade', context: 'Fade extremes when price deviates away from average range.', execution: 'Enter on rejection/reversion back into average range.', validation: 'Boundary tag + Candle reversal pattern.', color: 'rose' },
            { title: 'The Sandwich Analogy', context: 'Multi-Timeframe layers: Horizon (HTF), Tactical (MTF), Execution (LTF).', execution: 'Establish HTF main zone -> MID confirms stretch -> LTF wait for arrow trigger.', validation: 'Alignment across timeframes confirms the stretch is real.', color: 'emerald' }
          ],
          limitations: [
            { label: 'Lagging Nature', desc: 'Confirmation after a move starts.', interpretation: 'Use LTF for timing. Mitigation: Confluence between LTF & HTF theses.' },
            { label: 'Volume Dependency', desc: 'The more volume, the higher the accuracy. The lower the volume, the lower the accuracy.', interpretation: 'Avoid using against illiquid assets.' },
            { label: 'False Extremes in Gaps', desc: 'News gaps jump bands without reversions.', interpretation: 'Give less decision-weight on event days.' },
            { label: 'Capped Length', desc: 'Can be ineffective on very long TFs such as 1M.', interpretation: 'Tradingview only allows for a certain amount of references and lengths.' }
          ]
        };
      case 'ebb-flow':
        return {
          title: 'ebb + flow', id: 'EF', coord: '0x01DD', icon: <Activity />,
          url: 'https://www.tradingview.com/script/ebb-flow-v2/',
          overviewImg: 'https://i.imgur.com/ky0RYEz.png',
          summary: 'ebb + flow is an institutional delivery index that measures volume-weighted flow using price position and volume to show if buyers or sellers are in control.',
          objectives: ["Gauging strength of buying/selling within trend", "Identifying institutional divergences", "Confirming breakouts or reversals with volume-integral data"],
          biases: [
            { id: 'BUY', title: 'Positive Flow (Buyers)', stack: ['flow', 'zero'], color: 'text-emerald-400', desc: (<div className="space-y-4"><p className="text-white/90 font-inter">Institutional accumulation is active as buyers support the bid. This confirms that gains are backed by professional size rather than retail noise.</p><ul className="space-y-2 text-white/60 text-sm"><li className="flex gap-2">» <span className="text-white">State:</span> Primary flow line is trending above equilibrium.</li><li className="flex gap-2">» <span className="text-white">Validation:</span> Price holds the Anchor line during expansion.</li><li className="flex gap-2">» <span className="text-white">Warning:</span> Extreme positive readings may signal local exhaustion.</li></ul></div>), img: 'https://i.imgur.com/18oD9Oa.png' },
            { id: 'SELL', title: 'Negative Flow (Sellers)', stack: ['zero', 'flow'], color: 'text-rose-400', desc: (<div className="space-y-4"><p className="text-white/90 font-inter">Institutional distribution is suppressing price as sellers liquidate positions. Rallies in this environment are often hollow and prone to rejection.</p><ul className="space-y-2 text-white/60 text-sm"><li className="flex gap-2">» <span className="text-white">State:</span> Primary flow line is suppressed below equilibrium.</li><li className="flex gap-2">» <span className="text-white">Strategy:</span> Pair with Bearish M&R regimes for high-conviction shorts.</li><li className="flex gap-2">» <span className="text-white">Note:</span> Steady negative flow leads price structural breakdowns.</li></ul></div>), img: 'https://i.imgur.com/xDttzCE.png' }
          ],
          components: [
            { name: 'Flow Line', desc: 'White Line indicating primary volume-weighted flow direction.', color: 'bg-white' },
            { name: 'Equilibrium Line', desc: 'Fixed yellow zero line serving as the balance point between accumulation and distribution.', color: 'bg-amber-400' }
          ],
          strategies: [
            { title: 'Ocean Analogy', context: 'Timeframes as movement: Tides (HTF), Currents (MTF), Ripples (LTF).', execution: 'Establish main bias on Tides and wait for MTF/LTF alignment.', validation: 'Agreeance on flow direction across layers.', color: 'emerald' },
            { title: 'Institutional Tailgate', context: 'Trade with dominant flow direction as pressure gauge.', execution: 'Positive flows lead price (60-75% correlation).', validation: 'Flow confirmation of price expansion.', color: 'emerald' }
          ],
          limitations: [
            { label: 'Volume Dependency', desc: 'Requires reliable volume data; accuracy scales with liquidity.' },
            { label: 'Divergence False Positives', desc: 'Not all divergences reverse; confirm with volume shifts.' }
          ]
        };
      case 'signals':
        return {
          title: 'Signals', id: 'SIG', coord: '0x04DD', icon: <Zap />,
          url: 'https://www.tradingview.com/script/signals-v2/',
          overviewImg: 'https://i.imgur.com/ky0RYEz.png',
          summary: 'Signals spots forensic "mismatches" using momentum and volume data to flag potential reversals before they break.',
          objectives: ["Detecting hidden structural shifts", "Confirming reversals with forensic alignment", "Filtering weak trends from expansion"],
          biases: [
            { id: '++ / --', title: 'Strong Conviction', stack: ['price', 'anchor', 'flow'], color: 'text-emerald-400', desc: (<div className="space-y-4"><p className="text-white/90 font-inter">A Forensic Triple-Confluence marker (Filled Diamond) has been detected. This is a terminal state where Price, Momentum, and Volume reach extreme divergence.</p><ul className="space-y-2 text-white/60 text-sm"><li className="flex gap-2">» <span className="text-white">State:</span> Triple-Alignment of RSI, OBV, and Price action.</li><li className="flex gap-2">» <span className="text-white">Logic:</span> High probability structural flip is in progress.</li><li className="flex gap-2">» <span className="text-white">Note:</span> Strongest when appearing at Statistical Range boundaries.</li></ul></div>), img: 'https://i.imgur.com/18oD9Oa.png' },
            { id: '+ / -', title: 'Moderate Conviction', stack: ['price', 'anchor'], color: 'text-sky-400', desc: (<div className="space-y-4"><p className="text-white/90 font-inter">An Isolated Momentum Divergence (Hollow Diamond) has emerged. This indicates a mismatch between price and internal strength, often signaling a trend pause.</p><ul className="space-y-2 text-white/60 text-sm"><li className="flex gap-2">» <span className="text-white">State:</span> Mismatch between price and RSI only.</li><li className="flex gap-2">» <span className="text-white">Caution:</span> May be a temporary counter-trend move or trap.</li><li className="flex gap-2">» <span className="text-white">Validation:</span> Requires M&R or EBB + FLOW shift to confirm reversal.</li></ul></div>), img: 'https://i.imgur.com/LOJoAcf.png' }
          ],
          components: [
            { name: 'Strong Bull', desc: 'Filled Green Diamond. High-conviction bullish reversal UP.', color: 'bg-emerald-500' },
            { name: 'Strong Bear', desc: 'Filled Red Diamond. High-conviction bearish reversal DOWN.', color: 'bg-rose-500' },
            { name: 'Momentum Bull', desc: 'Hollow Green Diamond. Moderate conviction reversal UP.', color: 'bg-emerald-400/50' },
            { name: 'Momentum Bear', desc: 'Hollow Red Diamond. Moderate conviction reversal DOWN.', color: 'bg-rose-400/50' }
          ],
          strategies: [
            { title: 'Court Analogy', context: 'Building a defense case with layers of evidence.', execution: 'HTF (The Case) -> MTF (The Witness) -> LTF (The Clues).', validation: 'Multi-indicator alignment finalized on candle close.', color: 'emerald' },
            { title: 'Trend Reversal', context: 'Forensic trigger at exhaustion points.', execution: 'Spotting conflicting direction between price and internal flow.', validation: 'Wait for confirmed, filled diamonds at extremes.', color: 'rose' }
          ],
          limitations: [
            { label: 'False Signals in Trends', desc: 'Strong trends ignore divergences; fading hollow diamonds requires confluence.' },
            { label: 'Lagging Detection', desc: 'Signals finalize upon candle close; may flash during formation.' }
          ]
        };
      default: return null;
    }
  }, [indicatorId]);

  const steps = useMemo(() => {
    if (!config) return [];

    // If indicatorId is average-range, we use the new col-5/col-7 layout pattern
    if (indicatorId === 'average-range') {
      return [
        {
          id: 'overview', label: '01', title: `A. AR Overview`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <p className="text-xl text-white/70 leading-relaxed font-inter">
                  The Average Range indicator creates a dynamic, time-weighted price boundary to identify mean reversion zones, overextensions, and high-probability reversal points.
                </p>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-2">∫ SYSTEM_CAPABILITIES</span>
                  <InstructionCard icon={HelpCircle} title="CORE QUESTIONS" desc="What is the average price range? How far is price stretched from that average?" />
                  <InstructionCard icon={Zap} tone="bull" title="GREAT FOR" desc="Spotting mean reversion trades and defining current session range volatility." />
                </div>
              </div>
              <div className="lg:col-span-7">
                <PerspectiveViewport title="AR PREVIEW" subtitle="MODULE_VISUAL_ROOT">
                  <div className="relative w-full h-full group overflow-hidden bg-black/40">
                    <img src={config.overviewImg} className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="AR Overview" />
                  </div>
                </PerspectiveViewport>
              </div>
            </div>
          )
        },
        {
          id: 'deployment', label: '02', title: `B. Deployment`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">ACCESS AR PROTOCOL</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-inter">
                    Synchronize the Average Range toolkit directly into your TradingView environment. This provides the statistical boundaries needed for topology mapping.
                  </p>
                </div>
                <InstructionCard icon={Monitor} title="ENV_SYNC" desc="TRADINGVIEW // OFFICIAL STABLE BUILD" />
              </div>
              <div className="lg:col-span-7">
                <PerspectiveViewport title="Deployment Link" subtitle="EXTERNAL_PROTOCOL_UPLINK">
                  <div onClick={() => window.open(config?.url, '_blank')} className="relative w-full aspect-video bg-zinc-950 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center group cursor-pointer shadow-2xl">
                    <img src={config?.overviewImg} className="absolute inset-0 w-full h-full object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-1000" alt="Link Preview" />
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="relative z-10">
                      <button className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-sm flex items-center gap-4">
                        <Play size={18} className="fill-current" />
                        SYNC TO CHART
                      </button>
                    </motion.div>
                  </div>
                </PerspectiveViewport>
              </div>
            </div>
          )
        },
        {
          id: 'architecture', label: '03', title: `C. Architecture`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-[600px] scrollbar-hide pr-2">
                {config.components.map((c: any, i: number) => (
                  <InstructionCard 
                    key={i} 
                    icon={c.icon === 'circle' ? Circle : Triangle} 
                    title={c.name} 
                    desc={(
                      <div className="space-y-2">
                        <p>{c.desc}</p>
                        <div className={cn("h-1 w-12 rounded-full", c.color)} />
                      </div>
                    )}
                  />
                ))}
              </div>
              <div className="lg:col-span-7">
                <PerspectiveViewport title="Topology Stack" subtitle="GAUSSIAN_BOUNDARIES_V2">
                   <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-black/40 p-8">
                      <div className="w-full h-px bg-[#C71585]/40 relative">
                        <div className="absolute -top-3 left-0 text-[8px] font-black text-[#C71585]">UPPER_LIMIT</div>
                      </div>
                      <div className="w-full h-px bg-white/5 relative">
                        <div className="absolute -top-3 left-0 text-[8px] font-black text-white/20">EQUILIBRIUM</div>
                      </div>
                      <div className="w-full h-px bg-[#20B2AA]/40 relative">
                        <div className="absolute -top-3 left-0 text-[8px] font-black text-[#20B2AA]">LOWER_LIMIT</div>
                      </div>
                      <span className="text-[7px] text-white/10 font-mono tracking-[0.5em] mt-4 uppercase">Dynamic Probability Envelope Map</span>
                   </div>
                </PerspectiveViewport>
              </div>
            </div>
          )
        },
        {
          id: 'interpretation', label: '04', title: `D. Interpretation`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                <div className="pb-4 border-b border-white/10 mb-4 space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">∫ BOUNDARY_SELECTOR</span>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-tight">Select range deviation to view alignment protocols.</p>
                </div>
                {config.biases.map((item: any) => (
                  <button 
                    key={item.id} 
                    onClick={() => { setSelectedBias(item.id); setImgLoading(true); }}
                    className={cn(
                      "w-full text-left p-4 transition-all border rounded-sm flex flex-col gap-2 relative overflow-hidden group",
                      selectedBias === item.id ? "bg-white/5 border-white/20" : "bg-white/[0.01] border-white/5 opacity-40 hover:opacity-100"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-zinc-500">[{item.id}]</span>
                      <h5 className="text-[11px] font-black text-white uppercase tracking-widest">{item.title}</h5>
                    </div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-7 space-y-6">
                <PerspectiveViewport title="Range Preview" subtitle={`STRETCH_STATE: ${selectedBias || 'NULL'}`}>
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black/20">
                    <div className="w-full h-full max-h-[360px] flex items-center justify-center p-4">
                      <AverageRangeSimulator biasId={selectedBias} />
                    </div>
                  </div>
                </PerspectiveViewport>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm">
                  <div className="flex gap-4 items-start">
                    <Info size={16} className="text-primary shrink-0 mt-1" />
                    <div className="text-[12px] text-white/70 font-inter leading-relaxed">
                      {config?.biases?.find((b: any) => b.id === selectedBias)?.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'protocols', label: '05', title: `E. Protocols`,
          content: (
            <div className="space-y-12">
               {config.strategies.map((s: any, idx: number) => (
                 <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-4">
                       <div className="p-4 bg-black border border-white/10 rounded-sm">
                          <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-2">
                             <Zap size={14} className={cn(s.color === 'emerald' ? "text-emerald-400" : "text-rose-400")} />
                             <span className="text-[11px] font-black text-white uppercase tracking-tighter">{s.title}</span>
                          </div>
                          <div className="space-y-4">
                             <div className="space-y-1">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">CONTEXT</span>
                                <p className="text-[11px] text-white/60 font-inter italic leading-relaxed uppercase">{s.context}</p>
                             </div>
                             <div className="space-y-1">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">EXECUTION</span>
                                <p className="text-[11px] text-white/60 font-inter font-bold leading-relaxed uppercase">{s.execution}</p>
                             </div>
                             <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm">
                                <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest block mb-1">VALIDATION</span>
                                <p className="text-[10px] text-white font-bold uppercase tracking-tight">{s.validation}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="lg:col-span-7">
                       <PerspectiveViewport title={`Strategy segment 0${idx+1}`} subtitle="PROTOCOL_VISUAL_SYNC">
                          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-8 group overflow-hidden">
                             <img src={idx === 0 ? 'https://i.imgur.com/VsD0sk6.png' : 'https://i.imgur.com/ky0RYEz.png'} className="w-full h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt="Strategy Preview" />
                          </div>
                       </PerspectiveViewport>
                    </div>
                 </div>
               ))}
            </div>
          )
        },
        {
          id: 'limitations', label: '06', title: `F. Finalized Application`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
               <div className="lg:col-span-5 space-y-3">
                 <div className="pb-4 border-b border-white/10 mb-4 space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">∫ SYSTEM_CAUTIONS</span>
                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-tight">Awareness of backward-looking data constraints.</p>
                 </div>
                 {config.limitations.map((limit: any, i: number) => (
                   <InstructionCard 
                    key={i} 
                    icon={ShieldAlert} 
                    tone="caution"
                    title={limit.label} 
                    desc={(
                      <div className="space-y-3">
                        <p className="leading-relaxed">{limit.desc}</p>
                        <div className="p-2 bg-primary/5 border border-primary/10 rounded-sm">
                          <p className="text-[9px] text-primary/80 font-inter italic normal-case leading-relaxed">{limit.interpretation}</p>
                        </div>
                      </div>
                    )}
                   />
                 ))}
               </div>
               <div className="lg:col-span-7">
                 <PerspectiveViewport title="Technical Sovereignty" subtitle="LIMITATION_AUDIT_V2.5">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-8 opacity-20 group">
                       <ShieldCheck size={120} strokeWidth={0.5} className="text-white group-hover:scale-110 transition-transform duration-1000" />
                       <span className="text-[10px] font-black text-white uppercase tracking-[1em] ml-4">Protocol Validated</span>
                    </div>
                 </PerspectiveViewport>
               </div>
            </div>
          )
        }
      ];
    }

    if (config?.isFunnel) {
      return [
        {
          id: 'funnel-overview', label: '01', title: 'TIMEFRAMES | OVERVIEW',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-12">
                <p className="text-2xl text-white/70 leading-relaxed font-inter">Using higher and lower timeframes ensures you are ranking alignment across three distinct phases.</p>
                <div className="p-8 border border-white/5 bg-white/[0.01] rounded-sm">
                   <FunnelTable 
                    title="FUNNEL ARCHITECTURE" 
                    subtitle="STRUCTURAL HIERARCHY" 
                    headers={['LAYER', 'FUNCTION', 'OBJECTIVE']} 
                    rows={[
                      ['1', 'Macro', 'Birds-eye directional bias'], 
                      ['2', 'Tactical', 'Refine entry ranges'], 
                      ['3', 'Execution', 'Precision timing']
                    ]} 
                   />
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col items-center">
                 <div className="w-full p-8 bg-[#050507] border border-white/10 rounded-sm shadow-2xl space-y-8">
                    {['LAYER 1: MACRO', 'LAYER 2: TACTICAL', 'LAYER 3: EXECUTION'].map((l, i) => (
                      <div key={l} className="p-6 border border-white/5 bg-white/[0.02] skew-x-[-10deg] text-center">
                        <span className="text-[10px] font-black text-white/40">{l}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )
        },
        {
          id: 'layer1', label: '02', title: 'LAYER 1: THE HORIZON',
          content: (
            <div className="space-y-12">
              <FunnelTable 
                title="MACRO SENTIMENT" 
                subtitle="ESTABLISHING BIAS" 
                headers={['TF', 'ROLE', 'OBJECTIVE']} 
                rows={[
                  ['1W', 'Macro trend ID', 'Liquidity context'], 
                  ['1D', 'Master bias', 'Directional anchoring']
                ]} 
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LogicPanel index="1" title="M&R" purpose="Define regime type." warning="Acceptance requires follow through.">
                  <ChecklistItem label="Strong Momentum" tone="bull" checked />
                </LogicPanel>
                <LogicPanel index="2" title="AR" purpose="Define location risk.">
                  <ChecklistItem label="Near Lower Boundary" tone="bull" />
                </LogicPanel>
              </div>
            </div>
          )
        },
        {
          id: 'layer2', label: '03', title: 'LAYER 2: THE HUNT',
          content: (
            <div className="space-y-12">
              <FunnelTable 
                title="TACTICAL POSITIONING" 
                subtitle="REFINE ENTRY" 
                headers={['TF', 'ROLE', 'OBJECTIVE']} 
                rows={[
                  ['4H', 'Trend Harmony', 'intermediate momentum'], 
                  ['1H', 'Range boundaries', 'Identify areas']
                ]} 
              />
              <LogicPanel index="1" title="Protocol Verification" purpose="Confirming alignment.">
                <ChecklistItem label="Flow Supports Entry" tone="bull" checked />
              </LogicPanel>
            </div>
          )
        },
        {
          id: 'layer3', label: '04', title: 'LAYER 3: THE APEX',
          content: (
            <div className="space-y-12">
              <FunnelTable 
                title="EXECUTION FOCUS" 
                subtitle="TIMING" 
                headers={['TF', 'ROLE', 'OBJECTIVE']} 
                rows={[
                  ['15m', 'Precision timing', 'Entry/Exit point'], 
                  ['5m', 'Micro timing', 'Risk rotation']
                ]} 
              />
              <LogicPanel index="1" title="Trigger Checklist" purpose="Action validation.">
                <ChecklistItem label="Confirmed EF Pulse" tone="bull" />
              </LogicPanel>
            </div>
          )
        }
      ];
    }

    if (indicatorId === 'm&r') {
      return [
        {
          id: 'overview', label: '01', title: `A. M&R Overview`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <p className="text-xl text-white/70 leading-relaxed font-inter">
                  The Momentum & Reversion indicator is a technical analysis layer designed to identify and emphasize market momentum and reversion environments.
                </p>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-2">∫ OBJECTIVES</span>
                  {(config?.objectives as string[]).map((obj, i) => (
                    <InstructionCard key={i} icon={Target} title={`OBJECTIVE 0${i+1}`} desc={obj} />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <PerspectiveViewport title="M&R PREVIEW" subtitle="MODULE_VISUAL_ROOT">
                  <div className="relative w-full h-full group overflow-hidden bg-black/40">
                    <img src={config.overviewImg} className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="M&R Overview" />
                  </div>
                </PerspectiveViewport>
              </div>
            </div>
          )
        },
        {
          id: 'deployment', label: '02', title: `B. Deployment`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">ACCESS M&R PROTOCOL</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-inter">
                    Synchronize the M&R toolkit directly into your live TradingView environment. This serves as the primary regime-detection engine for the system.
                  </p>
                </div>
                <InstructionCard icon={Monitor} title="ENV_SYNC" desc="TRADINGVIEW // OFFICIAL STABLE BUILD" />
              </div>
              <div className="lg:col-span-7">
                <PerspectiveViewport title="Deployment Link" subtitle="EXTERNAL_PROTOCOL_UPLINK">
                  <div onClick={() => window.open(config?.url, '_blank')} className="relative w-full aspect-video bg-zinc-950 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center group cursor-pointer shadow-2xl">
                    <img src={config?.overviewImg} className="absolute inset-0 w-full h-full object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-1000" alt="Link Preview" />
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="relative z-10">
                      <button className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-sm flex items-center gap-4">
                        <Play size={18} className="fill-current" />
                        SYNC TO CHART
                      </button>
                    </motion.div>
                  </div>
                </PerspectiveViewport>
              </div>
            </div>
          )
        },
        {
          id: 'architecture', label: '03', title: `C. Architecture`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-[600px] scrollbar-hide pr-2">
                {config.components.map((c: any, i: number) => (
                  <InstructionCard 
                    key={i} 
                    icon={Activity} 
                    title={c.name} 
                    desc={(
                      <div className="space-y-2">
                        <p>{c.desc}</p>
                        <div className={cn("h-1 w-12 rounded-full", c.color)} />
                      </div>
                    )}
                  />
                ))}
              </div>
              <div className="lg:col-span-7">
                <PerspectiveViewport title="System Architecture" subtitle="REGIME_STACK_V2">
                   <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-black/40">
                      <div className="flex flex-col gap-2 w-48">
                         {config.components.map((c: any, i: number) => (
                           <motion.div 
                            key={i} 
                            initial={{ x: -20, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{ delay: i * 0.1 }}
                            className={cn("p-2 border border-white/10 rounded-sm flex items-center justify-center bg-black/60 shadow-lg")}
                           >
                              <div className={cn("w-1.5 h-1.5 rounded-full mr-3", c.color)} />
                              <span className="text-[8px] font-black text-white/60 tracking-widest">{c.name.toUpperCase()}</span>
                           </motion.div>
                         ))}
                      </div>
                      <span className="text-[7px] text-white/10 font-mono tracking-[0.5em] mt-4 uppercase">Multi-Layer Topology Map</span>
                   </div>
                </PerspectiveViewport>
              </div>
            </div>
          )
        },
        {
          id: 'interpretation', label: '04', title: `D. Interpretation`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                <div className="pb-4 border-b border-white/10 mb-4 space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">∫ REGIME_SELECTOR</span>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-tight">Select structural bias to view sync parameters.</p>
                </div>
                {config.biases.map((item: any) => (
                  <button 
                    key={item.id} 
                    onClick={() => { setSelectedBias(item.id); setImgLoading(true); }}
                    className={cn(
                      "w-full text-left p-4 transition-all border rounded-sm flex flex-col gap-2 relative overflow-hidden group",
                      selectedBias === item.id ? "bg-white/5 border-white/20" : "bg-white/[0.01] border-white/5 opacity-40 hover:opacity-100"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-zinc-500">[{item.id}]</span>
                      <h5 className="text-[11px] font-black text-white uppercase tracking-widest">{item.title}</h5>
                    </div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-7 space-y-6">
                <PerspectiveViewport title="Regime Preview" subtitle={`CURRENT_STATE: ${selectedBias || 'NULL'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                    <div className="border-r border-white/5 bg-black/20">
                      <DepthGauge stack={config?.biases?.find((b: any) => b.id === selectedBias)?.stack || []} title={config?.biases?.find((b: any) => b.id === selectedBias)?.title || ''} />
                    </div>
                    <div className="relative bg-black group/viz overflow-hidden flex items-center justify-center p-6">
                      <AnimatePresence>
                        {imgLoading && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black gap-4">
                            <Loader2 size={24} className="text-primary animate-spin" />
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Rendering...</span>
                          </div>
                        )}
                      </AnimatePresence>
                      <img 
                        src={config?.biases?.find((b: any) => b.id === selectedBias)?.img} 
                        onLoad={() => setImgLoading(false)} 
                        className={cn("relative w-full h-full object-contain opacity-80 group-hover/viz:scale-[1.05] transition-transform duration-700", imgLoading ? "invisible" : "visible")} 
                        alt="State View" 
                      />
                    </div>
                  </div>
                </PerspectiveViewport>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm">
                  <div className="flex gap-4 items-start">
                    <Info size={16} className="text-primary shrink-0 mt-1" />
                    <div className="text-[12px] text-white/70 font-inter leading-relaxed">
                      {config?.biases?.find((b: any) => b.id === selectedBias)?.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'protocols', label: '05', title: `E. Protocols`,
          content: (
            <div className="space-y-12">
               {config.strategies.map((s: any, idx: number) => (
                 <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-4">
                       <div className="p-4 bg-black border border-white/10 rounded-sm">
                          <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-2">
                             <Zap size={14} className={cn(s.color === 'emerald' ? "text-emerald-400" : "text-rose-400")} />
                             <span className="text-[11px] font-black text-white uppercase tracking-tighter">{s.title}</span>
                          </div>
                          <div className="space-y-4">
                             <div className="space-y-1">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">CONTEXT</span>
                                <p className="text-[11px] text-white/60 font-inter italic leading-relaxed uppercase">{s.context}</p>
                             </div>
                             <div className="space-y-1">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">EXECUTION</span>
                                <p className="text-[11px] text-white/60 font-inter font-bold leading-relaxed uppercase">{s.execution}</p>
                             </div>
                             <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm">
                                <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest block mb-1">VALIDATION</span>
                                <p className="text-[10px] text-white font-bold uppercase tracking-tight">{s.validation}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="lg:col-span-7">
                       <PerspectiveViewport title={`Strategy segment 0${idx+1}`} subtitle="PROTOCOL_VISUAL_SYNC">
                          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-8 group overflow-hidden">
                             <img src={idx === 0 ? 'https://i.imgur.com/k6thA3L.png' : 'https://i.imgur.com/82TjE2O.png'} className="w-full h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt="Strategy Preview" />
                          </div>
                       </PerspectiveViewport>
                    </div>
                 </div>
               ))}
            </div>
          )
        },
        {
          id: 'limitations', label: '06', title: `F. Finalized Application`,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
               <div className="lg:col-span-5 space-y-3">
                 <div className="pb-4 border-b border-white/10 mb-4 space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">∫ SYSTEM_CAUTIONS</span>
                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-tight">Awareness of backward-looking data constraints.</p>
                 </div>
                 {config.limitations.map((limit: any, i: number) => (
                   <InstructionCard 
                    key={i} 
                    icon={ShieldAlert} 
                    tone="caution"
                    title={limit.label} 
                    desc={(
                      <div className="space-y-3">
                        <p className="leading-relaxed">{limit.desc}</p>
                        <div className="p-2 bg-primary/5 border border-primary/10 rounded-sm">
                          <p className="text-[9px] text-primary/80 font-inter italic normal-case leading-relaxed">{limit.interpretation}</p>
                        </div>
                      </div>
                    )}
                   />
                 ))}
               </div>
               <div className="lg:col-span-7">
                 <PerspectiveViewport title="Technical Sovereignty" subtitle="LIMITATION_AUDIT_V2.5">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-8 opacity-20 group">
                       <ShieldCheck size={120} strokeWidth={0.5} className="text-white group-hover:scale-110 transition-transform duration-1000" />
                       <span className="text-[10px] font-black text-white uppercase tracking-[1em] ml-4">Protocol Validated</span>
                    </div>
                 </PerspectiveViewport>
               </div>
            </div>
          )
        }
      ];
    }

    // 4. Default Fallback Logic
    return [
      {
        id: 'overview', label: '01', title: `A. ${config?.id} Overview`,
        content: (
          <div className="space-y-16">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/80 leading-tight font-inter max-w-5xl">{config?.summary}</p>
            <div className="space-y-12">
              <div className="p-12 md:p-16 bg-white/[0.02] border border-white/5 rounded-sm space-y-10 shadow-2xl">
                 <div className="flex items-center gap-4"><Target size={20} className="text-primary" /><h4 className="text-sm font-black text-primary uppercase tracking-[0.5em]">Functional Objectives:</h4></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{(config?.objectives as string[]).map((b, i) => (<div key={i} className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-sm group hover:border-white/20 transition-all"><span className="font-mono text-lg text-primary/30 font-bold">0{i+1}</span><span className="text-white/90 font-bold uppercase tracking-tight text-base">{b}</span></div>))}</div>
              </div>
              {config?.footerNote && (<div className="pt-8 border-t border-white/5 flex items-start gap-4 opacity-40"><AlertTriangle className="text-amber-500/80 shrink-0" size={14} /><p className="text-[10px] text-white/80 font-mono uppercase tracking-[0.2em] leading-relaxed italic">{config.footerNote}</p></div>)}
            </div>
          </div>
        )
      },
      {
        id: 'installation', label: '02', title: 'B. Deployment',
        content: (
          <div className="space-y-12">
            <div className="flex flex-col gap-10">
              <div className="space-y-2"><h4 className="text-3xl font-black text-white uppercase tracking-tighter">ACCESS {config?.id} INDICATOR</h4><p className="text-sm text-white/30 uppercase tracking-[0.5em] font-mono">TRADINGVIEW // OFFICIAL VERSION</p></div>
              <div onClick={() => window.open(config?.url, '_blank')} className="relative w-full h-[500px] bg-zinc-950 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center group shadow-2xl cursor-pointer">
                 <img src={config?.overviewImg} className="absolute inset-0 w-full h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 bg-black/20" alt="Protocol Preview" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                 <motion.div animate={{ scale: [1, 1.08, 1], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="relative z-10"><motion.button animate={{ boxShadow: ["0 0 30px rgba(255,255,255,0.2)", "0 0 60px rgba(255,255,255,0.6)", "0 0 30px rgba(255,255,255,0.2)"] }} transition={{ duration: 2, repeat: Infinity }} className="px-16 py-8 bg-white text-black font-black text-lg uppercase tracking-[0.6em] rounded-sm flex items-center gap-4"><Play size={24} className="fill-current" />ADD TO CHART</motion.button></motion.div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'components', label: '03', title: 'C. Architecture',
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {config?.components?.map((c: any) => (
              <div key={c.name} className="p-16 border border-white/10 bg-white/[0.01] rounded-sm flex gap-10 hover:bg-white/[0.03] transition-all group shadow-xl">
                 <div className={cn("w-3 h-24 shrink-0 rounded-full transition-all group-hover:scale-y-110", c.color)} />
                 <div className="space-y-6"><h5 className="text-xl font-black text-white uppercase tracking-[0.4em]">{c.name}</h5><p className="text-base text-white/50 font-inter leading-relaxed max-w-md">{c.desc}</p></div>
              </div>
            ))}
          </div>
        )
      },
      {
        id: 'interpretation', label: '04', title: 'D. Interpretation',
        content: (
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[550px]">
              <div className="lg:col-span-4 space-y-0 flex flex-col">
                <div className="flex flex-col gap-3 border-b border-white/10 pb-6 mb-2"><span className="text-[12px] font-black text-primary uppercase tracking-[0.6em]">Regime Selector</span><p className="text-xs text-white/30 uppercase font-medium">Select a structural bias to view synchronization parameters.</p></div>
                <div className="flex-1 overflow-y-auto scrollbar-hide">{config?.biases?.map((item: any) => (<button key={item.id} onClick={() => { setSelectedBias(item.id); setImgLoading(true); }} className={cn("w-full text-left py-8 transition-all border-b border-white/10 group relative flex flex-col gap-3", selectedBias === item.id ? "opacity-100" : "opacity-20 hover:opacity-80")}><span className="font-mono font-black text-[10px] uppercase tracking-[0.2em] text-zinc-500">[{item.id}]</span><h5 className="text-xl font-black text-zinc-400 uppercase tracking-tighter leading-none group-hover:text-white transition-colors">{item.title}</h5></button>))}</div>
              </div>
              <div className="lg:col-span-8 bg-[#050507] border border-white/10 rounded-sm flex flex-col overflow-hidden relative shadow-2xl min-h-[500px]">
                 <div className="absolute top-6 left-6 z-30"><span className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] bg-black/40 px-3 py-1.5 border border-white/5 backdrop-blur-sm rounded-sm">[ {config?.biases?.find((b: any) => b.id === selectedBias)?.title.toUpperCase() || 'STATE_UNDEFINED'} ]</span></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
                    <div className="border-r border-white/10 bg-black/20"><DepthGauge stack={config?.biases?.find((b: any) => b.id === selectedBias)?.stack || []} title={config?.biases?.find((b: any) => b.id === selectedBias)?.title || ''} /></div>
                    <div className="relative bg-black group/viz overflow-hidden flex items-center justify-center p-12"><AnimatePresence>{imgLoading && (<div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black gap-6"><Loader2 size={40} className="text-primary animate-spin" /><span className="text-[10px] font-black text-white/30 uppercase tracking-[0.8em]">Visualizing...</span></div>)}</AnimatePresence><img src={config?.biases?.find((b: any) => b.id === selectedBias)?.img} onLoad={() => setImgLoading(false)} className={cn("relative w-full h-full object-contain opacity-90 transition-all duration-1000 group-hover/viz:scale-[1.1]", imgLoading ? "invisible" : "visible")} alt="State Visualization" /></div>
                 </div>
              </div>
            </div>
            <div className="pt-12 border-t border-white/10"><div className="flex gap-10 items-start"><div className="w-16 h-16 shrink-0 bg-primary/5 border border-primary/20 rounded-full flex items-center justify-center text-primary/60"><Monitor size={32} /></div><div className="space-y-4 w-full"><span className="text-[11px] font-black text-primary uppercase tracking-[0.8em]">Technical Description</span><div className="text-xl text-white/70 font-inter leading-relaxed max-w-5xl">{config?.biases?.find((b: any) => b.id === selectedBias)?.desc}</div></div></div></div>
          </div>
        )
      },
      {
        id: 'strategy', label: '05', title: 'E. Protocols',
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {config?.strategies?.map((s: any) => (
              <div key={s.title} className="p-16 border border-white/10 bg-white/[0.01] rounded-sm space-y-12 group hover:border-white/20 transition-all shadow-xl">
                 <div className="flex items-center gap-10"><div className={cn("w-20 h-20 border flex items-center justify-center rounded-full transition-all duration-700 group-hover:scale-110", s.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]" : "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.2)]")}>{s.color === 'emerald' ? <Zap size={40} /> : <Binary size={40} />}</div><h4 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{s.title}</h4></div>
                 <div className="space-y-10"><div className="space-y-4"><h5 className="text-[12px] font-black text-primary uppercase tracking-[0.6em]">Context</h5><p className="text-lg text-white/50 font-inter leading-relaxed pl-8 border-l-2 border-white/10">{s.context || s.desc}</p></div>{s.execution && (<div className="space-y-4"><h5 className="text-[12px] font-black text-primary uppercase tracking-[0.6em]">Execution</h5><p className="text-lg text-white/50 font-inter leading-relaxed pl-8 border-l-2 border-white/10">{s.execution}</p></div>)}{s.validation && (<div className="space-y-4"><h5 className="text-[12px] font-black text-primary uppercase tracking-[0.6em]">Validation</h5><div className="flex items-center gap-6 bg-white/[0.03] p-6 rounded-sm border border-white/5"><CheckCircle2 size={24} className={cn(s.color === 'emerald' ? 'text-emerald-500' : 'text-rose-500')} /><p className="text-base font-bold text-white/80 uppercase tracking-wide">{s.validation}</p></div></div>)}</div>
              </div>
            ))}
          </div>
        )
      },
      {
        id: 'limitations', label: '06', title: 'F. Finalized Application',
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             {config?.limitations?.map((limit: any) => (
               <div key={limit.label} className="p-10 border border-white/10 bg-white/[0.01] rounded-sm flex flex-col gap-10 group hover:bg-white/[0.03] transition-all shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors"><ShieldAlert size={24} strokeWidth={1.5} /></div><h5 className="text-xl font-black text-white uppercase tracking-[0.3em]">{limit.label}</h5></div><div className="h-px w-16 bg-white/10" /></div>
                  <div className="space-y-8 relative z-10"><div className="space-y-3"><div className="flex items-center gap-3"><span className="text-[8px] font-black text-white/20 uppercase tracking-widest">i. Description</span><div className="h-px flex-1 bg-white/5" /></div><p className="text-base text-white/50 font-inter leading-relaxed pl-4 border-l border-white/10">{limit.desc}</p></div>{limit.interpretation && (<div className="space-y-3 bg-primary/[0.02] border border-primary/10 p-5 rounded-sm"><div className="flex items-center gap-3"><span className="text-[8px] font-black text-primary/60 uppercase tracking-widest">ii. Interpretation</span><div className="h-px flex-1 bg-primary/10" /></div><p className="text-sm text-white/80 font-inter leading-relaxed italic">{limit.interpretation}</p></div>)}</div>
                  <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity"><ShieldCheck size={200} /></div>
               </div>
             ))}
          </div>
        )
      }
    ];
  }, [config, indicatorId, selectedBias, imgLoading]);

  useEffect(() => {
    if (config) {
      if (config.isFunnel) setActiveStepId('funnel-overview');
      else setActiveStepId('overview');
      if (config.biases && config.biases.length > 0) setSelectedBias(config.biases[0].id);
    }
  }, [config, indicatorId]);

  if (!config) return null;

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="min-h-screen bg-[#050507] text-foreground flex flex-col font-mono selection:bg-primary/20 overflow-hidden">
      <AnimatedBackground />
      <header className="h-16 border-b border-white/10 px-8 md:px-12 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-8">
          <button onClick={onBack} className="text-white hover:text-primary transition-colors flex items-center gap-3"><ArrowLeft size={24} /><span className="text-xs font-black uppercase tracking-[0.3em] hidden sm:inline">Back to Docs</span></button>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col"><span className="text-sm font-bold text-white tracking-[0.4em] uppercase">{config.title} Protocol</span><span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-mono">SPEC_V2.5 // {config.coord}</span></div>
        </div>
        <div className="hidden md:flex items-center gap-6"><div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded-sm"><CheckCircle2 size={16} className="text-emerald-500" /><span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Verified Spec Sync</span></div></div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden lg:flex w-80 border-r border-white/10 bg-black/40 flex-col shrink-0 z-40">
           <div className="p-10 border-b border-white/5 bg-black/20"><span className="text-[10px] text-white/20 font-black uppercase tracking-[0.6em] block mb-3">System Path</span><h3 className="text-2xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-none">Modules.</h3></div>
           <div className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide">
              {steps.map((step) => (
                <button key={step.id} onClick={() => setActiveStepId(step.id)} className={cn("w-full flex items-center gap-6 p-5 transition-all duration-500 group relative rounded-sm border text-left", activeStepId === step.id ? "bg-white/5 border-white/20 opacity-100" : "border-transparent opacity-30 hover:opacity-100 hover:bg-white/[0.02]")}>
                  <div className={cn("w-6 h-6 rounded-full border flex items-center justify-center transition-all", activeStepId === step.id ? "bg-primary border-primary shadow-[0_0_15px_white]" : "bg-black border-white/20")}>{activeStepId === step.id && <div className="w-1.5 h-1.5 bg-black rounded-full" />}</div>
                  <div className="flex flex-col items-start"><span className={cn("text-[9px] font-black tracking-[0.4em] uppercase", activeStepId === step.id ? "text-primary" : "text-white/40")}>Step {step.label}</span><span className="text-xs font-bold uppercase tracking-widest text-left">{step.id.replace(/-/g, ' ')}</span></div>
                </button>
              ))}
           </div>
           <div className="p-10 border-t border-white/5 bg-black/20"><div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><motion.div animate={{ width: `${((steps.findIndex(s => s.id === activeStepId) + 1) / steps.length) * 100}%` }} className="h-full bg-primary shadow-[0_0_10px_white]" /></div></div>
        </aside>
        <main className="flex-1 overflow-y-auto scrollbar-hide relative z-10 bg-[#08080A]/60 p-10 md:p-24">
           <div className="max-w-6xl mx-auto space-y-16">
              <AnimatePresence mode="wait">
                 <motion.div key={activeStepId} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-16">
                    <div className="space-y-6"><div className="flex items-center gap-6"><span className="text-sm font-black text-primary uppercase tracking-[0.8em] whitespace-nowrap">Protocol Module {activeStep.label}</span><div className="h-[1px] flex-1 bg-white/10" /></div><h2 className="text-4xl md:text-6xl font-space-grotesk font-black text-white tracking-tighter uppercase leading-[0.85]">{activeStep.title}.</h2></div>
                    <div className="relative">{activeStep.content}</div>
                    <EmbeddedIntelDialogue activeModule={config.title} activeStepId={activeStep.id} messages={chatHistory} setMessages={setChatHistory} />
                    <div className="pt-20 border-t border-white/5 flex justify-between items-center">{steps.findIndex(s => s.id === activeStepId) > 0 ? (<button onClick={() => setActiveStepId(steps[steps.findIndex(s => s.id === activeStepId) - 1].id)} className="text-xs font-black text-white/30 hover:text-white uppercase tracking-[0.5em] transition-all">← Back Segment</button>) : <div />}{steps.findIndex(s => s.id === activeStepId) < steps.length - 1 ? (<button onClick={() => setActiveStepId(steps[steps.findIndex(s => s.id === activeStepId) + 1].id)} className="px-16 py-6 bg-white text-black font-black text-sm uppercase tracking-[0.5em] rounded-sm hover:scale-[1.03] transition-all flex items-center gap-4 group shadow-2xl">Next Segment<ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" /></button>) : (<button onClick={onBack} className="px-16 py-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-black text-sm uppercase tracking-[0.5em] rounded-sm hover:bg-emerald-500 hover:text-black transition-all shadow-2xl">Complete Specification</button>)}</div>
                 </motion.div>
              </AnimatePresence>
           </div>
        </main>
      </div>
    </div>
  );
}
