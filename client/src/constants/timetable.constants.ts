import type {
  TimetableClassType,
  TimetableDay,
} from "../types/timetable.types";

export const TIMETABLE_DAYS: {
  label: string;
  shortLabel: string;
  value: TimetableDay;
}[] = [
  {
    label: "Monday",
    shortLabel: "Mon",
    value: "monday",
  },
  {
    label: "Tuesday",
    shortLabel: "Tue",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    shortLabel: "Wed",
    value: "wednesday",
  },
  {
    label: "Thursday",
    shortLabel: "Thu",
    value: "thursday",
  },
  {
    label: "Friday",
    shortLabel: "Fri",
    value: "friday",
  },
  {
    label: "Saturday",
    shortLabel: "Sat",
    value: "saturday",
  },
  {
    label: "Sunday",
    shortLabel: "Sun",
    value: "sunday",
  },
];

export const TIMETABLE_CLASS_TYPES: {
  label: string;
  value: TimetableClassType;
}[] = [
  {
    label: "Lecture",
    value: "lecture",
  },
  {
    label: "Lab",
    value: "lab",
  },
  {
    label: "Tutorial",
    value: "tutorial",
  },
  {
    label: "Seminar",
    value: "seminar",
  },
  {
    label: "Other",
    value: "other",
  },
];