export function formatDate(date: string) {
  const todayDate = new Date(date);
  const year = todayDate.getFullYear();
  const monthDate = String(todayDate.getMonth() + 1).padStart(2, "0");
  const day = String(todayDate.getDate()).padStart(2, "0");
  return `${year}-${monthDate}-${day}`;
}
