import { View, Text } from "react-native";
import React from "react";
import { Colors } from "./../../utils/Colors";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { MediaTypes } from "../../typings";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  mediaType: MediaTypes;
  mediaId: number;
}

const TrailerButton: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    // @ts-ignore
    navigation.navigate("Trailer", {
      mediaType: props.mediaType,
      mediaId: props.mediaId,
    });
  };

  return (
    <CustomButton
      color={Colors.stone[900]}
      height={45}
      width={"100%"}
      radius={10}
      method={onPressHandler}
    >
      <Ionicons
        size={16}
        name="md-logo-youtube"
        color={Colors.stone[500]}
      ></Ionicons>
      <Text className="text-green-100 ml-1">Trailer</Text>
    </CustomButton>
  );
};

export default TrailerButton;
