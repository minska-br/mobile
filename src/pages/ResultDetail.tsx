import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
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
  const { activeFluxType } = route.params;

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
    <Container>
      <Subtitle route={route} />
      <Text style={styles.emissiontext}>
        {String(detail?.totalEmission).replace(".", ",")} tCO
        <Text style={styles.subscribed}>2</Text>
      </Text>
      <Text style={styles.frequency}>(ao ano)</Text>
      <Text style={styles.itemName}>{detail?.name}</Text>
      <View style={styles.buttonsGrid}>
        <Button disabled centered>
          como posso compensar essa emissão?
        </Button>
        <Button onPress={handleAnotherSearch}>pesquisar outra receita</Button>
        <Button onPress={handleHowToCalculate}>como o cálculo é feito</Button>
        <Button onPress={handleGoToHome}>voltar ao inicio</Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  emissiontext: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#333",
    marginTop: 48,
  },
  subscribed: {
    fontSize: 32,
  },
  frequency: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#bdbdbd",
  },
  itemName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    width: "100%",
    textAlign: "center",
    paddingTop: 24,
    paddingBottom: 32,
  },
  buttonsGrid: {
    maxHeight: "50%",
    flex: 1,
    justifyContent: "space-between",
  },
});
