import { View, Text, Image } from "react-native";
import React from "react";

interface IProps {
  title?: string | null;
  problemType?: "error" | "nothing";
}

const NothingToShow: React.FC<IProps> = (props) => {
  console.log(props);

  return (
    <View className="flex-1 font-semibold items-center justify-center">
      <Text className="text-3xl h-20 text-stone-700 text-center [lineHeight:5]">
        {/* {props.title ? props.title + "\n \n" : "Nothing to show"} ಥ_ಥ #10d950 */}
      </Text>
      <>
        {props.problemType === "error" ? (
          <View
            className="mx-4"
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
          >
            <Image
              source={require("../../assets/images/placeholders/somethingWentWrongV4.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        ) : (
          <View
            className="mx-4"
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
          >
            <Image
              source={require("../../assets/images/placeholders/nothingToShowV8.png")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        )}
      </>
    </View>
  );
};

export default NothingToShow;
