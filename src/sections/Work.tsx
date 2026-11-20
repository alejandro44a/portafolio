import { useEffect, useRef, useState } from 'react';
import ProjectCarousel from '@/components/ProjectCarousel';
import SectionTitle from '@/components/SectionTitle';
import TiltedCard from '@/components/TiltedCard';
import { projects, type Project } from '@/data';
import { asset } from '@/hooks';

export default function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const [shot, setShot] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      setShot(0);
      dialog.current?.showModal();
    }
  }, [open]);

  return (
    <section id="work" className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6">
      {/* warm glow under the drum, like the reference */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_55%_at_50%_70%,rgba(217,119,87,.16),transparent_70%)]" />

      <SectionTitle text="Proyectos" italic={5} count={projects.length} note="Apps, juegos e IA — construidos de principio a fin." />

      <div className="relative mt-10 sm:mt-6">
        <ProjectCarousel projects={projects} onOpen={setOpen} />
      </div>

      <p className="relative mt-8 max-w-[260px] font-sans text-sm leading-snug font-semibold tracking-normal text-bone/50 normal-case md:absolute md:bottom-10 md:left-6 md:mt-0">
        Arrastra para explorar. Toca el proyecto del centro para ver los detalles.
      </p>

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
