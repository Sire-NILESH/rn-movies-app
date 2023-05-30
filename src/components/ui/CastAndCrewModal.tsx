import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import { EpisodeCastAndCrew } from "../../../types/typings";
import EpisodeCastList from "../EpisodeCastList";
import EpisodeCrewList from "../EpisodeCrewList";

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
  castAndCrew: EpisodeCastAndCrew | undefined;
  tvShowName: string;
}

type TViews = "cast" | "crew";

const CastAndCrewModal: React.FC<IProps> = (props) => {
  const [currentView, setCurrentView] = useState<TViews>("cast");

  const setCurrentViewHandler = (view: TViews) => {
    setCurrentView(view);
  };

  //  const resetHandler = () => {
  //    setReleaseYearConstraint(undefined);
  //  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      className="items-center justify-center"
    >
      <View className="absolute my-[40%] mx-[5%] h-[64%] w-[90%] bg-zinc-900 rounded-xl pb-2 border border-neutral-700/60 [elevation:10] overflow-hidden">
        {/* HEADER */}
        <View className="mt-1 flex-row items-center justify-between h-[42] px-[20]">
          {/* Header Title */}
          <View className="flex-row items-center space-x-2">
            <Text
              className="text-text_highLight text-lg font-bold"
              numberOfLines={2}
            >
              {props.tvShowName}
            </Text>
          </View>
          {/* Header Buttons */}
          <View className="flex-row justify-between ">
            <View className="rounded-full overflow-hidden">
              <Pressable
                onPress={props.closeModal}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <Ionicons name="close" color={Colors.gray[100]} size={24} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* SEASON AND SEASON NUMBER */}
        <View className="mt-4 mx-4 mb-3 space-y-1">
          <Text
            className="text-text_highLight text-2xl font-semibold"
            numberOfLines={2}
          >
            {props.castAndCrew?.episdodeName}
          </Text>
          <Text
            className="text-text_dark text-base font-semibold"
            numberOfLines={2}
          >
            {`${
              props.castAndCrew?.seasonNumber === 0
                ? "Extras"
                : "Season " + props.castAndCrew?.seasonNumber
            }  episode ${props.castAndCrew?.episodeNumber}`}
          </Text>
        </View>

        {/* CAST OR CREW VIEW SELECT */}
        <View className="mt-2 flex-row items-center space-x-2 mx-4 py-2">
          <View className="w-20 rounded-md overflow-hidden">
            <Pressable
              onPress={() => {
                setCurrentViewHandler("cast");
              }}
              className="p-2"
              android_ripple={{ color: "#eee" }}
            >
              <View className="space-y-2 h-8">
                <Text
                  className="mx-auto font-bold"
                  style={{
                    color:
                      currentView === "cast"
                        ? Colors.text_primary
                        : Colors.text_dark,
                  }}
                >
                  Guest
                </Text>
                {currentView === "cast" ? (
                  <View className="rounded-full bg-green-500 h-1 w-full" />
                ) : null}
              </View>
            </Pressable>
          </View>
          <View className="w-20 rounded-md overflow-hidden">
            <Pressable
              onPress={() => {
                setCurrentViewHandler("crew");
              }}
              className="p-2"
              android_ripple={{ color: "#eee" }}
            >
              <View className="space-y-2 h-8">
                <Text
                  className="mx-auto font-bold"
                  style={{
                    color:
                      currentView === "crew"
                        ? Colors.text_primary
                        : Colors.text_dark,
                  }}
                >
                  Crew
                </Text>
                {currentView === "crew" ? (
                  <View className="rounded-full bg-green-500 h-1 w-full" />
                ) : null}
              </View>
            </Pressable>
          </View>
        </View>

        <View>
          {currentView === "cast" ? (
            <EpisodeCastList
              cast={props.castAndCrew?.cast}
              closeModal={props.closeModal}
            />
          ) : (
            <EpisodeCrewList
              crew={props.castAndCrew?.crew}
              closeModal={props.closeModal}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CastAndCrewModal;
