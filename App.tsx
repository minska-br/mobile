import React from "react";
import Routes from "./src/routes";
import { RootSiblingParent } from "react-native-root-siblings";
import StorageContextProvider from "./src/contexts/StorageContext";

export default function Main() {
  return (
    <RootSiblingParent>
      <StorageContextProvider>
        <Routes />
      </StorageContextProvider>
    </RootSiblingParent>
  );
}
