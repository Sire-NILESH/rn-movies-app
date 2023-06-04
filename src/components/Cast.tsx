import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ICast, ICrew } from "../../types/typings";
import { getGender } from "../utils/helpers/helper";
import RenderProfileImage from "./RenderProfileImage";
import useNavigateTo from "../hooks/useNavigateTo";

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
            <View className="flex-row px-1 ml-2 space-x-1">
              {props.directedBy.map((p, i) => {
                return (
                  <View
                    key={`${p.id}-${p.job}-${i}`}
                    className="rounded-lg border border-stone-800 overflow-hidden mr-1 w-36"
                  >
                    <View className="pt-3 h-full w-full items-center space-y-2 px-1">
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
                          key={p.id}
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
                          <Text className="text-base">
                            {p.adult ? "🔞 " : ""}
                          </Text>
                          {p.gender != null && getGender(p.gender)}
                        </Text>

                        <View className="h-8 min-w-[100] mt-4 bg-neutral-700/60 rounded-full overflow-hidden">
                          <Pressable
                            className="h-full flex justify-center items-center px-2"
                            android_ripple={{ color: "#eee" }}
                            onPress={() => {
                              navigateTo("Person Medias", {
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
                              {p.job}
                            </Text>
                          </Pressable>
                        </View>

                        <Text
                          className="w-[100] mt-4 text-center text-text_tertiary text-xs font-bold"
                          numberOfLines={2}
                        >
                          {/* {  "Crew member"} */}
                          {p.department === "Writing"
                            ? "Writing department"
                            : "Crew member"}
                        </Text>

                        {/* <Text
                          className="text-center mt-4 text-text_tertiary  text-xs font-bold"
                          numberOfLines={2}
                          style={{ lineHeight: 18 }}
                        >
                          {`TMDB rating\n ${p.popularity.toFixed(2)}/100`}
                        </Text> */}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        }}
        renderItem={(itemObj) => {
          const p = itemObj.item;

          return (
            <View className="border border-stone-800 space-y-3 mr-2 w-36 rounded-lg justify-start overflow-hidden">
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
                    key={p.id}
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
                        navigateTo("Person Medias", {
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
                        numberOfLines={2}
                      >
                        {/* {p.known_for_department} */}
                        Actor
                      </Text>
                    </Pressable>
                  </View>

                  <Text
                    className="w-[100] mt-4 text-center text-text_tertiary text-xs font-bold"
                    numberOfLines={2}
                  >
                    {p.character}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default React.memo(Cast);
