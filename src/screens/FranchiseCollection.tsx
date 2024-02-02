import { View, Text, FlatList, ListRenderItemInfo } from "react-native";
import React, { useLayoutEffect, useCallback } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { CollectionPart, IUrlObject } from "../../types/typings";
import { useQuery } from "@tanstack/react-query";
import { fetchCollectionInfo } from "../utils/requests";
import { franchiseCollectionCacheConfig } from "../config/requestCacheConfig";
import { Colors } from "../utils/Colors";
import Loader from "../components/ui/Loader";
import NothingToShow from "../components/NothingToShow";
import { LinearGradient } from "expo-linear-gradient";
import CollectionPartCard from "../components/CollectionPartCard";
import useNavigateTo from "../hooks/useNavigateTo";
import useImgSettings from "../hooks/useImgSettings";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const FranchiseCollection: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  const collection = route.params as IUrlObject;

  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  // img setttings state
  const { allImgItemsSettings } = useImgSettings();

  const { data, status } = useQuery({
    queryKey: ["franchiseCollection", collection],
    queryFn: () => fetchCollectionInfo(collection),
    staleTime: franchiseCollectionCacheConfig.staleTime,
    cacheTime: franchiseCollectionCacheConfig.cacheTime,
  });

  const imgQuality = allImgItemsSettings
    ? allImgItemsSettings.thumbnail.value
    : "300";

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Collection",
    });
  }, []);

  const renderItem = useCallback(
    (partObj: ListRenderItemInfo<CollectionPart>) => (
      <CollectionPartCard
        collectionPart={partObj.item}
        order={partObj.index}
        navigateTo={navigateTo}
        imgThumbnailQuality={imgQuality}
      />
    ),
    []
  );

  return (
    <View className="flex-1 bg-secondary">
      {/* Loader */}
      {status === "loading" && (
        <View className="h-full z-40">
          <Loader
            loading={
              status === "loading" || allImgItemsSettings === undefined
                ? true
                : false
            }
          />
        </View>
      )}

      {status === "error" ? (
        <View className="flex-1">
          <NothingToShow
            title="Something went wrong while loading content"
            problemType="error"
          />
        </View>
      ) : (
        status === "success" &&
        allImgItemsSettings && (
          <View className="flex-1">
            <FlatList
              ListHeaderComponent={
                <View className="mb-5">
                  <LinearGradient
                    colors={[
                      "rgba(163, 163, 163, 0.5)",
                      "rgba(163, 163, 163, 0.3)",
                      Colors.black,
                    ]}
                    className="flex-row px-4 pt-4 justify-between items-start mb-5"
                  >
                    <View
                      className="border border-stone-700/40 rounded-lg overflow-hidden"
                      style={{ width: "35%", aspectRatio: 2 / 3 }}
                    >
                      <Image
                        source={
                          data.franchiseCollection.poster_path
                            ? {
                                uri: `https://image.tmdb.org/t/p/w${imgQuality}${data.franchiseCollection.poster_path}`,
                              }
                            : require("../../assets/images/placeholders/posterPlaceHolder.png")
                        }
                        contentFit="cover" //similar to web, "cover", "contain", etc.
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <View className="w-[59%] justify-between">
                      {/* Title */}
                      <Text
                        className="text-text_primary text-xl font-bold"
                        numberOfLines={3}
                      >
                        {data.franchiseCollection.name}
                      </Text>
                      <View className="mt-1 flex-row items-center space-x-2">
                        {/* <MaterialIcons
                          name="format-list-numbered"
                          size={16}
                          color={Colors.text_secondary}
                        /> */}

                        <Text className="text-text_secondary text-lg">
                          {`Includes ${data.franchiseCollection.parts.length} Parts`}
                        </Text>
                      </View>

                      {/* START DATE */}
                      <View className="mt-2 flex-row items-center space-x-2">
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color={Colors.text_secondary}
                        />
                        <Text className="text-text_tertiary font-semibold">
                          {data.franchiseCollection.parts[0].release_date
                            ? `${
                                String(
                                  data.franchiseCollection.parts[0].release_date
                                ).split("-")[0]
                              } - ${
                                String(
                                  data.franchiseCollection.parts[
                                    data.franchiseCollection.parts.length - 1
                                  ].release_date
                                ).split("-")[0]
                              }`
                            : "--"}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  {/* Overview */}
                  {data.franchiseCollection.overview ? (
                    <View className="mb-2 px-4 space-y-2">
                      <Text className="text-text_primary font-bold">
                        Overview:{" "}
                      </Text>
                      <Text className="text-text_tertiary text-sm">
                        {data.franchiseCollection.overview}
                      </Text>
                      <Text className=" text-text_dark text-sm">
                        {"Parts listed in order of release year."}
                      </Text>
                    </View>
                  ) : null}
                </View>
              }
              data={data.franchiseCollection.parts
                .filter(
                  (part) =>
                    Number(String(part.release_date).split("-")[0]) !== 0
                )
                .sort((a, b) => {
                  let first = Number(String(a.release_date).split("-")[0]);
                  let second = Number(String(b.release_date).split("-")[0]);
                  return first - second;
                })
                .concat(
                  data.franchiseCollection.parts.filter(
                    (part) =>
                      Number(String(part.release_date).split("-")[0]) === 0
                  )
                )}
              className=""
              keyExtractor={(part) => String(part.id)}
              maxToRenderPerBatch={4}
              initialNumToRender={4}
              ItemSeparatorComponent={() => (
                <View className="border border-b-stone-800 mx-10 my-4" />
              )}
              renderItem={(partObj) => renderItem(partObj)}
              ListFooterComponent={() => <View className="my-3" />}
            />
          </View>
        )
      )}
    </View>
  );
};

export default FranchiseCollection;
