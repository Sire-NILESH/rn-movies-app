import { View, Text, FlatList } from "react-native";
import React from "react";
import { idToGenresMapped } from "../utils/helpers/helper";

interface IProps {
  genreIdList: number[];
}

const GenreTags: React.FC<IProps> = (props) => {
  return (
    <View className="w-full justify-center h-8 rounded-md">
      <FlatList
        horizontal
        data={props.genreIdList}
        keyExtractor={(item) => String(item)}
        renderItem={(itemObj) => <GerneTag genreId={itemObj.item} />}
      />
    </View>
  );
};

export default GenreTags;

interface IGenreProps {
  genreId: number;
}

function GerneTag(props: IGenreProps) {
  return (
    <View className="flex-1 mx-2 bg-black/40 border border-stone-700 px-4 h-8 rounded-xl items-center justify-center">
      <Text className="text-green-100">
        {/* @ts-ignore */}
        {idToGenresMapped[String(props.genreId)]}
      </Text>
    </View>
  );
}
