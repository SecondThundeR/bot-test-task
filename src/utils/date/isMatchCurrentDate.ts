import { isMatchCurrentTime } from "@/utils/date/isMatchCurrentTime";

export function isMatchCurrentDate(
  date: string | null,
  time: string | null,
  currentDate: Date,
) {
  if (!date || !time) return false;
  const [day, month, year] = date.split(".").map(Number);
  const isValidDate =
    day === currentDate.getDate() &&
    month === currentDate.getMonth() + 1 &&
    year === currentDate.getFullYear();
  if (!isValidDate) return false;

  return isMatchCurrentTime(time, currentDate);
}
