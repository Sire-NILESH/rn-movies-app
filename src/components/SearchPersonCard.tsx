import { View, Text } from "react-native";
import React from "react";
import { ISearchPerson } from "../../types/typings";
import RenderProfileImage from "./RenderProfileImage";
import ThemeCircleButton from "./ui/ThemeCircleButton";

interface IProps {
  person: ISearchPerson;
  navigateTo: (screen: string, paramOption: Object) => void;
}

const SearchPersonCard: React.FC<IProps> = ({ person, navigateTo }) => {
  // const imgQuality = quality ? quality : "300";

  return (
    <View className="bg-secondary py-2 rounded-lg h-48">
      {/* Divider */}
      {/* <View className="w-[90%] bg-tertiary h-[1] mt-4" /> */}

      {/* Collection Card */}
      <View className="flex-row items-start space-x-5">
        {/* IMAGE CARD */}
        <View className="mt-2" style={{ width: 100, aspectRatio: 2 / 3 }}>
          <RenderProfileImage
            imgPath={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
          />
        </View>

        <View className="mt-2 w-[60%] justify-between">
          {/* Text data */}
          <View className="space-y-2">
            <Text className="font-semibold text-text_tertiary text-lg">
              {`${person.adult ? "🔞 " : ""}${person.name}`}
            </Text>
            <Text className="font-semibold text-text_tertiary">
              <Text className="font-normal text-text_dark">
                {"Department :"}
              </Text>{" "}
              {person.known_for_department}
            </Text>
            <View className="space-y-2">
              <Text
                className="text-text_tertiary text-xs"
                style={{ lineHeight: 20 }}
                numberOfLines={2}
              >
                {person.known_for
                  .map((m, i) => {
                    return m.title ? m.title : m.name;
                  })
                  .join(", ")}
                {". "}
              </Text>
            </View>
          </View>

          <View className="mt-4 flex-1 justify-end">
            <ThemeCircleButton
              text={"More info"}
              onPressHandler={() => {
                navigateTo("Person Medias", {
                  title: person.name,
                  urlObject: {
                    name: person.name,
                    url: `/person/${person.id}`,
                    queryParams: {
                      language: "en-US",
                    },
                  },
                  currentMediaType: "multi",
                });
              }}
            />
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="w-[100%] bg-tertiary h-[1] mt-4" />
    </View>
  );
};

export default SearchPersonCard;
