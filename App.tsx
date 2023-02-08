import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { useLogging } from "./src/hooks/useLogging";
import { getAllScreenProps } from "./src/utils/requests";
import { Movie } from "./src/typings";
import routes from "./src/config/routes";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Stack = createStackNavigator();

export default function App() {
  const [logging] = useLogging("App Screen");
  function handler() {
    logging.info("hello world");
  }
  const [allScreenProps, setAllScreenProps] = useState<Props | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      const data = await getAllScreenProps();
      setAllScreenProps(data.props);
    }
    fetchRequests();
  }, []);

  // logging.info(allScreenProps);

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
