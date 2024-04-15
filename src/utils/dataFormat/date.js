// dateUtils.js
import { formatDistanceToNow } from "date-fns";
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

export function convertDateToRelative(dateString) {
  const formattedDate = formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
  return formattedDate;
}
