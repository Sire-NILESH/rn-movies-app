import { StyleSheet, ImageResizeMode } from "react-native";
import React from "react";
// @ts-ignore, module isnt in TS and also couldnt find any type module for this online.
import ExpoFastImage from "expo-fast-image";

interface IProps {
  imageURL: string | undefined;
  cacheKey: string;
  resizeType?: ImageResizeMode;
}

const ImageCached: React.FC<IProps> = (props) => {
  return (
    <ExpoFastImage
      uri={
        props.imageURL
          ? props.imageURL
          : require("../../../assets/images/placeholders/posterPlaceHolder.png")
      }
      cacheKey={props.cacheKey}
      resizeMode={props.resizeType != undefined ? props.resizeType : "cover"}
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
