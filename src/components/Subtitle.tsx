import React from "react";
import { StyleSheet, Text } from "react-native";

interface SubtitleProps {
  children?: any;
}

export default class Subtitle extends React.Component<SubtitleProps> {
  constructor(props: any) {
    super(props);
  }

  getText() {
    const { children } = this.props;
    const defaultSubtitleValue = "Undefined";
    return children ? children : defaultSubtitleValue;
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
