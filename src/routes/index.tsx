import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./stacks.routes";

const Routes = () => (
  <NavigationContainer>
    <AppRoutes />
  </NavigationContainer>
);

export default Routes;
