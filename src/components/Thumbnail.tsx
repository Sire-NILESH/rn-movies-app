import { useNavigation } from "@react-navigation/native";
import { modalState, movieState } from "../atoms/modalAtom";
// import { useRecoilState } from "recoil";
// import { DocumentData } from "firebase/firestore";
import { Movie } from "../typings";
import { View, Image, Pressable, Text, Dimensions } from "react-native";

interface Props {
  // When using firebase
  //   movie: Movie | DocumentData;
  movie: Movie;
  orientation: "portrait" | "landscape";
}

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

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
    // aspectRatio: 18 / 9,
  },
};

function Thumbnail({ movie, orientation }: Props) {
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
          console.log(movie);
          navigation.navigate("More Info", { movie: movie });
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`,
          }}
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
              // style={{ lineHeight: 18, width: dimensions.movieTitleWidth }}
            >
              {movie.title ? movie.title : movie.original_name}
            </Text>
            <Text className=" text-gray-300 text-xs">
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default Thumbnail;
