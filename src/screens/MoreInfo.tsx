import { View, Text, Image } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { Colors } from "../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Movie } from "../typings";
import Banner from "./../components/Banner";
import { idToGenresMapped } from "../utils/requests";
import { isoLangs } from "../utils/helper";

const MoreInfoScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  const movie: Movie = route.params?.movie;
  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.stone[900],
      },
      headerTitle: movie.title ? movie.title : movie.original_name,
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
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`,
          }}
          className="object-cover"
          style={{ width: "100%", height: 300 }}
        />
      </View>

      {/* Text */}
      <View className="flex-1 -mt-2 pt-6 bg-stone-800 space-y-5 px-4 rounded-t-xl">
        {/* Title */}
        <View>
          <Text className="text-2xl font-bold text-gray-100 object-cover">
            {movie.title ? movie.title : movie.original_name}
          </Text>
        </View>

        {/* Other metrics */}
        <View className="space-y-1">
          <Text className="text-gray-100">
            Rating:{"  "}
            <Text className="text-gray-400">{movie.vote_average}/10</Text>
          </Text>
          <Text className="text-gray-100">
            Release:{"  "}
            <Text className="text-gray-400">
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </Text>
          </Text>
          <Text className="text-gray-100">
            Genre:{"  "}
            {movie.genre_ids.map((id) => (
              <Text key={id} className="text-gray-400">
                {idToGenresMapped[String(id)]}
                {"  •  "}
              </Text>
            ))}
          </Text>
          {movie.original_language ? (
            <Text className="text-gray-100">
              Original Language:{"  "}
              <Text className="text-gray-400">
                {isoLangs[movie.original_language]?.name}
              </Text>
            </Text>
          ) : null}
        </View>

        {/* Description */}
        {movie.overview ? (
          <View className="flex-1 ">
            <Text className="text-lg text-gray-100">Overview</Text>
            <Text className="text-gray-400">{movie.overview}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MoreInfoScreen;
