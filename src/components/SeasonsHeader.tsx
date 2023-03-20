import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Season } from "../typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  tvMediaId: number;
  tvMediaSeasons: Season[];
  selectedSeason: Season;
  setNewSelectedSeason: (newSelectedSeason: Season) => void;
}

const SeasonsHeader: React.FC<IProps> = (props) => {
  const navigation = useNavigation();
  const onPresshandler = (seasonNumber: number) => {
    const [season] = props.tvMediaSeasons.filter(
      (s) => s.season_number === seasonNumber
    );
    props.setNewSelectedSeason(season);
  };

  return (
    <View className="flex-row justify-center bg-secondary py-4">
      {/* <View className="ml-4 mr-2 bg-stone-800 items-center justify-center px-2 rounded-md"> */}
      <View className="ml-4 mr-2 items-center justify-center  rounded-md">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[50]} />
        </Pressable>
      </View>
      {/* <View className="flex-1"> */}
      <FlatList
        horizontal
        data={props.tvMediaSeasons}
        keyExtractor={(item) => String(item.id)}
        renderItem={(itemObj) => {
          return (
            <View className="flex-1 flex-row items-center">
              <SeasonTag
                seasonNumber={itemObj.item.season_number}
                selectedSeasonNumber={props.selectedSeason.season_number}
                onPressHandler={onPresshandler}
              />
              {/* Divider */}
              {itemObj.index != props.tvMediaSeasons.length - 1 ? (
                <View className="border border-stone-700 h-6 w-[1px] rounded-full" />
              ) : null}
            </View>
          );
        }}
      />
      {/* </View> */}
    </View>
  );
};

export default SeasonsHeader;

interface ISeasonTagProps {
  seasonNumber: number;
  selectedSeasonNumber: number;
  onPressHandler: (seasonNumber: number) => void;
}

function SeasonTag(props: ISeasonTagProps) {
  return (
    <Pressable
      onPress={() => props.onPressHandler(props.seasonNumber)}
      className="flex-1 mx-2 px-4 h-8 items-center justify-center"
    >
      <Text className="text-text_highLight uppercase tracking-[2px] font-semibold px-1">
        {props.seasonNumber === 0 ? "Extras" : `Season ${props.seasonNumber}`}
      </Text>
      {/* Underline of selected tag */}
      {props.selectedSeasonNumber === props.seasonNumber ? (
        <View className="border border-green-500 h-[1px] w-full rounded-full mt-1" />
      ) : (
        <View className="border border-transparent h-[1px] w-full rounded-full mt-1" />
      )}
    </Pressable>
  );
}
