import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const bodyGeometry = new RoundedBoxGeometry(1.7, 1.05, 0.95, 4, 0.1);

/**
 * "Clawd" — a fan-made 3D desktop pet inspired by Claude's mascot.
 * One small transparent WebGL canvas moved around in screen space (cheap),
 * while the 3D model inside handles walking, blinking, looking and squash.
 *
 * Behaviours: wanders the floor · looks at the cursor · click = hop + talk ·
 * drag & drop with gravity · falls asleep when idle · comments on each section.
 */

type Mode = 'walk' | 'idle' | 'sleep' | 'drag' | 'air';

type PetState = {
  x: number; y: number; vy: number;
  dir: 1 | -1; mode: Mode; until: number;
  lookX: number; lookY: number;
  landedAt: number; lastActive: number;
};

const CLAY = '#d97757';
const GRAVITY = 2200;
const WALK_SPEED = 70; // px/s
const SLEEP_AFTER = 25_000;

const CLICK_LINES = [
  '¡Hola! Soy Clawd 👋',
  'Arrástrame, no muerdo',
  '¿Ya viste el Traductor LSM?',
  'Psst… Alejandro está buscando oportunidades',
  'Hecho con Three.js ✦',
  'Beep boop. Compilando ideas…',
  '¡Wiii!',
];

const SECTION_LINES: Record<string, string> = {
  top: 'Mueve el mouse sobre el cromo ✦',
  about: 'Este es Alejandro 👀',
  work: 'Haz click en un proyecto ↑',
  experience: 'Banorte, Amazon… nada mal',
  skills: 'Pasa el mouse por las tarjetas',
  contact: '¡Mándale un correo! ✉',
};

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const now = () => performance.now();

function readHidden() {
  try { return localStorage.getItem('clawd-hidden') === '1'; } catch { return false; }
}
function writeHidden(v: boolean) {
  try { localStorage.setItem('clawd-hidden', v ? '1' : '0'); } catch { /* private mode */ }
}

