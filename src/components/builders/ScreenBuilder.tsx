import { View, ScrollView } from "react-native";
import { MovieMedia, ScreenTypes, TvMedia } from "../../typings";
import Banner from "../Banner";
import Row from "../Row";
import NothingToShow from "../NothingToShow";
import { showErrorAlert } from "../../utils/helpers/helper";
import useFetchScreenProps from "../../hooks/useFetchScreenProps";
import Loader from "../ui/Loader";
import { memo } from "react";
// import * as SplashScreen from "expo-splash-screen";
// import { useRoute } from "@react-navigation/native";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

interface IProps {
  screenType: ScreenTypes;
}

interface IState {
  genreId: number;
  genreName: string;
  genreMedias: TvMedia[] | MovieMedia[];
}

const ScreenBuilder: React.FC<IProps> = ({ screenType }) => {
  // This hook is responsible for loading the screen props and error messages for the Home, TV and Movies screens.
  const { screenProps, loadingProps, errorLoadingProps } =
    useFetchScreenProps(screenType);

  if (errorLoadingProps && !loadingProps) {
    showErrorAlert();
  }

  // const route = useRoute();
  // console.log(route);

  // const onLayoutRootView = useCallback(async () => {
  //   if (screenProps && route.name === "Home") {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     console.log("--------------------------------");
  //     await SplashScreen.hideAsync();
  //   }

  // onLayout={onLayoutRootView}
  // }, [screenProps, route.name]);

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      <Loader loading={loadingProps} />

      {!loadingProps && !screenProps ? (
        //   if no props then
        <NothingToShow title={"Something went wrong while loading content"} />
      ) : !errorLoadingProps && screenProps ? (
        //   when no error and props
        <View className="flex-1">
          {screenProps ? (
            <ScrollView className="space-y-10">
              {screenProps[0].genreMedias ? (
                <Banner mediaList={screenProps[0].genreMedias} />
              ) : null}

              {screenProps.map((m: IState) => {
                if (m.genreMedias?.length > 0) {
                  return (
                    <Row
                      key={m.genreId}
                      title={m.genreName}
                      medias={m.genreMedias}
                      genreIdOfList={m.genreId}
                    />
                  );
                } else null;
              })}
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default memo(ScreenBuilder);
