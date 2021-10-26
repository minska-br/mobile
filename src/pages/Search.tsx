import React, { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import recipes from "../constants/recipes";
import RoutesEnum from "../enums/routes";
import fakeDelay from "../helpers/fakeDelay";
import { SessionContext } from "../contexts/SessionContext";
import notify from "../helpers/notify";
import getRandomItemFromArray from "../helpers/getRandomItemFromArray";
import products from "../constants/products";
import MinskaApi from "../services/MinskaApi";

export default function Search({ navigation }: any) {
  const { activeFluxType } = useContext(SessionContext);
  const isRecipeFlux = activeFluxType === "Recipe";

  const inputref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState("");
  const { setLoadingStatus } = useContext(SessionContext);

  const clearInput = () => setInputValue("");
  const focusOnInputField = () => inputref.current?.focus();

  const getPlaceholder = () => {
    if (isRecipeFlux) return getRandomItemFromArray(recipes);
    else return getRandomItemFromArray(products);
  };

  const navigateToNextScreen = () => {
    const { SearchResult, CalculatingEmptyState } = RoutesEnum;
    const nextScreen = isRecipeFlux ? SearchResult : CalculatingEmptyState;
    const seachItem = { name: inputValue };
    const params = { seachItem, activeFluxType };
    navigation.navigate(nextScreen, params);
  };

  const handleSearch = async () => {
    setLoadingStatus(true);
    notify(`Search: ${inputValue}`, true);
    const seachItem = { name: inputValue };

    if (isRecipeFlux) {
      const params = { seachItem };
      navigation.navigate(RoutesEnum.SearchResult, params);
    } else {
      const response = await MinskaApi.startCalculation(null, seachItem.name, "product");
      console.log("[Search] handleSearch: ", { response });

      navigation.navigate(RoutesEnum.CalculatingEmptyState);
    }

    navigateToNextScreen();
    fakeDelay(clearInput, 3);
  };

  const openKeyboardOnLoad = () => {
    setLoadingStatus(false);
    const timeout = 1 * 1000;
    setTimeout(focusOnInputField, timeout);
  };

  useEffect(openKeyboardOnLoad, []);

  return (
    <Container>
      <Subtitle>{activeFluxType == "Recipe" ? "Receita" : "Produto"}</Subtitle>
      <Title>Digite o que deseja procurar</Title>
      <TextInput
        ref={inputref}
        placeholder={`Ex: ${getPlaceholder()}`}
        style={styles.searchInput}
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
      ></TextInput>
      <Button disabled={inputValue.length <= 0} onPress={handleSearch}>
        Continuar
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    borderColor: "#333",
    borderWidth: 1,
    width: "100%",
    padding: 16,
    height: 56,
    marginTop: 56,
    marginBottom: 32,
  },
});
