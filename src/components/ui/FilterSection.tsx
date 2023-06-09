import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "../../utils/Colors";
import {
  IGenreSortBy,
  MediaTypes,
  TReleaseYearConstraint,
} from "../../../types/typings";
import LanguageDropdown from "./LanguageDropdown";
import YearsDropdown from "./YearsDropdown";
import GenresSortByDropDown from "./GenresSortByDropDown";

interface IProps {
  setCurrentLangHandler: (language: string) => void;
  setCurrentYearHandler: (year: number) => void;
  setCurrentGenreSortByHandler: (sortByFilter: IGenreSortBy) => void;
  setReleaseYearConstraintHandler: (constraint: TReleaseYearConstraint) => void;
  currentYear: number;
  mediaListType: MediaTypes;
}

const FilterSection: React.FC<IProps> = ({
  setCurrentLangHandler,
  setCurrentYearHandler,
  setCurrentGenreSortByHandler,
  setReleaseYearConstraintHandler,
  currentYear,
  mediaListType,
}) => {
  const [afterCheckboxState, setAfterCheckboxState] = useState(false);
  const [beforeCheckboxState, setBeforeCheckboxState] = useState(false);

  useEffect(() => {
    if (!afterCheckboxState && !beforeCheckboxState) {
      setReleaseYearConstraintHandler(undefined);
    }
  }, [afterCheckboxState, beforeCheckboxState]);

  return (
    <View>
      {/* FILTER */}
      <View className="mt-4">
        <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
          Filters
        </Text>

        <Text className="mx-6 text-text_dark text-sm mb-2" numberOfLines={2}>
          Select a language and/or year of release
        </Text>

        <View
          className="flex-row space-x-4 items-center justify-between px-4 mt-2 rounded-xl"
          // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        >
          <LanguageDropdown
            saveMode="local"
            localLangSetter={setCurrentLangHandler}
            bgColor={Colors.stone[900]}
          />
          <YearsDropdown
            saveMode="local"
            localYearSetter={setCurrentYearHandler}
            bgColor={Colors.stone[900]}
          />
        </View>
      </View>

      {/* RELEASE/AIR DATE YEAR FILTER */}
      <View className="mt-6">
        <Text className="mb-1 ml-6 text-text_highLight text-base font-bold uppercase tracking-[2px]">
          Optional
        </Text>

        <Text className="ml-6 text-text_dark text-sm" numberOfLines={2}>
          {`${mediaListType === "movie" ? "Release" : "Air"} date period ( ${
            currentYear === 0 ? "unavailable on 'All years'" : "optional"
          } )`}
        </Text>

        <View
          className="mt-4 flex-row space-x-8 items-center ml-6 rounded-xl"
          // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        >
          <View className="flex-row items-center ">
            <BouncyCheckbox
              size={20}
              useNativeDriver
              disableBuiltInState
              disabled={currentYear === 0 ? true : false}
              isChecked={beforeCheckboxState}
              fillColor={Colors.green[800]}
              unfillColor={"transparent"}
              innerIconStyle={{ borderWidth: 1 }}
              onPress={(isChecked: boolean) => {
                setBeforeCheckboxState((prev) => {
                  return prev === false ? true : false;
                });

                if (!isChecked === true) {
                  setAfterCheckboxState(false);
                  setReleaseYearConstraintHandler("lte");
                }
              }}
            />
            {/* <Text className="text-text_secondary mr-3 text-base">{"🚫"}</Text> */}
            <Text className="text-text_secondary">{"Before"}</Text>
          </View>

          <View className="flex-row items-center">
            <BouncyCheckbox
              size={20}
              useNativeDriver
              disableBuiltInState
              disabled={currentYear === 0 ? true : false}
              isChecked={afterCheckboxState}
              fillColor={Colors.green[800]}
              unfillColor={"transparent"}
              innerIconStyle={{ borderWidth: 1 }}
              onPress={(isChecked: boolean) => {
                setAfterCheckboxState((prev) => {
                  return prev === false ? true : false;
                });
                if (!isChecked === true) {
                  setBeforeCheckboxState(false);
                  setReleaseYearConstraintHandler("gte");
                }
              }}
            />
            <Text className="text-text_secondary">{"After"}</Text>
          </View>
        </View>

        <View className="mt-8">
          <Text className="ml-6 mb-4 text-text_dark text-sm" numberOfLines={2}>
            {"Sort content by ( ↓ Descending, ↑ Ascending )"}
          </Text>

          <View className="ml-4">
            <GenresSortByDropDown
              saveMode="local"
              localGenreSortBySetter={setCurrentGenreSortByHandler}
              bgColor={Colors.stone[900]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterSection;
