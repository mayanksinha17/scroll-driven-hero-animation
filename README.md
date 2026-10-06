# Scroll-Driven Hero Animation

## Overview

A high-performance, scroll-driven interactive hero section animation built using **Next.js**, **Tailwind CSS**, and **GSAP ScrollTrigger**. As the user scrolls down, the hero section remains pinned while a supercar traverses across a kinetic track, leaving an energetic light trail that dynamically illuminates the headline letters ("**WELCOME ITZFIZZ**") in real time and highlights sequential impact metric blocks.

---

## Features

- **Scroll-Driven Hero Animation**: Direct scroll progression controls the car's trajectory, dynamic physics tilt, and trail width.
- **GSAP ScrollTrigger & Pinning**: Pinned viewport during the interactive sequence with seamless release into subsequent content.
- **Staggered Entrance Animation**: Smooth page-load reveal for typography, metric cards, and telemetry HUD using GSAP timelines.
- **Dynamic Letter Illumination**: Real-time bounding-rect calculations illuminate individual characters as the car's leading point passes them.
- **Milestone-Based Statistic Cards**: Four interactive metric blocks (58%, 23%, 27%, 40%) that dynamically activate as the car reaches milestone percentages.
- **Smooth Reverse Scrubbing**: Fully reversible physics-based animation when scrolling back to the top.
- **Responsive Design**: Tailored layout supporting 375px mobile (2x2 grid), tablet, and desktop (4-column) viewports without horizontal overflow.
- **Performance-Focused Transforms**: Exclusively GPU-accelerated properties (`x`, `rotation`, `scale`, `opacity`) ensuring solid 60/120 FPS.
- **Accessibility**: Native `prefers-reduced-motion` detection and semantic HTML markup.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Tokens
- **Animation Engine**: [GSAP](https://gsap.com/) & [ScrollTrigger Plugin](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Run Locally

Clone the repository and install dependencies:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Build & Export

To build and generate a static export:

```bash
npm run build
```

The static output is generated in the `out/` directory, ready for deployment on GitHub Pages or Vercel.

---

## Live Demo

- **Live Demo**: *[Add your live deployment URL here]*

---

## GitHub Repository

- **Repository**: *[Add your GitHub repository URL here]*

---

## Reference

Inspired by the concept reference:
[https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## Disclaimer

This project is an independent educational recreation inspired by the referenced concept to demonstrate modern GSAP ScrollTrigger techniques, responsive frontend engineering, and interaction design. It is not affiliated with or endorsed by the original creator.
