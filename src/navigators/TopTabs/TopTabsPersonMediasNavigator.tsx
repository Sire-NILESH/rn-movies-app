import React from "react";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Colors } from "../../utils/Colors";
import { IUrlObject } from "../../../types/typings";
import { personMediasTopTabRoutes } from "../../library/NavigationRoutes/PersonMediasTopTabRoutes";

interface IProps {
  urlObject: IUrlObject;
}

const TopTabs = createMaterialTopTabNavigator();

const TopTabsPersonMediasNavigator: React.FC<IProps> = (props) => {
  const urlObject = props.urlObject;

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500", letterSpacing: 1 },
        tabBarStyle: { backgroundColor: Colors.tertiary },
        tabBarActiveTintColor: Colors.text_primary,
        tabBarInactiveTintColor: Colors.text_dark,
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: "#e9e9e9",
        tabBarIndicatorStyle: { backgroundColor: Colors.neutral[100] },
        lazy: true,
      }}
    >
      {/* Laying out all the TopTabs screens from routes */}
      {personMediasTopTabRoutes.map((r, i) => (
        <TopTabs.Screen
          key={i}
          name={r.name}
          options={{
            title: r.screenTitle,
          }}
        >
          {(props) => {
            return (
              <r.component
                name={r.name}
                screenMediaType={r.screenMediaType}
                urlObject={urlObject}
                {...props}
              />
            );
          }}
        </TopTabs.Screen>
      ))}
    </TopTabs.Navigator>
  );
};

export default TopTabsPersonMediasNavigator;
