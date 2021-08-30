import React from "react";

import { RootSiblingParent } from "react-native-root-siblings";
import Routes from "./src/routes";

export default function Main() {
  return (
    <RootSiblingParent>
      <Routes />
    </RootSiblingParent>
  );
}
