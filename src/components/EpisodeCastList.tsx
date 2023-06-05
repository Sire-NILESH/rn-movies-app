import { View, FlatList, Text } from "react-native";
import React from "react";
import { ICast } from "../../types/typings";
import NothingToShow from "./NothingToShow";
import useNavigateTo from "../hooks/useNavigateTo";
import ProfileCard from "./ProfileCard";

interface IProps {
  cast: ICast[] | undefined;
  closeModal: () => void;
}

const EpisodeCastList: React.FC<IProps> = (props) => {
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  return (
    <View className="h-[285px]">
      {props.cast?.length! > 0 ? (
        <>
          <FlatList
            maxToRenderPerBatch={6}
            initialNumToRender={6}
            className="px-2 py-1"
            data={props.cast}
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
                      creditTitle: p.character,
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
            Guest appearances in this episode.
          </Text>
        </>
      ) : (
        <NothingToShow problemType="nothing" />
      )}
    </View>
  );
};

export default EpisodeCastList;
