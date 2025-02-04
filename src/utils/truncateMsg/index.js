export function truncateMessage(message, limit = 20) {
  if(!message) return;
  const words = message?.split(" ");
  if (words.length > limit) {
    return `${words.slice(0, limit).join(" ")} ...`;
  } else {
    return message;
  }
}
