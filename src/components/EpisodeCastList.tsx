import { View, FlatList, Text } from "react-native";
import React from "react";
import { ICast } from "../../types/typings";
import EpisodeCastPersonCard from "./EpisodeCastPersonCard";
import NothingToShow from "./NothingToShow";
import useNavigateTo from "../hooks/useNavigateTo";

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
            renderItem={(personObj) => (
              <View className="ml-1 bg-secondary rounded-md">
                <EpisodeCastPersonCard
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
