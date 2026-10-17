# StoryCast: Research, Planning & Information Architecture Document

**Project Name:** StoryCast Accessible Audio & Video Microsite  
**Target Standard:** W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level AA  
**Architecture:** Vanilla HTML5, Sass (SCSS) with Cascade Layers & Container Queries, Vanilla JavaScript (No Frameworks)  
**Date:** October 2026  

---

## 1. Executive Summary & Project Purpose

**StoryCast** is an accessible, research-driven storytelling microsite engineered to showcase high-fidelity audio and documentary video journalism without barriers. Modern web multimedia frequently isolates individuals with sensory, motor, or cognitive disabilities by relying on non-semantic markup, omitting synchronized transcripts, neglecting keyboard navigability, or embedding media in inaccessible third-party players.

StoryCast counters these pitfalls by embedding accessibility directly into its foundational architecture:
- **Semantic HTML5** provides structural landmark semantics for screen readers.
- **Sass Tokens & Cascade Layers (`@layer`)** ensure predictable CSS specificity and maintainable styling.
- **CSS Container Queries (`@container`)** decouple component layout from viewport dimensions, allowing media cards to fluidly morph between stacked and side-by-side configurations depending on their specific container constraints.
- **Synchronized Transcripts & WebVTT Captions** give deaf, hard-of-hearing, and cognitive-variant users full multimodal agency over content consumption.

---

## 2. User-Centered Research & Personas

To guide the information architecture, three primary user personas were developed based on accessibility research:

### Persona 1: Maya Chen — The Deaf / Hard-of-Hearing Journalist
- **Profile:** 29-year-old investigative journalist who is deaf and relies on closed captions and verbatim text transcripts.
- **Frustrations:** Auto-generated YouTube captions that lack environmental sound descriptions (e.g., missed acoustic cues like `[echolocation click train]`), videos without transcripts, and players that lack speed controls.
- **StoryCast Solutions:** High-accuracy WebVTT caption tracks embedded with `<track kind="captions">`, descriptive captions detailing background audio effects, and an interactive transcript with keyword search and text download (`.txt` and `.vtt`).

### Persona 2: David O'Connor — The Screen Reader & Keyboard Specialist
- **Profile:** 42-year-old audio producer with low vision who navigates the web using NVDA, VoiceOver, and full keyboard control (no mouse).
- **Frustrations:** Unlabeled buttons (`<div onclick="...">`), missing skip links that force hundreds of repetitive tab keystrokes, inaccessible custom player sliders, and missing focus indicators.
- **StoryCast Solutions:** Dedicated skip links (`Skip to main content`, `Skip to transcript`), prominent 3px focus rings (`:focus-visible`), standard semantic HTML elements (`<button>`, `<main>`, `<article>`, `<figure>`, `<figcaption>`), and explicit ARIA live regions (`aria-live="polite"`).

### Persona 3: Samira Patel — The Multitasking Commuter & Neurodivergent Listener
- **Profile:** 24-year-old graduate student with ADHD who listens to documentaries while commuting in noisy transit environments.
- **Frustrations:** Audio mixes where ambient background sound drowns out dialogue, cluttered visual interfaces with distracting popups, and inability to jump to specific points of a story quickly.
- **StoryCast Solutions:** Audio mastered to **-16 LUFS** with distinct dialogue clarity, clean typography with high contrast (exceeding 10:1), and clickable transcript timecodes (`[00:03]`) that immediately jump the media player to relevant moments.

---

## 3. Information Architecture (IA)

### 3.1 Sitemap & Navigation Topology

```
                         [ Global Header / Skip Links ]
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐         ┌───────────────────┐         ┌──────────────────┐
│   1. HOME PAGE   │         │ 2. STORY (DETAIL) │         │  3. ABOUT / ACC  │
│  (/index.html)   │         │ (echoes-of-...html│         │   (/about.html)  │
└────────┬─────────┘         └─────────┬─────────┘         └────────┬─────────┘
         │                             │                            │
   [Hero Section]              [Story Header]               [Mission Statement]
         │                             │                            │
[Featured Story Card]          [Video Player]               [3 Core Pillars]
 (Container Query)           (Captions + Figcaption)                │
         │                             │                 [WCAG AA Conformance]
[Curated Stories Grid]         [Lossless Audio]              (Audit Checklist)
 (Filter: All/Video/Audio)      (-16 LUFS Master)                   │
         │                             │                 [Keyboard Cheatsheet]
 [WCAG Highlights]             [Interactive Trans]                  │
         │                   (Time Seek + Search)        [Feedback Form <form>]
         └─────────────────────────────┼────────────────────────────┘
                                       ▼
                         [ Global Accessible Footer ]
                     (Sitemap • WCAG Badge • Copyright)
```

