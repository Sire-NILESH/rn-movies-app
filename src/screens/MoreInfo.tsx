import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { MediaTypes, MovieMedia, TvMedia } from "../typings";
import { isoLangs } from "./../utils/helpers/isoLangs";
import { isMovie } from "./../utils/helpers/helper";
import IconButton from "../components/ui/IconButton";
import { Colors } from "./../utils/Colors";
import GenreTags from "./../components/GenreTags";
import CustomButton from "../components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const screenDimensions = Dimensions.get("screen");

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
    <ScrollView className="flex-1 bg-black pb-24">
      {/* BackDrop Image */}
      <View
        className="absolute top-0 left-0 w-[100%] flex-1 h-full"
        style={[{ height: screenDimensions.height }]}
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(28, 25, 23, 0.4)",
            "rgba(28, 25, 23, 0.8)",
            Colors.black,
          ]}
          className="flex-1"
        >
          <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                media?.poster_path || media?.backdrop_path
              }`,
            }}
            resizeMode="cover" //similar to web, "cover", "contain", etc.
            style={{ flex: 1 }} //for View dimensions internally
            imageStyle={{ zIndex: -100 }} //for Image styles internally.
          ></ImageBackground>
        </LinearGradient>
      </View>

      {/* Content */}
      <View className="mt-80 flex-1 pt-6">
        {/* Title */}
        <View className="px-4">
          <Text className="text-3xl font-semibold text-gray-100 object-cover">
            {getTitle()}
          </Text>
          {isMovie(media) && media.original_title !== media.title ? (
            <Text className="text-sm text-gray-100 pt-2">
              Original Title:{"  "}
              <Text className="text-gray-400">{media.original_title}</Text>
            </Text>
          ) : !isMovie(media) && media.original_name !== media.name ? (
            <Text className="text-sm text-gray-100 pt-2">
              Original Title:{"  "}
              <Text className="text-gray-400">{media.original_name}</Text>
            </Text>
          ) : null}
        </View>

        {/* Genre Tags Row */}
        <View className="w-full h-10 justify-center items-center mt-5">
          <GenreTags genreIdList={media.genre_ids} />
        </View>

        {/* Other metrics */}
        <View className="mt-5 mx-3 flex-row justify-between h-[180]">
          <View className="flex-1 rounded-l-2xl">
            <Image
              source={
                media.backdrop_path || media.poster_path
                  ? // media.poster_path || media.backdrop_path
                    {
                      uri: `https://image.tmdb.org/t/p/w500${
                        media.backdrop_path || media.poster_path
                      }`,
                    }
                  : require("../../assets/images/placeholders/posterPlaceHolder.webp")
              }
              className="object-fill rounded-l-2xl"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View className=" bg-gray-900/80 flex-1 rounded-r-2xl py-6 space-y-4 justify-center">
            <Text className="text-gray-100 px-4">
              Rating:{"  "}
              <Text className="text-gray-400">{media.vote_average}/10</Text>
            </Text>
            <Text className="text-gray-100 px-4">
              Media:{"  "}
              <Text className="text-gray-400">
                {isMovie(media) ? "Movie" : "TV"}
              </Text>
            </Text>
            <Text className="text-gray-100 px-4">
              Release:{"  "}
              <Text className="text-gray-400">
                {/* {getReleaseDate()} */}
                {isMovie(media) ? media.release_date : media.first_air_date}
                {/* {media.release_date ? media.release_date : media.first_air_date} */}
              </Text>
            </Text>
            {/* <Text className="text-gray-100 px-4">
            Genre:{"  "}
            {media.genre_ids.map((id) => (
              <Text key={id} className="text-gray-400">
                {idToGenresMapped[String(id)]}
                {"  •  "}
              </Text>
            ))}
          </Text> */}

            {media.original_language ? (
              <Text className="text-gray-100 px-4">
                Language:{"  "}
                <Text className="text-gray-400">
                  {/*  @ts-ignore */}
                  {isoLangs[media.original_language]?.name
                    ? // @ts-ignore
                      isoLangs[media.original_language]?.name
                    : media.original_language}
                </Text>
              </Text>
            ) : null}
          </View>
        </View>

        {/* Description */}
        {media.overview ? (
          <View className="px-4 mt-5">
            <Text className="text-lg text-gray-100">Overview</Text>
            <Text className="text-gray-500">{media.overview}</Text>
          </View>
        ) : null}
      </View>

      {/* Buttons */}
      <View className="w-full flex-row space-between gap-3 pl-4 mt-5">
        <View className="flex-1">
          <CustomButton
            color={Colors.stone[900]}
            height={45}
            width={"100%"}
            radius={10}
          >
            <Ionicons
              size={16}
              name="md-logo-youtube"
              color={Colors.stone[500]}
            ></Ionicons>
            <Text className="text-gray-100 ml-1">Trailer</Text>
          </CustomButton>
        </View>
        <View className="flex-1">
          <CustomButton
            color={Colors.stone[900]}
            height={45}
            width={"100%"}
            radius={10}
          >
            <Ionicons size={18} name="add" color={Colors.stone[500]}></Ionicons>
            <Text className="text-gray-100 ml-1">Watchlist</Text>
          </CustomButton>
        </View>
        <View className="flex-1">
          <CustomButton
            color={Colors.stone[900]}
            height={45}
            width={"100%"}
            radius={10}
          >
            <Ionicons
              size={18}
              name="checkmark"
              color={Colors.stone[500]}
            ></Ionicons>
            <Text className="text-gray-100 ml-1">Watched</Text>
          </CustomButton>
        </View>
      </View>

      <Pressable
        className="ml-4 my-5 rounded-xl w-full py-1 px-2"
        onPress={() =>
          navigation.push("Related", {
            relatedToMediaId: media.id,
            mediaType: mediaType,
            // mediaType: media.media_type,
          })
        }
      >
        <View className="flex-row items-center">
          <Text className="mr-2 text-2xl text-gray-100">Similar</Text>
          <IconButton
            name="arrow-forward"
            color={Colors.gray[100]}
            size={18}
          ></IconButton>
        </View>
        <Text className="mr-2 text-gray-400">Show more like this...</Text>
      </Pressable>
    </ScrollView>
  );
};

export default MoreInfoScreen;
