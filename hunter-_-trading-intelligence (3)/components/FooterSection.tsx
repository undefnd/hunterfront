
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { motion } from "framer-motion";

export default function FooterSection({ onLaunchAnalysis }: { onLaunchAnalysis: () => void }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center py-24">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true, margin: "-100px" }} 
          className="mb-16"
        >
          <h3 className="font-space-grotesk font-bold text-3xl md:text-5xl lg:text-6xl text-foreground max-w-4xl leading-tight">
            The First Indicator Toolkit That Isn't Dogshit Vaporware
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          viewport={{ once: true, margin: "-100px" }} 
          className="flex flex-col md:flex-row md:items-center gap-8"
        >
          <button 
            onClick={onLaunchAnalysis}
            className="font-inter text-sm text-foreground px-8 py-4 border border-hunter-text-dim hover:border-primary hover:text-primary transition-all duration-300 w-fit"
          >
            Launch Workbench
          </button>

          <span className="font-inter text-xs text-hunter-text-dim uppercase tracking-[0.2em]">
            System Ver: 2.5.0 Alpha
          </span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.4 }} 
        viewport={{ once: true }} 
        className="absolute bottom-0 left-0 right-0 py-8 border-t border-hunter-border"
      >
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-space-grotesk font-bold text-lg text-foreground uppercase tracking-widest">
            Hunter
          </div>

          <div className="flex items-center gap-8">
            <span className="font-inter text-xs text-hunter-text-dim uppercase tracking-widest">EST. 2025</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
