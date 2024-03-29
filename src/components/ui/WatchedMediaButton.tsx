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
import {
  isMovie,
  reduxListMediaObjBuilder,
  showErrorToast,
  showSuccessToast,
} from "../../utils/helpers/helper";
import {
  insertMediaToCollection,
  mediaExistsInCollection,
  removeMediaFromCollection,
} from "../../storage/database";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setDbCollectionModified } from "../../store/dbCollectionModifiedSlice";

interface IProps {
  media: MovieMediaExtended | TvMediaExtended | MovieMedia | TvMedia;
  mediaType: MediaTypes;
}

const WatchedMediaButton: React.FC<IProps> = ({ media, mediaType }) => {
  const [isWatched, setIsWatched] = useState<Boolean>(false);

  const setIsWatchedHandler = () => {
    setIsWatched((prev) => !prev);
  };

  const dispatch = useAppDispatch();

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
      showSuccessToast(
        "Added !",
        `'${
          isMovie(media)
            ? media.title
            : media.name
            ? media.name
            : media.original_name
        }' was added to Watched`
      );

      // Mark the DB as updated so collection screens can check it and fetch the data from DB when in focus.
      dispatch(
        setDbCollectionModified({
          collectionType: "watched",
          mediaType: mediaType,
        })
      );
    } catch (err) {
      showErrorToast();
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await removeMediaFromCollection(media.id, mediaType, "watched");
      showSuccessToast(
        "Removed !",
        `'${
          isMovie(media)
            ? media.title
            : media.name
            ? media.name
            : media.original_name
        }' was removed from Watched`
      );

      // Mark the DB as updated so collection screens can check it and fetch the data from DB when in focus.
      dispatch(
        setDbCollectionModified({
          collectionType: "watched",
          mediaType: mediaType,
        })
      );
    } catch (err) {
      showErrorToast();
    }
  };

  return (
    <CustomButton
      color={isWatched ? Colors.stone[50] : Colors.neutral[800]}
      height={40}
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
