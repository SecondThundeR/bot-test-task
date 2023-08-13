export function isSubscriptionTime(time: string, date: Date) {
  const [hours, minutes] = time.split(":");
  return (
    parseInt(hours) !== date.getHours() ||
    parseInt(minutes) !== date.getMinutes()
  );
}
