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
import { reduxListMediaObjBuilder } from "../../utils/helpers/helper";
import {
  insertMediaToCollection,
  mediaExistsInCollection,
  removeMediaFromCollection,
} from "../../database/database";
import { LinearGradient } from "expo-linear-gradient";

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
  // const {
  //   addMediaToWatchlistHandler,
  //   removeMediaFromWatchlistHandler,
  //   isMediaWatchlisted,
  // } = useWatchlistHooks();

  const [isWatchListed, setIsWatchlisted] = useState<Boolean>(false);

  const setIsWatchlistedHandler = () => {
    setIsWatchlisted((prev) => !prev);
  };

  useEffect(() => {
    const isWatchlistedInDB = async () => {
      try {
        const booleanResult = await mediaExistsInCollection(
          media.id,
          mediaType,
          "watchlist"
        );
        console.log(booleanResult);
        setIsWatchlisted(booleanResult);
      } catch (err) {
        setIsWatchlisted(false);
        console.log(err);
      }
    };

    isWatchlistedInDB();
  }, [media]);

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

  const addToDBHandler = async () => {
    try {
      await insertMediaToCollection(
        reduxListMediaObjBuilder(media, mediaType),
        "watchlist"
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await removeMediaFromCollection(media.id, mediaType, "watchlist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomButton
      color={isWatchListed ? Colors.stone[50] : Colors.tertiary}
      height={42}
      width={"100%"}
      radius={8}
      border={isBannerButton && isBannerButton ? 1 : 0}
      styledClassName={
        isBannerButton && isBannerButton ? "border-stone-800" : ""
      }
      method={() => {
        if (isWatchListed) {
          setIsWatchlistedHandler();
          removeFromDBHandler();
          // removeMediaFromWatchlistHandler(media.id);
        } else {
          setIsWatchlistedHandler();
          addToDBHandler();

          // addMediaToWatchlistHandler(
          //   reduxListMediaObjBuilder(media, mediaType)
          // );
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
          name={isWatchListed ? "checkmark" : "add"}
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
