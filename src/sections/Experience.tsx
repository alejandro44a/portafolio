import { useEffect, useRef } from 'react';
import { Briefcase, Building2, Calendar } from 'lucide-react';

interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Banorte',
    period: '2024 – 2025',
    role: 'Operaciones Bancarias',
    description: [
      'Uso de sistemas informáticos para gestión de operaciones bancarias',
      'Atención y orientación a clientes en diferentes trámites',
      'Colaboración en equipo para cumplir metas de servicio',
    ],
  },
  {
    company: 'Amazon',
    period: '2021 – 2022',
    role: 'Control de Inventarios',
    description: [
      'Control y verificación de inventarios',
      'Clasificación y acomodamiento de paquetes',
      'Coordinación con equipo de trabajo para cumplir tiempos de entrega',
    ],
  },
  {
    company: 'MESA',
    period: '2019 – 2020',
    role: 'Apoyo en Producción',
    description: [
      'Apoyo en inventarios y control de materiales',
      'Apoyo en limpieza y organización del área de trabajo',
      'Asistencia en procesos de producción',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0-initial');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0-initial mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Trayectoria
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Experiencia Laboral</h2>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`animate-on-scroll opacity-0-initial relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 hidden md:block" />

                {/* Content - Alternating sides on desktop */}
                <div
                  className={`${
                    index % 2 === 0
                      ? 'md:text-right md:pr-8'
                      : 'md:col-start-2 md:pl-8'
                  }`}
                >
                  <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-lg">
                        {exp.company}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-2 mb-4 text-sm text-muted-foreground ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>

                    <ul className="space-y-2 text-left">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
