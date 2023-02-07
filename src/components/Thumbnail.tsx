import { modalState, movieState } from "../atoms/modalAtom";
// import { useRecoilState } from "recoil";
// import { DocumentData } from "firebase/firestore";
import { Movie } from "../typings";
import { View, Image, Pressable, Text } from "react-native";

interface Props {
  // When using firebase
  //   movie: Movie | DocumentData;
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  //   const [showModal, setShowModal] = useRecoilState(modalState);
  //   const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  //   console.log(movie);
  return (
    <View className={"h-32 w-[245px]"}>
      <Pressable
        className="flex-1"
        onPress={() => {
          //  setCurrentMovie(movie);
          //  setShowModal(true);
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`,
          }}
          className="relative rounded-md object-cover h-32 w-[240px]"
        />
        {/* Movie Title and date box */}
        <View className="absolute  flex-row items-end pb-2 px-2 h-32 w-[240px] rounded-md overflow-hidden bg-black/10">
          <View className="flex-row items-center justify-between w-full">
            <Text className="font-semibold text-gray-100 text-base w-32">
              {movie.title ? movie.title : movie.original_name}
            </Text>
            <Text className=" text-gray-100 text-xs">
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default Thumbnail;
// uri: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
