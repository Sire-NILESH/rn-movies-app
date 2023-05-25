import { View, Text, Pressable } from "react-native";
import React from "react";
import { IUrlObject } from "../../../types/typings";

interface IProps {
  playlists: IUrlObject[];
  onConfirmPlaylist(playlist: IUrlObject): void;
}

const FeaturedPlaylists: React.FC<IProps> = ({
  playlists,
  onConfirmPlaylist,
}) => {
  return (
    <View className="my-4">
      <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
        Playlists
      </Text>
      {/* <Text className="mb-1 ml-6 text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
        Playlists
      </Text> */}

      <Text className="ml-6 text-text_dark text-sm mb-4" numberOfLines={2}>
        Select from one of our handpicked playlists
      </Text>

      <View className="rounded-xl mx-5 overflow-hidden">
        {playlists.map((playlist, index) => (
          <Pressable
            onPress={() => {
              // Directly add single genre to the list of selections and confirm modal too
              onConfirmPlaylist(playlist);
            }}
            android_ripple={{ color: "#eee" }}
            key={playlist.name}
            className="flex-row px-4 bg-stone-800/50"
            style={
              index % 2 === 0
                ? { backgroundColor: "rgba(23, 23, 23, 1)" }
                : { backgroundColor: "rgba(23, 23, 23, 0.6)" }
            }
          >
            <Text className="px-2 py-2 text-left text-gray-300">
              {playlist.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default FeaturedPlaylists;
