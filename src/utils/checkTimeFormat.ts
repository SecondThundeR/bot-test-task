export function checkTimeFormat(time?: string) {
  if (!time || time.length > 5) return false;
  const [hours, minutes] = time.split(":");

  if (parseInt(hours) < 0 || parseInt(hours) > 24) return false;
  if (parseInt(minutes) < 0 || parseInt(minutes) > 59) return false;

  return true;
}
