import { View, Text, Pressable } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../../typings";

interface IProps {
  movies: Movie[];
  title: string;
}

const NavigateButton: React.FC<IProps> = ({ title, movies }) => {
  const navigation = useNavigation();
  return (
    <View
      className="w-14 h-14 my-auto rounded-full [elevation: 2] overflow-hidden mx-2"
      style={{ elevation: 2 }}
    >
      <Pressable
        className="w-14 h-14 rounded-full bg-stone-700 items-center justify-center"
        android_ripple={{ color: Colors.stone[600] }}
        onPress={() => navigation.navigate("Tiles", { title, movies })}
      >
        <IconButton
          name="arrow-forward"
          color={Colors.gray[100]}
          size={18}
        ></IconButton>
      </Pressable>
    </View>
  );
};

export default NavigateButton;
