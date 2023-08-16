export function checkTimeFormat(time?: string) {
  if (!time || time.length > 5) return false;
  const [hours, minutes] = time.split(":").map(Number);

  if (hours < 0 || hours > 23) return false;
  if (minutes < 0 || minutes > 59) return false;

  return true;
}
