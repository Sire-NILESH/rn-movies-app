import React from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

type Props = {
  loading: boolean;
  width: number;
  height: number;
};

const LoaderShimmer: React.FC<Props> = ({ loading, width, height }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      {loading && (
        <Animatable.View
          style={styles.shimmer}
          animation="slideInLeft"
          iterationCount="infinite"
          direction="alternate"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
    overflow: "hidden",
  },
  shimmer: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100%",
  },
});

export default LoaderShimmer;
// LoaderShimmer
