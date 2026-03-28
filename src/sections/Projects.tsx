import { useEffect, useRef, useState } from 'react';
import { FolderGit2, ExternalLink, Code2, Smartphone, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  images: string[];
  icon: React.ReactNode;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'FIME Asteroid',
    description: 'Juego arcade inspirado en el clásico Asteroids con temática de la facultad FIME-UANL',
    fullDescription: 'Juego arcade desarrollado con inspiración en el clásico Asteroids, incorporando elementos visuales y temáticos de la Facultad de Ingeniería Mecánica y Eléctrica (FIME) de la UANL. Incluye sistema de puntuación, power-ups y controles táctiles optimizados.',
    technologies: ['Kotlin', 'KorGE', 'Android'],
    images: ['/project-asteroid.jpg', '/2.jpg'],
    icon: <Gamepad2 className="w-5 h-5" />,
    features: [
      'Sistema de puntuación con high scores',
      'Power-ups y mejoras durante el juego',
      'Controles táctiles intuitivos',
      'Gráficos retro con estilo arcade',
      'Interfaz inspirada en FIME-UANL'
    ]
  },
  {
    id: 2,
    title: 'Gestor de Gastos',
    description: 'Aplicación móvil multiplataforma (Android e iOS) para el control y seguimiento de finanzas personales con gráficas',
    fullDescription: 'Aplicación completa para la gestión de finanzas personales desarrollada con Flutter y Firebase, disponible para Android e iOS. Permite registrar ingresos y gastos, visualizar tendencias semanales y mensuales mediante gráficas interactivas, categorizar movimientos y analizar el presupuesto de forma detallada.',
    technologies: ['Flutter', 'Firebase', 'Android', 'iOS'],
    images: ['/expenses-1.jpg', '/expenses-2.jpg', '/expenses-3.jpg', '/expenses-4.jpg'],
    icon: <Smartphone className="w-5 h-5" />,
    features: [
      'Dashboard con saldo total y estadísticas',
      'Gráficas de tendencias semanales y mensuales',
      'Categorización de gastos con gráfico circular',
      'Registro detallado de ingresos y egresos',
      'Análisis por categorías y transacciones recientes',
      'Balance e ingresos vs gastos'
    ]
  },
  {
    id: 3,
    title: 'Traductor LSM',
    description: 'Sistema de interpretación de Lengua de Señas Mexicana conectado a Raspberry Pi',
    fullDescription: 'Aplicación de comunicación inclusiva que traduce la Lengua de Señas Mexicana (LSM) a texto y voz. Actualmente conectada a una Raspberry Pi con cámara para captura de gestos, con planes futuros de funcionar directamente con la cámara del dispositivo móvil.',
    technologies: ['Python', 'OpenCV', 'Raspberry Pi', 'Android', 'Machine Learning'],
    images: ['/project-translator.jpg', '/5.jpg'],
    icon: <Code2 className="w-5 h-5" />,
    features: [
      'Reconocimiento de señas en tiempo real',
      'Traducción a texto y voz',
      'Modo traductor y modo aprendizaje',
      'Historial de traducciones',
      'Conexión con Raspberry Pi y cámara'
    ]
  }
];

// Image Gallery Component
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div className="relative h-64 overflow-hidden rounded-t-xl bg-secondary flex items-center justify-center">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-64 overflow-hidden rounded-t-xl bg-secondary group flex items-center justify-center">
      <img
        src={images[currentIndex]}
        alt={`${title} - ${currentIndex + 1}`}
        className="w-full h-full object-contain transition-opacity duration-500"
      />
      
      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          {/* Image counter */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 text-white text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

// Dialog Image Gallery
function DialogImageGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div className="h-80 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="h-80 overflow-hidden rounded-lg bg-secondary flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Image indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Image counter */}
      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0-initial mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Portafolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Proyectos</h2>
          <p className="text-muted-foreground max-w-xl">
            Estos son algunos de los proyectos en los que he trabajado, aplicando mis conocimientos 
            en desarrollo de software y programación orientada a objetos.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0-initial group cursor-pointer"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-full bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                {/* Project Image Gallery */}
                <ImageGallery images={project.images} title={project.title} />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View button */}
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <span>Ver detalles</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">{selectedProject.icon}</span>
                  </div>
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Image Gallery */}
                <DialogImageGallery images={selectedProject.images} title={selectedProject.title} />

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3">Tecnologías utilizadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">Características principales</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
