import React, { useCallback } from "react";
import { View, Text, FlatList, ListRenderItemInfo } from "react-native";
import {
  ICast,
  ICastAggregate,
  ICrew,
  ICrewAggregate,
} from "../../types/typings";
import useNavigateTo from "../hooks/useNavigateTo";
import ProfileCard from "./ProfileCard";
import { isICast, isICrew } from "../utils/helpers/helper";

interface IProps {
  cast: ICast[] | ICastAggregate[];
  directedBy: (ICrew | ICrewAggregate)[];
  title: string;
}

const Cast: React.FC<IProps> = (props) => {
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const renderCast = useCallback(
    (itemObj: ListRenderItemInfo<ICast | ICastAggregate>) => {
      const p = itemObj.item;

      return (
        <View className="mr-2">
          <ProfileCard
            creditPerson={{
              id: p.id,
              adult: p.adult,
              name: p.name,
              profile_path: p.profile_path,
              gender: p.gender,
              buttonTitle: "Actor",
              creditTitle: isICast(p) ? p.character : p.roles[0].character,
            }}
            navigateTo={navigateTo}
          />
        </View>
      );
    },
    []
  );

  return (
    <View className="flex-1 ">
      <Text className="ml-4 mb-4 font-semibold text-text_tertiary">
        {props.title}
      </Text>
      <FlatList
        horizontal
        initialNumToRender={5}
        data={props.cast as any}
        className=""
        keyExtractor={(person, i) => `${person.id}-${i}`}
        ListHeaderComponent={() => {
          return (
            <View className="flex-row ml-4">
              {props.directedBy.map((p, i) => {
                return (
                  <View className="mr-2" key={`${p.id}-${i}`}>
                    <ProfileCard
                      creditPerson={{
                        id: p.id,
                        adult: p.adult,
                        name: p.name,
                        profile_path: p.profile_path,
                        gender: p.gender,
                        buttonTitle: isICrew(p) ? p.job : p.jobs[0].job,
                        creditTitle:
                          p.department === "Writing"
                            ? "Writing department"
                            : "Crew member",
                      }}
                      navigateTo={navigateTo}
                    />
                  </View>
                );
              })}
            </View>
          );
        }}
        renderItem={renderCast}
      />
    </View>
  );
};

export default React.memo(Cast);
