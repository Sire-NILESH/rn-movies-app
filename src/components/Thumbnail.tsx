import {
  MediaTypes,
  MovieMedia,
  TImgQualityValues,
  TvMedia,
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
import { isMovie } from "../utils/helpers/helper";
import { LinearGradient } from "expo-linear-gradient";
import ImageCached from "./ui/ImageCached";
import ImagePlaceholder from "./ui/ImagePlaceholder";

export interface IThumbnailProps {
  media: MovieMedia | TvMedia;
  orientation: "portrait" | "landscape";
  windowWidth: number;
  imgType?: "cached" | "regular";
  quality?: TImgQualityValues;
  navigateTo: (screen: string, paramOption: Object) => void;
}

function Thumbnail({
  media,
  orientation,
  windowWidth,
  imgType,
  quality,
  navigateTo,
}: IThumbnailProps) {
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

  const mediaType = isMovie(media) ? "movie" : "tv";

  return (
    <View
      className="relative overflow-hidden bg-neutral-900"
      style={containerStyles.containerView}
    >
      <Pressable
        className=""
        onPress={() => {
          navigateTo("More Info", {
            mediaType: mediaType,
            media: media,
          });
        }}
        onLongPress={() => {
          navigateTo("Related", {
            relatedToMediaId: media.id,
            mediaType: mediaType,
          });
        }}
      >
        {/* https://github.com/dcodeteam/react-native-fast-image-expo */}

        {imgType && imgType === "cached" ? (
          imageURL ? (
            <ImageCached
              imageURL={imageURL}
              cacheKey={
                orientation === "portrait"
                  ? `${media.id}-${mediaType}-poster`
                  : `${media.id}-${mediaType}-backdrop`
              }
            />
          ) : (
            <ImagePlaceholder />
          )
        ) : imageURL ? (
          <ImageView
            imageURL={imageURL}
            imgType="regular"
            mediaId={media.id}
            orientation={orientation}
            mediaType={mediaType}
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
              {media && isMovie(media) ? media.title : media.name}
            </Text>

            <Text className=" text-text_secondary text-[11px]">
              {media && isMovie(media)
                ? media.release_date?.split("-")[0]
                : media.first_air_date?.split("-")[0]}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default Thumbnail;

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
