export function isValidTime(time?: string) {
  if (!time || time.length > 5) return false;

  const [hours, minutes] = time.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}
