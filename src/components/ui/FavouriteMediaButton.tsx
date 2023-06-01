import React, { useEffect, useState } from "react";

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
import CustomButton from "./CustomButton";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import {
  insertMediaToCollection,
  mediaExistsInCollection,
  removeMediaFromCollection,
} from "../../storage/database";

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
  const [isFavourite, setIsFavourite] = useState<Boolean>(false);

  const setIsFavouritedHandler = () => {
    setIsFavourite((prev) => !prev);
  };

  useEffect(() => {
    const isWatchlistedInDB = async () => {
      try {
        const booleanResult = await mediaExistsInCollection(
          media.id,
          mediaType,
          "favourites"
        );
        setIsFavourite(booleanResult);
      } catch (err) {
        setIsFavourite(false);
      }
    };

    isWatchlistedInDB();
  }, [media]);

  const addToDBHandler = async () => {
    try {
      await insertMediaToCollection(
        reduxListMediaObjBuilder(media, mediaType),
        "favourites"
      );
      showSuccessToast(
        "Added !",
        `'${
          isMovie(media)
            ? media.title
            : media.name
            ? media.name
            : media.original_name
        }' was added to Favourites`
      );
    } catch (err) {
      showErrorToast();
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await removeMediaFromCollection(media.id, mediaType, "favourites");
      showSuccessToast(
        "Removed !",
        `'${
          isMovie(media)
            ? media.title
            : media.name
            ? media.name
            : media.original_name
        }' was removed from Favourites`
      );
    } catch (err) {
      showErrorToast();
    }
  };

  return (
    <View className="pr-1">
      <CustomButton
        color={Colors.tertiary}
        height={56}
        width={56}
        radius={1000}
        method={() => {
          if (isFavourite) {
            setIsFavouritedHandler();
            removeFromDBHandler();
          } else {
            setIsFavouritedHandler();
            addToDBHandler();
          }
        }}
      >
        <Ionicons
          size={22}
          name={isFavourite ? "heart" : "heart-outline"}
          color={isFavourite ? Colors.stone[50] : Colors.stone[100]}
        ></Ionicons>
      </CustomButton>
    </View>
  );
};

export default FavouriteMediaButton;
