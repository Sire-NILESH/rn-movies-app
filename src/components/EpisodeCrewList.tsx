import { View, FlatList, Text } from "react-native";
import React from "react";
import { ICrew } from "../../types/typings";
import NothingToShow from "./NothingToShow";
import useNavigateTo from "../hooks/useNavigateTo";
import ProfileCard from "./ProfileCard";

interface IProps {
  crew: ICrew[] | undefined;
  closeModal: () => void;
}

const EpisodeCrewList: React.FC<IProps> = (props) => {
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const filteredCrewList = props.crew?.filter(
    (c) =>
      c.job === "Director" ||
      c.department === "Writing" ||
      c.department === "Editing" ||
      c.department === "Production"
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
            renderItem={(personObj) => {
              const p = personObj.item;
              return (
                <View className="mr-1">
                  <ProfileCard
                    creditPerson={{
                      id: p.id,
                      adult: p.adult,
                      name: p.name,
                      profile_path: p.profile_path,
                      gender: p.gender,
                      buttonTitle: "Actor",
                      creditTitle: p.department,
                    }}
                    navigateTo={navigateTo}
                    additionalOnpressHandler={() => {
                      props.closeModal();
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(media, i) => {
              return `${media.id}-${i}`;
            }}
            horizontal
          />

          <Text className="text-xs text-text_dark ml-5 mt-2">
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
