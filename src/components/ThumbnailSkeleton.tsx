import { View, Text } from "react-native";
import React from "react";
import { getDeviceDimensions } from "../utils/helpers/helper";

const ThumbnailSkeleton = () => {
  const windowWidth = getDeviceDimensions("window").width;
  const thumbnailSkeletonWidth = windowWidth * 0.31;
  console.log(thumbnailSkeletonWidth);

  return (
    <View className="w-[100%] pl-2 py-1 flex-row items-center">
      {[1, 1, 1].map((n) => {
        return (
          <View
            key={Math.random() * 1}
            className=" border border-stone-800 ml-1 rounded-md"
            style={{
              width: thumbnailSkeletonWidth,
              // borderRadius: 6,
              aspectRatio: 2 / 3,
              height: undefined,
              overflow: "hidden",
            }}
          />
        );
      })}
    </View>
  );
};

export default ThumbnailSkeleton;
