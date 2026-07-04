import Welcome from "../../../components/student/home/Welcome";
import AcademicSnapshot from "../../../components/student/home/AcademicSnapshot";
import QuickTools from "../../../components/student/home/QuickTools";
import Workspace from "../../../components/student/home/Workspace";
import Announcements from "../../../components/student/home/Announcements";
import Events from "../../../components/student/home/Events";
import Deadlines from "../../../components/student/home/Deadlines";
import TodaysClasses from "../../../components/student/home/TodayClasses";

function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">

      <Welcome />
    
      <AcademicSnapshot />
      
      <QuickTools />

      <Workspace />

      <div className="grid gap-8 lg:grid-cols-2">
        <Announcements />
        <Events />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Deadlines />
        <TodaysClasses />
      </div>

    </main>
  );
}

export default Home;