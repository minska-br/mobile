import MinskaApi from "../apis/MinskaApi";
import HistoryItem from "../interfaces/HistoryItem";

class MinskaService {
  /**
   * Return a recipe or a product usign name as parameter to search.
   *
   * @param name Recipe or product name
   * @returns
   */
  static getExistingItemByName = async (name: string) => {
    console.log("\n[MinskaService] getExistingItemByName: ", { name });
    const requests = await MinskaApi.getAllRequests();
    const data = requests.data;

    const existingItemWithTheSameName = data.find((item) => {
      const isCalculated = item.status === "CALCULATED";
      const hasTheSameName = item.name.toLowerCase() === name.toLowerCase();
      return isCalculated && hasTheSameName;
    });

    console.log("\n[MinskaService] getExistingItemByName: ", {
      name,
      item: existingItemWithTheSameName,
    });
    return existingItemWithTheSameName;
  };

  static getCalculation = async (calculationId: string) => {
    console.log("\n[MinskaApi] getCalculation", { calculationId });
    try {
      const response = await MinskaApi.findCalculation(calculationId);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("\n[MinskaService] getCalculation | ERROR: " + JSON.stringify(error));
      return null;
    }
  };

  /**
   * This method returns the calculationId of the scheduled item.
   *
   * @param foodName The name of the searched item (recipe or product)
   * @returns calculationId
   */
  static scheduleProductCalculation = async (foodName: string) => {
    console.log("\n[MinskaApi] scheduleProductCalculation", { foodName });
    try {
      const response = await MinskaApi.startCalculation(null, foodName, "Product");
      const data = response.data;
      return data.calculationId;
    } catch (error) {
      console.error(
        "\n[MinskaService] scheduleProductCalculation | ERROR: " + JSON.stringify(error)
      );
    }
  };

  static scheduleRecipeCalculation = async (recipeId: number, foodName: string) => {
    return MinskaApi.startCalculation(recipeId, foodName, "Recipe");
  };
}

export default MinskaService;
