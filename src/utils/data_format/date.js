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

  export const sortDate = (originalDate) => {
    const dateObj = new Date(originalDate);
    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ("0" + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
