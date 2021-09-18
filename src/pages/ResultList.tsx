import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import RoutesEnum from "../enums/routes";
import fakeDelay from "../helpers/fakeDelay";
import { LoadingContext } from "../contexts/LoadingContext";
import Container from "../components/Container";

const mock = [
  {
    id: 1196,
    title: "compota de abacaxi",
  },
  {
    id: 2777,
    title: "compota de maçã diet",
  },
  {
    id: 1258,
    title: "tortura de abacaxi com coco",
  },
  {
    id: 2734,
    title: "bavaroise de abacaxi",
  },
  {
    id: 1752,
    title: "perolas de tapioca com compota de frutas",
  },
  {
    id: 2961,
    title: "torta de abacaxi",
  },
  {
    id: 1609,
    title: "compota de abacaxi",
  },
  {
    id: 1713,
    title: "compota de abacaxi diet",
  },
  {
    id: 2303,
    title: "bolo de abacaxi diferente",
  },
  {
    id: 2193,
    title: "compota de abacaxi",
  },
  {
    id: 1881,
    title: "torta de abacaxi",
  },
];

export default function ResultList({ route, navigation }: any) {
  const [data, setData] = useState<any>([]);
  const { setLoadingStatus } = useContext(LoadingContext);
  const { searchQuery, activeFluxType } = route.params;

  const navigateToResultDetail = (item: any) => {
    navigation.navigate(RoutesEnum.ResultDetail, { activeFluxType });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setLoadingStatus(true);
        fakeDelay(() => navigateToResultDetail(item), 10, 5);
      }}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const getList = async () => {
    // await request sending searchQuery
    setData(mock);
    setLoadingStatus(false);
  };

  const loadList = () => {
    getList();
  };

  useEffect(loadList, [searchQuery]);

  return (
    <Container>
      <Subtitle route={route} />
      <Title>Veja o que nós encontramos</Title>

      <SafeAreaView style={styles.safeAreaViewContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    width: "100%",
    maxHeight: "50%",
    marginTop: 16,
    paddingBottom: 16,
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
