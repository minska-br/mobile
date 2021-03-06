import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import EmissionText from "../components/EmissionText";
import Subtitle from "../components/Subtitle";
import { SessionContext } from "../contexts/SessionContext";
import RoutesEnum from "../enums/routes";
import getDateISO from "../helpers/getDateISO";
import notify from "../helpers/notify";
import HistoryItem from "../interfaces/HistoryItem";
import MinskaService from "../services/MinskaService";
import ActiveFluxType from "../types/ActiveFluxType";

export default function Detail({ route, navigation }: any) {
  const { activeFluxType, setActiveFluxType, setLoadingStatus } = useContext(SessionContext);
  const [detail, setDetail] = useState<HistoryItem>();

  const handleHistory = () => navigation.navigate(RoutesEnum.History);

  const handleHowToCompensate = () => notify("em breve...", true);

  const handleHowToCalculate = () => {
    const title = "Como o calculo é feito";
    const message =
      "Uma somatória de valores globalmente aceitos que estão ligados a emissão de carbono presente nesse item é realizada.";

    Alert.alert(title, message, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
  };

  const handleGoToHome = () => navigation.navigate(RoutesEnum.Home);

  const saveDetailOnHistory = async (item: HistoryItem) => {
    const key = `history-${getDateISO()}`;
    console.log("\n[Detail] saveDetailOnHistory:", key);
    try {
      // await StorageService.setObjectItem(key, item);
    } catch (error: any) {
      console.log("\n[Detail|ERROR] saveDetailOnHistory: ", error);
    }
  };

  const getCalculation = async (activeFluxType: ActiveFluxType) => {
    console.log("\n[Detail] getCalculation: ", route.params);
    const detailItem = route.params?.detailItem;

    // const calculationId = route.params?.calculationId;
    // if (calculationId) {
    //   setDetailByCalculationId(calculationId);
    // }
    setLoadingStatus(false);

    // try {
    // const { id, name } = seachItem;
    // const type = activeFluxType === "Recipe" ? "recipe" : "product";
    // const responseCalculation = await MinskaApi.startCalculation(id, name, type);
    // const { calculationId } = responseCalculation.data;
    // const { data } = responseCalculation;

    // console.log("\nDetail] getDetail(responseCalculation): ", { data });
    // const responseResult = await MinskaApi.getCalculationResult(calculationId);

    // console.log("\nDetail] getDetail(responseResult): ", { data: responseResult.data });
    // const resultData = responseResult.data;

    // const detail: HistoryItem = {
    //   id,
    //   title: name,
    //   emission: resultData.totalCarbonFootprint,
    //   type,
    //   dateISO: getDateISO(),
    // };
    // setDetail(detail);
    // saveDetailOnHistory(detail);
    // } catch (error: any) {
    //   console.log("\nDetail|ERROR]: ", error);
    //   notify("Erro inesperado, tente novamente mais tarde.");
    //   navigation.navigate(RoutesEnum.Home);
    // }
  };

  const setDetailByCalculationId = async (calculationId: string) => {
    const calculation = await MinskaService.getCalculation(calculationId);
    console.log("\n[Detail] getCalculation(calculation): ", calculation);
    if (calculation) {
      const newDetail: HistoryItem = {
        dateISO: getDateISO(),
        emission: calculation.totalCarbonFootprint,
        id: calculationId,
        title: calculation.name,
        type: calculation.processes.length === 1 ? "Product" : "Recipe",
      };
      console.log("\n[Detail] getCalculation(newDetail): ", newDetail);

      setDetail(newDetail);
    }
  };

  const mockedSetup = () => {
    const isRecipe = activeFluxType === "Recipe";
    const detail: HistoryItem = {
      id: new Date().toISOString(),
      title: isRecipe ? "Compota de abacaxi" : "Banana",
      emission: isRecipe ? 50 : 4.5,
      type: isRecipe ? "Recipe" : "Product",
      dateISO: getDateISO(),
    };
    setDetail(detail);
  };

  const getDetail = () => {
    setLoadingStatus(true);
    console.log("\n[Detail] getDetail: ", { activeFluxType });
    const detailItem: HistoryItem = route.params?.detailItem;

    if (detailItem) {
      console.log("\n[Detail] getDetail: ", { detailItem });
      setActiveFluxType(detailItem.type);
      setDetail(detailItem);
      setLoadingStatus(false);
    } else mockedSetup();
  };

  const loadDetail = () => {
    getDetail();
  };

  useEffect(loadDetail, []);

  return (
    <Container centralized>
      <View style={styles.resultInfo}>
        <Subtitle>{activeFluxType == "Recipe" ? "Receita" : "Produto"}</Subtitle>
        <EmissionText value={detail?.emission ?? 0} fontSize={50} bolder separateValueAndUnit />
        <Text style={styles.frequency}>(equivalente)</Text>
        <Text style={styles.itemName}>{detail?.title}</Text>
      </View>
      <View style={styles.buttonsGrid}>
        <View onTouchStart={handleHowToCompensate}>
          <Button disabled centered>
            como posso compensar essa emissão
          </Button>
        </View>
        <Button onPress={handleHowToCalculate}>como o cálculo é feito</Button>
        <Button onPress={handleHistory}>Histórico</Button>
        <Button onPress={handleGoToHome}>inicio</Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 4,
    margin: "auto 0",
  },
  badge: {
    color: "#fff",
    textTransform: "lowercase",
  },
  resultInfo: {
    paddingTop: 24,
    width: "100%",
    justifyContent: "center",
  },
  emissionText: {
    fontSize: 72,
    color: "#333",
    fontWeight: "bold",
  },
  subscribed: {
    fontSize: 42,
  },
  frequency: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#bdbdbd",
  },
  itemName: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    width: "100%",
    textAlign: "center",
    paddingTop: 24,
    paddingBottom: 32,
  },
  buttonsGrid: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingBottom: 16,
  },
});
