# Portafolio web — Alejandro Abrego

Vite + React 19 + TypeScript + Tailwind v4. Componentes interactivos de React Bits (`src/components/`, instalados con `npx shadcn@latest add @react-bits/<Nombre>-TS-TW`). Mascota 3D "Clawd" en `src/pet/ClaudePet.tsx` (react-three-fiber). Contenido en `src/data.ts`.

- Dev: `npm run dev` · Build: `npm run build` · Deploy a GitHub Pages: `npm run deploy`

## Memoria en grafos (graphify) — obligatorio

1. **Antes** de responder preguntas de arquitectura o de tocar varios archivos, lee `graphify-out/GRAPH_REPORT.md` o consulta `graphify query "<pregunta>"` / `graphify explain "<nodo>"`.
2. **Después** de cambiar código, refresca el grafo (sin LLM): `graphify update .`
3. Luego exporta a la bóveda: `graphify export obsidian --dir bovedaportafolioweb/graphify`

## Bóveda de Obsidian (`bovedaportafolioweb/`)

- `Inicio.md` es el mapa (MOC) del proyecto; enlaza todo desde ahí.
- Cada proceso/sesión de trabajo se registra en `bovedaportafolioweb/Procesos/AAAA-MM-DD <tema>.md` con: qué se hizo, archivos tocados (como `[[wikilinks]]` a las notas de `graphify/`), decisiones y pendientes.
- Usa sintaxis de Obsidian (wikilinks, callouts, propiedades YAML). La carpeta `graphify/` es generada: no editarla a mano.
