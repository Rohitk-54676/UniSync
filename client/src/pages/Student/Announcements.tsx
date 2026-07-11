import {
  useMemo,
  useState,
} from "react";

import {
  Bell,
  Bookmark,
  CheckCheck,
  Mail,
  Siren,
} from "lucide-react";

import AnnouncementCard from "../../components/student/announcements/AnnouncementsCard";

import AnnouncementFilters from "../../components/student/announcements/AnnouncementFilters";

import AnnouncementViewer from "../../components/student/announcements/AnnouncementViewer";

import useAnnouncements from "../../hooks/useAnnouncements";

import type {
  AnnouncementRecord,
  AnnouncementSortOption,
} from "../../types/announcements.types";

import {
  sortAnnouncements,
} from "../../utils/announcement.utils";

function Announcements() {
  const {
    announcements,
    summary,
    markAsRead,
    markAllAsRead,
    toggleBookmark,
    isAnnouncementRead,
    isAnnouncementBookmarked,
  } = useAnnouncements();

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [sortOption, setSortOption] =
    useState<AnnouncementSortOption>("latest");

  const [
    showBookmarksOnly,
    setShowBookmarksOnly,
  ] = useState(false);

  const [showUnreadOnly, setShowUnreadOnly] =
    useState(false);

  const [
    viewingAnnouncementId,
    setViewingAnnouncementId,
  ] = useState<string | null>(null);

  const viewingAnnouncement = useMemo(
    () =>
      announcements.find(
        (announcement) =>
          announcement.id ===
          viewingAnnouncementId
      ) ?? null,
    [announcements, viewingAnnouncementId]
  );

  const filteredAnnouncements = useMemo(() => {
    const normalizedSearch =
      searchQuery.trim().toLowerCase();

    const matchingAnnouncements =
      announcements.filter((announcement) => {
        if (
          activeCategory !== "all" &&
          announcement.category !== activeCategory
        ) {
          return false;
        }

        if (
          showUnreadOnly &&
          isAnnouncementRead(announcement.id)
        ) {
          return false;
        }

        if (
          showBookmarksOnly &&
          !isAnnouncementBookmarked(
            announcement.id
          )
        ) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        const searchableText = [
          announcement.title,
          announcement.description,
          announcement.author,
          announcement.category,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          normalizedSearch
        );
      });

    return sortAnnouncements(
      matchingAnnouncements,
      sortOption
    );
  }, [
    announcements,
    searchQuery,
    activeCategory,
    sortOption,
    showBookmarksOnly,
    showUnreadOnly,
    isAnnouncementRead,
    isAnnouncementBookmarked,
  ]);

  function openAnnouncement(
    announcement: AnnouncementRecord
  ) {
    markAsRead(announcement.id);

    setViewingAnnouncementId(
      announcement.id
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
            <Bell size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Announcements
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Stay updated with university notices
              and important information.
            </p>
          </div>
        </div>

        {summary.unreadAnnouncements > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <CheckCheck size={20} />

            Mark All as Read
          </button>
        )}
      </div>

      {/* Summary */}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Bell className="text-indigo-600 dark:text-indigo-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Total Announcements
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.totalAnnouncements}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Mail className="text-blue-600 dark:text-blue-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Unread
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.unreadAnnouncements}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Bookmark className="text-amber-600 dark:text-amber-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Bookmarked
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.bookmarkedAnnouncements}
          </p>
        </div>

        <div className="rounded-2xl bg-red-600 p-5 text-white shadow-lg shadow-red-600/20 dark:bg-red-500">
          <Siren />

          <p className="mt-4 text-sm text-red-100">
            Urgent
          </p>

          <p className="mt-1 text-3xl font-bold">
            {summary.urgentAnnouncements}
          </p>
        </div>
      </div>

      {/* Filters */}

      <AnnouncementFilters
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        sortOption={sortOption}
        showBookmarksOnly={showBookmarksOnly}
        showUnreadOnly={showUnreadOnly}
        onSearchChange={setSearchQuery}
        onCategoryChange={setActiveCategory}
        onSortChange={setSortOption}
        onBookmarksChange={setShowBookmarksOnly}
        onUnreadChange={setShowUnreadOnly}
      />

      {/* Announcement List */}

      {filteredAnnouncements.length === 0 ? (
        <div className="mt-8 flex min-h-[360px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <Bell
            size={40}
            className="text-indigo-600 dark:text-indigo-400"
          />

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            No announcements found
          </h2>

          <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-slate-400">
            Try changing your search or announcement
            filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredAnnouncements.map(
            (announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                isRead={isAnnouncementRead(
                  announcement.id
                )}
                isBookmarked={isAnnouncementBookmarked(
                  announcement.id
                )}
                onOpen={openAnnouncement}
                onToggleBookmark={
                  toggleBookmark
                }
              />
            )
          )}
        </div>
      )}

      {/* Viewer */}

      {viewingAnnouncement && (
        <AnnouncementViewer
          announcement={viewingAnnouncement}
          isBookmarked={isAnnouncementBookmarked(
            viewingAnnouncement.id
          )}
          onClose={() =>
            setViewingAnnouncementId(null)
          }
          onToggleBookmark={toggleBookmark}
        />
      )}
    </main>
  );
}

export default Announcements;