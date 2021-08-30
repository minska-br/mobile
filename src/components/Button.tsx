import React from "react";

import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { disabled, onPress, children } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled || false}
      >
        <Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>
          {children}
        </Text>
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
    padding: 16,
    margin: 4,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonTextDisabled: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#BDBDBD",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
