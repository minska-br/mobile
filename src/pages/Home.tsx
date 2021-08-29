import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import notify from "../helpers/notify";

type ActiveType = "Product" | "Recipe" | null;

export default function Home() {
  const [activeType, setActiveType] = useState<ActiveType>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você busca?</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={
            activeType === "Product"
              ? styles.squareButtonSelected
              : styles.squareButton
          }
          activeOpacity={0.8}
          onPress={() => setActiveType("Product")}
        >
          <Text style={styles.squareButtonText}>Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeType === "Recipe"
              ? styles.squareButtonSelected
              : styles.squareButton
          }
          activeOpacity={0.8}
          onPress={() => setActiveType("Recipe")}
        >
          <Text style={styles.squareButtonText}>Receita</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setActiveType(null);
          notify(
            `Item selecionado: ${activeType}\nProximo passo: criar tela de pesquisa!`
          );
        }}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 48,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: "20%",
    marginBottom: "30%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    borderColor: "#898989",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    textTransform: "uppercase",
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
