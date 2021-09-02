import React from "react";
import Routes from "./src/routes";
import { RootSiblingParent } from "react-native-root-siblings";
import LoadingContextProvider from "./src/contexts/LoadingContext";

export default function Main() {
  return (
    <RootSiblingParent>
      <LoadingContextProvider>
        <Routes />
      </LoadingContextProvider>
    </RootSiblingParent>
  );
}
