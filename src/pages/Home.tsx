import React from "react";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import Title from "../components/Title";
import { StorageContext } from "../contexts/StorageContext";
import RoutesEnum from "../enums/routes";
import ActiveFluxType from "../types/ActiveFluxType";

export default function Home({ navigation }: any) {
  const { setActiveFluxType } = useContext(StorageContext);

  const handleHistoryPress = () => navigation.navigate(RoutesEnum.History);

  const handleFluxPress = (activeFluxType: ActiveFluxType) => {
    setActiveFluxType(activeFluxType);
    navigation.navigate(RoutesEnum.Search);
  };

  return (
    <Container centralized>
      <Title centralized>O que você busca?</Title>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.squareButton} onPress={() => handleFluxPress("Product")}>
          <Text style={styles.squareButtonText}>Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton} onPress={() => handleFluxPress("Recipe")}>
          <Text style={styles.squareButtonText}>Receita</Text>
        </TouchableOpacity>
      </View>

      <Button onPress={handleHistoryPress} size="large">
        Histórico
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
  squareButtonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#fff",
    fontWeight: "400",
    textTransform: "uppercase",
  },
});
