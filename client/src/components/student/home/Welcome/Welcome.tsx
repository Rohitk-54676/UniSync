function Welcome() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-lg dark:from-indigo-700 dark:to-violet-800">
      <h1 className="text-4xl font-bold">
        {greeting}, Rohit
      </h1>

      <p className="mt-3 text-lg text-indigo-100">
        {today}
      </p>

      <p className="mt-5 max-w-2xl text-indigo-100">
        Stay on top of your academics with assignments, attendance,
        announcements, notes and AI assistance—all in one place.
      </p>
    </section>
  );
}

export default Welcome;