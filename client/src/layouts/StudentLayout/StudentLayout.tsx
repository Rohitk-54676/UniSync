import { Outlet } from "react-router-dom";

import StudentNavbar from "../../components/student/StudentNavbar";
import Footer from "../../components/landing/Footer";

function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <StudentNavbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default StudentLayout;