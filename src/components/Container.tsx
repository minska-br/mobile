import React from "react";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "./Loading";

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
      <Loading>
        <SafeAreaView
          style={centralized ? styles.centralizedContainer : styles.container}
        >
          {children}
        </SafeAreaView>
      </Loading>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
  },
  centralizedContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
