import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

// @ts-ignore
import ExpoFastImage from "expo-fast-image";

import { useNavigation } from "@react-navigation/native";
import { ICast, ICreditPerson, ICrew } from "../../types/typings";
import { Colors } from "../utils/Colors";

interface IProps {
  personList: ICreditPerson[];
  title: "Cast" | "Directed by";
  //   cast: ICast[] | ICrew[];
  //   cast: ICast[];
}

const Cast: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  return (
    <View className="flex-1 space-y-4 mt-3">
      <Text className="ml-4 text-text_highLight text-base">{props.title}</Text>
      <FlatList
        horizontal
        data={props.personList}
        className="pl-4"
        keyExtractor={(person) => String(person.id)}
        renderItem={(itemObj) => {
          const p = itemObj.item;

          return (
            <View className="space-y-3 justify-start mr-1 rounded-md overflow-hidden">
              <Pressable
                className="h-full w-full items-center justify-center"
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
                    imgPath={`https://image.tmdb.org/t/p/w500${p.profile_path}`}
                  />
                </View>
                <Text
                  key={p.id}
                  numberOfLines={1}
                  className="text-text_dark text-xs mt-1 text-center w-[100]"
                >
                  {p.name}
                </Text>
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
    <View className="h-full w-full rounded-full border-2 border-green-800">
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
          borderRadius: 9999,
        }}
      />
      {fallbackImage && (
        <View className="absolute h-full w-full justify-center">
          <Text
            className="text-center text-[36px] font-bold text-text_darkest w-full px-2"
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>
      )}
    </View>
  );
}
