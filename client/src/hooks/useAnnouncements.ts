import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MOCK_ANNOUNCEMENTS,
} from "../constants/announcement.constants";

import type {
  AnnouncementUserState,
} from "../types/announcements.types";

import {
  getAnnouncementSummary,
} from "../utils/announcement.utils";

const STORAGE_KEY =
  "unisync-announcement-user-state";

const initialUserState: AnnouncementUserState = {
  readAnnouncementIds: [],
  bookmarkedAnnouncementIds: [],
};

function getStoredUserState():
  AnnouncementUserState {
  try {
    const storedState =
      localStorage.getItem(STORAGE_KEY);

    if (!storedState) {
      return initialUserState;
    }

    const parsedState = JSON.parse(storedState);

    return {
      readAnnouncementIds: Array.isArray(
        parsedState.readAnnouncementIds
      )
        ? parsedState.readAnnouncementIds
        : [],

      bookmarkedAnnouncementIds:
        Array.isArray(
          parsedState.bookmarkedAnnouncementIds
        )
          ? parsedState.bookmarkedAnnouncementIds
          : [],
    };
  } catch {
    return initialUserState;
  }
}

function useAnnouncements() {
  const announcements = MOCK_ANNOUNCEMENTS;

  const [userState, setUserState] =
    useState<AnnouncementUserState>(
      getStoredUserState
    );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(userState)
    );
  }, [userState]);

  const summary = useMemo(
    () =>
      getAnnouncementSummary(
        announcements,
        userState.readAnnouncementIds,
        userState.bookmarkedAnnouncementIds
      ),
    [announcements, userState]
  );

  function markAsRead(id: string) {
    setUserState((currentState) => {
      if (
        currentState.readAnnouncementIds.includes(
          id
        )
      ) {
        return currentState;
      }

      return {
        ...currentState,
        readAnnouncementIds: [
          ...currentState.readAnnouncementIds,
          id,
        ],
      };
    });
  }

  function markAllAsRead() {
    setUserState((currentState) => ({
      ...currentState,
      readAnnouncementIds:
        announcements.map(
          (announcement) => announcement.id
        ),
    }));
  }

  function toggleBookmark(id: string) {
    setUserState((currentState) => {
      const isBookmarked =
        currentState.bookmarkedAnnouncementIds.includes(
          id
        );

      return {
        ...currentState,

        bookmarkedAnnouncementIds:
          isBookmarked
            ? currentState.bookmarkedAnnouncementIds.filter(
                (announcementId) =>
                  announcementId !== id
              )
            : [
                ...currentState.bookmarkedAnnouncementIds,
                id,
              ],
      };
    });
  }

  function isAnnouncementRead(id: string) {
    return userState.readAnnouncementIds.includes(
      id
    );
  }

  function isAnnouncementBookmarked(
    id: string
  ) {
    return userState.bookmarkedAnnouncementIds.includes(
      id
    );
  }

  return {
    announcements,
    summary,
    markAsRead,
    markAllAsRead,
    toggleBookmark,
    isAnnouncementRead,
    isAnnouncementBookmarked,
  };
}

export default useAnnouncements;