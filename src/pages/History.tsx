import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import Container from "../components/Container";
import Title from "../components/Title";
import { LoadingContext } from "../contexts/LoadingContext";

interface HistoryItem {
  id: number;
  type: string;
  title: string;
  emission: number;
  dateUTC: string;
}

const mock: HistoryItem[] = [
  {
    id: 451,
    type: "Product",
    title: "Abacaxi",
    emission: 42.7,
    dateUTC: "",
  },
  {
    id: 734,
    type: "Recipe",
    title: "Compota de Abacaxi",
    emission: 13.2,
    dateUTC: "",
  },
  {
    id: 708,
    type: "Product",
    title: "Alface",
    emission: 38.0,
    dateUTC: "",
  },
  {
    id: 612,
    type: "Recipe",
    title: "Brownie",
    emission: 49.3,
    dateUTC: "",
  },
  {
    id: 729,
    type: "Recipe",
    title: "Tiramisù italiano",
    emission: 50.1,
    dateUTC: "",
  },
];

import { Ionicons } from "@expo/vector-icons";
import EmissionText from "../components/EmissionText";

export default function History() {
  const NOT_SELECTED_ID = -1;
  const [data, setData] = useState<HistoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number>(NOT_SELECTED_ID);
  const { setLoadingStatus } = useContext(LoadingContext);

  const undoSelection = () => setSelectedItemId(NOT_SELECTED_ID);

  const deleteSelectedItem = () => {
    setLoadingStatus(true);
    const newData = data.filter((item) => item.id !== selectedItemId);
    setData(newData);
    undoSelection();
    setLoadingStatus(false);
  };

  const handleTrashPress = () => {
    const selectedItem = data.find((item) => item.id === selectedItemId);
    const itemName = selectedItem?.title ?? "";
    const type = selectedItem?.type === "Product" ? "e produto" : "a receita";

    Alert.alert(
      itemName,
      `Deseja mesmo excluir ess${type}?`,
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Sim", onPress: deleteSelectedItem },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selectedItemId === item.id;
    const activeContainerStyle = isSelected ? styles.activeItemContainer : null;
    const activeTextStyle = isSelected ? styles.activeItemText : null;

    const onPressItem = (id: number) => {
      // setLoadingStatus(true);
      const newId = isSelected ? NOT_SELECTED_ID : id; // Unselect id on twice press
      setSelectedItemId(newId);
      // fakeDelay(() => setLoadingStatus(false), 10, 5);
    };

    return (
      <TouchableOpacity
        style={[styles.item, activeContainerStyle]}
        onPress={() => onPressItem(item.id)}
      >
        <View>
          <Text style={styles.itemType}>{item.type}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.itemText, activeTextStyle]}>{item.title}</Text>
          <EmissionText
            value={item.emission}
            fontSize={20}
            color={isSelected ? "#fff" : undefined}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const getList = async () => {
    // await request sending searchQuery
    setData(mock);
    setLoadingStatus(false);
  };

  const loadList = () => {
    getList();
  };

  useEffect(loadList, []);

  return (
    <Container>
      <View style={styles.titleContainer}>
        <Title>Histórico</Title>
        <Text style={styles.historySubtitle}>
          Selecione um item caso queira deleta-lo
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {selectedItemId !== NOT_SELECTED_ID && (
        <View style={styles.trashButtonContainer}>
          <TouchableOpacity
            style={styles.trashButton}
            onPress={handleTrashPress}
          >
            <Ionicons name="md-trash-outline" color="white" size={30} />
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 32,
  },
  historySubtitle: {
    color: "#777",
    fontSize: 20,
  },
  item: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#333",
    backgroundColor: "#eee",
    marginVertical: 4,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: "#333",
    fontFamily: "Roboto",
    fontSize: 20,
  },
  trashButtonContainer: {
    flexDirection: "row-reverse",
  },
  trashButton: {
    backgroundColor: "#444",
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemType: {
    color: "#777",
  },
  activeItemText: {
    color: "#fff",
  },
  activeItemContainer: {
    color: "#fff",
    backgroundColor: "#333",
  },
});
