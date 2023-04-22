import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
// @ts-ignore
import ExpoFastImage from "expo-fast-image";
import { useNavigation } from "@react-navigation/native";
import { ICast, ICreditPerson, ICredits, ICrew } from "../../types/typings";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";

interface IProps {
  cast: ICast[];
  directedBy: ICrew[];
  title: string;
}

const Cast: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  return (
    <View className="flex-1 ">
      <Text className="ml-4 mb-4 text-text_highLight uppercase tracking-[3px] text-xs">
        {props.title}
      </Text>
      <FlatList
        horizontal
        initialNumToRender={5}
        data={props.cast}
        className=" mx-2 rounded-lg"
        keyExtractor={(person) => String(person.id)}
        ListHeaderComponent={() => {
          return (
            <View className="flex-row px-1 mx-1 space-x-2">
              {props.directedBy.map((p) => {
                return (
                  <View
                    key={p.id + p.job}
                    className="bg-accent rounded-lg  overflow-hidden"
                  >
                    <Pressable
                      className="pt-3 h-full w-full items-center space-y-2 px-1"
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
                      <View
                        className="rounded-md justify-center"
                        style={{
                          width: 80,
                          //   height: 80,
                          aspectRatio: 1 / 1,
                        }}
                      >
                        <RenderProfile
                          id={p.id}
                          name={p.name}
                          imgPath={`https://image.tmdb.org/t/p/w100${p.profile_path}`}
                        />
                      </View>
                      <View className="justify-start">
                        <Text
                          key={p.id}
                          numberOfLines={1}
                          className="text-text_dark text-xs mt-1 text-center w-[100]"
                        >
                          {p.name}
                        </Text>
                        <Text
                          className="w-[100] mt-1 text-center text-text_highLight text-xs"
                          numberOfLines={2}
                        >
                          {p.job}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          );
        }}
        // contentContainerStyle={{
        //   alignItems: "center",
        // }}
        renderItem={(itemObj) => {
          const p = itemObj.item;

          return (
            <View className="bg-neutral-900/80 space-y-3 mr-2 rounded-lg justify-start overflow-hidden">
              <Pressable
                className="h-full w-full items-center space-y-2 py-3 px-1"
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

                  // /person/1253360

                  // navigateTo("Tiles", {
                  //   title: p.name,
                  //   urlObject: {
                  //     name: p.name,
                  //     url: "/search/person",
                  //     queryParams: {
                  //       query: p.name,
                  //       language: "en-US",
                  //     },
                  //   },
                  //   currentMediaType: "movie",
                  // });

                  // navigateTo("Person Medias", {
                  //   title: p.name,
                  //   urlObject: {
                  //     name: p.name,
                  //     url: `/discover`,
                  //     queryParams: {
                  //       with_people: p.id,
                  //       language: "en-US",
                  //     },
                  //   },
                  //   currentMediaType: "movie",
                  // });

                  // navigateTo("Tiles", {
                  //   title: p.name,
                  //   playlist: {
                  //     name: p.name,
                  //     url: `/discover/movie`,
                  //     queryParams: {
                  //       with_people: p.id,
                  //       language: "en-US",
                  //     },
                  //   },
                  //   currentMediaType: "movie",
                  // });
                }}
              >
                {/* <Text
                  key={p.id}
                  numberOfLines={1}
                  className="text-text_dark text-xs mb-1 text-center w-[100]"
                >
                  {p.name}
                </Text> */}
                <View
                  className="rounded-md justify-center"
                  style={{
                    width: 80,
                    //   height: 80,
                    aspectRatio: 1 / 1,
                  }}
                >
                  <RenderProfile
                    id={p.id}
                    name={p.name}
                    imgPath={`https://image.tmdb.org/t/p/w200${p.profile_path}`}
                  />
                </View>
                <View className="justify-start">
                  <Text
                    key={p.id}
                    numberOfLines={1}
                    className="text-text_dark text-xs mt-1 text-center w-[100]"
                  >
                    {p.name}
                  </Text>
                  {/* <Text className="text-center text-text_highLight text-xs">
                  as
                </Text> */}
                  <Text
                    className="w-[100] mt-1 text-center text-text_highLight text-xs"
                    numberOfLines={2}
                  >
                    {p.character}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Cast;

function RenderProfile({
  id,
  name,
  imgPath,
}: {
  id: number;
  imgPath: string;
  name: string;
}) {
  const [fallbackImage, setFallbackImage] = useState<boolean>(true);

  function setFallbackImagehandler(state: boolean) {
    setFallbackImage(state);
  }

  return (
    <View className="h-full w-full rounded-xl overflow-hidden border-2 border-stone-800/40">
      <ExpoFastImage
        uri={imgPath}
        cacheKey={`${id}`}
        resizeMode={"cover"}
        className="border-2 border-green-500 relative"
        onLoad={() => {
          setFallbackImagehandler(false);
          // console.log("onload event here", event);
        }}
        style={{
          width: "100%",
          height: "100%",
          // borderRadius: 9999,
        }}
      />
      {fallbackImage && (
        <View className="absolute h-full w-full justify-center items-center">
          <Ionicons name="person" color={Colors.green[900]} size={54} />
        </View>
      )}
    </View>
  );
}
