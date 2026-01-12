// Date utility functions
import { APP_TIMEZONE } from "../config/constants";
import { NY_TIMEZONE, NY_SESSION } from "../config/session";

export function nowInTZ(timeZone: string): Date {
  // Convert “now” to a date-like in a target timezone via Intl formatting round-trip.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";

  const y = Number(get("year"));
  const m = Number(get("month"));
  const d = Number(get("day"));
  const hh = Number(get("hour"));
  const mm = Number(get("minute"));
  const ss = Number(get("second"));

  // Date constructed in local TZ but representing the target TZ clock time.
  return new Date(y, m - 1, d, hh, mm, ss);
}

export function formatClock(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

export function formatDate(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function getNySessionStatus(): {
  nyNow: Date;
  userNow: Date;
  isOpen: boolean;
  nyOpen: string;
  nyClose: string;
  userOpen: string;
  userClose: string;
} {
  const nyNow = nowInTZ(NY_TIMEZONE);
  const userNow = nowInTZ(APP_TIMEZONE);

  const nyOpen = new Date(
    nyNow.getFullYear(),
    nyNow.getMonth(),
    nyNow.getDate(),
    NY_SESSION.openHour,
    NY_SESSION.openMinute,
    0
  );

  const nyClose = new Date(
    nyNow.getFullYear(),
    nyNow.getMonth(),
    nyNow.getDate(),
    NY_SESSION.closeHour,
    NY_SESSION.closeMinute,
    0
  );

  const isOpen = nyNow >= nyOpen && nyNow <= nyClose;

  // “Translate” NY open/close to user timezone strings (formatting only)
  const nyOpenStr = formatClock(nyOpen, NY_TIMEZONE);
  const nyCloseStr = formatClock(nyClose, NY_TIMEZONE);

  // For user, we take those NY timestamps and display them in user TZ
  // We use the same Date objects; only formatting TZ changes.
  const userOpenStr = formatClock(nyOpen, APP_TIMEZONE);
  const userCloseStr = formatClock(nyClose, APP_TIMEZONE);

  return {
    nyNow,
    userNow,
    isOpen,
    nyOpen: nyOpenStr,
    nyClose: nyCloseStr,
    userOpen: userOpenStr,
    userClose: userCloseStr
  };
}
