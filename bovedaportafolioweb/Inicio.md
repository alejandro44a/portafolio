---
tags: [moc, portafolio]
repo: https://github.com/alejandro44a/portafolio
---

# Portafolio web — Mapa

> [!info] Cómo está organizada esta bóveda
> - `graphify/` — grafo de conocimiento del código, generado por graphify (una nota por nodo + canvas). Ábrelo con la **vista de grafo** de Obsidian.
> - `Procesos/` — bitácora de cada sesión de trabajo.

## Grafo del código

- Canvas: [[graphify/graph.canvas]] · Reporte: `graphify-out/GRAPH_REPORT.md` · Vista interactiva: `graphify-out/graph.html`
- 15 comunidades: App Shell & Sections, Dev Toolchain, Runtime Dependencies, shadcn & React Bits Config, Magnet, ClickSpark, DecryptedText, SplitText, TiltedCard, TypeScript Config, ScrollVelocity, LiquidChrome, Noise, SpotlightCard, Brand Identity & Fonts

## Arquitectura

- **Contenido**: `src/data.ts` (perfil, proyectos, experiencia, skills)
- **Secciones**: TopBar → Hero → About → Work → Experience → Skills → Footer (`src/sections/`)
- **React Bits**: DecryptedText, SplitText, LiquidChrome, Noise, ClickSpark, SpotlightCard, Magnet, ScrollVelocity, TiltedCard (`src/components/`)
- **Mascota**: Clawd 3D, `src/pet/ClaudePet.tsx`

## Bitácora

- [[2026-11-20 Rediseño futurista + mascota Clawd]]
