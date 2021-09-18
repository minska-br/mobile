import React, { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import recipes from "../constants/recipes";
import RoutesEnum from "../enums/routes";
import Loading from "../components/Loading";
import fakeDelay from "../helpers/fakeDelay";
import { LoadingContext } from "../contexts/LoadingContext";
import notify from "../helpers/notify";
import getRandomItemFromArray from "../helpers/getRandomItemFromArray";
import products from "../constants/products";

export default function Search({ route, navigation }: any) {
  const inputref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState("");
  const { setLoadingStatus } = useContext(LoadingContext);

  const activeFluxType = route.params?.activeFluxType;
  const isRecipeFlux = activeFluxType === "Recipe";

  const getPlaceholder = () => {
    if (isRecipeFlux) return getRandomItemFromArray(recipes);
    else return getRandomItemFromArray(products);
  };

  const navigateToResultList = () => {
    const { ResultList, ResultDetail } = RoutesEnum;
    const nextScreen = isRecipeFlux ? ResultList : ResultDetail;

    navigation.navigate(nextScreen, {
      // searchQuery: inputValue, TODO: Send this value to result list when integrated
      activeFluxType,
    });
  };

  const handeSearch = () => {
    setLoadingStatus(true);
    notify(`Search: ${inputValue}`, true);

    fakeDelay(() => {
      navigateToResultList();
      setTimeout(() => setLoadingStatus(false), 500);
    }, 3);
  };

  const openKeyboardOnLoad = () => {
    setLoadingStatus(false);
    const timeout = 1 * 1000;
    const focusOnInputField = () => inputref.current?.focus();
    setTimeout(focusOnInputField, timeout);
  };

  useEffect(openKeyboardOnLoad, []);

  return (
    <Container>
      <Subtitle route={route} />
      <Title>Digite o que deseja procurar</Title>
      <TextInput
        ref={inputref}
        placeholder={`Ex: ${getPlaceholder()}`}
        style={styles.searchInput}
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
      ></TextInput>
      <Button disabled={inputValue.length <= 0} onPress={handeSearch}>
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
