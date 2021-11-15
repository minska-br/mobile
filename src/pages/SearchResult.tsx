import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import RoutesEnum from "../enums/routes";
import { SessionContext } from "../contexts/SessionContext";
import Container from "../components/Container";
import MinskaApi from "../services/MinskaApi";
import axios, { AxiosResponse } from "axios";
import notify from "../helpers/notify";

export default function SearchResult({ route, navigation }: any) {
  const [data, setData] = useState<any>([]);
  const { activeFluxType, setLoadingStatus } = useContext(SessionContext);
  const { seachItem } = route.params;

  const renderItem = ({ item }: any) => {
    const onPressItem = () => {
      setLoadingStatus(true);
      console.log("[SearchResult] renderItem(item)", item);
      navigation.navigate(RoutesEnum.CalculatingEmptyState);
    };

    return (
      <TouchableOpacity style={styles.item} onPress={onPressItem}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const getList = async () => {
    let response!: any;
    // let response!: AxiosResponse<any> | undefined;
    try {
      // response = await MinskaApi.getProductList(seachItem.name.trim());
      const url = `http://127.0.0.1:4390/recipes/allrecipes?value=${seachItem.name.trim()}`;
      console.log("[SearchResult] getList", { url });

      response = await MinskaApi.getProductList(seachItem.name.trim());

      console.log("[SearchResult] getList(response): ", response);
      // const data = response?.data;
      // setData(data);
      setLoadingStatus(false);
    } catch (error) {
      console.error("[SearchResult] getList: ", error);
      notify("Erro inesperado, tente novamente mais tarde.");
      setLoadingStatus(false);
    }
  };

  const loadList = () => {
    getList();
  };

  useEffect(loadList, [seachItem]);

  return (
    <Container>
      <Subtitle>{activeFluxType == "Recipe" ? "Receita" : "Produto"}</Subtitle>
      <Title>Veja o que nós encontramos</Title>

      <SafeAreaView style={styles.safeAreaViewContainer}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16,
  },
  item: {
    justifyContent: "center",
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  itemText: {
    fontSize: 16,
  },
});
