// import { DocumentData } from 'firebase/firestore'
// import { FlatList } from "react-native-gesture-handler";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import { Text, View, FlatList } from "react-native";
import IconButton from "./ui/IconButton";
import { Colors } from "./../utils/Colors";
import { Pressable } from "react-native";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  // When using firebase
  //   movies: Movie[] | DocumentData[]
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const handleClick = (direction: string) => {};
  const navigation = useNavigation();

  return (
    <View className="h-40 space-y-1 mb-4">
      <View className="flex-row space-x-4 ">
        <Text className="pl-5 text-sm font-semibold text-[#e5e5e5]">
          {title}
        </Text>
      </View>

      <FlatList
        ListFooterComponent={() => (
          <View
            className="w-14 h-14 my-auto rounded-full [elevation: 2] overflow-hidden mx-2"
            style={{ elevation: 2 }}
          >
            <Pressable
              className="w-14 h-14 rounded-full bg-stone-700 items-center justify-center"
              android_ripple={{ color: Colors.stone[600] }}
              onPress={() => navigation.navigate("Tiles", { title, movies })}
            >
              <IconButton
                name="arrow-forward"
                color={Colors.gray[100]}
                size={18}
              ></IconButton>
            </Pressable>
          </View>
        )}
        bounces
        className="ml-2 h-32"
        data={movies}
        renderItem={(movie) => (
          <Thumbnail movie={movie.item} orientation="landscape" />
        )}
        keyExtractor={(movie) => {
          return String(movie.id);
        }}
        horizontal
      />
    </View>
  );
}

export default memo(Row);
