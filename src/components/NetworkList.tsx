import { View, Text, FlatList } from "react-native";
import React from "react";
import { Network } from "../typings";
// @ts-ignore
import ExpoFastImage from "expo-fast-image";

interface IProps {
  networks: Network[];
}

const NetworkList: React.FC<IProps> = (props) => {
  return (
    <View className="flex-1 space-y-4 mt-16 px-4">
      <Text className="text-text_highLight">Networks</Text>
      <FlatList
        horizontal
        data={props.networks}
        keyExtractor={(network) => String(network.id)}
        //   className=""
        renderItem={(itemObj) => {
          const n = itemObj.item;
          return (
            <View className="space-y-3 justify-start mr-5">
              <View
                className="bg-stone-50 rounded-full p-1 justify-center"
                style={{
                  width: 65,
                  aspectRatio: 1 / 1,
                }}
              >
                <ExpoFastImage
                  uri={`https://image.tmdb.org/t/p/w500${n.logo_path}`}
                  cacheKey={n.id + "network"}
                  resizeMode={"contain"}
                  className="border-stone-500"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <Text
                key={n.id}
                className="text-text_dark text-xs  text-center w-[60px]"
              >
                {n.name}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default NetworkList;
