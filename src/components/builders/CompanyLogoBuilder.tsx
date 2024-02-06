import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  IProductionCompany,
  MediaTypes,
  Network,
} from "../../../types/typings";
import { Colors } from "../../utils/Colors";
import useNavigateTo from "../../hooks/useNavigateTo";
import { Image } from "expo-image";

interface IProps {
  company: IProductionCompany[] | Network[];
  mediaType: MediaTypes;
  imgQuality?: string;
}

const CompanyLogoBuilder: React.FC<IProps> = (props) => {
  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  const logoImgQuality = props.imgQuality ? props.imgQuality : "300";

  const baseImgUrl = `https://image.tmdb.org/t/p/w${logoImgQuality}`;

  const renderItem = useCallback(
    (itemObj: ListRenderItemInfo<IProductionCompany>) => {
      const c = itemObj.item;
      // console.log(c.name, c.id);
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
                    adult: true,
                  },
                },
                currentMediaType: props.mediaType,
              });
            }}
          >
            <View
              className="bg-stone-50 rounded-md p-1 justify-center"
              style={{
                width: 140,
                aspectRatio: 16 / 9,
              }}
            >
              <RenderLogo
                id={c.id}
                mediaType={props.mediaType}
                imgPath={baseImgUrl + c.logo_path}
              />
            </View>

            <Text
              className="text-text_dark text-xs font-semibold text-center mt-2 w-[140]"
              numberOfLines={2}
            >
              {c.name}
            </Text>

            {/* <Text
            key={c.id}
            className="text-text_dark text-xs mt-1 text-center w-[140]"
          >
            {c.name}
          </Text> */}
          </Pressable>
        </View>
      );
    },
    []
  );

  return (
    <View className="flex-1 space-y-4 mt-8">
      <Text className="ml-4 font-semibold text-text_tertiary">
        {props.mediaType === "movie" ? "Production Houses" : "TV Networks"}
      </Text>
      <FlatList
        horizontal
        data={props.company}
        className="pl-4"
        keyExtractor={(producitonCompany) => String(producitonCompany.id)}
        renderItem={(itemObj) => renderItem(itemObj)}
      />
    </View>
  );
};

export default CompanyLogoBuilder;

function RenderLogo({
  id,
  imgPath,
  mediaType,
}: {
  id: number;
  imgPath: string;
  mediaType: MediaTypes;
}) {
  const [fallbackImage, setFallbackImage] = useState<boolean>(true);

  function setFallbackImagehandler(state: boolean) {
    setFallbackImage(state);
  }

  return (
    <>
      <Image
        source={{ uri: imgPath }}
        key={`${id}-${mediaType === "movie" ? "production" : "network"}`}
        contentFit={"contain"}
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
          {mediaType === "movie" ? (
            <Ionicons name="film" color={Colors.green[900]} size={54} />
          ) : (
            <Ionicons name="tv" color={Colors.green[900]} size={54} />
          )}
        </View>
      )}
    </>
  );
}
