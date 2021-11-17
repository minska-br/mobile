import CalculationType from "../types/CalculationType";

export default interface HistoryItem {
  id: string;
  type: CalculationType;
  title: string;
  emission: number | null;
  dateISO: string;
}
