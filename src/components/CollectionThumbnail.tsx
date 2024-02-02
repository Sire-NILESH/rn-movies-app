import {
  ImageStyle,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { IReduxListMedia, TImgQualityValues } from "../../types/typings";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

type Orientation = "portrait" | "landscape";

export interface ICollectionThumbnailProps {
  media: IReduxListMedia;
  orientation: Orientation;
  windowWidth: number;
  imgType?: "cached" | "regular";
  quality?: TImgQualityValues;
  navigateTo: (screen: string, paramOption: Object) => void;
}

const getThumbnailDimensions = (
  windowWidth: number,
  orientation: Orientation
) => {
  const thumbnailDimensions = {
    landscape: {
      width: 245,
      height: 128,
      imageWidth: 240,
      movieTitleWidth: 128,
      aspectRatio: 1,
    },
    portrait: {
      width: windowWidth * 0.31,
      height: 180,
      imageWidth: windowWidth * 0.31,
      movieTitleWidth: windowWidth * 0.31,
    },
  };

  return thumbnailDimensions[orientation];
};

function CollectionThumbnail({
  media,
  orientation,
  windowWidth,
  quality,
  navigateTo,
}: ICollectionThumbnailProps) {
  const dimensions = getThumbnailDimensions(windowWidth, orientation);

  type Styles = {
    containerView: StyleProp<ViewStyle>;
    containerImage: StyleProp<ImageStyle>;
  };

  const containerStyles: Styles = {
    containerView: {
      width: dimensions.imageWidth,
      borderRadius: 6,
      aspectRatio: 2 / 3,
      overflow: "hidden",
    },
    containerImage: {
      width: "100%",
      height: "100%",
    },
  };

  const imageQuality = quality ? quality : "300";

  const imageURL =
    (media.backdrop_path || media.poster_path) &&
    `https://image.tmdb.org/t/p/w${imageQuality}${
      orientation === "landscape" ? media.backdrop_path : media.poster_path
    }`;

  return (
    <View
      className="relative overflow-hidden bg-tertiary"
      style={containerStyles.containerView}
    >
      <Pressable
        className=""
        onPress={() => {
          navigateTo("CollectionMoreInfo", {
            mediaType: media.mediaType,
            collectionMedia: media,
          });
        }}
        onLongPress={() => {
          navigateTo("Related", {
            relatedToMediaId: media.mediaId,
            mediaType: media.mediaType,
          });
        }}
      >
        <Image
          key={
            orientation === "portrait"
              ? `${media.mediaId}-${media.mediaType}-poster`
              : `${media.mediaId}-${media.mediaType}-backdrop`
          }
          source={{ uri: imageURL }}
          className="h-full w-full"
          contentFit="cover"
          placeholder={require("../../assets/images/placeholders/posterPlaceHolder.png")}
          transition={{
            duration: 150,
          }}
        />

        {/* Movie Title and date box */}
        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(28, 25, 23, 0.2)",
            "rgba(28, 25, 23, 0.8)",
          ]}
          className="absolute  flex-row items-end pb-2 px-2"
          style={{
            borderRadius: 6,
            width: dimensions.imageWidth,
            aspectRatio: 2 / 3,
          }}
        >
          <View
            className="flex-row items-end justify-between w-full"
            style={[
              orientation === "portrait"
                ? { flexDirection: "column", alignItems: "flex-start" }
                : null,
            ]}
          >
            <Text
              className="font-semibold text-text_primary text-xs w-full"
              numberOfLines={1}
              style={[orientation === "landscape" ? { lineHeight: 18 } : null]}
            >
              {media.mediaTitle}
            </Text>

            <Text className=" text-text_secondary text-[11px]">
              {media.mediaDate?.split("-")[0]}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default CollectionThumbnail;
