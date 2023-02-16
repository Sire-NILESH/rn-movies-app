import { View, Text, Image } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "../utils/Colors";
import { MediaTypes, Movie, MovieMedia, TvMedia } from "../typings";
import { idToGenresMapped } from "../utils/requests";
import { isoLangs } from "./../utils/helpers/isoLangs";
import { isMovie } from "./../utils/helpers/helper";

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  let media: MovieMedia | TvMedia = route.params?.media;
  const mediaType: MediaTypes =
    route.params?.mediaType !== undefined ? route.params?.mediaType : "movie";

  function getTitle(): string {
    if ("title" in media) return media.title;
    return media.name;
  }

  // function getReleaseDate(): string | undefined {
  //   if ("release_date" in media) return media.release_date;
  //   else if ("first_air_date" in media) return media.first_air_date;
  //   return undefined;
  // }

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.stone[900],
      },
      headerTitle: getTitle(),
      // headerTitle: "title" in media ? media.title : media.name,
      // headerTitle: movie.title ? movie.title : movie.original_name,
      headerTitleAlign: "center",
      headerTintColor: Colors.gray[100],
      headerShown: true,
    });
  }, []);

  return (
    <View className="flex-1 bg-stone-800">
      {/* {route.params && <Text className="text-3xl">{movie?.title}</Text>} */}
      <View className="h-[300]">
        {/* <Banner movieList={[movie]} /> */}
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

      {/* Text */}
      <View className="flex-1 -mt-2 pt-6 bg-stone-800 space-y-5 px-4 rounded-t-xl">
        {/* Title */}
        <View>
          <Text className="text-2xl font-bold text-gray-100 object-cover">
            {/* {movie.title ? movie.title : movie.original_name} */}
            {getTitle()}
          </Text>
        </View>

        {/* Other metrics */}
        <View className="space-y-1">
          <Text className="text-gray-100">
            Rating:{"  "}
            <Text className="text-gray-400">{media.vote_average}/10</Text>
          </Text>
          <Text className="text-gray-100">
            Release:{"  "}
            <Text className="text-gray-400">
              {/* {getReleaseDate()} */}
              {isMovie(media) ? media.release_date : media.first_air_date}
              {/* {media.release_date ? media.release_date : media.first_air_date} */}
            </Text>
          </Text>
          <Text className="text-gray-100">
            Genre:{"  "}
            {media.genre_ids.map((id) => (
              <Text key={id} className="text-gray-400">
                {/*  @ts-ignore */}
                {idToGenresMapped[String(id)]}
                {"  •  "}
              </Text>
            ))}
          </Text>
          {media.original_language ? (
            <Text className="text-gray-100">
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
          <View className="flex-1 ">
            <Text className="text-lg text-gray-100">Overview</Text>
            <Text className="text-gray-400">{media.overview}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MoreInfoScreen;
