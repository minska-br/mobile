import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import Container from "../components/Container";
import Title from "../components/Title";
import { StorageContext } from "../contexts/StorageContext";
import { Ionicons } from "@expo/vector-icons";
import Subtitle from "../components/Subtitle";
import Button from "../components/Button";
import RoutesEnum from "../enums/routes";

export default function CalculatingEmptyState({ navigation }: any) {
  const { activeFluxType, setLoadingStatus } = useContext(StorageContext);

  const getItemText = () => {
    return activeFluxType == "Product" ? "do seu produto" : "da sua receita";
  };

  const clearNavigationStack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleHistoryPress = () => {
    clearNavigationStack();
    navigation.navigate(RoutesEnum.History);
    return true; // Just to use as back click without type problems
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleHistoryPress);
    setLoadingStatus(false);

    return () => backHandler.remove();
  }, []);

  return (
    <Container centralized>
      <View style={styles.titleContainer}>
        <Title>Pronto!</Title>
        <Subtitle centralized>Cálculo de emissão agendado com sucesso 🎉</Subtitle>
      </View>

      <Ionicons name="checkmark-circle-outline" color="#19F379" size={200} />

      <Text style={styles.adviceText}>
        Em breve o resultado {getItemText()} estará disponível no histórico de itens cálculados
      </Text>

      <Button onPress={handleHistoryPress} size="large">
        Histórico
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 32,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  adviceText: {
    fontSize: 20,
    color: "#444",
    textAlign: "center",
    marginBottom: 32,
  },
});
