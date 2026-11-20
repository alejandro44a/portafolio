import Magnet from '@/components/Magnet';
import { profile } from '@/data';
import { useClock } from '@/hooks';

export default function Footer() {
  const time = useClock();

  return (
    <footer id="contact" className="relative flex min-h-[100svh] flex-col justify-between px-4 pt-28 pb-6 sm:px-6">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-6 text-bone/60">Gracias por pasar &</p>
        <h2 className="display text-[22vw] leading-[0.78] sm:text-[15vw]">
          Nos <span className="italic text-clay">v</span>emos
          <br />
          pronto!
        </h2>
        <Magnet padding={80} magnetStrength={3} wrapperClassName="mt-12">
          <a href={`mailto:${profile.email}`} className="hud inline-block px-6 py-4 text-sm transition-colors hover:bg-bone hover:text-ink">
            ✉ Escríbeme
          </a>
        </Magnet>
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-line pt-5 sm:grid-cols-2 md:grid-cols-4">
        <p className="text-bone/70">
          ¿Tienes un proyecto o vacante?
          <br />
          Me encantaría escucharlo.
        </p>
        <p>
          <span className="text-bone/60">Escríbeme</span>
          <br />
          <a href={`mailto:${profile.email}`} className="link-u normal-case">
            {'{ '}
            {profile.email}
            {' }'}
          </a>
        </p>
        <p>
          <span className="text-bone/60">GitHub / Tel</span>
          <br />
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-u">
            alejandro44a ↗
          </a>{' '}
          · <a href={`tel:${profile.phone}`} className="link-u">{profile.phone}</a>
        </p>
        <p className="text-bone/70">
          {profile.coords[0]} {profile.coords[1]}
          <br />
          {profile.location} — {time}
        </p>
      </div>
      <p className="mt-6 text-[10px] text-bone/40">
        © {new Date().getFullYear()} {profile.name} · Diseñado y construido con React, Three.js & React Bits · Mascota fan-made inspirada en Claude
      </p>
    </footer>
  );
}
