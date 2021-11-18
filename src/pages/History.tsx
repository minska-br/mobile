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
import HistoryItem from "../interfaces/HistoryItem";
import notify from "../helpers/notify";
import RoutesEnum from "../enums/routes";
import HistoryService from "../services/HistoryService";
import MinskaService from "../services/MinskaService";
import getDateISO from "../helpers/getDateISO";

export default function History({ navigation }: any) {
  let updateItemProcess!: NodeJS.Timeout;
  let notCalculatedItemsCheckCounter = 0;
  const NOT_SELECTED_ID = "none";
  const [data, setData] = useState<HistoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>(NOT_SELECTED_ID);
  const { setLoadingStatus } = useContext(SessionContext);

  const undoSelection = () => setSelectedItemId(NOT_SELECTED_ID);

  const deleteSelectedItem = async () => {
    setLoadingStatus(true);
    try {
      await HistoryService.deleteHistoryItem(selectedItemId);
      const newData = data.filter((item) => item.id !== selectedItemId);
      setData(newData);
      undoSelection();
      setLoadingStatus(false);
    } catch (error: any) {
      console.log("\nHistory|ERROR] deleteSelectedItem: " + error.message);
      notify("Erro inesperado, tente novamente mais tarde.");
      navigation.navigate(RoutesEnum.Home);
    }
  };

  const handleTrashPress = () => {
    const selectedItem = data.find((item) => item.id === selectedItemId);
    const itemName = selectedItem?.title ?? "";
    const itemType = selectedItem?.type === "Product" ? "e produto" : "a receita";

    Alert.alert(
      itemName,
      `Deseja mesmo excluir ess${itemType}?`,
      [
        { text: "Não", onPress: () => {}, style: "cancel" },
        { text: "Sim", onPress: deleteSelectedItem },
      ],
      { cancelable: false }
    );
  };

  const handleDetailPress = () => {
    const selectedItem = data.find((item) => item.id === selectedItemId);
    console.log("\n[History] handleDetailPress: ", selectedItem);

    const params = { detailItem: selectedItem };
    navigation.navigate(RoutesEnum.Detail, params);
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selectedItemId === item.id;
    const activeContainerStyle = isSelected ? styles.activeItemContainer : null;
    const activeTextStyle = isSelected ? styles.activeItemText : null;

    const onPressItem = (id: string) => {
      if (item.emission) {
        // setLoadingStatus(true);
        const newId = isSelected ? NOT_SELECTED_ID : id; // Unselect id on twice press
        setSelectedItemId(newId);
        // fakeDelay(() => setLoadingStatus(false), 10, 5);
      } else {
        notify("Calculo em andamento.");
      }
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
              decimalPlaces={2}
              color={isSelected ? "#fff" : undefined}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const getItemEmission = async (historyItemId: string): Promise<number | null> => {
    const defaultEmission = null;
    let emissionToReturn: number | null = defaultEmission;
    try {
      const result = await MinskaService.getCalculation(historyItemId);
      emissionToReturn = result?.totalCarbonFootprint
        ? result?.totalCarbonFootprint
        : defaultEmission;
    } catch (error: any) {
      console.log("\nHistory|Error] getItemEmission: " + error.message);
      notify("Erro inesperado, tente novamente mais tarde.");
      emissionToReturn = defaultEmission;
    }
    updateItemBackgroundProcess(data); // Recursive call to update item each 5 minutes
    return emissionToReturn;
  };

  const updateEmissionById = (id: string, newEmission: number) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.emission = newEmission;
      }

      /* The await is not important in that case (updateHistoryItem) because visually the 
      screen follows the react state called "data" to render the items */
      HistoryService.updateHistoryItem(item);

      return item;
    });
    if (newData.length) setData(newData);
  };

  const checkDataItemsCalculation = async (dataItems: HistoryItem[]) => {
    const notCalculatedItems = dataItems.filter((item) => Boolean(item.emission) === false);

    if (notCalculatedItems.length) {
      notCalculatedItemsCheckCounter++;
      updateItemBackgroundProcess(data);
    }

    for (const historyItem of notCalculatedItems) {
      const newHistoryItemEmission = await getItemEmission(historyItem.id);
      if (newHistoryItemEmission) {
        updateEmissionById(historyItem.id, newHistoryItemEmission);
      }
    }
  };

  const updateItemBackgroundProcess = (dataItems: HistoryItem[]) => {
    const notCalculatedItemsCheckCounterLimit = 3;
    const delay = 5 * 1000; // 300 seconds of timeout (5 minutes)
    // const delay = 5 * 60 * 1000; // 300 seconds of timeout (5 minutes)
    console.log("\n[updateItemBackgroundProcess] called: " + getDateISO(), {
      notCalculatedItemsCheckCounter,
      notCalculatedItemsCheckCounterLimit,
      shouldCheckCalculation: notCalculatedItemsCheckCounter <= notCalculatedItemsCheckCounterLimit,
    });

    if (notCalculatedItemsCheckCounter <= notCalculatedItemsCheckCounterLimit) {
      const checkDataItemsCallback = () => checkDataItemsCalculation(dataItems);
      updateItemProcess = setTimeout(checkDataItemsCallback, delay);
    } else {
      clearBackgroundProcess();
    }
  };

  const getList = async () => {
    setLoadingStatus(true);
    try {
      const items = await HistoryService.getHistory();
      if (items) {
        setData(items);
        console.log("\n[History] getList(items): ", items);
        updateItemBackgroundProcess(items);
      }
    } catch (error: any) {
      console.log("\nHistory|ERROR] getList: " + error.message);
      notify("Erro inesperado, tente novamente mais tarde.");
    }
    setLoadingStatus(false);
  };

  const backNavigationHandler = () => {
    navigation.navigate(RoutesEnum.Home);
    return true; // Just to use as back click without type problems
  };

  useEffect(() => {
    setSelectedItemId(NOT_SELECTED_ID);
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backNavigationHandler);
    return () => backHandler.remove();
  }, []);

  // const wipeData = async () => {
  //   await StorageService.clear();
  // };

  const clearBackgroundProcess = () => clearTimeout(updateItemProcess);

  useEffect(() => {
    // wipeData();
    getList();
    return clearBackgroundProcess;
  }, []);

  return (
    <Container>
      <View style={styles.titleContainer}>
        <Title>Histórico</Title>

        <Text style={styles.historySubtitle}>
          {data.length
            ? "Selecione um item caso queira ver mais detalhes ou excluí-lo:"
            : "Ainda não existem itens no seu histórico."}
        </Text>
      </View>

      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />

      {selectedItemId !== NOT_SELECTED_ID && (
        <View style={styles.bottomButtonsGroup}>
          <View style={styles.trashButtonContainer}>
            <TouchableOpacity style={styles.trashButton} onPress={handleTrashPress}>
              <Ionicons name="md-trash-outline" color="white" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailButtonContainer}>
            <TouchableOpacity style={styles.trashButton} onPress={handleDetailPress}>
              <Ionicons name="md-eye-outline" color="white" size={30} />
            </TouchableOpacity>
          </View>
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
  bottomButtonsGroup: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  detailButtonContainer: {
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
