import { View, Text, Image, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { isoLangs } from "./../utils/helpers/isoLangs";
import { idToGenresMapped, isMovie } from "./../utils/helpers/helper";

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  // @ts-ignore
  let media: MovieMedia | TvMedia = route.params?.media;

  const mediaType: MediaTypes = // @ts-ignore
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  function getTitle(): string {
    if ("title" in media) return media.title;
    return media.name;
  }

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getTitle(),
    });
  }, []);

  return (
    <ScrollView className="flex-1 bg-stone-800 pb-24">
      <View className="h-[300]">
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
          className="object-cover"
          style={{ width: "100%", height: 300 }}
        />
      </View>

      {/* Text px-4 */}
      <View className="flex-1 -mt-2 pt-6 bg-gray-800 rounded-t-xl">
        {/* Title */}
        <View className="px-4">
          <Text className="text-2xl font-bold text-gray-100 object-cover">
            {/* {movie.title ? movie.title : movie.original_name} */}
            {getTitle()}
          </Text>
          {isMovie(media) && media.original_title !== media.title ? (
            <Text className="text-xs text-gray-100 pt-2">
              Original Title:{"  "}
              <Text className="text-gray-400">{media.original_title}</Text>
            </Text>
          ) : !isMovie(media) && media.original_name !== media.name ? (
            <Text className="text-xs text-gray-100 pt-2">
              Original Title:{"  "}
              <Text className="text-gray-400">{media.original_name}</Text>
            </Text>
          ) : null}
        </View>

        {/* Other metrics */}
        <View className="mt-5">
          <Text className="text-gray-100 py-2 px-4 bg-stone-900">
            Rating:{"  "}
            <Text className="text-gray-400">{media.vote_average}/10</Text>
          </Text>
          <Text className="text-gray-100 py-2 px-4 bg-stone-800">
            Release:{"  "}
            <Text className="text-gray-400">
              {/* {getReleaseDate()} */}
              {isMovie(media) ? media.release_date : media.first_air_date}
              {/* {media.release_date ? media.release_date : media.first_air_date} */}
            </Text>
          </Text>
          <Text className="text-gray-100 py-2 px-4 bg-stone-900">
            Genre:{"  "}
            {media.genre_ids.map((id) => (
              <Text key={id} className="text-gray-400">
                {/*  @ts-ignore */}
                {idToGenresMapped[String(id)]}
                {"  •  "}
              </Text>
            ))}
          </Text>
          <Text className="text-gray-100 py-2 px-4 bg-stone-800">
            Media:{"  "}
            <Text className="text-gray-400">
              {isMovie(media) ? "Movie" : "TV"}
            </Text>
          </Text>
          {media.original_language ? (
            <Text className="text-gray-100 py-2 px-4 bg-stone-900">
              Original Language:{"  "}
              <Text className="text-gray-400">
                {/*  @ts-ignore */}
                {isoLangs[media.original_language]?.name}
              </Text>
            </Text>
          ) : null}
        </View>

        {/* Description */}
        {media.overview ? (
          <View className="px-4 py-4 bg-stone-800">
            <Text className="text-lg text-gray-100">Overview</Text>
            <Text className="text-gray-400">{media.overview}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default MoreInfoScreen;
