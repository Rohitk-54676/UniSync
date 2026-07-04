import Navbar from "../components/common/Navbar";
import Hero from "../components/landing/Hero";
import QuickTools from "../components/landing/QuickTools";
import Features from "../components/landing/Features";
import WhyUniSync from "../components/landing/WhyUniSync";
import Roadmap from "../components/landing/Roadmap";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main>
        <Hero />
        <QuickTools />
        <Features />
        <WhyUniSync />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;