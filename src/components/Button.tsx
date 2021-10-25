import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  disabled?: boolean;
  centered?: boolean;
  size?: "small" | "common" | "large";
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { disabled, centered, onPress, children } = this.props;
    const size = this.props.size ?? "common";

    return (
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled || false}>
        <Text
          style={[
            styles.buttonText,
            size === "small" ? styles.smallButton : null,
            size === "common" ? styles.commonButton : null,
            size === "large" ? styles.largeButton : null,
            disabled ? styles.buttonTextDisabled : null,
            centered ? styles.buttonTextCentered : null,
          ]}
        >
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
    margin: 4,
  },
  buttonText: {
    fontFamily: "Roboto",
    color: "#333",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonTextDisabled: {
    fontFamily: "Roboto",
    color: "#BDBDBD",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonTextCentered: { textAlign: "center" },
  smallButton: {
    fontSize: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  commonButton: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeButton: {
    fontSize: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
