import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeAgo(timestamp) {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  const timeDifference = currentDate - providedDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1y" : `${years}y`;
  } else if (months > 0) {
    return months === 1 ? "1m" : `${months}m`;
  } else if (days > 0) {
    return days === 1 ? "1d" : `${days}d`;
  } else if (hours > 0) {
    return hours === 1 ? "1h" : `${hours}h`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  } else {
    return seconds <= 10 ? "just now" : `${seconds} seconds ago`;
  }
}

export function capitalizeFirstLetter(text) {
  if (typeof text !== "string" || text.length === 0) {
    return "";
  }
  const lowercaseText = text.toLowerCase();
  return lowercaseText.charAt(0).toUpperCase() + lowercaseText.slice(1);
}

export function formatNumberToShort(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else {
    return number.toString();
  }
}
