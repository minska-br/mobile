import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import RoutesEnum from "../enums/routes";
import { StorageContext } from "../contexts/StorageContext";
import Container from "../components/Container";
import MinskaApi from "../services/MinskaApi";
import { AxiosResponse } from "axios";
import notify from "../helpers/notify";

export default function SearchResult({ route, navigation }: any) {
  const [data, setData] = useState<any>([]);
  const { setLoadingStatus } = useContext(StorageContext);
  const { seachItem, activeFluxType } = route.params;

  const navigateToDetail = (seachItem: any) => {
    navigation.navigate(RoutesEnum.Detail, { seachItem, activeFluxType });
  };

  const renderItem = ({ item }: any) => {
    const onPressItem = () => {
      setLoadingStatus(true);
      navigateToDetail(item);
    };
    return (
      <TouchableOpacity style={styles.item} onPress={onPressItem}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const getList = async () => {
    let response!: AxiosResponse<any>;
    try {
      response = await MinskaApi.getProductList(seachItem.name);
      const { data } = response;
      setData(data);
      setLoadingStatus(false);
    } catch (error) {
      console.error("[SearchResult] getList: ", { response });
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
