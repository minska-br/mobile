export default interface HistoryItem {
  id: string;
  type: "Recipe" | "Product";
  title: string;
  emission: number;
  dateISO: string;
}
