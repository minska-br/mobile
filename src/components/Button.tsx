import React from "react";

import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#898989",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
