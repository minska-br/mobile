import React from "react";

import { StyleSheet, View } from "react-native";

export default class Container extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
