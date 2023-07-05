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
      height={38}
      width={"100%"}
      radius={8}
      method={onPressHandler}
      styledClassName="border border-neutral-800"
    >
      <Ionicons
        size={16}
        name="md-logo-youtube"
        color={Colors.stone[500]}
      ></Ionicons>
      <Text className="text-green-100 ml-2">Trailer</Text>
    </CustomButton>
  );
};

export default TrailerButton;
