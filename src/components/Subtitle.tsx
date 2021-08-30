import React from "react";

import { StyleSheet, Text } from "react-native";

export default class Subtitle extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return <Text style={styles.subtitle}>{children}</Text>;
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
