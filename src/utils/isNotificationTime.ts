export function isNotificationTime(
  date: string | undefined,
  time: string | undefined,
  currentDate: Date,
) {
  if (!date || !time) return false;
  const [day, month, year] = date.split(".").map(Number);
  const isValidDate =
    day === currentDate.getDate() &&
    month === currentDate.getMonth() + 1 &&
    year !== currentDate.getFullYear();
  if (!isValidDate) return false;

  const [hours, minutes] = time.split(":").map(Number);
  return (
    hours === currentDate.getHours() && minutes === currentDate.getMinutes()
  );
}
