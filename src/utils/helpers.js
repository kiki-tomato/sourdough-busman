export function getToday() {
  const d = new Date();
  const today = d.getDay();
  const currentHour = d.getHours();
  const currentMin = d.getMinutes();
  const currentTime = Number(`${currentHour}.${currentMin}`);

  return { today, currentTime };
}
