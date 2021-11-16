import axios, { AxiosResponse } from "axios";

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

interface IRequestResponse {
  requestId: string;
  calculationId: string;
  name: string;
  href: string;
  method: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface IConversion     {
  name: string,
  value: number,
  unit: string
}

interface IProcess     {
  name: string,
  value: number,
  unit: string,
  amount: number,
  processNameFound: string,
  calculated: boolean
}

interface ICalculationResponse {
  id: string,
  name: string,
  unit: string,
  calculatedPercentage: number,
  totalCarbonFootprint: number,
  processes: IProcess[],
  conversions: IConversion[]
}

class MinskaApi {
  private static apiCalculator = axios.create({ baseURL: URL_BASE_CALCULATOR, headers });
  private static apiCrawler = axios.create({ baseURL: URL_BASE_CRAWLER, headers });

  static async getProductList(searchedProduct: string) {
    logging(PRODUCT_LIST_ENDPOINT, { searchedProduct });
    const params = { value: searchedProduct };

    const apiCrawler = await axios.create({ baseURL: URL_BASE_CRAWLER, headers });

    const res = await apiCrawler.get("");
    console.log("\n[MinskaApi] isAlive", res);

    const resp = await apiCrawler.get(PRODUCT_LIST_ENDPOINT, { params });
    console.log("\n[MinskaApi] getProductList", resp?.data);

    return resp;
  }

  static startCalculation = async (
    recipeId: number | null,
    foodName: string,
    type: CalculationType,
    amount: number = 1
  ): Promise<AxiosResponse<IRequestResponse, any>> => {
    const body = { foodName, type, recipeId, amount };
    console.log("\n[MinskaApi] startCalculation", { body });
    return this.apiCalculator.post(START_CALCULATION_ENDPOINT, body);
  };

  static getAllRequests = async (): Promise<AxiosResponse<IRequestResponse[], any>> => {
    return this.apiCalculator.get(CALCULATION_RESULT_ENDPOINT);
  };

  static findCalculation = async (
    calculationId: string
  ): Promise<AxiosResponse<ICalculationResponse, any>> => {
    console.log("\n[MinskaApi] findCalculation: ", { calculationId });
    return this.apiCalculator.get(`${START_CALCULATION_ENDPOINT}/${calculationId}`);
  };
}

export default MinskaApi;
