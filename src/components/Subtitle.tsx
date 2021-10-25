import React from "react";
import { StyleSheet, Text } from "react-native";

interface SubtitleProps {
  children?: any;
  centralized?: boolean;
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
    const { centralized } = this.props;

    return (
      <Text style={[styles.subtitle, { textAlign: centralized ? "center" : "auto" }]}>
        {this.getText()}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "Roboto",
    fontSize: 24,
    color: "#A5A3A3",
    fontWeight: "bold",
  },
});
