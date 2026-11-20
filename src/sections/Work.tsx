import { useEffect, useRef, useState } from 'react';
import DepthCarousel from '@/components/DepthCarousel';
import TiltedCard from '@/components/TiltedCard';
import { projects, type Project } from '@/data';
import { asset } from '@/hooks';

const CARD_W = 600;
const CARD_H = 840;

/** DepthCarousel only takes images, so each project card is painted to a canvas:
 *  cover image + gradient + index + title (like the cards on lolawilde.com). */
async function paintCard(p: Project, i: number): Promise<string> {
  const img = new Image();
  img.src = asset(p.images[0]);
  await img.decode();
  try { await document.fonts.load('88px "Instrument Serif"'); } catch { /* fallback serif */ }

  const c = document.createElement('canvas');
  c.width = CARD_W;
  c.height = CARD_H;
  const g = c.getContext('2d')!;

  const s = Math.max(CARD_W / img.width, CARD_H / img.height);
  g.drawImage(img, (CARD_W - img.width * s) / 2, (CARD_H - img.height * s) / 2, img.width * s, img.height * s);

  const fade = g.createLinearGradient(0, CARD_H * 0.38, 0, CARD_H);
  fade.addColorStop(0, 'rgba(0,0,0,0)');
  fade.addColorStop(0.55, 'rgba(0,0,0,.72)');
  fade.addColorStop(1, 'rgba(0,0,0,.95)');
  g.fillStyle = fade;
  g.fillRect(0, 0, CARD_W, CARD_H);
  const top = g.createLinearGradient(0, 0, 0, 120);
  top.addColorStop(0, 'rgba(0,0,0,.6)');
  top.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = top;
  g.fillRect(0, 0, CARD_W, 120);

  g.fillStyle = 'rgba(255,255,255,.85)';
  g.textAlign = 'center';
  g.font = '500 22px "JetBrains Mono", monospace';
  g.fillText(`${String(i + 1).padStart(2, '0')} · ${p.kind.toUpperCase()}`, CARD_W / 2, 56);

  g.fillStyle = '#fff';
  g.font = '88px "Instrument Serif", serif';
  // wrap title on spaces, bottom-anchored
  const words = p.title.toUpperCase().split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (g.measureText(next).width > CARD_W - 80 && line) { lines.push(line); line = w; } else line = next;
  }
  lines.push(line);
  lines.forEach((l, k) => g.fillText(l, CARD_W / 2, CARD_H - 70 - (lines.length - 1 - k) * 84));

  return c.toDataURL('image/jpeg', 0.9);
}

export default function Work() {
  const [cards, setCards] = useState<{ image: string; alt: string }[]>([]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const [shot, setShot] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let alive = true;
    Promise.all(projects.map(paintCard)).then((urls) => {
      if (alive) setCards(urls.map((image, i) => ({ image, alt: projects[i].title })));
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (open) {
      setShot(0);
      dialog.current?.showModal();
    }
  }, [open]);

  const p = projects[current];

  return (
    <section id="work" className="px-4 py-24 sm:px-6">
      <div className="flex items-end justify-between border-b border-line pb-3 text-bone/60">
        <span>Proyectos seleccionados</span>
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>

      <div className="mt-12 flex min-h-[560px] items-center justify-center">
        {cards.length > 0 && (
          <DepthCarousel
            items={cards}
            cardWidth={320}
            cardHeight={460}
            radius={18}
            spread={300}
            depth={160}
            tilt={28}
            visibleCards={4}
            tint="#0b0b0c"
            showIndicators={false}
            onChange={(i) => setCurrent(i)}
          />
        )}
      </div>

      <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="text-bone/60">
          {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {p.kind} · {p.tech.slice(0, 3).join(' / ')}
        </p>
        <p className="max-w-md text-bone/80 normal-case">{p.summary}</p>
        <button onClick={() => setOpen(p)} className="hud cursor-pointer px-5 py-3 transition-colors hover:bg-bone hover:text-ink">
          ▶ Ver proyecto
        </button>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-[92svh] w-[min(960px,calc(100vw-32px))] overflow-y-auto border border-line bg-ink p-0 text-bone"
      >
        {open && (
          <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2">
            <div>
              <TiltedCard
                imageSrc={asset(open.images[shot])}
                altText={open.title}
                containerHeight="360px"
                imageHeight="360px"
                imageWidth="100%"
                containerWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.03}
                glare={0.25}
                radius={0}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {open.images.map((img, i) => (
                  <button key={img} onClick={() => setShot(i)} aria-label={`Imagen ${i + 1}`} className={`h-12 w-16 overflow-hidden border ${i === shot ? 'border-clay' : 'border-line opacity-60'}`}>
                    <img src={asset(img)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="display text-6xl">{open.title}</h3>
                <button onClick={() => dialog.current?.close()} className="hud px-3 py-2 hover:bg-bone hover:text-ink">
                  Cerrar
                </button>
              </div>
              <p className="text-bone/60">{open.kind}</p>
              <p className="normal-case text-sm leading-relaxed text-bone/85">{open.description}</p>
              <ul className="space-y-1.5">
                {open.features.map((f) => (
                  <li key={f}>
                    <span className="text-clay">→</span> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {open.tech.map((t) => (
                  <span key={t} className="border border-line px-2 py-1 text-bone/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
