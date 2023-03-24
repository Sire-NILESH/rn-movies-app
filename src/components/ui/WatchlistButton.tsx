import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { useWatchlistHooks } from "../../hooks/reduxHooks";
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

const WatchlistButton: React.FC<IProps> = ({ media, mediaType }) => {
  const {
    addMediaToWatchlistHandler,
    removeMediaFromWatchlistHandler,
    isMediaWatchlisted,
  } = useWatchlistHooks();

  return (
    <View className="flex-1">
      <CustomButton
        color={
          isMediaWatchlisted(media.id) ? Colors.stone[50] : Colors.tertiary
        }
        height={45}
        width={"100%"}
        radius={10}
        method={() => {
          if (isMediaWatchlisted(media.id)) {
            removeMediaFromWatchlistHandler(media.id);
          } else {
            addMediaToWatchlistHandler(
              reduxListMediaObjBuilder(media, mediaType)
            );
          }
        }}
      >
        <Ionicons
          size={18}
          name={isMediaWatchlisted(media.id) ? "checkmark" : "add"}
          color={Colors.stone[500]}
        ></Ionicons>
        <Text
          className="ml-1"
          style={{
            color: isMediaWatchlisted(media.id)
              ? Colors.stone[800]
              : Colors.text_primary,
          }}
        >
          {" "}
          {isMediaWatchlisted(media.id) ? "Watchlisted" : "Watchlist"}
        </Text>
      </CustomButton>
    </View>
  );
};

export default WatchlistButton;
