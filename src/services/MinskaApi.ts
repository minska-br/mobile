import axios from "axios";

import {
  URL_BASE_CALCULATOR,
  URL_BASE_CRAWLER,
  START_CALCULATION_ENDPOINT,
  PRODUCT_LIST_ENDPOINT,
  CALCULATION_RESULT_ENDPOINT,
} from "../../env.json";

const headers = { "Access-Control-Allow-Origin": "*" };

const apiCrawler = axios.create({ baseURL: URL_BASE_CRAWLER, headers });
const apiCalculator = axios.create({ baseURL: URL_BASE_CALCULATOR, headers });

const logging = (endpoint: string, params?: any) =>
  console.log(`\n[MinskaApi/${endpoint}]: `, params);

class MinskaApi {
  static getProductList = async (searchedProduct: string) => {
    logging(PRODUCT_LIST_ENDPOINT, { searchedProduct });
    return apiCrawler.get(PRODUCT_LIST_ENDPOINT, {
      params: { value: searchedProduct },
    });
  };

  static startCalculation = async (
    recipeId: number | null,
    foodName: string,
    type: "product" | "recipe",
    amount: number = 1
  ) => {
    const body = { foodName, type, recipeId, amount };
    logging(START_CALCULATION_ENDPOINT, { body });
    return apiCalculator.post(START_CALCULATION_ENDPOINT, body);
  };

  static getCalculationResult = async (calculationId: string) => {
    const url = `${CALCULATION_RESULT_ENDPOINT}/${calculationId}`;
    logging(url);
    return apiCalculator.get(url);
  };
}

export default MinskaApi;
