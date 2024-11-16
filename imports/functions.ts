export function formatDate(date: Date) {
  const dateString = date.toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const timeString = date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' });
  return `${dateString}, ${timeString}`;
}

export function defaultDate() {
  const date = new Date();
  date.setHours(22);
  date.setMinutes(0);
  date.setDate(date.getDate() + 1);

  return date;
}
