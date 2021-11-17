import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  BackHandler,
} from "react-native";
import Container from "../components/Container";
import Title from "../components/Title";
import { SessionContext } from "../contexts/SessionContext";
import { Ionicons } from "@expo/vector-icons";
import EmissionText from "../components/EmissionText";
import StorageService from "../services/HistoryService";
import HistoryItem from "../interfaces/HistoryItem";
import notify from "../helpers/notify";
import RoutesEnum from "../enums/routes";
import HistoryService from "../services/HistoryService";

export default function History({ navigation }: any) {
  const NOT_SELECTED_ID = "none";
  const [data, setData] = useState<HistoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>(NOT_SELECTED_ID);
  const { setLoadingStatus } = useContext(SessionContext);

  const undoSelection = () => setSelectedItemId(NOT_SELECTED_ID);

  const deleteSelectedItem = async () => {
    setLoadingStatus(true);
    await StorageService.deleteItem(selectedItemId);
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

    const onPressItem = (id: string) => {
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
          <Text style={styles.itemType}>{item.type == "Recipe" ? "Receita" : "Produto"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.itemText, activeTextStyle]}>
            {item.title.length > 15 ? item.title?.substring(0, 15).trim() + "..." : item.title}
          </Text>
          {item.emission == null ? (
            <Text style={styles.itemType}>Calculando...</Text>
          ) : (
            <EmissionText
              value={item?.emission ?? 0}
              fontSize={20}
              color={isSelected ? "#fff" : undefined}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const getList = async () => {
    const items = await HistoryService.getHistory();
    console.log("[History] getList: ", items);
    if (items) setData(items);

    // try {
    //   const keys = await StorageService.getAllKeys();
    //   const onlyHistoryKeys = (key: string) => key.includes("history");
    //   const filteredKeys = keys.filter(onlyHistoryKeys);
    //   const historyValues = await StorageService.getMultiple(filteredKeys);
    //   const historyData = historyValues.map(([key, value]) => {
    //     if (value) {
    //       const item = JSON.parse(value);
    //       item.id = key;
    //       return item;
    //     }
    //   });
    //   setData(historyData);
    // } catch (error) {
    //   console.error("[History|ERROR] getList: ", error);
    //   notify("Erro inesperado, tente novamente mais tarde.");
    //   navigation.navigate();
    // }
    // setLoadingStatus(false);
  };

  const backNavigationHandler = () => {
    navigation.navigate(RoutesEnum.Home);
    return true; // Just to use as back click without type problems
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backNavigationHandler);
    return () => backHandler.remove();
  }, []);

  // const wipeData = async () => {
  //   await StorageService.clear();
  // };

  useEffect(() => {
    // wipeData();
    getList();
  }, []);

  return (
    <Container>
      <View style={styles.titleContainer}>
        <Title>Histórico</Title>

        <Text style={styles.historySubtitle}>
          {data.length
            ? "Selecione um item caso queira o excluir:"
            : "Ainda não existem itens no seu histórico."}
        </Text>
      </View>

      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />

      {selectedItemId !== NOT_SELECTED_ID && (
        <View style={styles.trashButtonContainer}>
          <TouchableOpacity style={styles.trashButton} onPress={handleTrashPress}>
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
