import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="animate-on-scroll opacity-0-initial order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/20">
                <img
                  src="/profile.jpg"
                  alt="Alejandro Abrego"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-primary-foreground text-xs font-medium text-center leading-tight">
                  UANL
                </span>
              </div>
              
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-primary/10 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="animate-on-scroll opacity-0-initial delay-100">
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-medium">
                Estudiante de Ingeniería en Software
              </p>
            </div>

            <div className="animate-on-scroll opacity-0-initial delay-200">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Alejandro
                <span className="block text-primary">Abrego</span>
              </h1>
            </div>

            <div className="animate-on-scroll opacity-0-initial delay-300">
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
                Desarrollador en formación con experiencia en atención al cliente
                y gestión de operaciones. Apasionado por la tecnología y el
                desarrollo de software.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0-initial delay-400 space-y-3 mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>García, Nuevo León, México</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>8132538553</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>alejandrogo563@gmail.com</span>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0-initial delay-500 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/25"
              >
                Contactar
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary/30 rounded-lg font-medium transition-all hover:bg-primary/10 hover:border-primary/50"
              >
                Ver proyectos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary hover:text-primary/70 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
