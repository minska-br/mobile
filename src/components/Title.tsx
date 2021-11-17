import React from "react";
import { StyleSheet, Text } from "react-native";

interface TitleProps {
  centralized?: boolean;
}

export default class Title extends React.Component<TitleProps> {
  constructor(props: TitleProps) {
    super(props);
  }

  render() {
    const { centralized, children } = this.props;

    return <Text style={centralized ? styles.centeredTitle : styles.title}>{children}</Text>;
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto",
    fontSize: 48,
    color: "#333",
    fontWeight: "bold",
  },
  centeredTitle: {
    fontFamily: "Roboto",
    fontSize: 48,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
});
