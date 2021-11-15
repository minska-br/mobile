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
import MinskaService from "../services/MinskaService";

export default function Search({ navigation }: any) {
  const { activeFluxType } = useContext(SessionContext);
  const isRecipeFlux = activeFluxType === "Recipe";

  const inputref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState("Batata");
  const { setLoadingStatus } = useContext(SessionContext);

  const clearInput = () => setInputValue("");
  const focusOnInputField = () => inputref.current?.focus();

  const getPlaceholder = () => {
    if (isRecipeFlux) return getRandomItemFromArray(recipes);
    else return getRandomItemFromArray(products);
  };

  // const navigateToNextScreen = () => {
  //   const { SearchResult, CalculatingEmptyState } = RoutesEnum;
  //   const nextScreen = isRecipeFlux ? SearchResult : CalculatingEmptyState;
  //   const seachItem = { name: inputValue };
  //   const params = { seachItem, activeFluxType };
  //   navigation.navigate(nextScreen, params);
  // };

  const searchRecipe = async () => {
    console.log("\n[Search] searchRecipe");

    const seachItem = { name: inputValue };
    const params = { seachItem };
    navigation.navigate(RoutesEnum.SearchResult, params);
  };

  const searchProduct = async () => {
    console.log("\n[Search] searchProduct");

    // const response: any = await MinskaApi.scheduleProductCalculation(inputValue);
    // const calculationId = response?.data?.calculationId;

    // console.log("\n[Search] handleSearch: ", { calculationId });

    // navigation.navigate(RoutesEnum.CalculatingEmptyState);
    setLoadingStatus(false);
  };

  const handleSearch = async () => {
    setLoadingStatus(true);
    // notify(`Search: ${inputValue}`, true);
    console.log("\n[Search] handleSearch", isRecipeFlux);

    const searchedItem = await MinskaService.getExistingItemByName(inputValue.trim());
    console.log("\n[Search] handleSearch: ", { searchedItem, exists: Boolean(searchedItem) });

    if (Boolean(searchedItem)) {
      // Navigate to detail screen
    } else {
      // Schedule product calculation or go to list results
    }

    fakeDelay(clearInput, 3);
  };

  const searchItem = () => {
    if (isRecipeFlux) {
      searchRecipe();
    } else {
      searchProduct();
    }
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
