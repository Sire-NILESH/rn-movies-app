import React, { useEffect, useState } from "react";
// import { useFavouriteMediaListHooks } from "../../hooks/reduxHooks";
import {
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TvMedia,
  TvMediaExtended,
} from "../../../types/typings";
import { reduxListMediaObjBuilder } from "../../utils/helpers/helper";
import CustomButton from "./CustomButton";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import {
  insertMediaToCollection,
  mediaExistsInCollection,
  removeMediaFromCollection,
} from "../../database/database";

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
  // const {
  //   addMediaToFavouriteHandler,
  //   removeMediaFromFavouriteHandler,
  //   isMediaFavourite,
  // } = useFavouriteMediaListHooks();

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
        console.log(booleanResult);
        setIsFavourite(booleanResult);
      } catch (err) {
        console.log(err);
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
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await removeMediaFromCollection(media.id, mediaType, "favourites");
    } catch (err) {
      console.log(err);
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
            // removeMediaFromFavouriteHandler(mediaId);
          } else {
            setIsFavouritedHandler();
            addToDBHandler();
            // addMediaToFavouriteHandler(
            //   reduxListMediaObjBuilder(media, mediaType)
            // );
          }
        }}
      >
        <Ionicons
          size={24}
          name={isFavourite ? "heart" : "heart-outline"}
          color={isFavourite ? Colors.stone[50] : Colors.stone[100]}
        ></Ionicons>
      </CustomButton>
    </View>
  );
};

export default FavouriteMediaButton;
