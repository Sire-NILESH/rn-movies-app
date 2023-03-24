import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { useWatchedMediaListHooks } from "../../hooks/reduxHooks";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../typings";
import { reduxListMediaObjBuilder } from "../../utils/helpers/helper";

interface IProps {
  media: MovieMediaExtended | TvMediaExtended | MovieMedia | TvMedia;
  mediaType: MediaTypes;
}

const WatchedMediaButton: React.FC<IProps> = ({ media, mediaType }) => {
  const {
    addMediaToWatchedHandler,
    removeMediaFromWatchedHandler,
    isMediaWatched,
  } = useWatchedMediaListHooks();

  return (
    <View className="flex-1">
      <CustomButton
        color={isMediaWatched(media.id) ? Colors.stone[50] : Colors.tertiary}
        height={45}
        width={"100%"}
        radius={10}
        method={() => {
          if (isMediaWatched(media.id)) {
            removeMediaFromWatchedHandler(media.id);
          } else {
            addMediaToWatchedHandler(
              reduxListMediaObjBuilder(media, mediaType)
            );
          }
        }}
      >
        <Ionicons
          size={18}
          name={"eye"}
          // name={isMediaWatched(media.id) ? "checkmark" : "add"}
          color={Colors.stone[500]}
        ></Ionicons>
        <Text
          className="ml-1"
          style={{
            color: isMediaWatched(media.id)
              ? Colors.stone[800]
              : Colors.text_primary,
          }}
        >
          {" "}
          Watched
        </Text>
      </CustomButton>
    </View>
  );
};

export default WatchedMediaButton;
