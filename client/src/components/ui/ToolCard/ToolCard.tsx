import { ArrowRight } from "lucide-react";

import type { ToolCardProps } from "./TooolCard.types";

function ToolCard({
  title,
  description,
  icon: Icon,
  onClick,
}: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        cursor-pointer
        flex-col
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-indigo-600
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-slate-800
        dark:hover:border-indigo-500
        dark:hover:bg-slate-800/80
      "
    >
      <Icon
        size={40}
        className="text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400"
      />

      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-auto flex w-full justify-end pt-8">
        <ArrowRight
          size={20}
          className="text-slate-600 transition-transform duration-300 group-hover:translate-x-2 dark:text-slate-400"
        />
      </div>
    </button>
  );
}

export default ToolCard;