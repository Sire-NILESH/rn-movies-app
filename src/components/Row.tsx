// import { DocumentData } from 'firebase/firestore'
// import { FlatList } from "react-native-gesture-handler";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import { Text, View, FlatList } from "react-native";

interface Props {
  title: string;
  // When using firebase
  //   movies: Movie[] | DocumentData[]
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const handleClick = (direction: string) => {};

  return (
    <View className="h-40 space-y-1 mb-4">
      <Text className="pl-5 w-56 text-sm font-semibold text-[#e5e5e5]">
        {title}
      </Text>

      <FlatList
        className="ml-2 h-32"
        data={movies}
        renderItem={(movie) => (
          <Thumbnail movie={movie.item} orientation="landscape" />
        )}
        keyExtractor={(movie) => {
          return String(movie.id);
        }}
        horizontal
      ></FlatList>
    </View>
  );
}

export default Row;
