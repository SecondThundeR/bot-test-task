import moment from "moment";

const DATE_FORMAT = "DD.MM.YYYY";

export function isValidDate(date?: string) {
  if (!date) return false;
  return moment(date, DATE_FORMAT).isValid();
}
