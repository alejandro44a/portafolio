import { useEffect, useState } from 'react';
import DecryptedText from '@/components/DecryptedText';
import { useClock } from '@/hooks';

const links = [
  ['Proyectos', '#work'],
  ['Sobre mí', '#about'],
  ['Trayectoria', '#experience'],
] as const;

export default function TopBar() {
  const [progress, setProgress] = useState(0);
  const time = useClock();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-4 px-4 py-4 mix-blend-difference sm:px-6">
      <div className="flex w-32 flex-col gap-1.5 sm:w-48">
        <div className="h-[3px] w-full border border-bone/60" aria-hidden>
          <div className="h-full bg-bone" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="text-[10px] text-bone/70">{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
      </div>

      <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="link-u">
            <DecryptedText text={label} animateOn="hover" speed={40} />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden text-bone/70 sm:inline">MTY {time} (CST)</span>
        <a href="#contact" className="hud px-3 py-2 transition-colors hover:bg-bone hover:text-ink">
          Contacto
        </a>
      </div>
    </header>
  );
}
