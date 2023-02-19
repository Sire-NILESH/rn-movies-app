import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import routes from "./src/config/routes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-stone-900">
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
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