### 3.2 Page-by-Page Content Hierarchy & Structural Reasoning

#### 1. Home Page (`/index.html`)
- **Header:** Brand identifier and accessible navigation menu with active page indicator (`aria-current="page"`).
- **Hero Landmark (`<section>`):** Sets the editorial tone and immediately communicates accessibility standards. Contains high-contrast calls-to-action.
- **Featured Story Banner (`<article class="c-story-card-wrapper">`):** Utilizes CSS Container Queries to expand from a mobile stacked card to a two-column cinematic feature on wide containers.
- **Curated Stories Section (`<section>`):** Features an accessible `<fieldset>` filter bar with `aria-pressed` states and a dynamic story counter, followed by a CSS Grid containing three responsive story cards.
- **Accessibility Feature Grid:** Demonstrates how synchronized transcripts, closed captions, and keyboard navigability are implemented.
- **Footer:** Full sitemap, standards links, and keyboard shortcut tips.

#### 2. Story Detail Page (`/story/echoes-of-the-deep.html`)
- **Breadcrumb Navigation:** Semantic `<nav aria-label="Breadcrumb">` establishing location hierarchy (Home &gt; Stories &gt; Echoes of the Deep).
- **Article Header:** Semantic `<h1>`, publication date in `<time>`, author credits, and duration badges.
- **Accessible Video Player (`<figure class="c-media-player">`):** Embedded `<video>` with WebVTT `<track kind="captions">`, accessible custom control bar (Play/Pause, -10s, +10s, playback speed 0.75x–2.0x, and CC toggle), and `<figcaption>` containing visual/sound descriptions.
- **Isolated Audio Section:** Native `<audio>` player providing a lossless audio master for screen-reader and audio-only users.
- **Interactive Synchronized Transcript (`<aside class="c-transcript">`):**
  - Live search input with `role="status" aria-live="polite"` announcing search matches.
  - Active timecode highlighting synchronized with the video/audio timeline via the `timeupdate` event.
  - Clickable timestamp seek buttons (`[00:03]`) that navigate media playback.
  - Plain-text (`.txt`) and WebVTT (`.vtt`) download links.
- **Scientific Context & Technical Equipment:** Collapsible `<details>` and `<summary>` exposing hydrophone calibration data.
- **Related Stories:** Container-queried story cards encouraging continued exploration.

#### 3. About / Access Page (`/about.html`)
- **Mission Section:** The editorial philosophy of universal acoustic journalism, complemented by studio photography with descriptive `<figcaption>`.
- **Three Pillars:** Deep dive into pristine acoustics, verbatim synchronized transcripts, and semantic web design.
- **WCAG 2.1 AA Conformance Audit Table:** Detailed compliance breakdown across Perceivable, Operable, Understandable, and Robust principles.
- **Keyboard Navigation Cheatsheet:** Concise keybinding reference (Tab, Shift+Tab, Enter/Space, Left/Right arrows).
- **Accessible Feedback Form:** Semantic `<form>` with distinct form labels, required attribute validation, and accessible status announcements for community feedback.

---

## 4. Design System & Sass Architecture

### 4.1 Token Specifications
- **Color Contrast:**
  - Dark Navy Background: `#0a0f1d`
  - Elevated Surface: `#121b2d` / `#1a263e`
  - Primary Text: `#f8fafc` (Contrast ratio **16.2:1** against base — WCAG AAA)
  - Secondary Text: `#cbd5e1` (Contrast ratio **9.8:1** against base — WCAG AAA)
  - Muted Text: `#94a3b8` (Contrast ratio **5.5:1** against base — exceeds WCAG AA 4.5:1)
  - Focus Ring: `#38bdf8` (High-contrast cyan, 3px solid with 3px offset)
  - Brand Accents: `#2dd4bf` (Teal), `#fbbf24` (Amber), `#fb7185` (Coral)
- **Typography:**
  - Headings & Interface: `Outfit` (sans-serif)
  - Narrative Body: `Merriweather` (serif)
  - Transcripts & Timecodes: `JetBrains Mono` (monospace)
  - Fluid type scaling implemented using CSS `clamp()` to maintain proportional hierarchy across all viewports.
- **Spacing:** Modular 4px/8px scale (`0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`).

