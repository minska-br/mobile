import React, { useContext } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { LoadingContext } from "../contexts/LoadingContext";
import Container from "./Container";

export default function Loadin(props: any) {
  const { children } = props;
  const { loadingStatus } = useContext(LoadingContext);

  const loadingComponet = (
    <Container centralized>
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
    </Container>
  );

  return loadingStatus ? loadingComponet : children;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
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
