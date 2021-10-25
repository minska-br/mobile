import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import EmissionText from "../components/EmissionText";
import Subtitle from "../components/Subtitle";
import { LoadingContext } from "../contexts/LoadingContext";
import RoutesEnum from "../enums/routes";
import getDateISO from "../helpers/getDateISO";
import notify from "../helpers/notify";
import randomIntFromInterval from "../helpers/randomIntFromInterval";
import HistoryItem from "../interfaces/HistoryItem";
import MinskaApi from "../services/MinskaApi";
import StorageService from "../services/StorageService";
import ActiveFluxType from "../types/ActiveFluxType";

export default function Detail({ route, navigation }: any) {
  const { setLoadingStatus } = useContext(LoadingContext);
  const [detail, setDetail] = useState<HistoryItem>();
  const activeFluxType: ActiveFluxType = route.params?.activeFluxType;
  const seachItem = route.params?.seachItem;

  const handleAnotherSearch = () => {
    navigation.navigate(RoutesEnum.Search, { activeFluxType });
  };

  const handleHowToCalculate = () => {
    notify(`Uma somatória de valores globalmente aceitos que 
            estão ligados a emissão de carbono presente nesse
             item é realizada.`);
  };

  const handleGoToHome = () => {
    navigation.navigate(RoutesEnum.Home);
    setLoadingStatus(false);
  };

  const saveDetailOnHistory = async (item: HistoryItem) => {
    const key = `history-${getDateISO()}`;
    console.log("[Detail] saveDetailOnHistory:", key);
    try {
      await StorageService.setObjectItem(key, item);
    } catch (error) {
      console.log("[Detail|ERROR] saveDetailOnHistory: ", error);
    }
  };

  const getCalculation = async (activeFluxType: ActiveFluxType) => {
    try {
      console.log("[Detail] getCalculation: ", seachItem);

      const { id, name } = seachItem;
      const type: ActiveFluxType = activeFluxType === "Recipe" ? "Recipe" : "Product";
      const responseCalculation = await MinskaApi.startCalculation(id, name, type);
      const { calculationId } = responseCalculation.data;
      const { data } = responseCalculation;

      console.log("[Detail] getDetail(responseCalculation): ", { data });
      const responseResult = await MinskaApi.getCalculationResult(calculationId);

      console.log("[Detail] getDetail(responseResult): ", { data: responseResult.data });
      const resultData = responseResult.data;

      const detail: HistoryItem = {
        id,
        title: name,
        emission: resultData.totalCarbonFootprint,
        type,
        dateISO: getDateISO(),
      };
      setDetail(detail);
      saveDetailOnHistory(detail);
    } catch (error) {
      console.error("[Detail|ERROR]: ", error);
      notify("Erro inesperado, tente novamente mais tarde.");
      navigation.navigate(RoutesEnum.Home);
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

  const getDetail = async () => {
    setLoadingStatus(true);

    if (activeFluxType) await getCalculation(activeFluxType);
    else mockedSetup();

    setLoadingStatus(false);
  };

  const loadDetail = () => {
    getDetail();
  };

  useEffect(loadDetail, []);

  return (
    <Container centralized>
      <View style={styles.resultInfo}>
        <Subtitle route={route} />
        <EmissionText value={detail?.emission ?? 0} fontSize={64} bolder />
        <Text style={styles.frequency}>(ao ano)</Text>
        <Text style={styles.itemName}>{detail?.title}</Text>
      </View>
      <View style={styles.buttonsGrid}>
        <Button disabled centered>
          como posso compensar essa emissão?
        </Button>
        <Button onPress={handleAnotherSearch} centered>
          pesquisar outra receita
        </Button>
        <Button onPress={handleHowToCalculate}>como o cálculo é feito</Button>
        <Button onPress={handleGoToHome}>voltar ao inicio</Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
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
