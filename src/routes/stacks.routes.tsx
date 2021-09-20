import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Search from "../pages/Search";
import RoutesEnum from "../enums/routes";
import ResultList from "../pages/ResultList";
import ResultDetail from "../pages/ResultDetail";
import History from "../pages/History";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.History}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RoutesEnum.Home} component={Home} />
      <Stack.Screen name={RoutesEnum.Search} component={Search} />
      <Stack.Screen name={RoutesEnum.ResultList} component={ResultList} />
      <Stack.Screen name={RoutesEnum.ResultDetail} component={ResultDetail} />
      <Stack.Screen name={RoutesEnum.History} component={History} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
