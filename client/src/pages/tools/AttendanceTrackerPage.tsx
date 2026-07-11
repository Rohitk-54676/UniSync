import Navbar from "../../components/common/Navbar";
import Footer from "../../components/landing/Footer";

import AttendanceTracker from "../../components/tools/attendance/AttendanceTracker";

function AttendanceTrackerPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <AttendanceTracker />
      </main>

      <Footer />
    </div>
  );
}

export default AttendanceTrackerPage;