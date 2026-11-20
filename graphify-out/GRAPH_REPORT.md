# Graph Report - portafoliowebalejandroabrego  (2026-11-20)

## Corpus Check
- 29 files · ~22,383 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 268 nodes · 443 edges · 15 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.83)
- Token cost: 68,091 input · 0 output

## Graph Freshness
- Built from commit: `c709a22e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App Shell & Sections
- Dev Toolchain
- ClaudePet.tsx
- shadcn & React Bits Config
- Magnet Hover Physics
- ClickSpark Effects
- DecryptedText Scramble
- SplitText.tsx
- TiltedCard 3D Tilt
- TypeScript Config
- LiquidChrome WebGL Shader
- Noise Grain Overlay
- SpotlightCard Glow
- Brand Identity & Fonts
- Portafolio web — Alejandro Abrego

## God Nodes (most connected - your core abstractions)
1. `react` - 18 edges
2. `compilerOptions` - 13 edges
3. `App()` - 12 edges
4. `DecryptedText()` - 10 edges
5. `Magnet()` - 8 edges
6. `ClickSpark` - 8 edges
7. `SectionTitle()` - 7 edges
8. `Work()` - 7 edges
9. `SplitText()` - 7 edges
10. `asset()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Skills()` --calls--> `SpotlightCard()`  [EXTRACTED]
  src/sections/Skills.tsx → src/components/SpotlightCard.tsx
- `Work()` --calls--> `TiltedCard()`  [EXTRACTED]
  src/sections/Work.tsx → src/components/TiltedCard.tsx
- `App()` --calls--> `ClickSpark`  [EXTRACTED]
  src/App.tsx → src/components/ClickSpark.tsx
- `App()` --calls--> `Noise()`  [EXTRACTED]
  src/App.tsx → src/components/Noise.tsx
- `App()` --calls--> `About()`  [EXTRACTED]
  src/App.tsx → src/sections/About.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Head resources: Google Fonts stack** — index_portfolio_page, index_google_fonts, index_instrument_serif_font, index_jetbrains_mono_font [INFERRED 0.85]

## Communities (15 total, 0 thin omitted)

### Community 0 - "App Shell & Sections"
Cohesion: 0.14
Nodes (24): react, App(), ClaudePet, ProjectCarousel(), Props, useCardSize(), SectionTitle(), education (+16 more)

### Community 1 - "Dev Toolchain"
Cohesion: 0.05
Nodes (50): dependencies, clsx@^2.1.1, gsap@^3.15.1, @gsap/react@^2.1.2, lucide-react@^1.77.0, motion@^12.43.0, react@^19.3.1, react-dom@^19.3.1 (+42 more)

### Community 2 - "ClaudePet.tsx"
Cohesion: 0.24
Nodes (11): bodyGeometry, ClaudePet(), Clawd(), CLICK_LINES, Mode, now(), PetState, pick() (+3 more)

### Community 3 - "shadcn & React Bits Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, registries, @react-bits (+9 more)

### Community 4 - "Magnet Hover Physics"
Cohesion: 0.16
Nodes (15): arbitrate(), attach(), DEFAULT_SPRING, Entry, field, Magnet(), MagnetAxis, MagnetProps (+7 more)

### Community 5 - "ClickSpark Effects"
Cohesion: 0.17
Nodes (15): Burst, channels(), clamp(), ClickSpark, ClickSparkEasing, ClickSparkHandle, ClickSparkProps, ClickSparkShape (+7 more)

### Community 6 - "DecryptedText Scramble"
Cohesion: 0.17
Nodes (15): advance(), DecryptedText(), DecryptedTextProps, Engine, flipFrames(), FontMetrics, Frame, glyphWidths (+7 more)

### Community 7 - "SplitText.tsx"
Cohesion: 0.11
Nodes (21): FADE_STEPS, OUTLINE_STYLE, ScrollVelocity(), ScrollVelocityProps, useElementWidth(), VelocityMapping, VelocityText(), VelocityTextProps (+13 more)

### Community 8 - "TiltedCard 3D Tilt"
Cohesion: 0.20
Nodes (13): Axis, clamp(), EDGE_STYLE, GLARE_STYLE, OrientationRequest, parseColor(), Settings, smoother() (+5 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.13
Nodes (14): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+6 more)

### Community 11 - "LiquidChrome WebGL Shader"
Cohesion: 0.27
Nodes (10): clamp(), compile(), link(), LiquidChrome(), LiquidChromeProps, parseColor(), Program, Settings (+2 more)

### Community 12 - "Noise Grain Overlay"
Cohesion: 0.33
Nodes (9): BLENDS, clamp(), drawHair(), drawSpeck(), generator(), Noise(), NoiseBlendMode, NoiseProps (+1 more)

### Community 13 - "SpotlightCard Glow"
Cohesion: 0.27
Nodes (9): clamp(), falloff(), Palette, Settings, SHAPES, SpotlightCard(), SpotlightCardProps, SpotlightShape (+1 more)

### Community 14 - "Brand Identity & Fonts"
Cohesion: 0.38
Nodes (6): Alejandro Abrego, Google Fonts, Instrument Serif, JetBrains Mono, Portfolio landing page (index.html), UANL (Universidad Autonoma de Nuevo Leon)

### Community 16 - "Portafolio web — Alejandro Abrego"
Cohesion: 0.50
Nodes (3): Bóveda de Obsidian (`bovedaportafolioweb/`), Memoria en grafos (graphify) — obligatorio, Portafolio web — Alejandro Abrego

## Knowledge Gaps
- **1 isolated node(s):** `UANL (Universidad Autonoma de Nuevo Leon)`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 114 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Shell & Sections` to `Dev Toolchain`, `ClaudePet.tsx`, `Magnet Hover Physics`, `ClickSpark Effects`, `DecryptedText Scramble`, `SplitText.tsx`, `TiltedCard 3D Tilt`, `LiquidChrome WebGL Shader`, `Noise Grain Overlay`, `SpotlightCard Glow`?**
  _High betweenness centrality (0.434) - this node is a cross-community bridge._
- **What connects `UANL (Universidad Autonoma de Nuevo Leon)` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell & Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.14264264264264265 - nodes in this community are weakly interconnected._
- **Should `Dev Toolchain` be split into smaller, more focused modules?**
  _Cohesion score 0.05117845117845118 - nodes in this community are weakly interconnected._
- **Should `shadcn & React Bits Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `SplitText.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11333333333333333 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._