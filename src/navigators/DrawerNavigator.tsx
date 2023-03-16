import React, { useLayoutEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../utils/Colors";
import { drawerRoutes } from "../config/routes";
import "react-native-gesture-handler";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      // Common Stack screen's header settings below here
      screenOptions={{
        headerTintColor: Colors.gray[100],
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.stone[900],
        },
        // drawerStatusBarAnimation: "slide",
        // drawerType: "slide",
        drawerLabelStyle: {
          marginLeft: -20,
        },

        // Drawer styles
        // drawerActiveBackgroundColor: "#aa18ea",
        // drawerInactiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: Colors.green[100],
        drawerInactiveTintColor: Colors.stone[400],
        drawerAllowFontScaling: true,
        drawerStyle: {
          backgroundColor: Colors.stone[900],
          // backgroundColor: Colors.black,
        },
        // drawerLabelStyle: {
        //   marginLeft: -25,
        //   fontSize: 15,
        // },

        // lazy: false,
        // drawerIcon: (props) => (
        //   <IconButton name="tv-outline" color={props.color} size={props.size} />
        // ),
      }}
    >
      {/* Laying out all the Drawer screens from routes */}
      {drawerRoutes.map((r, i) => (
        <Drawer.Screen key={i} name={r.name} options={r.options}>
          {(props) => {
            return <r.component name={r.name} {...props} />;
          }}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
