import React from "react";
import Routes from "./src/routes";
import { RootSiblingParent } from "react-native-root-siblings";
import SessionContextProvider from "./src/contexts/SessionContext";

export default function Main() {
  return (
    <RootSiblingParent>
      <SessionContextProvider>
        <Routes />
      </SessionContextProvider>
    </RootSiblingParent>
  );
}
