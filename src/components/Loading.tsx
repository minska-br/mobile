import React, { useContext } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { SessionContext } from "../contexts/SessionContext";

export default function Loading(props: any) {
  const { children } = props;
  const { loadingStatus } = useContext(SessionContext);

  const loading = (
    <View style={styles.loadingContainer}>
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("../../assets/splash.png")}
      />
      <Image
        resizeMode="contain"
        style={styles.loadingIcon}
        source={require("../../assets/loading.gif")}
      />
    </View>
  );

  return loadingStatus ? loading : children;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
  },
  loadingIcon: {
    zIndex: 2,
    position: "absolute",
    top: "60%",
  },
});
