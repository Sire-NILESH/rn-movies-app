import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import routes from "./src/config/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./src/utils/Colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-stone-900">
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            // Common Stack screen's header settings below here
            screenOptions={{
              presentation: "modal",
              headerTintColor: Colors.gray[100],
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.stone[900],
              },
            }}
          >
            {/* List of all the routs for the Stack Screen is maintained in the 'routes' separately */}
            {routes.map((r, i) => (
              <Stack.Screen key={i} name={r.name}>
                {(props) => {
                  return <r.component name={r.name} {...props} />;
                }}
              </Stack.Screen>
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
