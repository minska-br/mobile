const INIT = "@Minska:History:";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryItem from "../interfaces/HistoryItem";

const logging = (method: string, value?: any) =>
  console.log(`\n[HistoryService/${method}]`, { value });

export default class HistoryService {
  private static getKey = (key: string) => INIT + key;

  static saveScheduling = async (item: HistoryItem) => {
    const key = this.getKey(item.id);
    const value = JSON.stringify(item);
    logging("saveSchedule", { key, value });
    await AsyncStorage.setItem(key, value);
  };

  static getHistory = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const historyKeys = keys.filter((key) => key.startsWith(INIT));
    const historyPairs = await AsyncStorage.multiGet(historyKeys);
    const historyItems = historyPairs
      .filter(([_key, value]) => Boolean(value))
      .map(([_key, value]) => JSON.parse(String(value)) as HistoryItem);

    return historyItems;
  };

  static deleteHistoryItem = async (historyItemId: string) => {
    const key = this.getKey(historyItemId);
    logging("deleteHistoryItem", { key });
    await AsyncStorage.removeItem(key);
  };
}
