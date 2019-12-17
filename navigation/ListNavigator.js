import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ItemDetailScreen from "../screens/ItemDetailScreen";
import ListScreen from "../screens/ListScreen";
import NewItemScreen from "../screens/NewItemScreen";

import { Platform } from "react-native";
import Colors from "../constants/Colors";

const ListNavigator = createStackNavigator(
  {
    List: ListScreen,
    Details: ItemDetailScreen,
    NewItem: NewItemScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS == "android" ? Colors.primary : ""
      },
      headerTintColor: Platform.OS == "ios" ? Colors.primary : "white"
    }
  }
);

export default createAppContainer(ListNavigator);
