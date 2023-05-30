import { View, FlatList } from "react-native";
import React from "react";
import { ICast } from "../../types/typings";
import EpisodeCastPersonCard from "./EpisodeCastPersonCard";
import { useNavigation } from "@react-navigation/native";
import NothingToShow from "./NothingToShow";

interface IProps {
  cast: ICast[] | undefined;
  closeModal: () => void;
}

const EpisodeCastList: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };
  return (
    <View className="h-[260px]">
      {props.cast?.length! > 0 ? (
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
      ) : (
        <NothingToShow problemType="nothing" />
      )}
    </View>
  );
};

export default EpisodeCastList;
