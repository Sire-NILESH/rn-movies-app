import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useWatchlistHooks } from "../../hooks/reduxHooks";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  IReduxListMedia,
  MediaTypes,
  MovieMedia,
  MovieMediaExtended,
  TCollectionType,
  TvMedia,
  TvMediaExtended,
} from "../../typings";
import { reduxListMediaObjBuilder } from "../../utils/helpers/helper";
import { insertMediaToCollection } from "../../database/database";

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

  const [isWatchListed, setIsWatchlisted] = useState<Boolean>(
    isMediaWatchlisted(media.id)
  );

  const setIsWatchlistedHandler = () => {
    setIsWatchlisted((prev) => !prev);
  };

  // useEffect(() => {
  //   if (isWatchListed) {
  //     removeMediaFromWatchlistHandler(media.id);
  //   } else {
  //     addMediaToWatchlistHandler(reduxListMediaObjBuilder(media, mediaType));
  //   }

  //   // return () => {
  //   //   second
  //   // }
  // }, [isWatchListed]);

  const addToDBHandler = async (
    media: MovieMediaExtended | MovieMedia | TvMediaExtended | TvMedia
  ) => {
    await insertMediaToCollection(
      reduxListMediaObjBuilder(media, mediaType),
      "watchlist"
    );
  };

  return (
    <CustomButton
      color={isWatchListed ? Colors.stone[50] : Colors.tertiary}
      height={45}
      width={"100%"}
      radius={10}
      method={() => {
        if (isWatchListed) {
          setIsWatchlistedHandler();

          removeMediaFromWatchlistHandler(media.id);
        } else {
          setIsWatchlistedHandler();
          // addToDBHandler(media);

          addMediaToWatchlistHandler(
            reduxListMediaObjBuilder(media, mediaType)
          );
        }
      }}

      // if (isWatchListed) {
      //   setIsWatchlistedHandler();
      //   removeMediaFromWatchlistHandler(media.id);
      // } else {
      //   setIsWatchlistedHandler();
      //   addMediaToWatchlistHandler(
      //     reduxListMediaObjBuilder(media, mediaType)
      //   );
      // }

      //   if (isMediaWatchlisted(media.id)) {
      //     removeMediaFromWatchlistHandler(media.id);
      //   } else {
      //     addMediaToWatchlistHandler(
      //       reduxListMediaObjBuilder(media, mediaType)
      //     );
      //   }
      // }}
    >
      <View className="flex-row items-center justify-between">
        <Ionicons
          size={18}
          // name="list"
          name={isWatchListed ? "list" : "add"}
          // name={isMediaWatchlisted(media.id) ? "checkmark" : "add"}
          color={Colors.stone[500]}
        ></Ionicons>
        <Text
          className="ml-1"
          style={{
            color: isWatchListed ? Colors.stone[800] : Colors.text_primary,
          }}
        >
          {" "}
          {/* {isMediaWatchlisted(media.id) ? "Watchlisted" : "Watchlist"} */}
          {"Watchlist"}
        </Text>
      </View>
    </CustomButton>
  );
};

export default WatchlistButton;
