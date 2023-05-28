import { Text } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
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
} from "../../storage/database";

interface IProps {
  media: MovieMediaExtended | TvMediaExtended | MovieMedia | TvMedia;
  mediaType: MediaTypes;
}

const WatchedMediaButton: React.FC<IProps> = ({ media, mediaType }) => {
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
        setIsWatched(booleanResult);
      } catch (err) {
        setIsWatched(false);
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
    } catch (err) {}
  };

  const removeFromDBHandler = async () => {
    try {
      await removeMediaFromCollection(media.id, mediaType, "watched");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <CustomButton
      color={isWatched ? Colors.stone[50] : Colors.stone[900]}
      height={42}
      width={"100%"}
      radius={8}
      method={() => {
        if (isWatched) {
          setIsWatchedHandler();
          removeFromDBHandler();
        } else {
          addToDBHandler();
          setIsWatchedHandler();
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
