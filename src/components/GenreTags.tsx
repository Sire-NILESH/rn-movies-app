import { View, Text, FlatList } from "react-native";
import React from "react";
import { idToGenresMapped } from "../utils/helpers/helper";
import { Colors } from "./../utils/Colors";
import { IUrlObject } from "../../types/typings";

interface IProps {
  genreNames?: IUrlObject[];
  genreIdList?: number[];
  backgroundType: "transparent" | "colored";
}

const GenreTags: React.FC<IProps> = (props) => {
  return (
    <View
      className="w-full justify-center bg-tertiary pb-2"
      style={{
        backgroundColor:
          props.backgroundType === "transparent"
            ? "transparent"
            : Colors.stone[900],
      }}
    >
      {props.genreIdList ? (
        <FlatList
          horizontal
          data={props.genreIdList}
          keyExtractor={(item) =>
            String(item) + ":" + String(Math.random() * 1)
          }
          renderItem={(itemObj) => <GerneTag genreId={itemObj.item} />}
        />
      ) : (
        <FlatList
          horizontal
          data={props.genreNames}
          keyExtractor={(item) =>
            String(item.name) + ":" + String(Math.random() * 1)
          }
          renderItem={(itemObj) => <GerneTag genreName={itemObj.item} />}
        />
      )}
    </View>
  );
};

export default GenreTags;

interface IGenreProps {
  genreName?: IUrlObject;
  genreId?: number;
}
// bg-neutral-700/60 bg-black/40
function GerneTag(props: IGenreProps) {
  return (
    <View className="flex-1 mx-2 bg-black/40 border border-stone-700 px-4 h-8 rounded-xl items-center justify-center">
      <Text className="text-text_highLight">
        {props.genreName
          ? props.genreName.name
          : // @ts-ignore
            idToGenresMapped[String(props.genreId)]}
      </Text>
    </View>
  );
}
