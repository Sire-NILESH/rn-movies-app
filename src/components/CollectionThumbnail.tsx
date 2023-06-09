import {
  IReduxListMedia,
  MediaTypes,
  TImgQualityValues,
} from "../../types/typings";
import {
  View,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import ImageCached from "./ui/ImageCached";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import React from "react";

export interface ICollectionThumbnailProps {
  media: IReduxListMedia;
  orientation: "portrait" | "landscape";
  windowWidth: number;
  imgType?: "cached" | "regular";
  quality?: TImgQualityValues;
  navigateTo: (screen: string, paramOption: Object) => void;
}

function CollectionThumbnail({
  media,
  orientation,
  windowWidth,
  imgType,
  quality,
  navigateTo,
}: ICollectionThumbnailProps) {
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

  const dimensions = thumbnailDimensions[orientation];

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
      className="relative overflow-hidden"
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
        {imgType && imgType === "cached" ? (
          imageURL ? (
            <ImageCached
              imageURL={imageURL}
              cacheKey={
                orientation === "portrait"
                  ? `${media.mediaId}-${media.mediaType}-poster`
                  : `${media.mediaId}-${media.mediaType}-backdrop`
              }
            />
          ) : (
            <ImagePlaceholder />
          )
        ) : imageURL ? (
          <ImageView
            imageURL={imageURL}
            imgType="regular"
            mediaId={media.mediaId}
            orientation={orientation}
            mediaType={media.mediaType}
          ></ImageView>
        ) : (
          <ImagePlaceholder />
        )}

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

export default React.memo(CollectionThumbnail);

interface IImageView {
  imgType: "cached" | "regular";
  imageURL: string;
  mediaId: number;
  mediaType: MediaTypes;
  orientation: "portrait" | "landscape";
}

function ImageView({
  imgType,
  imageURL,
  mediaId,
  mediaType,
  orientation,
}: IImageView) {
  return (
    <>
      {imgType === "cached" ? (
        <ImageCached
          imageURL={imageURL}
          cacheKey={
            orientation === "portrait"
              ? `${mediaId}-${mediaType === "movie" ? "movie" : "tv"}-poster`
              : `${mediaId}-${mediaType === "tv" ? "movie" : "tv"}-backdrop`
          }
        />
      ) : (
        <Image
          source={{ uri: imageURL }}
          className="h-full w-full"
          resizeMode="cover"
          fadeDuration={400}
        />
      )}
    </>
  );
}
