import { View, ActivityIndicator } from "react-native";
import React from "react";

interface IProps {
  loading: boolean;
}

const Loader: React.FC<IProps> = ({ loading }) => {
  return (
    <>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null}
    </>
  );
};

export default Loader;
