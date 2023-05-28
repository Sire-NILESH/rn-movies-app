import React, { useLayoutEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../utils/Colors";
import "react-native-gesture-handler";
import CustomDrawer from "../../components/CustomDrawer";
import { drawerRoutes } from "../../library/NavigationRoutes/DrawerRoutes";

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
      // backBehavior={"none"}
      screenOptions={{
        headerTintColor: Colors.text_primary,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.tertiary,
        },
        drawerLabelStyle: {
          marginLeft: -20,
        },
        drawerActiveTintColor: Colors.neutral[50],
        drawerInactiveTintColor: Colors.stone[400],
        drawerAllowFontScaling: true,
        overlayColor: "",
        drawerStyle: {
          backgroundColor: Colors.tertiary,
        },
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
