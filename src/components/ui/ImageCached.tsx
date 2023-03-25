import { View, Text, StyleSheet } from "react-native";
import React from "react";
// @ts-ignore, module isnt in TS and also couldnt find any type module for this online.
import ExpoFastImage from "expo-fast-image";

interface IProps {
  imageURL: string;
  cacheKey: string;
}

const ImageCached: React.FC<IProps> = (props) => {
  return (
    <ExpoFastImage
      uri={props.imageURL}
      cacheKey={props.cacheKey}
      resizeMode={"cover"}
      style={styles.imageStyle}
    />
  );
};

export default ImageCached;

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
