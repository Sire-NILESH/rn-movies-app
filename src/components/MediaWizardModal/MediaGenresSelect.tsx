import { View, Text } from "react-native";
import React from "react";
import LanguageDropdown from "../ui/LanguageDropdown";
import YearsDropdown from "../ui/YearsDropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "../../utils/Colors";
import { IUrlObject } from "../../../types/typings";

interface IProps {
  genrePlaylists: IUrlObject[];
  selectedPlaylistHandlers(playlist: IUrlObject, remove?: boolean): void;
  setCurrentLangHandler: (language: string) => void;
  setCurrentYearHandler: (year: number) => void;
}

const MediaGenresSelect: React.FC<IProps> = ({
  genrePlaylists,
  selectedPlaylistHandlers,
  setCurrentLangHandler,
  setCurrentYearHandler,
}) => {
  return (
    <>
      {/* FILTER */}
      <View className="mt-4">
        <Text className="mb-1 text-center text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
          • Filters •
        </Text>

        <Text
          className="text-center mx-6 text-text_dark text-sm mb-2"
          numberOfLines={2}
        >
          Select a language and/or year of release
        </Text>

        <View
          className="flex-row space-x-4 items-center justify-between px-4 mt-2 rounded-xl"
          // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        >
          <LanguageDropdown
            saveMode="local"
            localLangSetter={setCurrentLangHandler}
          />
          <YearsDropdown
            saveMode="local"
            localYearSetter={setCurrentYearHandler}
          />
        </View>
      </View>

      {/* CUSTOM GENRES SELECTS */}
      <View className="my-8">
        <Text className="mb-1 text-center text-green-500 rounded-full font-semibold uppercase tracking-[3px] text-xs">
          • Genres •
        </Text>

        <Text
          className="text-center mx-6 text-text_dark text-sm mb-4"
          numberOfLines={2}
        >
          Select one or more genres from the list below
        </Text>

        <View className="rounded-xl mx-5 overflow-hidden">
          {genrePlaylists.map((playlist, index) => (
            <View
              key={playlist.name}
              className="flex-row px-4"
              style={
                index % 2 === 0
                  ? { backgroundColor: "rgba(23, 23, 23, 1)" }
                  : { backgroundColor: "rgba(23, 23, 23, 0.7)" }
              }
            >
              <BouncyCheckbox
                size={20}
                fillColor={Colors.green[800]}
                unfillColor={"transparent"}
                innerIconStyle={{ borderWidth: 1 }}
                onPress={(isChecked: boolean) => {
                  isChecked === true
                    ? selectedPlaylistHandlers(playlist)
                    : selectedPlaylistHandlers(playlist, true);
                }}
              />
              <Text className="px-2 py-2 text-left text-gray-300">
                {playlist.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default MediaGenresSelect;
