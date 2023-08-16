import moment from "moment";

const DATE_FORMAT = "DD.MM.YYYY";

export function isValidNotificationDate(date?: string) {
  if (!date) return false;

  const parsedDate = moment(date, DATE_FORMAT);
  if (!parsedDate.isValid()) return false;

  const currentDate = moment(new Date()).startOf("day");
  return parsedDate.isSameOrAfter(currentDate);
}
