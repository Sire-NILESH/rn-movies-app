import { View, Text, Pressable } from "react-native";
import React from "react";
import RenderProfileImage from "./RenderProfileImage";
import { getGender } from "../utils/helpers/helper";

interface IProps {
  creditPerson: {
    id: number;
    adult: boolean;
    name: string;
    profile_path: string | null;
    gender: 0 | 1 | 2 | 3 | null;
    buttonTitle: string;
    creditTitle: string;
  };
  navigateTo: (screen: string, paramOption: Object) => void;
  additionalOnpressHandler?: () => void;
}

const ProfileCard: React.FC<IProps> = (props) => {
  const p = props.creditPerson;
  return (
    <View className="bg-secondary border border-stone-900 space-y-3 w-36 rounded-lg justify-start overflow-hidden">
      <View className="h-full w-full items-center space-y-2 py-3 px-1">
        <View
          className="rounded-md justify-center"
          style={{
            width: 80,
            //   height: 80,
            aspectRatio: 1 / 1,
          }}
        >
          <RenderProfileImage
            imgPath={`https://image.tmdb.org/t/p/w200${p.profile_path}`}
          />
        </View>
        <View className="justify-start w-full items-center px-1">
          <Text
            numberOfLines={1}
            className="text-text_primary font-bold text-xs mt-1 text-center"
          >
            {p.name}
          </Text>

          <Text
            className="text-center text-text_dark text-xs font-bold"
            numberOfLines={2}
          >
            {/* {p.popularity.toFixed(2)}/100 */}
            <Text className="text-base">{p.adult ? "🔞 " : ""}</Text>
            {p.gender != null && getGender(p.gender)}
          </Text>

          <View className="mt-4 bg-neutral-700/60 h-8 rounded-full w-[100] overflow-hidden">
            <Pressable
              className="h-full w-full flex justify-center items-center"
              android_ripple={{ color: "#eee" }}
              onPress={() => {
                if (props.additionalOnpressHandler) {
                  props.additionalOnpressHandler();
                }

                props.navigateTo("Person Medias", {
                  title: p.name,
                  urlObject: {
                    name: p.name,
                    url: `/person/${p.id}`,
                    queryParams: {
                      language: "en-US",
                    },
                  },
                  currentMediaType: "movie",
                });
              }}
            >
              <Text
                className="text-text_primary text-xs font-bold"
                numberOfLines={1}
              >
                {props.creditPerson.buttonTitle}
              </Text>
            </Pressable>
          </View>

          <Text
            className="w-[100] mt-4 text-center text-text_tertiary text-xs font-bold"
            numberOfLines={2}
          >
            {p.creditTitle === "" ? "Cast member" : p.creditTitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProfileCard);
