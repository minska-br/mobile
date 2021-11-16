const INIT = "@Minska:";
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

  static getAllKeys = async () => {
    logging("getAllKeys");
    return await AsyncStorage.getAllKeys();
  };

  static getMultiple = async (keys: string[]) => {
    logging("getMultiple", { keys });
    return await AsyncStorage.multiGet(keys);
  };

  static getObjectItem = async (key: string) => {
    logging("getObjectItem", { key: this.getKey(key) });
    const value = await AsyncStorage.getItem(this.getKey(key));
    return value ? JSON.parse(value) : null;
  };

  static setObjectItem = async (key: string, obj: any) => {
    logging("setObjectItem", { key: this.getKey(key), obj: JSON.stringify(obj) });
    await AsyncStorage.setItem(this.getKey(key), JSON.stringify(obj));
  };

  static deleteItem = async (key: string) => {
    logging("deleteItem", { key });
    await AsyncStorage.removeItem(key);
  };
}
