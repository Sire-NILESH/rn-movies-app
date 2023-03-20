import { Trailer } from "../typings";
import { View, Image, Pressable, Text } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

interface IProps {
  video: Trailer;
  onPressHandler: (video: Trailer) => void;
}

const TrailerVideoThumbnail: React.FC<IProps> = (props) => {
  const [imageUri, setImageUri] = useState<string>(
    `https://img.youtube.com/vi/${props.video.key}/maxresdefault.jpg`
  );

  return (
    <View
      className="border border-stone-800 rounded-2xl overflow-hidden"
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
      }}
    >
      <Pressable
        className="flex-1"
        onPress={() => props.onPressHandler(props.video)}
      >
        <Image
          source={
            props.video.key
              ? {
                  uri: imageUri,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.png")
          }
          onError={(err) => {
            // on error getting HD res thumbnail, try to get MQ res thumbnail.
            console.log("Error", err);
            setImageUri(
              `https://img.youtube.com/vi/${props.video.key}/mqdefault.jpg`
            );
          }}
          className="relative rounded-2xl bg-black "
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />

        {/* Trailer Title and Video type box */}
        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(28, 25, 23, 0)",
            "rgba(28, 25, 23, 0.8)",
          ]}
          className="absolute flex-row items-end pb-2 px-2 rounded-2xl overflow-hidden"
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
          }}
        >
          <View className="flex-col items-start justify-between w-full">
            <Text className="bg-lime-300 px-2 py-1 rounded-full text-gray-900 text-[11px] mb-2">
              {props.video.type}
            </Text>
            <Text
              className="font-semibold text-gray-100 text-xs w-full"
              numberOfLines={1}
            >
              {props.video.name}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default TrailerVideoThumbnail;
