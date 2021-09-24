import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import Title from "../components/Title";
import RoutesEnum from "../enums/routes";
import notify from "../helpers/notify";
import ActiveFluxType from "../types/ActiveFluxType";

export default function Home({ navigation }: any) {
  const [activeFluxType, setActiveFluxType] = useState<ActiveFluxType>(null);

  const clearSelectedFluxType = () => setActiveFluxType(null);

  const handleHistoryPress = () => {
    clearSelectedFluxType();
    navigation.navigate(RoutesEnum.History);
  };

  const handleContinuePress = () => {
    if (activeFluxType) {
      navigation.navigate(RoutesEnum.Search, { activeFluxType });
      setTimeout(clearSelectedFluxType, 500);
      return;
    }

    notify(`Selecione um item para continuar.`);
  };

  return (
    <Container centralized>
      <Title centralized>O que você busca?</Title>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={activeFluxType === "Product" ? styles.squareButtonSelected : styles.squareButton}
          activeOpacity={0.8}
          onPress={() => setActiveFluxType("Product")}
        >
          <Text style={styles.squareButtonText}>Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeFluxType === "Recipe" ? styles.squareButtonSelected : styles.squareButton}
          activeOpacity={0.8}
          onPress={() => setActiveFluxType("Recipe")}
        >
          <Text style={styles.squareButtonText}>Receita</Text>
        </TouchableOpacity>
      </View>

      <Button onPress={handleHistoryPress} size="large">
        Histórico
      </Button>

      <Button onPress={handleContinuePress} size="large">
        Continuar
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: "20%",
    marginBottom: "30%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  squareButton: {
    backgroundColor: "#898989",
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    width: "47%",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  squareButtonSelected: {
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    width: "47%",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  squareButtonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#fff",
    fontWeight: "400",
    textTransform: "uppercase",
  },
});
