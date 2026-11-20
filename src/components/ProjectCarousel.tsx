import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data';
import { asset } from '@/hooks';

/**
 * Cylinder ("drum") carousel modelled on lolawilde.com: the centre card faces you and is
 * a bit larger, neighbours sit on a curved drum and turn away on both sides.
 * Drag, wheel, arrow keys or the buttons move it; clicking the centre card opens the project.
 *
 * ponytail: the ring needs >= 9 slots so a card wrapping from one end to the other is
 * always invisible while it travels; with fewer projects the list is repeated to fill it.
 */

const RING = 9;
const VISIBLE = 3; // cards shown on each side (the 3rd one fades out)
const STEP_DEG = 22;

type Props = { projects: Project[]; onOpen: (p: Project) => void };

function useCardSize() {
  const get = () => (innerWidth < 640 ? { w: 220, h: 330 } : { w: 300, h: 460 });
  const [size, setSize] = useState(get);
  useEffect(() => {
    const on = () => setSize(get());
    addEventListener('resize', on);
    return () => removeEventListener('resize', on);
  }, []);
  return size;
}

export default function ProjectCarousel({ projects, onOpen }: Props) {
  const P = projects.length;
  const copies = Math.max(1, Math.ceil(RING / P));
  const slides = Array.from({ length: P * copies }, (_, i) => projects[i % P]);
  const N = slides.length;

  const { w, h } = useCardSize();
  const gap = w < 300 ? 20 : 56;
  const radius = (w + gap) / (STEP_DEG * Math.PI / 180); // arc between centres = card + gap

  const [index, setIndex] = useState(0); // unbounded, so transitions always go the short way
  const [drag, setDrag] = useState(0); // live drag offset in slide units
  const dragRef = useRef<{ x: number; moved: boolean; id: number } | null>(null);
  const justDragged = useRef(false); // swallow the click that follows a drag
  const wheelLock = useRef(0);

  const active = ((index % N) + N) % N;
  const go = (delta: number) => setIndex((i) => i + delta);

  // signed shortest distance of slide i from the (fractional) current position
  const offsetOf = (i: number) => {
    const pos = active + drag;
    let d = (i - pos) % N;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (d.moved) setDrag(-dx / (w + gap));
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    if (d.moved) {
      justDragged.current = true;
      setTimeout(() => (justDragged.current = false), 50);
      const steps = Math.round(drag) || (Math.abs(drag) > 0.15 ? Math.sign(drag) : 0);
      setDrag(0);
      go(steps);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return;
    const now = performance.now();
    if (now - wheelLock.current < 450) return;
    wheelLock.current = now;
    go(Math.sign(e.deltaX));
  };

  const dragging = drag !== 0;

  return (
    <div className="relative">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Proyectos"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'Enter') onOpen(slides[active]);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        className="relative mx-auto cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing"
        style={{ height: h * 1.22, perspective: 1300, perspectiveOrigin: '50% 45%' }}
      >
        {slides.map((p, i) => {
          const d = offsetOf(i);
          const ad = Math.abs(d);
          const shown = ad <= VISIBLE + 0.4;
          const isCenter = ad < 0.5;
          const scale = 1 + 0.14 * Math.max(0, 1 - ad);
          const opacity = ad <= VISIBLE - 0.6 ? 1 : Math.max(0, (VISIBLE + 0.4 - ad) / 1);
          const n = (i % P) + 1;

          return (
            <div
              key={i}
              aria-hidden={!isCenter}
              onClick={() => {
                if (justDragged.current) return;
                if (isCenter) onOpen(p);
                else go(Math.round(d));
              }}
              className="absolute top-1/2 left-1/2 cursor-pointer overflow-hidden rounded-[18px] bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]"
              style={{
                width: w,
                height: h,
                marginLeft: -w / 2,
                marginTop: -h / 2,
                transform: `translateZ(${-radius}px) rotateY(${d * STEP_DEG}deg) translateZ(${radius}px) scale(${scale})`,
                opacity: shown ? opacity : 0,
                zIndex: 100 - Math.round(ad * 10),
                filter: `brightness(${1 - Math.min(ad, 3) * 0.09}) saturate(1.12)`,
                transition: dragging ? 'none' : 'transform .8s cubic-bezier(.2,.8,.2,1), opacity .6s, filter .6s',
                pointerEvents: shown ? 'auto' : 'none',
              }}
            >
              <img src={asset(p.images[0])} alt={p.title} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
              {/* legibility scrims — only top and bottom, so the screenshot keeps its colour */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

              <p className="absolute inset-x-0 top-5 text-center text-[11px] font-medium tracking-[0.2em] text-white/90">
                {String(n).padStart(2, '0')}
                {isCenter && <span> · {p.kind}</span>}
              </p>

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pb-6 text-center">
                <h3
                  className="font-sans text-[26px] leading-[1.02] font-extrabold tracking-[-0.03em] text-white normal-case sm:text-[34px]"
                  style={{ textShadow: '0 2px 18px rgba(0,0,0,.55)' }}
                >
                  {p.title}
                </h3>
                <span
                  className="inline-flex items-center gap-2 rounded-full bg-[#f3efe8] px-5 py-2.5 font-sans text-sm font-semibold text-ink normal-case tracking-normal transition-all duration-500"
                  style={{ opacity: isCenter ? 1 : 0, transform: `translateY(${isCenter ? 0 : 10}px)` }}
                >
                  ▶ Ver proyecto
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mt-6 flex items-center justify-center gap-6">
        <button onClick={() => go(-1)} aria-label="Proyecto anterior" className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line transition-colors hover:border-bone">
          ←
        </button>
        <span className="font-sans text-base font-semibold tracking-normal">
          {String((active % P) + 1).padStart(2, '0')} <span className="text-bone/45">/ {String(P).padStart(2, '0')}</span>
        </span>
        <button onClick={() => go(1)} aria-label="Proyecto siguiente" className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line transition-colors hover:border-bone">
          →
        </button>
      </div>
    </div>
  );
}
