import axios from "axios";

import {
  URL_BASE_CALCULATOR,
  URL_BASE_CRAWLER,
  START_CALCULATION_ENDPOINT,
  PRODUCT_LIST_ENDPOINT,
  CALCULATION_RESULT_ENDPOINT,
} from "../../env.json";
import CalculationType from "../types/CalculationType";

const logging = (endpoint: string, params?: any) =>
  console.log(`\n[MinskaApi/${endpoint}]: `, params);
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const apiCrawler = axios.create({ baseURL: URL_BASE_CRAWLER, headers });

class MinskaApi {
  private static apiCalculator = axios.create({ baseURL: URL_BASE_CALCULATOR, headers });

  static async getProductList(searchedProduct: string) {
    logging(PRODUCT_LIST_ENDPOINT, { searchedProduct });
    const params = { value: searchedProduct };

    const apiCrawler = await axios.create({ baseURL: URL_BASE_CRAWLER, headers });

    const res = await apiCrawler.get("");
    console.log("[MinskaApi] isAlive", res);

    const resp = await apiCrawler.get(PRODUCT_LIST_ENDPOINT, { params });
    console.log("[MinskaApi] getProductList", resp?.data);

    return resp;
  }

  private static startCalculation = async (
    recipeId: number | null,
    foodName: string,
    type: CalculationType,
    amount: number = 1
  ) => {
    const body = { foodName, type, recipeId, amount };
    logging(START_CALCULATION_ENDPOINT, { body });
    return this.apiCalculator.post(START_CALCULATION_ENDPOINT, body);
  };

  static scheduleProductCalculation = async (foodName: string) => {
    return this.startCalculation(null, foodName, "Product");
  };

  static scheduleRecipeCalculation = async (recipeId: number, foodName: string) => {
    return this.startCalculation(recipeId, foodName, "Product");
  };

  static getCalculationResult = async (calculationId: string) => {
    const url = `${CALCULATION_RESULT_ENDPOINT}/${calculationId}`;
    logging(url);
    return this.apiCalculator.get(url);
  };
}

export default MinskaApi;
