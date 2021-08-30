import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import recipes from "../constants/recipes";
import notify from "../helpers/notify";

export default function Search() {
  const inputref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState("");
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  const focusOnInputField = () => inputref.current?.focus();

  const openKeyboardOnLoad = () => {
    const timeout = 1 * 1000;
    setTimeout(() => focusOnInputField(), timeout);
  };

  useEffect(openKeyboardOnLoad, []);

  return (
    <Container>
      <Subtitle>Receita</Subtitle>
      <Title>Digite o que deseja procurar</Title>
      <TextInput
        ref={inputref}
        placeholder={`Ex: ${randomRecipe}`}
        style={styles.searchInput}
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
      ></TextInput>
      <Button
        disabled={inputValue.length <= 0}
        onPress={() => {
          notify(`Search: ${inputValue}`);
        }}
      >
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
