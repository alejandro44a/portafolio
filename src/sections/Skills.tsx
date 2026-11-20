import SpotlightCard from '@/components/SpotlightCard';
import { skills } from '@/data';

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6">
      <div className="mb-10 flex items-end justify-between border-b border-line pb-3 text-bone/60">
        <span>Capacidades</span>
        <span>ES nativo · EN intermedio</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <SpotlightCard key={s.title} spotlightColor="rgba(217, 119, 87, 0.22)" className="hud h-full !rounded-none">
            <div className="flex h-full flex-col gap-6 p-2">
              <div className="flex justify-between text-bone/50">
                <span>{s.title}</span>
                <span>0{i + 1}</span>
              </div>
              <ul className="display space-y-1 text-3xl leading-[0.95]">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
