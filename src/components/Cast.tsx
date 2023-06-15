import React from "react";
import { View, Text, FlatList } from "react-native";
import { ICast, ICrew } from "../../types/typings";
import useNavigateTo from "../hooks/useNavigateTo";
import ProfileCard from "./ProfileCard";

interface IProps {
  cast: ICast[];
  directedBy: ICrew[];
  title: string;
}

const Cast: React.FC<IProps> = (props) => {
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  return (
    <View className="flex-1 ">
      <Text className="ml-4 mb-4 font-semibold text-text_tertiary">
        {props.title}
      </Text>
      <FlatList
        horizontal
        initialNumToRender={5}
        data={props.cast}
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
                        buttonTitle: p.job,
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
        renderItem={(itemObj) => {
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
                  creditTitle: p.character,
                }}
                navigateTo={navigateTo}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default React.memo(Cast);
