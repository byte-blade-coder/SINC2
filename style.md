# SINC 3D - Design & Style System

This document outlines the design philosophy, styling conventions, and animation principles used across the SINC 3D application.

## 1. Design Philosophy
The visual language of SINC 3D is designed to feel **cinematic, premium, and highly technical**. It combines deep, immersive backgrounds with vibrant, energetic accents (cyan and deep blues) to reflect our focus on maritime defense, telemetry, and advanced sensory systems. 

Key principles:
- **Depth & Dimension:** Use of ambient background glows, layered transparencies, and glassmorphism.
- **Cinematic Pacing:** Scroll-driven storytelling using large typographic masks, zoom reveals, and shutter transitions.
- **Technical Precision:** Tight tracking, sharp borders, and mono-spaced utility texts to emphasize an engineering-first identity.

## 2. Typography
We utilize modern, clean, and highly legible fonts, prioritizing distinct visual hierarchies:

- **Display (Headings & Large Numbers):** 
  - *Primary Font:* `font-display` (e.g., `Satoshi`, `Inter`, or `Outfit` based on global CSS).
  - *Style:* `font-black`, `tracking-tighter`, uppercase/lowercase mixed based on context.
- **Body & Accents:**
  - *Primary Font:* `font-sans` for main readable paragraphs.
  - *Accents:* Monospaced or highly-tracked uppercase text (e.g., `text-[10px] tracking-[0.25em] uppercase`) for technical labels (badges, tags).

## 3. Color Palette
Our color system relies on high contrast against very dark backgrounds:

- **Backgrounds:**
  - Deep Space/Ocean: `#050505` to `#0b0b0b`
  - Elevated Cards: `#ffffff` (when inverted) or `rgba(255, 255, 255, 0.05)` (glass)
- **Primary Accents:**
  - Cyan / Electric Blue: `#2ba9e3` to `#0284c7` (used for active states, gradients, and hover effects).
- **Text:**
  - Primary: `#ffffff` (White)
  - Secondary/Muted: `rgba(255,255,255, 0.7)` down to `0.3`.
  - Inverted Text (for white shutter panels): `#111827` (Dark Gray).

## 4. Glassmorphism & Borders
To achieve the premium tech feel without visual clutter:

- **Backdrops:** `backdrop-blur-md` to `backdrop-blur-xl`.
- **Backgrounds:** `bg-white/5` or `bg-black/40`.
- **Borders:** Extremely subtle, e.g., `border-white/10` or `border-white/[0.04]` to define edges on dark backgrounds.
- **Shadows:** Minimal, relying more on ambient glowing orbs behind containers.

## 5. Animation & Interactions
Animations are driven primarily by scroll progress to ensure a 1-to-1 connection between user input and screen feedback.

- **Tools:** `framer-motion` (for spring physics and useTransform), `gsap` (for complex ScrollTriggers), `lenis` (for smooth scrolling).
- **Transitions:**
  - **Shutter Blinds:** Used to transition between dark (cinematic) and light (informational) sections. Layers slide out sequentially or fold up.
  - **Ambient Floating:** Infinite CSS keyframes (`animate-float-slow-1`, `animate-float-slow-2`) for background glowing orbs to keep the page alive even when stationary.
  - **Micro-interactions:** Hovering over cards scales the image (`scale-105`), translates arrows (`translate-x-0.5`), and transitions borders.

## 6. CSS Overrides & Globals
In addition to Tailwind CSS, we use standard global overrides in `index.css` (or inline `<style>` tags) for:
- Hiding scrollbars (`no-scrollbar`).
- Creating smooth, performant background blurs (`filter: blur(120px)`).
- Applying text-inversion utilities (`.invert-text`) when the dark theme dynamically transitions to a light theme during scroll-masking.
