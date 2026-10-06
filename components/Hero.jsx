"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  {
    id: 1,
    value: "58%",
    label: "Pickup point usage",
    desc: "Surge in automated terminal adoption",
    code: "01",
  },
  {
    id: 2,
    value: "23%",
    label: "Fewer customer calls",
    desc: "Direct reduction in inbound queue load",
    code: "02",
  },
  {
    id: 3,
    value: "27%",
    label: "Engagement increase",
    desc: "Higher daily active driver interactions",
    code: "03",
  },
  {
    id: 4,
    value: "40%",
    label: "Support overhead reduction",
    desc: "Optimized operational cost per inquiry",
    code: "04",
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
  const statsDividersRef = useRef([]);
  const letterRefs = useRef([]);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 1. Staggered entrance on initial page load
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (!prefersReducedMotion) {
        gsap.set(headlineRef.current, { opacity: 0, y: 24 });
        gsap.set(statsRefs.current, { opacity: 0, y: 16 });
        gsap.set(carRef.current, { opacity: 0, scale: 0.96 });

        introTl
          .to(headlineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.85,
          })
          .to(
            statsRefs.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
            },
            "-=0.5"
          )
          .to(
            carRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.75,
            },
            "-=0.4"
          );
      } else {
        gsap.set([headlineRef.current, statsRefs.current, carRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }

      // 2. Scroll-Driven GSAP ScrollTrigger timeline
      if (roadRef.current && carRef.current && !prefersReducedMotion) {
        const letters = letterRefs.current.filter(Boolean);
        const totalLetters = letters.length;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1500",
            pin: trackRef.current,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const percent = Math.round(progress * 100);

              // Update minimal progress readout via direct DOM reference (zero re-render overhead)
              if (progressTextRef.current) {
                progressTextRef.current.textContent = `${percent}%`;
              }

              // Compute car translation and soft track illumination
              if (roadRef.current && carRef.current) {
                const roadWidth = roadRef.current.clientWidth;
                const carWidth = carRef.current.clientWidth || 160;
                const maxTravel = Math.max(roadWidth - carWidth - 16, 40);
                const currentCarX = progress * maxTravel;

                if (trailRef.current) {
                  trailRef.current.style.width = `${Math.min(currentCarX + carWidth * 0.45, roadWidth)}px`;
                }

                // Sequential letter illumination: crisp, high-contrast pure white typography
                letters.forEach((letterEl, idx) => {
                  if (!letterEl) return;
                  const letterThreshold = (idx + 0.3) / totalLetters;
                  if (progress >= letterThreshold) {
                    letterEl.style.opacity = "1";
                    letterEl.style.color = "#ffffff";
                  } else {
                    letterEl.style.opacity = "0.25";
                    letterEl.style.color = "#6b7280";
                  }
                });

                // Sequential metric highlights with understated active state
                const statMilestones = [0.12, 0.38, 0.65, 0.88];
                statsRefs.current.forEach((metricEl, idx) => {
                  if (!metricEl) return;
                  const dividerEl = statsDividersRef.current[idx];
                  const isActive = progress >= statMilestones[idx];

                  if (isActive) {
                    metricEl.classList.add("text-white");
                    metricEl.classList.remove("text-neutral-400");
                    if (dividerEl) {
                      dividerEl.style.backgroundColor = "rgba(255, 255, 255, 0.45)";
                    }
                  } else {
                    metricEl.classList.remove("text-white");
                    metricEl.classList.add("text-neutral-400");
                    if (dividerEl) {
                      dividerEl.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    }
                  }
                });
              }
            },
          },
        });

        // Car motion physics: restrained launch tilt, centered cruise, deceleration
        scrollTl
          .to(carRef.current, {
            x: () => {
              const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
              const carW = carRef.current ? carRef.current.clientWidth : 160;
              return (roadW - carW - 16) * 0.35;
            },
            rotation: 1.0,
            scale: 1.02,
            ease: "power1.inOut",
            duration: 0.35,
          })
          .to(carRef.current, {
            x: () => {
              const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
              const carW = carRef.current ? carRef.current.clientWidth : 160;
              return (roadW - carW - 16) * 0.72;
            },
            rotation: -0.6,
            scale: 1.03,
            ease: "none",
            duration: 0.35,
          })
          .to(carRef.current, {
            x: () => {
              const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
              const carW = carRef.current ? carRef.current.clientWidth : 160;
              return roadW - carW - 16;
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
    <div ref={containerRef} className="relative w-full bg-[#090A0D] text-gray-100">
      {/* Pinned Viewport Container */}
      <section
        ref={trackRef}
        aria-label="Hero Section"
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden px-5 sm:px-10 md:px-16 py-8 select-none"
      >
        {/* Subtle, restrained top editorial header */}
        <header className="relative z-20 flex items-center justify-between border-b border-white/10 pb-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase font-medium">
              ITZFIZZ / 2026 CAMPAIGN
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span>INDEX</span>
            <span className="text-neutral-600">/</span>
            <span ref={progressTextRef} className="text-white font-medium">
              0%
            </span>
          </div>
        </header>

        {/* Center Section: Editorial Headline & Track */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-7xl mx-auto w-full my-auto py-2">
          {/* Confident Letter-Spaced Headline */}
          <div
            ref={headlineRef}
            className="w-full text-center tracking-[0.25em] sm:tracking-[0.45em] md:tracking-[0.65em] mb-6 sm:mb-10"
          >
            <h1 className="font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl flex flex-wrap justify-center items-center gap-y-2 uppercase leading-none font-sans">
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
                        className="transition-colors duration-150 opacity-25 text-gray-500 select-none inline-block"
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          {/* Minimalist Runway Track */}
          <div
            ref={roadRef}
            className="relative w-full h-[120px] sm:h-[160px] md:h-[190px] bg-[#101217] border-y border-white/10 overflow-hidden flex items-center"
          >
            {/* Minimal architectural track markers */}
            <div className="absolute top-2 left-0 right-0 flex justify-between px-6 text-[10px] font-mono text-neutral-600 pointer-events-none uppercase">
              <span>01 // START</span>
              <span>02</span>
              <span>03</span>
              <span>04 // TERMINAL</span>
            </div>

            {/* Restrained light guide behind the car */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 pointer-events-none z-0 transition-all duration-75"
              style={{
                width: "0px",
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.01) 0%, rgba(16, 185, 129, 0.12) 75%, rgba(16, 185, 129, 0.28) 100%)",
              }}
            />

            {/* Car Visual with Realistic Contact Shadow */}
            <div
              ref={carRef}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 will-change-transform car-shadow"
              style={{
                width: "clamp(120px, 18vw, 220px)",
              }}
            >
              <Image
                src="/car.png"
                alt="Aerodynamic performance car top perspective"
                width={700}
                height={390}
                priority
                className="w-full h-auto object-contain pointer-events-none select-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Clean Editorial Statistics */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pb-2">
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12"
          >
            {STATS_DATA.map((stat, idx) => (
              <article
                key={stat.id}
                ref={(el) => {
                  if (el) statsRefs.current[idx] = el;
                }}
                className="transition-colors duration-300 text-neutral-400 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-inherit">
                      {stat.value}
                    </h2>
                    <span className="text-[10px] font-mono text-neutral-500 font-medium">
                      {stat.code}
                    </span>
                  </div>

                  {/* Clean hairline separator */}
                  <div
                    ref={(el) => {
                      if (el) statsDividersRef.current[idx] = el;
                    }}
                    className="w-full h-px bg-white/10 transition-colors duration-300 mb-2.5"
                  />

                  <h3 className="text-xs sm:text-sm font-medium text-neutral-300">
                    {stat.label}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                    {stat.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Minimal scroll prompt */}
          <div className="mt-6 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span className="tracking-widest uppercase">Scroll to interact</span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span className="text-[10px] uppercase tracking-wider">Scroll</span>
              <ArrowDown className="w-3 h-3 animate-pulse text-neutral-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
