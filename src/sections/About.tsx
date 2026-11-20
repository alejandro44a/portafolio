import SplitText from '@/components/SplitText';
import ScrollVelocity from '@/components/ScrollVelocity';
import { stack } from '@/data';
import { asset } from '@/hooks';

export default function About() {
  return (
    <section id="about" className="relative px-4 py-28 sm:px-6">
      <p className="mb-10 text-bone/60">Sobre Alejandro Abrego</p>

      <h2 className="display mx-auto max-w-6xl text-center text-[9vw] leading-[0.9] sm:text-[6.4vw]">
        Soy
        <img
          src={asset('profile.jpg')}
          alt="Alejandro Abrego"
          className="mx-[0.12em] inline-block h-[0.8em] w-[0.8em] rounded-full object-cover align-[-0.08em] grayscale transition hover:grayscale-0"
        />
        Alejandro, ingeniero de software en formación
        <span className="text-bone/50"> ./desde 2022 </span>
        apasionado por crear apps rápidas, interactivas y memorables.
      </h2>

      <div className="mx-auto mt-20 grid max-w-6xl gap-10 md:grid-cols-3">
        <p className="text-bone/70 md:col-start-1">— Estudiante de Ingeniería en Software en la UANL (FIME), sexto semestre.</p>
        <SplitText
          tag="p"
          splitType="words"
          delay={18}
          className="leading-relaxed md:col-span-2"
          textAlign="left"
          text="He construido apps móviles con Flutter y Firebase, juegos en Kotlin y un traductor de Lengua de Señas Mexicana con visión por computadora. Mi experiencia en Banorte y Amazon me enseñó a trabajar bajo presión, en equipo y con foco en el usuario — eso es lo que llevo a cada línea de código."
        />
      </div>

      <div className="mt-28 -mx-4 sm:-mx-6">
        <ScrollVelocity
          texts={[stack.join(' ✦ ') + ' ✦ ', 'Mobile ✦ Games ✦ AI ✦ Web ✦ Data ✦ ']}
          velocity={40}
          className="display px-4 leading-[1.05] text-bone"
          parallaxClassName="py-1"
          fontSize="clamp(2.5rem, 8vw, 7rem)"
          outlineAlternate
          fadeEdges
        />
      </div>
    </section>
  );
}
