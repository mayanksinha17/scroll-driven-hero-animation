"use client";

import React from "react";
import { Cpu, Zap, Activity, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";

const ARCHITECTURE_FEATURES = [
  {
    title: "Zero-Lag GSAP ScrollTrigger",
    description: "Calculated with transforms (x, rotation, scale) to prevent GPU layout reflows and deliver solid 60/120fps scrolling.",
    icon: Zap,
    metric: "120 FPS Target",
  },
  {
    title: "Responsive Viewport Mapping",
    description: "Dynamic bounding rect interpolation ensuring letter illuminates precisely regardless of screen aspect ratio or mobile orientation.",
    icon: Layers,
    metric: "Fluid clamp()",
  },
  {
    title: "Dynamic Light Trail Synthesis",
    description: "Multi-stop alpha gradient that dynamically syncs with the car's leading edge with zero frame stuttering.",
    icon: Activity,
    metric: "0ms DOM delay",
  },
  {
    title: "Accessible Motion Controls",
    description: "Native prefers-reduced-motion media query detection with graceful fallback to static high-contrast rendering.",
    icon: Cpu,
    metric: "WCAG 2.1 AA",
  },
];

export default function Features() {
  return (
    <section className="relative z-20 bg-[#08090D] border-t border-white/10 px-4 sm:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Engine Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              ENGINEERED FOR <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                SCROLL-DRIVEN PRECISION
              </span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm sm:text-base">
            Reproducing physical velocity on the web through hardware-accelerated transforms and pinned scroll timeline orchestration.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCHITECTURE_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400/90 font-semibold">{feature.metric}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
          <p>© 2026 Scroll-Driven Hero Animation. Built with Next.js, Tailwind CSS & GSAP ScrollTrigger.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production Ready</span>
            </span>
            <span>Inspired by Reference Concept</span>
          </div>
        </div>
      </div>
    </section>
  );
}
