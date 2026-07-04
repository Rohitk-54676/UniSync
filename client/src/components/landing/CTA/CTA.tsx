import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-100 px-6 py-24 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-10 py-20 text-center text-white shadow-2xl dark:from-indigo-700 dark:to-violet-800">
        <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
          Ready to Simplify Your
          <br />
          University Life?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
          Manage attendance, assignments, reminders, AI study tools and campus
          life from one modern platform.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Button
            onClick={() => navigate("/login")}
            className="border border-white/40 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white/20"
          >
            Get Started
          </Button>

          <Button
            onClick={() => navigate("/register")}
            className="border border-white/40 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white/20"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;