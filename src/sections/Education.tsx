import { useEffect, useRef } from 'react';
import { GraduationCap, School, Calendar, Award } from 'lucide-react';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status: string;
  description?: string;
  logo?: string;
}

const educationItems: EducationItem[] = [
  {
    institution: 'Universidad Autónoma de Nuevo León (UANL)',
    degree: 'Ingeniería en Software',
    period: '2022 – 2027',
    status: 'En curso - 6to semestre',
    description:
      'Formación en desarrollo de software, programación orientada a objetos y herramientas tecnológicas.',
    logo: '/UANL-Logo.png',
  },
  {
    institution: 'CECyTE García 1',
    degree: 'Técnico en Sistemas Informáticos',
    period: '2018 – 2021',
    status: 'Completado',
    description:
      'Capacitación técnica en sistemas informáticos, mantenimiento de equipos y redes.',
  },
];

export default function Education() {
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
      id="education"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0-initial mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Formación Académica
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Educación</h2>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {educationItems.map((item, index) => (
            <div
              key={item.institution}
              className="animate-on-scroll opacity-0-initial group"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden group-hover:bg-primary transition-colors">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <School className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'En curso - 6to semestre'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{item.degree}</h3>
                <p className="text-muted-foreground mb-4">{item.institution}</p>

                {/* Period */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{item.period}</span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-muted-foreground border-t border-border pt-4">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Note */}
        <div className="animate-on-scroll opacity-0-initial delay-300 mt-8 p-6 rounded-xl bg-primary text-primary-foreground">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Formación Continua</h3>
              <p className="text-sm text-primary-foreground/80">
                Actualmente en formación académica con enfoque en desarrollo de
                software, buscando constantemente oportunidades para aplicar los
                conocimientos teóricos en proyectos prácticos y experiencias
                laborales reales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
