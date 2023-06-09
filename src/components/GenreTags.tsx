import { View, Text, FlatList } from "react-native";
import React, { ComponentType } from "react";
import { idToGenresMapped } from "../utils/helpers/helper";
import { Colors } from "./../utils/Colors";
import { IUrlObject } from "../../types/typings";

interface IProps {
  genreNames?: IUrlObject[];
  genreIdList?: number[];
  backgroundType: "transparent" | "colored";
  headerComponent?: ComponentType<any>;
}

const GenreTags: React.FC<IProps> = (props) => {
  return (
    <View
      className="w-full justify-center bg-tertiary h-full"
      style={{
        backgroundColor:
          props.backgroundType === "transparent"
            ? "transparent"
            : Colors.tertiary,
      }}
    >
      {props.genreIdList ? (
        <FlatList
          horizontal
          data={props.genreIdList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, i) => `${item}-${i}`}
          ListHeaderComponent={props.headerComponent}
          // ListHeaderComponentStyle={
          //   {
          //     // flexDirection: "row",
          //     // width: 200,
          //   }
          // }
          renderItem={(itemObj) => <GerneTag genreId={itemObj.item} />}
        />
      ) : (
        <FlatList
          horizontal
          // className="pb-2"
          data={props.genreNames}
          keyExtractor={(item, i) => `${item.name}-${i}`}
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
