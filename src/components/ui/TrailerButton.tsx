import { Text } from "react-native";
import React from "react";
import { Colors } from "./../../utils/Colors";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { MediaTypes } from "../../../types/typings";
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
      name: "Trailer Videos",
      url: `/${props.mediaType}/${props.mediaId}/videos`,
      queryParams: {
        language: "en-US",
      },
    });
  };

  return (
    <CustomButton
      color={Colors.neutral[800]}
      height={40}
      width={"100%"}
      radius={8}
      method={onPressHandler}
    >
      <Ionicons
        size={16}
        name="logo-youtube"
        color={Colors.stone[500]}
      ></Ionicons>
      <Text className="text-text_primary ml-2">Trailer</Text>
    </CustomButton>
  );
};

export default TrailerButton;
