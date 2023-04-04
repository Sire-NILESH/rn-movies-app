// CompanyLogoBuilder

import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

// @ts-ignore
import ExpoFastImage from "expo-fast-image";

import { useNavigation } from "@react-navigation/native";
import {
  IProductionCompany,
  MediaTypes,
  Network,
} from "../../../types/typings";

interface IProps {
  company: IProductionCompany[] | Network[];
  //   navigateTo: (screen: string, paramOption: Object) => void;
  mediaType: MediaTypes;
}

const CompanyLogoBuilder: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  return (
    <View className="flex-1 space-y-4 mt-16">
      <Text className="ml-4 text-text_highLight">
        {props.mediaType === "movie" ? "Production" : "Networks"}
      </Text>
      <FlatList
        horizontal
        data={props.company}
        className="pl-4"
        keyExtractor={(producitonCompany) => String(producitonCompany.id)}
        renderItem={(itemObj) => {
          const c = itemObj.item;
          return (
            <View className="space-y-3 justify-start mr-5 rounded-md overflow-hidden">
              <Pressable
                className="h-full w-full"
                android_ripple={{ color: "#eee" }}
                onPress={() => {
                  navigateTo("Tiles", {
                    title: c.name,
                    genreId: 0.1111,
                    currentMediaType: props.mediaType,
                    productionCompanyId:
                      props.mediaType === "movie" ? c.id : undefined,
                    networkId: props.mediaType === "tv" ? c.id : undefined,
                  });
                }}
              >
                <View
                  className="bg-stone-300 rounded-md p-1 justify-center"
                  style={{
                    width: 140,
                    aspectRatio: 16 / 9,
                  }}
                >
                  <RenderLogo
                    id={c.id}
                    mediaType={props.mediaType}
                    imgPath={`https://image.tmdb.org/t/p/w500${c.logo_path}`}
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

  function setErrorhandler(state: boolean) {
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
          setFallbackImage(false);
          // console.log("onload event here", event);
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {fallbackImage && (
        <View className="absolute h-full w-full justify-center">
          <Text
            className="text-center text-[42px] font-bold text-text_darkest w-full"
            numberOfLines={0}
          >
            {companyName
              .split(" ")
              .map((c) => c[0].toUpperCase())
              .join(".")}
          </Text>
        </View>
      )}
    </>
  );
}
