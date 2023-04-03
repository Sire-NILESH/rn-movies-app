import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../utils/Colors";
import { TCollectionType } from "../../types/typings";
import { topTabRoutesTileList } from "../library/NavigationRoutes/TopTabRoutesTileList";

interface IProps {
  collectionType: TCollectionType;
}

const TopTabs = createMaterialTopTabNavigator();

const TopTabsTileListNavigator: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  const screenCollectionType = props.collectionType;

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
    });
  }, []);

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        // tabBarItemStyle: { width: '100' },
        tabBarStyle: { backgroundColor: Colors.tertiary },
        tabBarActiveTintColor: Colors.text_primary,
        tabBarInactiveTintColor: Colors.text_dark,
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: "#e9e9e9",
        tabBarIndicatorStyle: { backgroundColor: Colors.green[500] },
      }}
    >
      {/* Laying out all the TopTabs screens from routes */}
      {topTabRoutesTileList.map((r, i) => (
        <TopTabs.Screen key={i} name={r.name}>
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
