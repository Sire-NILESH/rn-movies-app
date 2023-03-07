import { Trailer } from "../typings";
import { View, Image, Pressable, Text, Dimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

interface IProps {
  video: Trailer;
  onPressHandler: (video: Trailer) => void;
  orientation: "portrait" | "landscape";
}

const windowWidth = Dimensions.get("window").width;

const thumbnailDimensions = {
  landscape: {
    width: "100%",
    height: 200,
    imageWidth: "100%",
    movieTitleWidth: 128,
    aspectRatio: 1,
  },
  portrait: {
    width: windowWidth * 0.4,
    height: 200,
    imageWidth: windowWidth * 0.4,
    movieTitleWidth: windowWidth * 0.31,
  },
};

const TrailerVideoThumbnail: React.FC<IProps> = (props) => {
  const dimensions = thumbnailDimensions[props.orientation];

  return (
    <View
      style={{
        width: dimensions.width,
        height: dimensions.height,
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
                  uri: `https://img.youtube.com/vi/${props.video.key}/mqdefault.jpg`,
                }
              : require("../../assets/images/placeholders/posterPlaceHolder.webp")
          }
          className="relative rounded-2xl bg-black"
          style={{
            width: dimensions.imageWidth,
            height: dimensions.height,
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
            // Colors.black,
          ]}
          className="absolute flex-row items-end pb-2 px-2 rounded-2xl overflow-hidden bg-black/10"
          style={{ width: dimensions.imageWidth, height: dimensions.height }}
        >
          <View className="flex-col items-start justify-between w-full">
            <Text className="bg-lime-300 px-2 py-1 rounded-full text-gray-900 text-[11px] mb-2">
              {props.video.type}
            </Text>
            <Text
              className="font-semibold text-gray-100 text-xs w-full"
              numberOfLines={1}
              style={[
                props.orientation === "landscape" ? { lineHeight: 18 } : null,
              ]}
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
