import React from "react";

import { StyleSheet, Text } from "react-native";

interface EmissionTextProps {
  color?: string;
  value: number;
  fontSize?: number;
  bolder?: boolean;
}

export default class EmissionText extends React.Component<EmissionTextProps> {
  private DEFAULT_FONTSIZE = 20;
  private DEFAULT_COLOR = "#333";

  constructor(props: any) {
    super(props);
  }

  formatValue = (value: number) =>
    value.toFixed(1).toString().replace(".", ",");

  render() {
    const value = this.formatValue(this.props.value);
    const color = this.props?.color ?? this.DEFAULT_COLOR;
    const fontSize = this.props?.fontSize ?? this.DEFAULT_FONTSIZE;
    const subcribedFontSize = fontSize / 1.71;
    const fontWeight = this.props?.bolder ? "bold" : "400";

    return (
      <Text style={[styles.emissionText, { color, fontWeight, fontSize }]}>
        {value} tCO
        <Text
          style={[
            styles.emissionText,
            { color, fontWeight, fontSize: subcribedFontSize },
          ]}
        >
          2
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  emissionText: {
    fontFamily: "Roboto",
    color: "#333",
    fontWeight: "bold",
  },
});
