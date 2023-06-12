import { View, Text, FlatList, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { IUrlObject } from "../../types/typings";
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
                      className="border border-stone-800 rounded-md overflow-hidden"
                      style={{ width: "33%", aspectRatio: 2 / 3 }}
                    >
                      <Image
                        source={
                          data.franchiseCollection.poster_path
                            ? {
                                uri: `https://image.tmdb.org/t/p/w${imgQuality}${data.franchiseCollection.poster_path}`,
                              }
                            : require("../../assets/images/placeholders/posterPlaceHolder.png")
                        }
                        resizeMode="cover" //similar to web, "cover", "contain", etc.
                        style={{ width: "100%", height: "100%" }}
                      ></Image>
                    </View>
                    <View className="w-[63%] justify-between">
                      {/* Title */}
                      <Text className="text-text_highLight text-2xl font-bold">
                        {data.franchiseCollection.name}
                      </Text>
                      <View className="mt-2">
                        <Text className="text-text_secondary text-lg font-semibold">
                          {`Total ${data.franchiseCollection.parts.length} parts`}
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
                    </View>
                  ) : null}
                </View>
              }
              data={data.franchiseCollection.parts}
              className=""
              keyExtractor={(part) => String(part.id)}
              maxToRenderPerBatch={4}
              initialNumToRender={4}
              ItemSeparatorComponent={() => (
                <View className="border border-b-stone-800 mx-10 my-4" />
              )}
              renderItem={(partObj) => (
                <CollectionPartCard
                  collectionPart={partObj.item}
                  order={partObj.index}
                  navigateTo={navigateTo}
                  imgThumbnailQuality={imgQuality}
                />
              )}
            />
          </View>
        )
      )}
    </View>
  );
};

export default FranchiseCollection;
