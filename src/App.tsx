import { useEffect } from 'react';
import Navbar from './components/Navbar';
import StickyBottomBar from './components/StickyBottomBar';
import Hero from './sections/Hero';
import TrustBanner from './sections/TrustBanner';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Differentiation from './sections/Differentiation';
import Applications from './sections/Applications';
import Workflow from './sections/Workflow';
import PackagesPricing from './sections/PackagesPricing';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    document.title = 'AI4Mat.ai — Machine-Learning Force Fields for Reactive Materials R&D';
    document.documentElement.lang = 'en';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      'AI4Mat builds high-accuracy machine-learning force fields that turn quantum data into reactive atomistic simulations. Free 4-hour technical assessment — no result, no fee.';
  }, []);

  return (
    <>
      <Navbar />
      <StickyBottomBar />
      <main>
        <Hero />
        <TrustBanner />
        <Problem />
        <Solution />
        <Differentiation />
        <Applications />
        <Workflow />
        <PackagesPricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
