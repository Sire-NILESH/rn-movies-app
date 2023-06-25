import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import React, { useCallback } from "react";
import { Season } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  tvMediaId: number;
  tvMediaSeasons: Season[];
  selectedSeason: Season;
  setScrollToTop: () => void;
  setNewSelectedSeason: (newSelectedSeason: Season) => void;
}

const SeasonsHeader: React.FC<IProps> = (props) => {
  const navigation = useNavigation();
  const onPresshandler = (seasonNumber: number) => {
    const [season] = props.tvMediaSeasons.filter(
      (s) => s.season_number === seasonNumber
    );
    if (season === props.selectedSeason) {
      props.setScrollToTop();
      return;
    }
    props.setNewSelectedSeason(season);
  };

  const renderItem = useCallback(
    (itemObj: ListRenderItemInfo<Season>) => {
      return (
        <View className="flex-1 flex-row items-center pt-1 pb-2">
          <SeasonTag
            seasonNumber={itemObj.item.season_number}
            selectedSeasonNumber={props.selectedSeason.season_number}
            onPressHandler={onPresshandler}
          />

          {/* Divider */}
          {itemObj.index != props.tvMediaSeasons.length - 1 ? (
            <View className="border border-neutral-800 h-6 w-[1px] rounded-full" />
          ) : null}
        </View>
      );
    },
    [props.selectedSeason.season_number]
  );

  return (
    <View className="flex-row justify-center bg-secondary border-b border-b-neutral-800 py-1">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.tvMediaSeasons}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={() => {
          return (
            <View className="flex-1 overflow-hidden">
              <Pressable
                className="flex-1 items-center justify-center pl-4 pr-1"
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.gray[50]} />
              </Pressable>
            </View>
          );
        }}
        renderItem={(itemObj) => renderItem(itemObj)}
      />
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
    <View className="relative mx-2 items-center justify-center rounded-md overflow-hidden">
      <Pressable
        onPress={() => props.onPressHandler(props.seasonNumber)}
        android_ripple={{ color: "#e9e9e9" }}
        className="px-4 py-2"
      >
        <Text
          className={`text-text_highLight uppercase tracking-[2px] font-semibold px-1 ${
            props.selectedSeasonNumber === props.seasonNumber
              ? "text-text_highLight"
              : "text-text_dark"
          }`}
        >
          {props.seasonNumber === 0 ? "Extras" : `Season ${props.seasonNumber}`}
        </Text>
        {/* Underline of selected tag */}
        {props.selectedSeasonNumber === props.seasonNumber ? (
          <View className="absolute bottom-0 mx-4 border border-green-500 h-[1px] w-full rounded-full mt-1" />
        ) : (
          <View className="absolute border border-transparent h-[1px] w-full rounded-full mt-1" />
        )}
      </Pressable>
    </View>
  );
}