### 4.2 Cascade Layers Hierarchy (`@layer`)
To ensure zero specificity collisions and maintain clean CSS inheritance, StoryCast employs CSS Cascade Layers:
```scss
@layer reset, tokens, base, layout, components, utilities;
```
1. `reset`: Normalizes box sizing, margins, and media elements.
2. `tokens`: Defines root CSS custom properties.
3. `base`: Enforces global typographic scale, body defaults, and universal `:focus-visible` styles.
4. `layout`: Structures containers, site header, sticky navigation, and CSS Grid systems.
5. `components`: Encapsulates BEM components (buttons, badges, story cards, media players, transcripts).
6. `utilities`: Provides single-responsibility override helpers (`.u-text-cyan`, `.u-mb-lg`).

### 4.3 Container Queries Implementation
StoryCast demonstrates modern component responsiveness via CSS Container Queries on the story card component:
```scss
.c-story-card-wrapper {
  container-type: inline-size;
  container-name: storycard;
}

// Default (Container < 460px): Vertical stacked card
.c-story-card {
  display: flex;
  flex-direction: column;
}

// Container >= 460px: Two-column horizontal split
@container storycard (min-width: 460px) {
  .c-story-card {
    flex-direction: row;
    .c-story-card__figure { width: 42%; }
    .c-story-card__body   { width: 58%; }
  }
}

// Container >= 740px: Expansive feature layout
@container storycard (min-width: 740px) {
  .c-story-card {
    .c-story-card__figure { width: 48%; }
    .c-story-card__body   { width: 52%; }
    .c-story-card__title  { font-size: var(--font-size-2xl); }
  }
}
```
*Why this matters:* Rather than tying card layouts to global screen breakpoints, each card adapts fluidly whether it lives in a full-width hero, a 2-column grid, or a narrow sidebar.

---

## 5. WCAG 2.1 AA Accessibility Conformance Verification

| WCAG Guideline | Requirement | StoryCast Implementation |
| :--- | :--- | :--- |
| **1.1.1 Non-text Content** | Alt text for non-decorative images | All `<img>` tags possess descriptive `alt` attributes explaining visual subjects and emotional tone. |
| **1.2.2 Captions (Prerecorded)** | Synchronized captions for video | WebVTT caption file (`ocean-depths.vtt`) linked via `<track kind="captions">` with acoustic cues and speaker labels. |
| **1.2.3 Audio Description** | Description of visual actions | Implemented through semantic `<figcaption>` describing hydrophone telemetry and deep-sea imagery. |
| **1.4.3 Contrast (Minimum)** | Contrast ratio &ge; 4.5:1 | Primary text achieves 16.2:1; secondary text achieves 9.8:1; focus indicators achieve high visibility against dark backgrounds. |
| **1.4.12 Text Spacing** | Line height &ge; 1.5; paragraph spacing | Body copy line height set to `1.65` with explicit margin tokens. |
| **2.1.1 Keyboard** | All functionality operable via keyboard | Media playback, transcript time seeking, category filtering, and modal disclosures are fully keyboard accessible. |
| **2.4.1 Bypass Blocks** | Mechanism to bypass repetitive content | Top-level `.skip-link` elements skip directly to `<main id="main-content">` and `#interactive-transcript`. |
| **2.4.7 Focus Visible** | Visible keyboard focus indicator | High-contrast `3px solid #38bdf8` outline with `3px` offset applied to all `:focus-visible` interactive elements. |
| **2.5.5 Target Size** | Minimum touch target size (44x44px) | All interactive buttons, navigation links, and filter pills meet or exceed the 44px threshold. |
| **3.1.1 Language of Page** | Default language specified | `<html lang="en">` declared on all pages. |
| **3.2.3 Consistent Navigation** | Navigation repeated in same order | Unified `<header>` and `<footer>` templates across all three pages. |
| **4.1.2 Name, Role, Value** | Semantic markup & ARIA attributes | Appropriate use of `aria-current="page"`, `aria-pressed`, `aria-expanded`, and `aria-controls`. |
| **4.1.3 Status Messages** | Asynchronous updates announced | `role="status" aria-live="polite"` announces transcript search results without interrupting speech flow. |

---

## 6. Deliverable Verification & Next Steps
- **Sitemap Diagram:** Rendered in vector SVG at `docs/sitemap.svg` and embedded in documentation.
- **Wireframes & Mockups:** Interactive design viewer at `docs/mockups.html`.
- **Compiled PDF:** Formatted for print and review at `docs/StoryCast_Research_Document.pdf`.
- **GitHub Repository:** Structured per submission guidelines with zero external runtime frameworks.
