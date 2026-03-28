import { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
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

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'alejandrogo563@gmail.com',
      href: 'mailto:alejandrogo563@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Teléfono',
      value: '8132538553',
      href: 'tel:8132538553',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Ubicación',
      value: 'García, Nuevo León, México',
      href: '#',
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0-initial mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Contacto
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Ponte en contacto</h2>
        </div>

        {/* Contact Info */}
        <div className="animate-on-scroll opacity-0-initial delay-100 space-y-4 max-w-lg">
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <span className="text-primary group-hover:text-primary-foreground transition-colors">
                  {item.icon}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
