import LiquidChrome from '@/components/LiquidChrome';
import DecryptedText from '@/components/DecryptedText';
import SplitText from '@/components/SplitText';
import { profile } from '@/data';
import { useClock } from '@/hooks';

const chromeMask = 'radial-gradient(ellipse 34% 42% at 50% 52%, #000 30%, transparent 100%)';

export default function Hero() {
  const time = useClock();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pt-20 pb-6 sm:px-6">
      <div className="pointer-events-auto absolute inset-0 -z-0" style={{ maskImage: chromeMask, WebkitMaskImage: chromeMask }} aria-hidden>
        <LiquidChrome color="#c9ccd6" speed={0.25} amplitude={0.35} interactive />
      </div>

      <h1 className="display pointer-events-none relative z-10 text-center text-[17vw] sm:text-[14.5vw]">
        <SplitText text="Ingeniero" tag="span" className="block" splitType="chars" delay={35} trigger="load" />
        <span className="block">
          <span className="italic">d</span>e <span className="holo">software</span>
        </span>
      </h1>

      <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
        <p className="text-bone/70">(En formación)</p>
        <p className="text-bone/70">
          Actualmente en Nuevo León
          <br />— {time} (CST)
        </p>
        <p className="font-medium">
          ■ <DecryptedText text={profile.name} animateOn="view" speed={45} maxIterations={14} />
        </p>
        <p className="text-bone/70">
          {profile.semester} —
          <br />
          {profile.school}
        </p>
      </div>

      <div className="relative z-10 mt-10 flex items-end justify-between gap-6">
        <p className="max-w-xs">
          Apps móviles, juegos e IA aplicada —<span className="caret"> construido para ser recordado.</span>
        </p>
        <a href="#work" className="hud shrink-0 px-3 py-2 transition-colors hover:bg-bone hover:text-ink">
          Ver proyectos ↓
        </a>
      </div>
    </section>
  );
}
