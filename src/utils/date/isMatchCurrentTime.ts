export function isMatchCurrentTime(time: string, date: Date) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours === date.getHours() && minutes === date.getMinutes();
}
