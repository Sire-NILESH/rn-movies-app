import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { Colors } from "../utils/Colors";
import { getDeviceDimensions } from "../utils/helpers/helper";
import { ImageBackground } from "expo-image";

interface IProps {
  mediaPosterPath: string;
  imgQuality?: string;
}

const screenDimensions = getDeviceDimensions("screen");

const MoreInfoBackdrop: React.FC<IProps> = ({
  mediaPosterPath,
  imgQuality,
}) => {
  const posterImgQuality = imgQuality ? imgQuality : 400;

  // const imgUrl = `https://image.tmdb.org/t/p/w780${mediaPosterPath}`;
  const imgUrl = `https://image.tmdb.org/t/p/w${posterImgQuality}${mediaPosterPath}`;

  return (
    <View
      className="absolute top-0 left-0 w-[100%] flex-1 h-full"
      style={{
        width: screenDimensions.width,
        height: undefined,
        aspectRatio: 2 / 3,
      }}
    >
      <LinearGradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(28, 25, 23, 0.3)",
          "rgba(0,0,0,0.9)",
          Colors.black,
        ]}
        className="flex-1"
      >
        <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
          source={{
            uri: imgUrl,
          }}
          transition={{
            // duration: 300,
            effect: "cross-dissolve",
            timing: "ease-in-out",
          }}
          contentFit="cover" //similar to web, "cover", "contain", etc.
          style={{ flex: 1 }} //for View dimensions internally
          imageStyle={{ zIndex: -100 }} //for Image styles internally.
          // blurRadius={10}
        />
      </LinearGradient>
    </View>
  );
};

export default MoreInfoBackdrop;
