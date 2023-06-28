import React from "react";
import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../../utils/Colors";
import { TCollectionType } from "../../../types/typings";
import { topTabRoutesTileList } from "../../library/NavigationRoutes/TopTabRoutesTileList";

interface IProps {
  collectionType: TCollectionType;
}

const TopTabs = createMaterialTopTabNavigator();

const TopTabsTileListNavigator: React.FC<IProps> = (props) => {
  const screenCollectionType = props.collectionType;

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
      }}
    >
      {/* Laying out all the TopTabs screens from routes */}
      {topTabRoutesTileList.map((r, i) => (
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
                collectionType={screenCollectionType}
                screenMediaType={r.screenMediaType}
                {...props}
              />
            );
          }}
        </TopTabs.Screen>
      ))}
    </TopTabs.Navigator>
  );
};

export default TopTabsTileListNavigator;
