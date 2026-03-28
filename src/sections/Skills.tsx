import { useEffect, useRef } from 'react';
import { Code2, Database, GitBranch, FileCode, Layers, Monitor } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Lenguajes de Programación',
    icon: <Code2 className="w-5 h-5" />,
    skills: ['Java', 'Kotlin', 'Dart', 'JavaScript', 'C', 'C++', 'C#', 'HTML', 'CSS'],
  },
  {
    title: 'Bases de Datos',
    icon: <Database className="w-5 h-5" />,
    skills: ['SQL', 'Diseño básico de tablas', 'Consultas básicas'],
  },
  {
    title: 'Herramientas',
    icon: <GitBranch className="w-5 h-5" />,
    skills: ['Git (básico)', 'Flutter', 'Firebase', 'KorGE (Game Engine para Kotlin)'],
  },
  {
    title: 'Software de Oficina',
    icon: <Monitor className="w-5 h-5" />,
    skills: ['MS Excel', 'MS Word', 'MS PowerPoint', 'Power BI'],
  },
];

const softSkills = [
  'Trabajo en equipo',
  'Comunicación efectiva',
  'Orientación a resultados',
  'Adaptabilidad',
  'Resolución de problemas',
  'Atención al cliente',
];

export default function Skills() {
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
    <section ref={sectionRef} id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0-initial mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Competencias
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Habilidades</h2>
        </div>

        {/* Technical Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="animate-on-scroll opacity-0-initial p-6 rounded-xl bg-card border border-border"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div
          className="animate-on-scroll opacity-0-initial delay-500 p-6 rounded-xl bg-secondary/50 border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold">Habilidades Blandas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm bg-card border border-border rounded-full text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div
          className="animate-on-scroll opacity-0-initial delay-600 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Español</p>
              <p className="text-sm text-muted-foreground">Nativo</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-lg">🇲🇽</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
            <div>
              <p className="font-medium">Inglés</p>
              <p className="text-sm text-muted-foreground">Nivel Medio</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-lg">🇺🇸</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
