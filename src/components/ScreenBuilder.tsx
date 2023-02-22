import { View, ScrollView } from "react-native";
import { ScreenTypes } from "../typings";
import Banner from "./Banner";
import Row from "./Row";
import NothingToShow from "./NothingToShow";
import { showErrorAlert } from "../utils/helpers/helper";
import useFetchScreenProps from "../hooks/useFetchScreenProps";
import Loader from "./ui/Loader";

interface IProps {
  screenType: ScreenTypes;
}

const ScreenBuilder: React.FC<IProps> = ({ screenType }) => {
  // This hook is responsible for loading the screen props and error messages for the Home, TV and Movies screens.
  const { screenProps, loadingProps, errorLoadingProps } =
    useFetchScreenProps(screenType);

  if (errorLoadingProps && !loadingProps) {
    showErrorAlert();
  }

  return (
    <View className="flex-1 bg-stone-900">
      {/* Loader */}
      <Loader loading={loadingProps} />

      {!loadingProps && !screenProps ? (
        //   if no props then
        <NothingToShow />
      ) : !errorLoadingProps && screenProps ? (
        //   when no error and props
        <View className="flex-1">
          {screenProps ? (
            <ScrollView className="space-y-10">
              {screenProps[0].genreMedias ? (
                <Banner mediaList={screenProps[0].genreMedias} />
              ) : null}

              {screenProps.map((m) => {
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

export default ScreenBuilder;
