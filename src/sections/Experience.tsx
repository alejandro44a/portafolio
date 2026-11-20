import SectionTitle from '@/components/SectionTitle';
import { education, experience } from '@/data';

function Row({ left, title, sub, right, points }: { left: string; title: string; sub: string; right: string; points?: string[] }) {
  return (
    <li className="grid gap-3 border-b border-line py-6 md:grid-cols-[1fr_2fr_2fr_auto] md:items-baseline">
      <span className="text-bone/50">{left}</span>
      <span className="display text-5xl sm:text-6xl">{title}</span>
      <span className="text-bone/75">
        {sub}
        {points && (
          <span className="mt-2 block normal-case text-bone/55">
            {points.map((p) => (
              <span key={p} className="block">
                — {p}
              </span>
            ))}
          </span>
        )}
      </span>
      <span className="text-bone/60">{right}</span>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6">
      <SectionTitle text="Trayectoria" italic={5} count={experience.length} note="Experiencia laboral — equipo, clientes y operaciones." />
      <ul className="mt-10 border-t border-line">
        {experience.map((e, i) => (
          <Row key={e.company} left={`./0${i + 1}`} title={e.company} sub={e.role} right={e.period} points={e.points} />
        ))}
      </ul>

      <p className="mt-24 border-b border-line pb-3 text-bone/60">Formación</p>
      <ul>
        {education.map((e) => (
          <Row key={e.school} left={e.status} title={e.degree} sub={e.school} right={e.period} />
        ))}
      </ul>
    </section>
  );
}
