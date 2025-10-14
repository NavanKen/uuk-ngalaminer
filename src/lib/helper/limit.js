export const limitWords = (text, limit) => {
  if (!text) return "-";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};
