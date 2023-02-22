import { useNavigation } from "@react-navigation/native";
import { MovieMedia, TvMedia } from "../typings";
import { View, Image, Pressable, Text, Dimensions } from "react-native";
import { isMovie } from "../utils/helpers/helper";

interface Props {
  media: MovieMedia | TvMedia;
  orientation: "portrait" | "landscape";
}

const windowWidth = Dimensions.get("window").width;

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

function Thumbnail({ media, orientation }: Props) {
  const dimensions = thumbnailDimensions[orientation];

  const navigation = useNavigation();

  return (
    <View
      className={"h-32 w-[245px] ml-1"}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <Pressable
        className="flex-1"
        onPress={() => {
          console.log(media);
          // @ts-ignore
          navigation.navigate("More Info", { media: media });
        }}
      >
        <Image
          source={
            media.backdrop_path || media.poster_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${
                    media.backdrop_path || media.poster_path
                  }`,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.webp")
          }
          className="relative rounded-md object-cover"
          style={{ width: dimensions.imageWidth, height: dimensions.height }}
        />

        {/* Movie Title and date box */}
        <View
          className="absolute flex-row items-end pb-2 px-2 rounded-md overflow-hidden bg-black/10"
          style={{ width: dimensions.imageWidth, height: dimensions.height }}
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
              className="font-semibold text-gray-100 text-xs"
              style={[
                orientation === "landscape"
                  ? { lineHeight: 18, width: dimensions.movieTitleWidth }
                  : null,
              ]}
            >
              {media && isMovie(media) ? media.title : media.name}
            </Text>
            <Text className=" text-gray-300 text-xs">
              {media && isMovie(media)
                ? media.release_date
                : media.first_air_date}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default Thumbnail;