export default function ClaudePet() {
  const size = typeof window !== 'undefined' && innerWidth < 640 ? 96 : 128;
  const reduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [hidden, setHidden] = useState(readHidden);
  const [msg, setMsg] = useState<string | null>(null);
  const [sleeping, setSleeping] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const s = useRef<PetState>({
    x: innerWidth * 0.7, y: 0, vy: 0, dir: -1, mode: 'idle', until: now() + 1500,
    lookX: 0, lookY: 0, landedAt: -1e9, lastActive: now(),
  });

  const msgTimer = useRef<number>(0);
  const say = (text: string, ms = 3200) => {
    setMsg(text);
    clearTimeout(msgTimer.current);
    msgTimer.current = window.setTimeout(() => setMsg(null), ms);
  };

  const hop = (power = 640) => {
    s.current.vy = power;
    s.current.y = Math.max(s.current.y, 1);
    s.current.mode = 'air';
  };

  // Main movement loop (screen space). No React re-render per frame.
  useEffect(() => {
    if (hidden) return;
    let raf = 0;
    let prev = now();
    const tick = () => {
      const t = now();
      const dt = Math.min((t - prev) / 1000, 0.05);
      prev = t;
      const p = s.current;
      const maxX = innerWidth - size;

      if (p.mode === 'air') {
        p.vy -= GRAVITY * dt;
        p.y += p.vy * dt;
        if (p.y <= 0) {
          p.y = 0; p.vy = 0; p.landedAt = t;
          p.mode = 'idle'; p.until = t + 1200 + Math.random() * 1500;
        }
      } else if (p.mode === 'walk') {
        p.x += p.dir * WALK_SPEED * dt;
        if (p.x <= 0 || p.x >= maxX) p.dir = p.x <= 0 ? 1 : -1;
        if (t > p.until) { p.mode = 'idle'; p.until = t + 2000 + Math.random() * 4000; }
      } else if (p.mode === 'idle') {
        if (t - p.lastActive > SLEEP_AFTER) { p.mode = 'sleep'; setSleeping(true); }
        else if (t > p.until && !reduced) {
          p.mode = 'walk'; p.dir = Math.random() < 0.5 ? -1 : 1;
          p.until = t + 3000 + Math.random() * 5000;
        }
      }

      p.x = Math.min(Math.max(p.x, 0), Math.max(maxX, 0));
      if (box.current) box.current.style.transform = `translate3d(${p.x}px, ${-p.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hidden, size, reduced]);

  // Look at the cursor; any activity wakes the pet up
  useEffect(() => {
    if (hidden) return;
    const onMove = (e: PointerEvent) => {
      const p = s.current;
      p.lastActive = now();
      const cx = p.x + size / 2;
      const cy = innerHeight - p.y - size / 2;
      p.lookX = Math.max(-1, Math.min(1, (e.clientX - cx) / 400));
      p.lookY = Math.max(-1, Math.min(1, (cy - e.clientY) / 400));
      if (p.mode === 'sleep') {
        p.mode = 'idle'; p.until = now() + 1500; setSleeping(false);
        say('¡Ah! Estaba soñando con código…');
      }
    };
    const onScroll = () => { s.current.lastActive = now(); };
    addEventListener('pointermove', onMove);
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      removeEventListener('pointermove', onMove);
      removeEventListener('scroll', onScroll);
    };
  }, [hidden, size]);

  // Comment once per section as the visitor scrolls
  useEffect(() => {
    if (hidden) return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        const line = SECTION_LINES[en.target.id];
        if (en.isIntersecting && line && !seen.has(en.target.id)) {
          seen.add(en.target.id);
          say(line);
        }
      }),
      { threshold: 0.35 },
    );
    Object.keys(SECTION_LINES).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [hidden]);

  // Drag & drop / click
  const drag = useRef({ id: -1, sx: 0, sy: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 6) return;
    const p = s.current;
    if (!d.moved) { d.moved = true; p.mode = 'drag'; setSleeping(false); say('¡Wooo, me elevo!', 1800); }
    p.x = e.clientX - size / 2;
    p.y = Math.max(0, innerHeight - e.clientY - size / 2);
    p.vy = 0;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    drag.current.id = -1;
    const p = s.current;
    p.lastActive = now();
    setSleeping(false);
    if (d.moved) { p.mode = 'air'; p.vy = 0; if (Math.random() < 0.5) say('¡Aterrizaje perfecto!', 2000); }
    else { hop(); say(pick(CLICK_LINES)); }
  };

  if (hidden) {
    return (
      <button
        onClick={() => { writeHidden(false); setHidden(false); }}
        className="fixed right-4 bottom-4 z-[70] border border-line bg-ink/80 px-3 py-2 text-[10px] backdrop-blur hover:border-clay"
      >
        ✦ Traer a Clawd
      </button>
    );
  }

  return (
    <div ref={box} className="group/pet pointer-events-none fixed bottom-0 left-0 z-[70] select-none" style={{ width: size, height: size }}>
      {msg && (
        <div
          role="status"
          className="absolute bottom-full left-1/2 mb-1 w-max max-w-[220px] -translate-x-1/2 border border-clay/60 bg-ink/90 px-3 py-2 text-[11px] normal-case text-bone shadow-[0_0_24px_rgba(217,119,87,.25)] backdrop-blur"
        >
          {msg}
        </div>
      )}
      {sleeping && <span className="absolute top-0 right-2 animate-pulse font-display text-2xl italic text-bone/80">z z</span>}

      <button
        aria-label="Clawd, la mascota. Click para saltar, arrastra para moverlo."
        className="group pointer-events-auto absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hop(); say(pick(CLICK_LINES)); } }}
      >
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0.5, 5.2], fov: 32 }} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[-3, 4, 5]} intensity={2.2} />
          <directionalLight position={[3, 1, -2]} intensity={0.8} color="#ffd8c8" />
          <Clawd state={s} />
        </Canvas>
      </button>

      <button
        onClick={() => { writeHidden(true); setHidden(true); }}
        aria-label="Ocultar mascota"
        className="pointer-events-auto absolute top-1 left-1 hidden h-5 w-5 items-center justify-center border border-line bg-ink/80 text-[10px] text-bone/70 opacity-0 transition-opacity group-hover/pet:opacity-100 hover:text-clay focus-visible:opacity-100 md:flex"
      >
        ×
      </button>
    </div>
  );
}

/** The voxel critter. Reads the shared state ref every frame. */
function Clawd({ state }: { state: MutableRefObject<PetState> }) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const legs = useRef<(Mesh | null)[]>([]);
  const arms = useRef<(Mesh | null)[]>([]);
  const blink = useRef({ next: 2, until: 0 });

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const p = state.current;
    if (!root.current || !body.current || !eyes.current) return;

    const walking = p.mode === 'walk';
    const asleep = p.mode === 'sleep';

    // Facing: turn toward walk direction, otherwise toward the cursor
    const targetY = walking ? p.dir * 0.9 : p.lookX * 0.6;
    root.current.rotation.y += (targetY - root.current.rotation.y) * Math.min(1, dt * 6);
    const targetX = asleep ? 0.25 : -p.lookY * 0.25;
    root.current.rotation.x += (targetX - root.current.rotation.x) * Math.min(1, dt * 5);
    // Wobble while dangling
    const targetZ = p.mode === 'drag' ? Math.sin(t * 9) * 0.25 : 0;
    root.current.rotation.z += (targetZ - root.current.rotation.z) * Math.min(1, dt * 8);

    // Bob + squash on landing + breathing while asleep
    const sinceLand = (performance.now() - p.landedAt) / 1000;
    const squash = Math.exp(-sinceLand * 9) * Math.cos(sinceLand * 25) * 0.22;
    const breathe = asleep ? Math.sin(t * 1.6) * 0.04 : 0;
    body.current.position.y = walking ? Math.abs(Math.sin(t * 10)) * 0.08 : 0;
    body.current.scale.set(1 + squash * 0.6, 1 - squash + breathe, 1 + squash * 0.6);

    // Legs: alternate stepping
    legs.current.forEach((leg, i) => {
      if (!leg) return;
      const phase = i % 2 === 0 ? 0 : Math.PI;
      leg.rotation.x = walking ? Math.sin(t * 10 + phase) * 0.6 : p.mode === 'air' || p.mode === 'drag' ? 0.5 : 0;
    });

    // Arms: flap in the air, small sway otherwise
    arms.current.forEach((arm, i) => {
      if (!arm) return;
      const side = i === 0 ? 1 : -1;
      arm.rotation.z = p.mode === 'air' || p.mode === 'drag' ? side * (0.5 + Math.sin(t * 18) * 0.4) : side * Math.sin(t * 2) * 0.06;
    });

    // Eyes: follow the cursor, blink, close when asleep
    eyes.current.position.x = p.lookX * 0.1;
    eyes.current.position.y = 0.12 + p.lookY * 0.06;
    const b = blink.current;
    if (t > b.next) { b.until = t + 0.12; b.next = t + 2.5 + Math.random() * 3; }
    eyes.current.scale.y = asleep ? 0.12 : t < b.until ? 0.1 : 1;
  });

  const legPos: [number, number, number][] = [[-0.52, -0.62, 0.22], [0.52, -0.62, 0.22], [-0.52, -0.62, -0.22], [0.52, -0.62, -0.22]];

  return (
    <group ref={root} position={[0, -0.15, 0]}>
      <group ref={body}>
        <mesh geometry={bodyGeometry}>
          <meshStandardMaterial color={CLAY} roughness={0.55} metalness={0.05} />
        </mesh>
        <group ref={eyes} position={[0, 0.12, 0.48]}>
          {[-0.34, 0.34].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.13, 0.3, 0.04]} />
              <meshStandardMaterial color="#141414" roughness={0.3} />
            </mesh>
          ))}
        </group>
        {[0.95, -0.95].map((x, i) => (
          <mesh key={x} position={[x, -0.05, 0]} ref={(m) => { arms.current[i] = m; }}>
            <boxGeometry args={[0.24, 0.3, 0.5]} />
            <meshStandardMaterial color={CLAY} roughness={0.55} />
          </mesh>
        ))}
      </group>
      {legPos.map((pos, i) => (
        <mesh key={i} position={pos} ref={(m) => { legs.current[i] = m; }}>
          <boxGeometry args={[0.17, 0.32, 0.17]} />
          <meshStandardMaterial color="#b85f42" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}
