import React from "react";

import Home from "./src/pages/Home";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Main() {
  return (
    <RootSiblingParent>
      <Home />
    </RootSiblingParent>
  );
}
