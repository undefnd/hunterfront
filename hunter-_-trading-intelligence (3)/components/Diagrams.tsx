
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BarChart3, Database, Workflow, Sparkles, Zap, ShieldCheck, Microscope } from 'lucide-react';

export const MoleculeDesigner: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [efficiency, setEfficiency] = useState(0);

  const nodes = [
    { id: 0, x: '20%', y: '30%', label: 'C' },
    { id: 1, x: '50%', y: '20%', label: 'H' },
    { id: 2, x: '80%', y: '30%', label: 'O' },
    { id: 3, x: '50%', y: '50%', label: 'AI', special: true },
    { id: 4, x: '25%', y: '70%', label: 'N' },
    { id: 5, x: '75%', y: '70%', label: 'Zn' },
  ];

  const toggleNode = (id: number) => {
    setActiveNodes(prev => {
      const next = prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id];
      setEfficiency(Math.min(100, next.length * 15 + (next.includes(3) ? 20 : 0)));
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center p-12 glass rounded-[40px] shadow-2xl border-white/5 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="relative w-full aspect-square bg-indigo-500/5 rounded-3xl flex items-center justify-center border border-white/5 overflow-hidden">
           {/* Animated Orbitals */}
           <div className="absolute inset-0 border border-indigo-500/10 rounded-full animate-pulse-slow scale-75"></div>
           <div className="absolute inset-0 border border-indigo-500/10 rounded-full animate-pulse-slow scale-50" style={{ animationDelay: '1s' }}></div>

           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <AnimatePresence>
                {activeNodes.map(id => {
                  const start = nodes.find(n => n.id === id);
                  if (!start) return null;
                  return activeNodes.filter(otherId => otherId !== id).map(otherId => {
                    const end = nodes.find(n => n.id === otherId);
                    if (!end) return null;
                    return (
                      <motion.line 
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 0.3, pathLength: 1 }}
                        exit={{ opacity: 0 }}
                        key={`line-${id}-${otherId}`} 
                        x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                        stroke="#6366f1" strokeWidth="2" strokeDasharray="4"
                      />
                    );
                  });
                })}
              </AnimatePresence>
           </svg>

           {nodes.map(node => (
             <motion.button
               key={node.id}
               whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
               whileTap={{ scale: 0.9 }}
               onClick={() => toggleNode(node.id)}
               className={`absolute w-14 h-14 -ml-7 -mt-7 rounded-2xl flex items-center justify-center font-bold text-sm transition-all z-10
                 ${activeNodes.includes(node.id) 
                   ? (node.special ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg' : 'bg-white text-brand-dark scale-110') 
                   : 'bg-slate-800 text-slate-500 border border-white/10 hover:border-indigo-500/40'}`}
               style={{ left: node.x, top: node.y }}
             >
               {node.label}
             </motion.button>
           ))}
        </div>

        <div className="flex flex-col gap-8">
           <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
                 <Zap size={14} /> Neural Inference Yield
              </div>
              <div className="flex items-end gap-2 mb-4">
                 <span className="text-6xl font-black text-white leading-none">{efficiency}%</span>
                 <span className="text-slate-500 font-bold mb-1">STABILITY</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${efficiency}%` }}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass rounded-2xl border-white/5">
                 <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Carbon Capture</div>
                 <div className="text-white font-bold">14.2 g/mol</div>
              </div>
              <div className="p-4 glass rounded-2xl border-white/5">
                 <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Energy Req.</div>
                 <div className="text-white font-bold">0.42 eV</div>
              </div>
           </div>

           <p className="text-sm text-slate-400 italic">
             "The engine automatically identifies non-linear dependencies in synthetic bonding that traditional models miss."
           </p>
        </div>
      </div>
    </div>
  );
};

export const SynthesisLoop: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: <Database />, label: "Spectral Intake" },
    { icon: <Sparkles />, label: "Latent Mapping" },
    { icon: <Workflow />, label: "Auto-Synthesis" },
    { icon: <ShieldCheck />, label: "Proof of Concept" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative px-4">
        {/* Connection Line */}
        <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0"></div>
        
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-4 relative z-10">
            <motion.div 
              animate={{ 
                scale: step === i ? 1.25 : 1,
                boxShadow: step === i ? '0 0 30px rgba(168, 85, 247, 0.3)' : '0 0 0px transparent',
              }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 border
                ${step === i ? 'bg-white text-brand-dark border-white' : 'bg-slate-900 text-slate-600 border-white/10'}`}
            >
              {/* Fix: Cast icon to any or ReactElement<any> to resolve size property error */}
              {React.cloneElement(s.icon as React.ReactElement<any>, { size: 28 })}
            </motion.div>
            <span className={`text-[10px] uppercase font-bold tracking-widest transition-all duration-700 ${step === i ? 'text-white opacity-100' : 'text-slate-600 opacity-50'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ImpactChart: React.FC = () => {
    const [mode, setMode] = useState<'speed' | 'efficiency'>('speed');
    const data = {
        speed: { industry: 12, synth: 98, label: 'Optimization Cycles/Hr' },
        efficiency: { industry: 34, synth: 89, label: 'CO2 Hydrogenation %' }
    };

    return (
        <div className="glass rounded-[40px] p-12 overflow-hidden relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
                <div className="max-w-md">
                    <h3 className="text-4xl font-extrabold text-white mb-6">Performance Delta</h3>
                    <div className="flex gap-2 mb-8">
                       {['speed', 'efficiency'].map(m => (
                         <button 
                           key={m}
                           onClick={() => setMode(m as any)}
                           className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${mode === m ? 'bg-white text-brand-dark' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                    <div className="space-y-8">
                       <div className="flex items-center gap-6">
                          <div className="text-slate-500 font-mono text-sm uppercase">Traditional</div>
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                             <motion.div animate={{ width: `${data[mode].industry}%` }} className="h-full bg-slate-600" />
                          </div>
                          <div className="text-slate-400 font-bold min-w-[3rem]">{data[mode].industry}%</div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-white font-mono text-sm uppercase">AeroSynth AI</div>
                          <div className="flex-1 h-4 bg-indigo-500/20 rounded-full overflow-hidden p-1">
                             <motion.div animate={{ width: `${data[mode].synth}%` }} className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
                          </div>
                          <div className="text-indigo-400 font-bold min-w-[3rem]">{data[mode].synth}%</div>
                       </div>
                    </div>
                </div>
                
                <div className="w-full md:w-64 h-64 glass rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Discovery Improvement</div>
                    <div className="text-6xl font-black text-indigo-400 tracking-tighter mb-4">8.2x</div>
                    <p className="text-xs text-slate-400">Achieved via 2.5 billion pre-trained chemical parameters.</p>
                </div>
            </div>
        </div>
    )
}
