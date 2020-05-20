export function getFormatedDateTimeFromISOTime(isoTime) {
  const fullLocalDateTime = new Date(Date.parse(isoTime) + (new Date().getTimezoneOffset()) * 60).toString();
  const splitedDateTime = fullLocalDateTime.split('GMT');
  return splitedDateTime[0];
}