export default interface HistoryItem {
  id: string;
  type: "recipe" | "product";
  title: string;
  emission: number;
  dateISO: string;
}
