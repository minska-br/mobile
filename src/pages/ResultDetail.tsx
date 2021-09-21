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
import notify from "../helpers/notify";

interface Detail {
  name: string;
  totalEmission: number;
}

export default function ResultDetail({ route, navigation }: any) {
  const { setLoadingStatus } = useContext(LoadingContext);
  const [detail, setDetail] = useState<Detail>();
  const activeFluxType = route.params?.activeFluxType;

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

  const getDetail = async () => {
    setLoadingStatus(false);
    // await request sending id

    const isRecipe = activeFluxType === "Recipe";
    if (isRecipe) {
      setDetail({ name: "Compota de abacaxi", totalEmission: 50 });
    } else {
      setDetail({ name: "Banana", totalEmission: 4.5 });
    }
  };

  const loadList = () => {
    getDetail();
  };

  useEffect(loadList, []);

  return (
    <Container centralized>
      <View style={styles.resultInfo}>
        <Subtitle route={route} />
        <EmissionText value={detail?.totalEmission ?? 0} fontSize={72} bolder />
        <Text style={styles.frequency}>(ao ano)</Text>
        <Text style={styles.itemName}>{detail?.name}</Text>
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
