import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
// import { useWatchedMediaListHooks } from "../../hooks/reduxHooks";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../../types/typings";
import { reduxListMediaObjBuilder } from "../../utils/helpers/helper";
import {
  insertMediaToCollection,
  mediaExistsInCollection,
  removeMediaFromCollection,
} from "../../database/database";

interface IProps {
  media: MovieMediaExtended | TvMediaExtended | MovieMedia | TvMedia;
  mediaType: MediaTypes;
}

const WatchedMediaButton: React.FC<IProps> = ({ media, mediaType }) => {
  // const {
  //   addMediaToWatchedHandler,
  //   removeMediaFromWatchedHandler,
  //   isMediaWatched,
  // } = useWatchedMediaListHooks();

  const [isWatched, setIsWatched] = useState<Boolean>(false);

  const setIsWatchedHandler = () => {
    setIsWatched((prev) => !prev);
  };

  useEffect(() => {
    const isWatchlistedInDB = async () => {
      try {
        const booleanResult = await mediaExistsInCollection(
          media.id,
          mediaType,
          "watched"
        );
        console.log(booleanResult);
        setIsWatched(booleanResult);
      } catch (err) {
        setIsWatched(false);
        console.log(err);
      }
    };

    isWatchlistedInDB();
  }, [media]);

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
      await removeMediaFromCollection(media.id, mediaType, "watched");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomButton
      color={isWatched ? Colors.stone[50] : Colors.tertiary}
      height={45}
      width={"100%"}
      radius={10}
      method={() => {
        if (isWatched) {
          setIsWatchedHandler();
          removeFromDBHandler();
          // removeMediaFromWatchedHandler(media.id);
        } else {
          addToDBHandler();
          setIsWatchedHandler();
          // addMediaToWatchedHandler(reduxListMediaObjBuilder(media, mediaType));
        }
      }}
    >
      <Ionicons size={18} name={"eye"} color={Colors.stone[500]}></Ionicons>
      <Text
        className="ml-1"
        style={{
          color: isWatched ? Colors.stone[800] : Colors.text_primary,
        }}
      >
        {" "}
        Watched
      </Text>
    </CustomButton>
  );
};

export default WatchedMediaButton;
