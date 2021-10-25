import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Search from "../pages/Search";
import RoutesEnum from "../enums/routes";
import SearchResult from "../pages/SearchResult";
import Detail from "../pages/Detail";
import History from "../pages/History";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RoutesEnum.Home} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RoutesEnum.Home} component={Home} />
      <Stack.Screen name={RoutesEnum.Search} component={Search} />
      <Stack.Screen name={RoutesEnum.SearchResult} component={SearchResult} />
      <Stack.Screen name={RoutesEnum.Detail} component={Detail} />
      <Stack.Screen name={RoutesEnum.History} component={History} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
