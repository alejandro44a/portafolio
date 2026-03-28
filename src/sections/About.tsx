import { useEffect, useRef } from 'react';
import { User, Target, Sparkles } from 'lucide-react';

export default function About() {
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
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0-initial mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Sobre Mí
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Perfil Personal</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Description */}
          <div className="animate-on-scroll opacity-0-initial delay-100">
            <p className="text-lg leading-relaxed text-foreground mb-6">
              Estudiante de{' '}
              <span className="font-semibold">Ingeniería en Software</span> en
              la Universidad Autónoma de Nuevo León (UANL), actualmente cursando
              el sexto semestre. Cuento con conocimientos en desarrollo de
              software, programación orientada a objetos y diversas herramientas
              tecnológicas.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Mi experiencia laboral en empresas como{' '}
              <span className="font-medium text-foreground">Banorte</span> y{' '}
              <span className="font-medium text-foreground">Amazon</span> me ha
              permitido desarrollar habilidades de trabajo en equipo, atención
              al cliente y gestión de operaciones, complementando mi formación
              técnica con competencias profesionales valiosas.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-6">
            <div className="animate-on-scroll opacity-0-initial delay-200 p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Objetivo Profesional</h3>
                  <p className="text-sm text-muted-foreground">
                    Desarrollar mi carrera en el ámbito de la ingeniería de
                    software, aplicando mis conocimientos técnicos y habilidades
                    interpersonales para contribuir al éxito de proyectos
                    innovadores.
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0-initial delay-300 p-6 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fortalezas</h3>
                  <p className="text-sm text-muted-foreground">
                    Trabajo en equipo, adaptabilidad, orientación a resultados y
                    capacidad de aprendizaje rápido. Experiencia en entornos de
                    alta presión y cumplimiento de metas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
