"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Zap, TrendingUp, ShieldCheck, ArrowDown, Sparkles } from "lucide-react";

// Ensure GSAP plugins are registered safely on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  {
    id: 1,
    value: "58%",
    label: "Pickup Point Use",
    desc: "Surge in automated terminal pickup adoption",
    icon: TrendingUp,
    activeColor: "#10b981",
    tag: "EFFICIENCY",
  },
  {
    id: 2,
    value: "23%",
    label: "Customer Calls",
    desc: "Direct reduction in inbound support queues",
    icon: Gauge,
    activeColor: "#06b6d4",
    tag: "AUTOMATION",
  },
  {
    id: 3,
    value: "27%",
    label: "User Engagement",
    desc: "Increase in daily active platform interactions",
    icon: Zap,
    activeColor: "#8b5cf6",
    tag: "GROWTH",
  },
  {
    id: 4,
    value: "40%",
    label: "Support Overhead",
    desc: "Lower operational cost per resolved ticket",
    icon: ShieldCheck,
    activeColor: "#f59e0b",
    tag: "OPTIMIZATION",
  },
];

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

export default function Hero() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statsRefs = useRef([]);
  const letterRefs = useRef([]);
  const speedRef = useRef(null);
  const progressRef = useRef(null);

  const [activeStatIndex, setActiveStatIndex] = useState(-1);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Use GSAP context for proper cleanup in React
    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline on page load
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (!prefersReducedMotion) {
        // Initial state setups
        gsap.set(headlineRef.current, { opacity: 0, y: 35 });
        gsap.set(statsRefs.current, { opacity: 0, y: 25 });
        gsap.set(carRef.current, { opacity: 0, scale: 0.95 });

        introTl
          .to(headlineRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.0,
          })
          .to(
            statsRefs.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
            },
            "-=0.6"
          )
          .to(
            carRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
            },
            "-=0.5"
          );
      } else {
        // Reduced motion: instant display
        gsap.set([headlineRef.current, statsRefs.current, carRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }

      // 2. Scroll-Driven Animation with GSAP ScrollTrigger
      if (roadRef.current && carRef.current && !prefersReducedMotion) {
        const letters = letterRefs.current.filter(Boolean);

        // Precompute letter trigger points relative to road container
        const updateLetterPositions = () => {
          if (!headlineRef.current) return [];
          const roadRect = roadRef.current.getBoundingClientRect();
          return letters.map((letter) => {
            if (!letter) return 0;
            const letterRect = letter.getBoundingClientRect();
            return letterRect.left - roadRect.left + letterRect.width * 0.5;
          });
        };

        let letterPositions = updateLetterPositions();

        // Main ScrollTrigger timeline pinned over scroll distance
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1500",
            pin: trackRef.current,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              letterPositions = updateLetterPositions();
            },
            onUpdate: (self) => {
              const progress = self.progress;
              setScrollPercent(Math.round(progress * 100));

              // Compute car's current right-front tip relative to the road
              if (roadRef.current && carRef.current) {
                const roadWidth = roadRef.current.clientWidth;
                const carWidth = carRef.current.clientWidth || 160;
                const maxTravel = Math.max(roadWidth - carWidth - 24, 60);
                const currentCarX = progress * maxTravel;
                const carLeadPoint = currentCarX + carWidth * 0.75;

                // Update light trail width
                if (trailRef.current) {
                  trailRef.current.style.width = `${Math.min(currentCarX + carWidth * 0.45, roadWidth)}px`;
                }

                // Dynamic letter illumination
                letterPositions.forEach((pos, idx) => {
                  const letterEl = letters[idx];
                  if (!letterEl) return;
                  if (carLeadPoint >= pos) {
                    letterEl.style.opacity = "1";
                    letterEl.style.color = "#ffffff";
                    letterEl.style.textShadow =
                      "0 0 16px rgba(16, 185, 129, 0.9), 0 0 32px rgba(16, 185, 129, 0.5)";
                  } else {
                    letterEl.style.opacity = "0.2";
                    letterEl.style.color = "#6b7280";
                    letterEl.style.textShadow = "none";
                  }
                });

                // Update active statistic milestone
                if (progress < 0.12) {
                  setActiveStatIndex(-1);
                } else if (progress < 0.38) {
                  setActiveStatIndex(0);
                } else if (progress < 0.65) {
                  setActiveStatIndex(1);
                } else if (progress < 0.88) {
                  setActiveStatIndex(2);
                } else {
                  setActiveStatIndex(3);
                }
              }
            },
          },
        });

        // Drive car across track with subtle dynamic physics (tilt & micro-scale)
        scrollTl
          // Segment 1: Acceleration & subtle launch tilt
          .to(carRef.current, {
            x: () => {
              const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
              const carW = carRef.current ? carRef.current.clientWidth : 160;
              return (roadW - carW - 24) * 0.35;
            },
            rotation: 1.2,
            scale: 1.02,
            ease: "power1.inOut",
            duration: 0.35,
          })
          // Segment 2: High-speed cruising through center milestone
          .to(carRef.current, {
            x: () => {
              const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
              const carW = carRef.current ? carRef.current.clientWidth : 160;
              return (roadW - carW - 24) * 0.72;
            },
            rotation: -0.8,
            scale: 1.04,
            ease: "none",
            duration: 0.35,
          })
          // Segment 3: Deceleration to end boundary
          .to(carRef.current, {
            x: () => {
              const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
              const carW = carRef.current ? carRef.current.clientWidth : 160;
              return roadW - carW - 24;
            },
            rotation: 0,
            scale: 1.0,
            ease: "power1.out",
            duration: 0.3,
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#08090D] text-gray-100">
      {/* Pinned Viewport Container */}
      <section
        ref={trackRef}
        aria-label="Hero Section"
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6 select-none"
      >
        {/* Ambient background glow & grid */}
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
        <div className="ambient-glow w-[500px] h-[500px] bg-emerald-600/10 top-1/4 left-1/3" />
        <div className="ambient-glow w-[400px] h-[400px] bg-cyan-600/10 -bottom-10 right-1/4" />

        {/* Top Bar: Telemetry & Navigation */}
        <header className="relative z-20 flex items-center justify-between border-b border-white/10 pb-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-emerald-400 font-semibold uppercase">
              KINETIC ENGINE // SYSTEM V2.4
            </span>
          </div>

          {/* Real-time telemetry HUD */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono">
            <div className="hidden sm:flex items-center gap-2 text-gray-400">
              <span>VELOCITY:</span>
              <span className="text-emerald-400 font-bold">
                {Math.round(scrollPercent * 3.2)} KM/H
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <span className="text-gray-400">PROGRESS:</span>
              <span className="text-emerald-400 font-bold">{scrollPercent}%</span>
            </div>
          </div>
        </header>

        {/* Center Canvas: Giant Headline & Animated Road / Car */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-7xl mx-auto w-full my-auto py-4">
          {/* Main Dominant Headline */}
          <div
            ref={headlineRef}
            className="w-full text-center tracking-[0.25em] sm:tracking-[0.45em] md:tracking-[0.6em] mb-4 sm:mb-8"
          >
            <h1 className="font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl flex flex-wrap justify-center items-center gap-y-2 uppercase leading-tight">
              {HEADLINE_TEXT.split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="inline-flex items-center mx-2 sm:mx-4">
                  {word.split("").map((char, charIdx) => {
                    const globalIdx = wordIdx * 10 + charIdx;
                    return (
                      <span
                        key={charIdx}
                        ref={(el) => {
                          if (el) letterRefs.current[globalIdx] = el;
                        }}
                        className="transition-all duration-150 opacity-25 text-gray-500 select-none inline-block transform hover:scale-110"
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          {/* Road / Kinetic Track */}
          <div
            ref={roadRef}
            className="relative w-full h-[140px] sm:h-[180px] md:h-[210px] bg-gradient-to-b from-[#11141c] to-[#0c0e14] border-y border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center"
          >
            {/* Track centerline dashes */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <div className="w-full border-b border-dashed border-white/15 h-0" />
            </div>

            {/* Neon Speed Markers on Track */}
            <div className="absolute top-2 left-0 right-0 flex justify-between px-6 text-[10px] font-mono text-gray-600 pointer-events-none uppercase">
              <span>00 // START</span>
              <span>25 // SECTOR A</span>
              <span>50 // APEX</span>
              <span>75 // SECTOR B</span>
              <span>100 // TERMINAL</span>
            </div>

            {/* Glowing neon emission trail behind the car */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 pointer-events-none z-0 transition-all duration-75"
              style={{
                width: "0px",
                background:
                  "linear-gradient(90deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0.25) 80%, rgba(16, 185, 129, 0.6) 100%)",
                boxShadow: "0 0 35px rgba(16, 185, 129, 0.4)",
              }}
            />

            {/* Animated Car Visual */}
            <div
              ref={carRef}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 cursor-grab active:cursor-grabbing will-change-transform"
              style={{
                width: "clamp(120px, 18vw, 220px)",
                filter:
                  "drop-shadow(0 15px 25px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(16,185,129,0.3))",
              }}
            >
              <Image
                src="/car.png"
                alt="High Performance Aerodynamic Supercar Top View"
                width={700}
                height={390}
                priority
                className="w-full h-auto object-contain pointer-events-none select-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: 4 Interactive Impact / Statistic Blocks */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pb-2">
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
          >
            {STATS_DATA.map((stat, idx) => {
              const Icon = stat.icon;
              const isActive = activeStatIndex >= idx;

              return (
                <article
                  key={stat.id}
                  ref={(el) => {
                    if (el) statsRefs.current[idx] = el;
                  }}
                  className={`p-3 sm:p-4 rounded-xl transition-all duration-300 transform ${
                    isActive ? "glass-panel-active scale-[1.02]" : "glass-panel opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: isActive ? `${stat.activeColor}25` : "rgba(255,255,255,0.05)",
                        color: isActive ? stat.activeColor : "#9ca3af",
                      }}
                    >
                      {stat.tag}
                    </span>
                    <Icon
                      className="w-4 h-4 transition-transform duration-300"
                      style={{ color: isActive ? stat.activeColor : "#6b7280" }}
                    />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h2
                      className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
                      style={{ color: isActive ? "#ffffff" : "#d1d5db" }}
                    >
                      {stat.value}
                    </h2>
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-gray-200 mt-1 line-clamp-1">
                    {stat.label}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {stat.desc}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Scroll down prompt cue */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
            <span className="tracking-widest uppercase">Scroll Down to Drive</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
          </div>
        </div>
      </section>
    </div>
  );
}
