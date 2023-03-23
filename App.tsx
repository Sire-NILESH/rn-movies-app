import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
// import { stackRoutes } from "./src/library/NavigationRoutes/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./src/utils/Colors";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import { stackRoutes } from "./src/library/NavigationRoutes/StackRoutes";
// import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// https://reactnavigation.org/docs/typescript/
const Stack = createStackNavigator();

export default function App() {
  // It is very important to enable this for better performance when your application has too many screens stacked. This will enable the nstive OS to figure out how to efficiently manage stack screens that are under the current stack. Without this it uses a default R.N Views to render screens which is really not very perfomant in this situation.
  // https://github.com/software-mansion/react-native-screens
  // https://docs.expo.dev/versions/latest/sdk/screens/#api
  // https://reactnavigation.org/docs/3.x/react-native-screens
  // is a React navigation feature.
  enableScreens(true);
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <SafeAreaView className="flex-1 bg-tertiary">
          {/* <SafeAreaView className="flex-1 bg-stone-900"> */}
          <NavigationContainer>
            <Stack.Navigator
              // initialRouteName="Home"
              initialRouteName="DrawerNav"
              // Common Stack screen's header settings below here
              screenOptions={{
                presentation: "modal",
                headerTintColor: Colors.text_primary,
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: Colors.tertiary,
                },
              }}
            >
              {/* List of all the routs for the Stack Screen is maintained in the 'routes' separately */}
              {/* {routes.map((r, i) => ( */}
              {stackRoutes.map((r, i) => (
                <Stack.Screen key={i} name={r.name}>
                  {(props) => {
                    return <r.component name={r.name} {...props} />;
                  }}
                  {/* <DrawerNavigator /> */}
                </Stack.Screen>
              ))}
              <Stack.Screen name={"DrawerNav"} component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </>
  );
}
