// import { DocumentData } from 'firebase/firestore'
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import { ScrollView, Text, View } from "react-native";

interface Props {
  title: string;
  // When using firebase
  //   movies: Movie[] | DocumentData[]
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const handleClick = (direction: string) => {};

  return (
    <View className="h-40 space-y-1">
      <Text className="pl-5 w-56 text-sm font-semibold text-[#e5e5e5]">
        {title}
      </Text>

      <ScrollView horizontal={true} className="ml-2 h-32">
        {movies.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Row;
