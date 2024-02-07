import { StyleSheet, Image } from "react-native";
import React from "react";

const ImagePlaceholder = () => {
  const imagePath = "../../../assets/images/placeholders/posterPlaceHolder.png";

  return (
    <Image
      source={require(imagePath)}
      resizeMode={"cover"}
      style={styles.imageStyle}
    />
  );
};

export default ImagePlaceholder;

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
