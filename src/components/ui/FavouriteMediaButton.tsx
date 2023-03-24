import { useFavouriteMediaListHooks } from "../../hooks/reduxHooks";
import {
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../typings";
import { reduxListMediaObjBuilder } from "../../utils/helpers/helper";
import CustomButton from "./CustomButton";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

interface IProps {
  mediaId: number;
  media: MovieMediaExtended | TvMediaExtended | MovieMedia | TvMedia;
  mediaType: MediaTypes;
}

const FavouriteMediaButton: React.FC<IProps> = ({
  mediaId,
  media,
  mediaType,
}) => {
  const {
    addMediaToFavouriteHandler,
    removeMediaFromFavouriteHandler,
    isMediaFavourite,
  } = useFavouriteMediaListHooks();

  return (
    <View className="pr-1">
      <CustomButton
        color={Colors.tertiary}
        height={56}
        width={56}
        radius={1000}
        method={() => {
          if (isMediaFavourite(mediaId)) {
            removeMediaFromFavouriteHandler(mediaId);
          } else {
            addMediaToFavouriteHandler(
              reduxListMediaObjBuilder(media, mediaType)
            );
          }
        }}
      >
        <Ionicons
          size={isMediaFavourite(mediaId) ? 28 : 24}
          name={isMediaFavourite(mediaId) ? "heart" : "heart-outline"}
          color={
            isMediaFavourite(mediaId) ? Colors.stone[50] : Colors.stone[100]
          }
        ></Ionicons>
      </CustomButton>
    </View>
  );
};

export default FavouriteMediaButton;
