---
fecha: 2026-11-20
tags: [proceso, rediseño, mascota]
estado: hecho
---

# Rediseño futurista + mascota Clawd

Volver a [[Inicio]]

## Qué se hizo

- Se migró el contenido del portafolio v1 (`alejandro44a/portafolio`, shadcn genérico) a un sitio nuevo con estética editorial-futurista inspirada en adrienquechon.com: serif gigante (Instrument Serif), etiquetas mono (JetBrains Mono), fondo grafito, blob de cromo líquido en WebGL, texto que se descifra, reloj en vivo de Monterrey.
- Stack: Vite 8 + React 19 + TS + Tailwind v4. Se quitaron ~40 componentes shadcn sin uso y las dependencias de Radix.
- React Bits añadido vía shadcn registry `@react-bits`.
- Mascota **Clawd** (fan-made, inspirada en Claude): voxel 3D en react-three-fiber, camina por el borde inferior, sigue el cursor con la mirada, salta y habla al hacer click, se arrastra y cae con gravedad, se duerme a los 25 s sin actividad, comenta cada sección. Se puede ocultar (se recuerda en localStorage).

## Decisiones

> [!note] Rendimiento
> La mascota es un canvas pequeño (128 px) que se mueve en pantalla; three.js (~250 KB gzip) se carga de forma diferida con `lazy()`.

> [!note] Años de proyectos
> El v1 no tenía fechas por proyecto; no se inventaron. Se usan índices `./01`.

## Publicación

- PR [#1](https://github.com/alejandro44a/portafolio/pull/1) fusionado en `main` (commit `8b8b321`). Se sacaron del repo `node_modules/` y `dist/` que estaban versionados.
- `npm run deploy` → rama `gh-pages` → en vivo: https://alejandro44a.github.io/portafolio/

> [!warning] Credenciales de git
> El administrador de credenciales de Windows tiene guardada la cuenta `alejandroctr23`, que no tiene permiso en este repo. Para hacer push/deploy usa la sesión de `gh` (cuenta `alejandro44a`):
> `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push`

## Pendientes

- [x] Publicar en GitHub Pages.
- [ ] Añadir links reales (repo/demo) a cada proyecto en `src/data.ts`.
- [x] Skills oficiales de Obsidian instaladas (plugin `obsidian@obsidian-skills`).

## Iteración: carrusel 3D de proyectos (referencia lolawilde.com)

- La sección [[src_sections_work_work|Work]] pasó de lista a **carrusel 3D en profundidad** con el componente `DepthCarousel` de React Bits.
- `DepthCarousel` solo acepta imágenes, así que cada tarjeta se pinta en un `<canvas>` (imagen + degradado + número + título) y se pasa como data URL. Debajo, el botón *Ver proyecto* abre el modal existente.
- Se retiró la vista previa que seguía al cursor.
