import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is UniSync free to use?",
    answer:
      "Yes. Core features like CGPA calculator, attendance calculator and public announcements are completely free.",
  },
  {
    question: "Can I use UniSync without creating an account?",
    answer:
      "Yes. Guests can access selected tools without signing in. Login is only required for personalized features.",
  },
  {
    question: "Will my academic data be secure?",
    answer:
      "Yes. Your personal information and academic data will be stored securely and only accessible to you.",
  },
  {
    question: "Will there be a mobile app?",
    answer:
      "Yes. Android and iOS applications are part of our roadmap.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(index: number) {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  }

  return (
    <section className="bg-slate-50 py-24 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            Everything you need to know before getting started with UniSync.
          </p>
        </div>

        {/* FAQ Items */}

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 p-6 text-left"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-slate-500 transition-transform duration-300 dark:text-slate-400 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <div className="border-t border-gray-100 px-6 pb-6 pt-5 dark:border-slate-700">
                        <p className="leading-7 text-gray-600 dark:text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;