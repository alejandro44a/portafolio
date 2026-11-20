import { useEffect, useRef, useState } from 'react';
import DecryptedText from '@/components/DecryptedText';
import TiltedCard from '@/components/TiltedCard';
import { projects, type Project } from '@/data';
import { asset } from '@/hooks';

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const [shot, setShot] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Floating preview that trails the cursor over the list (desktop only)
  useEffect(() => {
    const move = (e: PointerEvent) => {
      preview.current?.animate({ transform: `translate(${e.clientX + 24}px, ${e.clientY - 90}px)` }, { duration: 450, fill: 'forwards', easing: 'cubic-bezier(.2,.8,.2,1)' });
    };
    addEventListener('pointermove', move);
    return () => removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    if (open) {
      setShot(0);
      dialog.current?.showModal();
    }
  }, [open]);

  return (
    <section id="work" className="px-4 py-24 sm:px-6">
      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-line pb-3 text-bone/60 md:grid-cols-[minmax(0,3fr)_1fr_1.5fr_auto]">
        <span>Proyectos seleccionados</span>
        <span className="hidden md:block">Tipo</span>
        <span className="hidden md:block">Stack</span>
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>

      <ul onPointerLeave={() => setHovered(null)}>
        {projects.map((p, i) => (
          <li key={p.title} className="border-b border-line">
            <button
              onPointerEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onClick={() => setOpen(p)}
              className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-4 py-5 text-left uppercase transition-[padding] duration-300 hover:pl-3 md:grid-cols-[minmax(0,3fr)_1fr_1.5fr_auto]"
            >
              <span className="display text-[12vw] sm:text-6xl md:whitespace-nowrap lg:text-7xl">
                {p.title}
                <span className="ml-2 align-top font-mono text-[11px] text-bone/50">./{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="hidden text-bone/70 md:block">{p.kind}</span>
              <span className="hidden text-bone/70 md:block">{p.tech.slice(0, 3).join(' / ')}</span>
              <span className="whitespace-nowrap group-hover:text-clay">
                <DecryptedText text="Ver +" animateOn="hover" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-44 w-64 overflow-hidden border border-line transition-opacity duration-300 md:block"
        style={{ opacity: hovered === null ? 0 : 1 }}
      >
        {hovered !== null && <img src={asset(projects[hovered].images[0])} alt="" className="h-full w-full object-cover" />}
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
