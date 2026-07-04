import { Mail } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              UniSync
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">
              One platform to manage academics, attendance,
              assignments, notes, events and campus life.
            </p>
          </div>

          {/* Platform */}

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Platform
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Quick Tools
              </button>

              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Resources
              </button>

              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Community
              </button>

              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Events
              </button>
            </div>
          </div>

          {/* Support */}

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Support
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Help Center
              </button>

              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Contact
              </button>

              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                className="w-fit text-sm text-gray-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Terms
              </button>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Contact
            </h3>

            <p className="mt-4 text-sm text-gray-600 dark:text-slate-400">
              Have questions or suggestions about UniSync?
            </p>

            <button
              type="button"
              className="mt-5 flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
            >
              <Mail size={19} />

              Contact UniSync
            </button>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-slate-800 dark:text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} UniSync. All rights reserved.
          </p>

          <p>
            Built for students.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;