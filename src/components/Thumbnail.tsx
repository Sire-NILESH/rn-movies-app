import { MovieMedia, TvMedia } from "../typings";
import {
  View,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { isMovie } from "../utils/helpers/helper";
import { LinearGradient } from "expo-linear-gradient";
import ImageCached from "./ui/ImageCached";
import ImagePlaceholder from "./ui/ImagePlaceholder";

export interface IThumbnailProps {
  media: MovieMedia | TvMedia;
  orientation: "portrait" | "landscape";
  windowWidth: number;
  navigateTo: (screen: string, paramOption: Object) => void;
}

function Thumbnail({
  media,
  orientation,
  windowWidth,
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

  const imageURL =
    (media.backdrop_path || media.poster_path) &&
    `https://image.tmdb.org/t/p/w500${
      orientation === "landscape" ? media.backdrop_path : media.poster_path
    }`;

  return (
    <View className="relative" style={containerStyles.containerView}>
      <Pressable
        className="flex-1"
        onPress={() => {
          console.log(media);
          // @ts-ignore
          navigateTo("More Info", {
            mediaType: isMovie(media) ? "movie" : "tv",
            media: media,
          });
        }}
      >
        {/* https://github.com/dcodeteam/react-native-fast-image-expo */}

        {imageURL ? (
          <ImageCached
            imageURL={imageURL}
            cacheKey={
              orientation === "portrait"
                ? media.id + "poster"
                : media.id + "backdrop"
            }
          />
        ) : (
          <ImagePlaceholder />
        )}

        {/* Movie Title and date box */}
        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(28, 25, 23, 0.8)",
          ]}
          className="absolute flex-1 flex-row items-end pb-2 px-2 rounded-md overflow-hidden bg-black/10"
          // style={containerStyles.containerView}
          style={{
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
              className="font-semibold text-gray-100 text-xs w-full"
              numberOfLines={1}
              style={[orientation === "landscape" ? { lineHeight: 18 } : null]}
            >
              {media && isMovie(media) ? media.title : media.name}
            </Text>

            <Text className=" text-gray-300 text-[11px]">
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
