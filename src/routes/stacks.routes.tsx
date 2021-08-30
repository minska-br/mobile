import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Search from "../pages/Search";
import RoutesEnum from "../enums/routes";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RoutesEnum.Home} component={Home} />
      <Stack.Screen name={RoutesEnum.Search} component={Search} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
