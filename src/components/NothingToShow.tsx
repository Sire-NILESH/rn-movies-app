import { View, Text } from "react-native";
import React from "react";

interface IProps {
  title?: string | null;
}

const NothingToShow: React.FC<IProps> = (props) => {
  return (
    <View className="flex-1 font-semibold items-center justify-center">
      <Text className="text-3xl h-20 text-stone-700 text-center [lineSpacing:5]">
        {props.title ? props.title + "\n \n" : "Nothing to show"} ಥ_ಥ
      </Text>
    </View>
  );
};

export default NothingToShow;
