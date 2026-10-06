"use client";

import React from "react";
import { Cpu, Zap, Activity, Layers, ArrowUpRight } from "lucide-react";

const ARCHITECTURE_FEATURES = [
  {
    code: "01",
    title: "Hardware Transform Scrubbing",
    description: "Orchestrated with GPU-accelerated translate3d and rotation matrices to eliminate layout recalculations.",
    icon: Zap,
    metric: "120 FPS Target",
  },
  {
    code: "02",
    title: "Dynamic Viewport Calibration",
    description: "Responsive threshold mapping ensures precise character revelation across both desktop and compact mobile screens.",
    icon: Layers,
    metric: "Fluid clamp()",
  },
  {
    code: "03",
    title: "Light Guide Synthesis",
    description: "A multi-stop gradient emission directly synced to the vehicle's leading edge without frame drops.",
    icon: Activity,
    metric: "0ms DOM delay",
  },
  {
    code: "04",
    title: "Motion Accessibility",
    description: "Native media query detection honoring system reduced-motion preferences with static high-contrast rendering.",
    icon: Cpu,
    metric: "WCAG 2.1 AA",
  },
];

export default function Features() {
  return (
    <section className="relative z-20 bg-[#090A0D] border-t border-white/10 px-5 sm:px-10 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Confident Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase mb-3 block">
              ENGINEERING NOTE // 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight font-sans">
              ENGINEERED FOR <br className="hidden sm:inline" />
              SCROLL-DRIVEN PRECISION
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm sm:text-base leading-relaxed">
            Translating physical velocity to the digital medium via pinned timeline orchestration and GPU-accelerated motion layers.
          </p>
        </div>

        {/* Feature Grid: Clean Architectural Hairline Cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {ARCHITECTURE_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-8 border-r border-b border-white/10 bg-[#0c0e12]/60 hover:bg-[#11141a] transition-colors duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-neutral-500">{feature.code}</span>
                    <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 font-medium">{feature.metric}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <p>© 2026 Scroll-Driven Hero Animation. Next.js & GSAP ScrollTrigger.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Production Build</span>
            <span>Inspired by Reference Concept</span>
          </div>
        </div>
      </div>
    </section>
  );
}
