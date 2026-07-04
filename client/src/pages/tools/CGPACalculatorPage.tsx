import Navbar from "../../components/common/Navbar";
import Footer from "../../components/landing/Footer";

import CGPACalculator from "../../components/tools/cgpa/CGPACalculator";

function CGPACalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <CGPACalculator />
      </main>

      <Footer />
    </div>
  );
}

export default CGPACalculatorPage;