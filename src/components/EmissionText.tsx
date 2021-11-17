import React from "react";
import { StyleSheet, Text } from "react-native";

interface EmissionTextProps {
  color?: string;
  value: number;
  fontSize?: number;
  decimalPlaces?: number;
  bolder?: boolean;
  separateValueAndUnit?: boolean;
}

export default class EmissionText extends React.Component<EmissionTextProps> {
  private DEFAULT_FONTSIZE = 20;
  private DEFAULT_SEPARATION_VALUE_UNIT = false;
  private DEFAULT_COLOR = "#333";
  private DEFAULT_DECIMAL_PLACES = 4;

  constructor(props: any) {
    super(props);
  }

  formatValue = (value: number) => {
    const decimalPlaces = this.props?.decimalPlaces ?? this.DEFAULT_DECIMAL_PLACES;
    return value.toFixed(decimalPlaces).toString().replace(".", ",");
  };

  render() {
    const value = this.formatValue(this.props.value);
    const color = this.props?.color ?? this.DEFAULT_COLOR;
    const valueUnitSeparation =
      this.props?.separateValueAndUnit ?? this.DEFAULT_SEPARATION_VALUE_UNIT;
    const fontSize = this.props?.fontSize ?? this.DEFAULT_FONTSIZE;
    const subcribedFontSize = fontSize / 1.71;
    const fontWeight = this.props?.bolder ? "bold" : "400";

    return (
      <Text style={[styles.emissionText, { color, fontWeight, fontSize }]}>
        {`${value}${valueUnitSeparation ? "\n" : ""}Kg CO`}
        <Text style={[styles.emissionText, { color, fontWeight, fontSize: subcribedFontSize }]}>
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
