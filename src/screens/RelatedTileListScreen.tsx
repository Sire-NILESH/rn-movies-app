import { View } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { MediaTypes } from "../../types/typings";
import LoadMoreOnScrollBuilder from "../components/builders/LoadMoreOnScrollBuilder";

const RelatedTileListScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  // @ts-ignore
  const {
    relatedToMediaId,
    mediaType,
  }: {
    relatedToMediaId: number;
    mediaType: MediaTypes;
  } = route.params;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Similar",
    });
  }, []);

  return (
    <View className="flex-1">
      <LoadMoreOnScrollBuilder
        screenType="Related"
        relatedScreenOptions={{
          relatedToMediaId,
          mediaType,
        }}
      />
    </View>
  );
};

export default RelatedTileListScreen;
