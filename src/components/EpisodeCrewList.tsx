import { View, FlatList, Text } from "react-native";
import React from "react";
import { ICrew } from "../../types/typings";
import { useNavigation } from "@react-navigation/native";
import EpisodeCrewPersonCard from "./EpisodeCrewPersonCard";
import NothingToShow from "./NothingToShow";

interface IProps {
  crew: ICrew[] | undefined;
  closeModal: () => void;
}

const EpisodeCrewList: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  const filteredCrewList = props.crew?.filter(
    (c) =>
      c.job === "Director" ||
      c.department === "Writing" ||
      c.department === "Editing"
  );

  return (
    <View className="h-[285px]">
      {filteredCrewList!.length > 0 ? (
        <>
          <FlatList
            maxToRenderPerBatch={6}
            initialNumToRender={6}
            className="px-2 py-1"
            data={filteredCrewList}
            ListFooterComponent={() => <View className="w-4" />}
            renderItem={(personObj) => (
              <View className="ml-1 bg-secondary rounded-md">
                <EpisodeCrewPersonCard
                  person={personObj.item}
                  navigateTo={navigateTo}
                  closeModal={props.closeModal}
                />
              </View>
            )}
            keyExtractor={(media, i) => {
              return `${media.id}-${i}`;
            }}
            horizontal
          />

          <Text className="text-sm text-text_dark ml-4 mt-2">
            Directing and Writing department in this episode.
          </Text>
        </>
      ) : (
        <NothingToShow problemType="nothing" />
      )}
    </View>
  );
};

export default EpisodeCrewList;
