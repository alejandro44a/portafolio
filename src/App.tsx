import { lazy, Suspense } from 'react';
import ClickSpark from '@/components/ClickSpark';
import Noise from '@/components/Noise';
import TopBar from '@/sections/TopBar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Work from '@/sections/Work';
import Experience from '@/sections/Experience';
import Skills from '@/sections/Skills';
import Footer from '@/sections/Footer';

// Three.js is heavy: the pet loads after the page is interactive
const ClaudePet = lazy(() => import('@/pet/ClaudePet'));

export default function App() {
  return (
    <ClickSpark sparkColor="#d97757" sparkSize={9} sparkRadius={18} sparkCount={8}>
      <TopBar />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Skills />
      </main>
      <Footer />
      <Noise opacity={0.06} fixed zIndex={60} />
      <Suspense fallback={null}>
        <ClaudePet />
      </Suspense>
    </ClickSpark>
  );
}
