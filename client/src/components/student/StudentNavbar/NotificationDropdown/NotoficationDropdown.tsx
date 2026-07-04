import { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  Bell,
  CheckCheck,
  CalendarDays,
  ClipboardList,
  Megaphone,
  Trophy,
} from "lucide-react";

import useClickOutside from "../../../../hooks/useClickOutside";

const initialNotifications = [
  {
    id: 1,
    title: "Java Assignment",
    message: "Submission deadline is tomorrow.",
    time: "10 min ago",
    unread: true,
    icon: ClipboardList,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    id: 2,
    title: "New Announcement",
    message: "Mid-semester schedule released.",
    time: "30 min ago",
    unread: true,
    icon: Megaphone,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: 3,
    title: "Hackathon 2026",
    message: "Registration has started.",
    time: "2 hrs ago",
    unread: false,
    icon: Trophy,
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: 4,
    title: "Today's Timetable",
    message: "You have 4 classes today.",
    time: "Yesterday",
    unread: false,
    icon: CalendarDays,
    color: "text-blue-600 dark:text-blue-400",
  },
];

function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const notificationRef = useRef<HTMLDivElement>(null);

  useClickOutside(notificationRef, () => setOpen(false));

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function markAsRead(id: number) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  }

  return (
    <div
      ref={notificationRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label="Open notifications"
        className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-0 mt-3 w-[380px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-slate-700">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h2>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {unreadCount} unread notifications
                </p>
              </div>

              <button
                type="button"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <CheckCheck size={18} />

                Mark all
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {notifications.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => markAsRead(item.id)}
                    className={`flex w-full gap-4 border-b border-gray-200 p-4 text-left transition hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700/70 ${
                      item.unread
                        ? "bg-indigo-50/60 dark:bg-indigo-950/30"
                        : ""
                    }`}
                  >
                    <div
                      className={`mt-1 rounded-xl bg-gray-100 p-3 dark:bg-slate-700 ${item.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>

                        {item.unread && (
                          <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                        )}
                      </div>

                      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                        {item.message}
                      </p>

                      <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
                        {item.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gray-200 p-4 dark:border-slate-700">
              <button
                type="button"
                className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationDropdown;