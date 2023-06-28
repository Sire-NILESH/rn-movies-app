import React from "react";
import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../../utils/Colors";
import { searchResultsTopTabRoutes } from "../../library/NavigationRoutes/SearchResultsTopTabRoutes";

interface IProps {
  searchQuery: string;
}

const TopTabs = createMaterialTopTabNavigator();

const SearchResultsTopTabsNavigator: React.FC<IProps> = (props) => {
  const searchQuery = props.searchQuery;

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
      {searchResultsTopTabRoutes.map((r, i) => (
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
                searchQuery={searchQuery}
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

export default SearchResultsTopTabsNavigator;
