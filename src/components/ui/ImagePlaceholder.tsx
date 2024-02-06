import { StyleSheet } from "react-native";
import { Image } from "expo-image";

const ImagePlaceholder = () => {
  const imagePath = "../../../assets/images/placeholders/posterPlaceHolder.png";

  return (
    <Image
      source={require(imagePath)}
      contentFit={"cover"}
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
