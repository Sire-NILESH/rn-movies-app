import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const useLoadMyFonts = () => {
  const [fontsLoaded] = useFonts({
    SourceSansPro: require("../../assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
};

export default useLoadMyFonts;
