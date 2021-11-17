import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import RoutesEnum from "../enums/routes";
import { SessionContext } from "../contexts/SessionContext";
import Container from "../components/Container";
import notify from "../helpers/notify";
import HistoryService from "../services/HistoryService";
import HistoryItem from "../interfaces/HistoryItem";
import MinskaService from "../services/MinskaService";
import getDateISO from "../helpers/getDateISO";

export default function SearchResult({ route, navigation }: any) {
  const [data, setData] = useState<any>([]);
  const { activeFluxType, setLoadingStatus } = useContext(SessionContext);

  const scheduleRecipeCalculation = async (recipeId: number, recipeName: string) => {
    console.log("\n[SearchResult] scheduleRecipeCalculation: ", { recipeId, recipeName });

    try {
      const calculationId = await MinskaService.scheduleRecipeCalculation(recipeId, recipeName);
      const schedulingItem: HistoryItem = {
        id: String(calculationId),
        title: recipeName,
        type: "Recipe",
        emission: null,
        dateISO: getDateISO(),
      };
      await HistoryService.saveScheduling(schedulingItem);
      navigation.navigate(RoutesEnum.CalculatingEmptyState);
    } catch (error: any) {
      notify("Erro inesperado, tente novamente mais tarde");
      console.log("[SearchResult | ERROR] scheduleRecipeCalculation: " + error.message);
      navigation.navigate(RoutesEnum.Home);
    }
  };

  const renderItem = ({ item }: any) => {
    const onPressItem = () => {
      setLoadingStatus(true);
      console.log("\n[SearchResult] renderItem(item)", item);
      scheduleRecipeCalculation(item.id, item.name);
    };

    return (
      <TouchableOpacity style={styles.item} onPress={onPressItem}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const loadList = () => {
    const { recipesList } = route.params;
    setData(recipesList);
    setLoadingStatus(false);
  };

  useEffect(loadList, []);

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
