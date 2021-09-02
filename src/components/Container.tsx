import React from "react";

import { StyleSheet, View } from "react-native";

interface ContainerProps {
  centralized?: boolean;
}

export default class Container extends React.Component<ContainerProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { centralized, children } = this.props;

    return (
      <View
        style={centralized ? styles.centralizedContainer : styles.container}
      >
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  centralizedContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
