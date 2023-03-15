import { View, Text, FlatList, Image } from "react-native";
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
      <Text className="text-green-100">Networks</Text>
      <FlatList
        horizontal
        data={props.networks}
        keyExtractor={(network) => String(network.id)}
        //   className=""
        renderItem={(itemObj) => {
          const n = itemObj.item;
          return (
            <View className="space-y-2 items-center mr-3">
              <View className="bg-stone-50 rounded-full flex-1 p-1 justify-center">
                <ExpoFastImage
                  uri={`https://image.tmdb.org/t/p/w500${n.logo_path}`}
                  cacheKey={n.id + "network"}
                  resizeMode={"contain"}
                  className="border-stone-500"
                  style={{
                    width: 56,
                    height: 56,
                  }}
                />
              </View>
              <Text key={n.id} className="text-stone-400 text-xs">
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
