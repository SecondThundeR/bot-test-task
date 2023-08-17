import moment from "moment";

const DATE_FORMAT = "DD.MM.YYYY HH:mm";

export function isValidDate(date?: string) {
  if (!date) return false;

  const parsedDate = moment(date, DATE_FORMAT);
  if (!parsedDate.isValid()) return false;

  const currentDate = moment(new Date());
  return parsedDate.isSameOrAfter(currentDate);
}
