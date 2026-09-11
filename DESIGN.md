# DESIGN.md — Klinik Fenida

## Brand

- Name: Klinik Fenida (pasien umum)
- Voice: Calm, Clinical, Warm
- Anti-patterns: startup-bro, purple-glow AI, editorial mewah, playful chat, marquee dekoratif

## Color System

Source: 21st id 6553 Julien Thibeaut (ibelick) Light theme Tailwind CSS Background Snippet + user palette.

- BG: `#FFFFFF` + grid `#0F355C` 8% (14px) + radial `#8AB4F8` 16% top. Pola asli BgLightGridGradient2 + BgLightGradient3 dari repo publik ibelick/background-snippets, tint disesuaikan. Applied on `body` in globals.css, all pages
- Ink: `#0F355C` — body text, primary buttons, navy panels
- On Ink: `#FFFFFF`
- Accent: `#8AB4F8` — radial glow only, one role
- Earth: `#46351D` — secondary captions, kickers
- Tint: `#F7EFE3` — kartu sekunder (bayar), hover sekunder
- Surface: `#FFFFFF` — solid cards
- Glass: `white/55 + backdrop-blur-xl + border white/70` — floating bars and previews only
- Destructive: `#DC2626`. On destructive: `#FFFFFF`
- Focus ring: `#0F355C`

Dark mode: not shipped. Single light clinical theme.

## Material rule

Glass only for floating elements (navbar, hero preview, CTA). Content sections use solid
surface or solid navy. Never glass-on-glass stacks.

## Typography

Source: user request — Plus Jakarta Sans (heading + body).

- Heading Font: Plus Jakarta Sans (600/700, tracking-tight)
- Body Font: Plus Jakarta Sans (400/500/600)
- H1: Plus Jakarta Sans 700, 40px mobile / 56px desktop, leading 1.05, max 2 lines
- H2: Plus Jakarta Sans 700, 30px / 36px, tracking-tight
- Body: Plus Jakarta Sans 400, 16px, leading relaxed, max 65ch
- Small: Plus Jakarta Sans 500/600, 13-14px
- Mono: Geist Mono (codes only: booking code)

## Spacing

Base 4px. Section padding py-14 md:py-20. Content max-w 1120px, side margin 24px.

## Grid

Breakpoints sm 640, md 768, lg 1024. Container max-w 1120px center.

## Radius (lock)

- Cards: 8px (`rounded-lg`), everywhere
- Buttons: `rounded-lg` (8px), solid ink, teks saja tanpa ikon, hover gelap 85%. Referensi: 21st Minimal Button (13568, understated by design) + ui-layouts buttons (hover states, no decoration). Tanpa pill, tanpa ikon, tanpa shadow, tanpa gradient.
- Inputs: 8px (`rounded-lg`), everywhere

## Elevation

- Level 1: `0 20px 60px -20px rgba(15,53,92,0.35)` tinted navy, glass floats
- Level 0: flat, solid content cards with border only

## Motion

- Entrance: 280ms ease-out, opacity + translateY 16px max, above fold only
- Stagger: 70ms between bento children only
- Hover: 150ms, transform/opacity only. Active: scale 0.98
- No marquee, no blobs, no scroll-jacking, no pinned scenes
- Reduced motion: all animation disabled via media query

## Component Patterns

- Hero: split 50/50, left copy, right product preview (mini booking + queue card)
- Info: single-row fact strip, solid, no ticker
- Features: asymmetric bento, exactly 3 cells, mixed surfaces
- Steps: vertical stack, numbered solid cards
- Visit: solid navy panel with bring-checklist
- CTA: single centered card, one intent label
- Footer: minimal navy bar, no fake contact

## Image Style

No photography until clinic provides assets. Hero visual is an honest labeled
component preview ("Contoh"), not a fake screenshot. No stock hotlinks.

## Accessibility

- WCAG AA: body 4.5:1, large text 3:1. Ink on white 12.6:1. White on ink 12.6:1
- Focus visible on all interactive elements. Touch targets min 44px
- Semantic landmarks, one h1, logical h2 order. Form labels real, never placeholder-only
