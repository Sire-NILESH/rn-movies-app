import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import ExpoFastImage from "expo-fast-image";

import {
  IProductionCompany,
  MediaTypes,
  Network,
} from "../../../types/typings";
import { Colors } from "../../utils/Colors";

interface IProps {
  company: IProductionCompany[] | Network[];
  //   navigateTo: (screen: string, paramOption: Object) => void;
  mediaType: MediaTypes;
  imgQuality?: string;
}

const CompanyLogoBuilder: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  const logoImgQuality = props.imgQuality ? props.imgQuality : "300";

  const baseImgUrl = `https://image.tmdb.org/t/p/w${logoImgQuality}`;

  // console.log("logo quality", logoImgQuality);

  return (
    <View className="flex-1 space-y-4 mt-3">
      <Text className="ml-4 text-text_highLight uppercase tracking-[3px] text-xs">
        {props.mediaType === "movie" ? "Producers" : "TV Networks"}
      </Text>
      <FlatList
        horizontal
        data={props.company}
        className="pl-4"
        keyExtractor={(producitonCompany) => String(producitonCompany.id)}
        renderItem={(itemObj) => {
          const c = itemObj.item;
          console.log(c.name, c.id);
          return (
            <View className="space-y-3 justify-start mr-5 rounded-md overflow-hidden">
              <Pressable
                className="h-full w-full"
                android_ripple={{ color: "#eee" }}
                onPress={() => {
                  const companyType =
                    props.mediaType === "movie"
                      ? {
                          queryParam: "with_companies",
                          queryParamValue: c.id,
                        }
                      : {
                          queryParam: "with_networks",
                          queryParamValue: c.id,
                        };

                  navigateTo("Tiles", {
                    title: c.name,
                    // genreId: 0.1111,
                    playlist: {
                      name: c.name,
                      url: `/discover/${props.mediaType}`,
                      queryParams: {
                        [companyType.queryParam]: companyType.queryParamValue,
                        language: "en-US",
                      },
                    },
                    currentMediaType: props.mediaType,
                  });
                }}
              >
                <View
                  className="bg-green-100 rounded-md p-1 justify-center"
                  style={{
                    width: 140,
                    aspectRatio: 16 / 9,
                  }}
                >
                  <RenderLogo
                    id={c.id}
                    mediaType={props.mediaType}
                    imgPath={baseImgUrl + c.logo_path}
                    companyName={c.name}
                  />
                </View>
                <Text
                  key={c.id}
                  className="text-text_dark text-xs mt-1 text-center w-[140]"
                >
                  {c.name}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CompanyLogoBuilder;

function RenderLogo({
  id,
  imgPath,
  companyName,
  mediaType,
}: {
  id: number;
  imgPath: string;
  companyName: string;
  mediaType: MediaTypes;
}) {
  const [fallbackImage, setFallbackImage] = useState<boolean>(true);

  function setFallbackImagehandler(state: boolean) {
    setFallbackImage(state);
  }

  return (
    <>
      <ExpoFastImage
        uri={imgPath}
        cacheKey={`${id}-${mediaType === "movie" ? "production" : "network"}`}
        resizeMode={"contain"}
        className="border-stone-500 relative"
        onLoad={() => {
          setFallbackImagehandler(false);
          // console.log("onload event here", event);
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {fallbackImage && (
        <View className="absolute h-full w-full justify-center items-center">
          {/* <Text
            className="text-center text-[36px] font-bold text-text_darkest w-full px-2"
            numberOfLines={1}
          >
            {companyName
              .split(" ")
              .map((c) => c[0].toUpperCase())
              .join(".")}
          </Text> */}

          {mediaType === "movie" ? (
            <Ionicons name="film-outline" color={Colors.green[900]} size={54} />
          ) : (
            <Ionicons name="tv-outline" color={Colors.green[900]} size={54} />
          )}
        </View>
      )}
    </>
  );
}
