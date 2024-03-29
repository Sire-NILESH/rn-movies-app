import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
// import { useWatchlistHooks } from "../../hooks/reduxHooks";
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
  isBannerButton?: boolean;
}

const WatchlistButton: React.FC<IProps> = ({
  media,
  mediaType,
  isBannerButton,
}) => {
  const [isWatchListed, setIsWatchlisted] = useState<Boolean>(false);

  const setIsWatchlistedHandler = () => {
    setIsWatchlisted((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const isWatchlistedInDB = async () => {
      try {
        const booleanResult = await mediaExistsInCollection(
          media.id,
          mediaType,
          "watchlist"
        );

        setIsWatchlisted(booleanResult);
      } catch (err) {
        setIsWatchlisted(false);
      }
    };

    isWatchlistedInDB();
  }, [media]);

  const addToDBHandler = async () => {
    try {
      await insertMediaToCollection(
        reduxListMediaObjBuilder(media, mediaType),
        "watchlist"
      );
      showSuccessToast(
        "Added !",
        `'${
          isMovie(media)
            ? media.title
            : media.name
            ? media.name
            : media.original_name
        }' was added to Watchlist`
      );

      // Mark the DB as updated so collection screens can check it and fetch the data from DB when in focus.
      dispatch(
        setDbCollectionModified({
          collectionType: "watchlist",
          mediaType: mediaType,
        })
      );
    } catch (err) {
      showErrorToast();
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await removeMediaFromCollection(media.id, mediaType, "watchlist");
      showSuccessToast(
        "Removed !",
        `'${
          isMovie(media)
            ? media.title
            : media.name
            ? media.name
            : media.original_name
        }' was removed from Watchlist`
      );

      // Mark the DB as updated so collection screens can check it and fetch the data from DB when in focus.
      dispatch(
        setDbCollectionModified({
          collectionType: "watchlist",
          mediaType: mediaType,
        })
      );
    } catch (err) {
      showErrorToast();
    }
  };

  return (
    <CustomButton
      color={
        isWatchListed
          ? Colors.stone[50]
          : isBannerButton && isBannerButton
          ? Colors.stone[300]
          : Colors.neutral[800]
      }
      height={isBannerButton ? 40 : 40}
      width={"100%"}
      radius={8}
      method={() => {
        if (isWatchListed) {
          setIsWatchlistedHandler();
          removeFromDBHandler();
        } else {
          setIsWatchlistedHandler();
          addToDBHandler();
        }
      }}
    >
      <View className="flex-row items-center justify-between">
        <Ionicons
          size={18}
          // name="list"
          name={isWatchListed ? "checkmark" : "add"}
          // name={isMediaWatchlisted(media.id) ? "checkmark" : "add"}
          color={
            isBannerButton && isBannerButton && !isWatchListed
              ? Colors.stone[500]
              : Colors.stone[500]
          }
        ></Ionicons>
        <Text
          className="ml-1"
          style={{
            color: isBannerButton
              ? Colors.stone[800]
              : isWatchListed
              ? Colors.stone[800]
              : Colors.text_primary,
          }}
        >
          {" "}
          {"Watchlist"}
        </Text>
      </View>
    </CustomButton>
  );
};

export default WatchlistButton;
