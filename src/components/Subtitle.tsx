import React from "react";

import { StyleSheet, Text } from "react-native";

interface SubtitleProps {
  route: any;
}

export default class Subtitle extends React.Component<SubtitleProps> {
  constructor(props: any) {
    super(props);
  }

  getText() {
    const { children, route } = this.props;

    if (children) return children;

    const activeFluxType = route.params?.activeFluxType;

    if (!activeFluxType) return "Subtitle";

    const isRecipe = activeFluxType === "Recipe";
    return isRecipe ? "Receita" : "Produto";
  }

  render() {
    return <Text style={styles.subtitle}>{this.getText()}</Text>;
  }
}

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "Roboto",
    fontSize: 24,
    color: "#A5A3A3",
    width: "100%",
    fontWeight: "bold",
  },
});
