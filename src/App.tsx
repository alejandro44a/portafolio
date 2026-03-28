import { Toaster } from '@/components/ui/sonner';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Animated background */}
      <div className="animated-bg" />
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
