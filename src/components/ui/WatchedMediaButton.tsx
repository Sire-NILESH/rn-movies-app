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
import {
  deleteMediaFromCollection,
  insertMediaToCollection,
} from "../../database/database";

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

  const addToDBHandler = async () => {
    try {
      await insertMediaToCollection(
        reduxListMediaObjBuilder(media, mediaType),
        "watched"
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await deleteMediaFromCollection(media.id, mediaType, "watched");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomButton
      color={isMediaWatched(media.id) ? Colors.stone[50] : Colors.tertiary}
      height={45}
      width={"100%"}
      radius={10}
      method={() => {
        if (isMediaWatched(media.id)) {
          removeFromDBHandler();
          // removeMediaFromWatchedHandler(media.id);
        } else {
          addToDBHandler();
          // addMediaToWatchedHandler(reduxListMediaObjBuilder(media, mediaType));
        }
      }}
    >
      <Ionicons size={18} name={"eye"} color={Colors.stone[500]}></Ionicons>
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
  );
};

export default WatchedMediaButton;
