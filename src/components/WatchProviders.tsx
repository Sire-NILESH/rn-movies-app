import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import {
  ICountry,
  MediaTypes,
  WatchProvider,
  WatchProviderForCountry,
} from "../../types/typings";
import useFetcher from "../hooks/useFetcher";
import { getWatchProviders } from "../utils/requests";
import CountriesDropdown from "./ui/CountriesDropdown";
import ImageCached from "./ui/ImageCached";
import { useDefaultRegionHooks } from "../hooks/reduxHooks";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  mediaId: number;
  mediaType: MediaTypes;
  imgQuality?: string;
}

const WatchProviders: React.FC<IProps> = ({
  mediaId,
  mediaType,
  imgQuality,
}) => {
  const {
    screenProps,
    loadingProps,
    errorLoadingProps,
  }: {
    // screenProps: WatchProviderForCountry;
    screenProps: [];
    loadingProps: boolean;
    errorLoadingProps: Error | null;
  } = useFetcher(getWatchProviders, [mediaId, mediaType]);

  const { defaultRegion } = useDefaultRegionHooks();

  const [currentCountry, setCurrentCountry] = useState<ICountry>(defaultRegion);
  const setCountryHandler = (country: ICountry) => {
    setCurrentCountry(country);
  };

  const navigation = useNavigation();

  const watchProviders: WatchProviderForCountry =
    // @ts-ignore
    screenProps && screenProps[currentCountry.code];

  const providerImgQuality = imgQuality ? imgQuality : "200";

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  return (
    <View className="flex-1 mt-10 space-y-5">
      <View
        className="flex-row  items-center justify-between px-4 mt-2 mx-2 bg-accent rounded-xl"
        // style={{ backgroundColor: "rgb(4, 20, 10)" }}
        style={{ backgroundColor: "rgb(4, 20, 10)" }}
      >
        <Text className="text-text_tertiary mx-4">
          Watch providers for this in{" "}
        </Text>

        <CountriesDropdown
          currentCountry={currentCountry}
          setCountryHandler={setCountryHandler}
        />
      </View>

      {watchProviders?.flatrate ? (
        <View>
          {renderFlatlist(
            watchProviders.flatrate,
            "Subscription",
            providerImgQuality,
            navigateTo,
            defaultRegion
          )}
        </View>
      ) : null}

      {watchProviders?.rent ? (
        <View>
          {renderFlatlist(
            watchProviders.rent,
            "Rent",
            providerImgQuality,
            navigateTo,
            defaultRegion
          )}
        </View>
      ) : null}

      {watchProviders?.buy ? (
        <View>
          {renderFlatlist(
            watchProviders.buy,
            "Buy",
            providerImgQuality,
            navigateTo,
            defaultRegion
          )}
        </View>
      ) : null}

      {watchProviders?.ads ? (
        <View>
          {renderFlatlist(
            watchProviders.ads,
            "With Adverts",
            providerImgQuality,
            navigateTo,
            defaultRegion
          )}
        </View>
      ) : null}

      {watchProviders?.free ? (
        <View>
          {renderFlatlist(
            watchProviders.free,
            "Free",
            providerImgQuality,
            navigateTo,
            defaultRegion
          )}
        </View>
      ) : null}

      {errorLoadingProps && (
        <View className="flex-1 justify-center px-4">
          <Text className="text-text_dark text-base text-center">
            Something went wrong while finding providers for this content in{" "}
            {currentCountry.name}
          </Text>
        </View>
      )}
      {!watchProviders && !errorLoadingProps && (
        <View className="flex-1 justify-center px-4">
          <Text className="text-text_dark text-base text-center">
            Currently no providers for this content in {currentCountry.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default WatchProviders;

function renderFlatlist(
  providerType: WatchProvider[],
  availableType: "Subscription" | "Rent" | "Free" | "Buy" | "With Adverts",
  providerImgQuality: string,
  navigateTo: (screen: string, paramOption: Object) => void,
  watch_region: ICountry
) {
  const baseImgUrl = `https://image.tmdb.org/t/p/w${providerImgQuality}`;

  return (
    <View className="space-y-3 py-4 mx-2 rounded-xl border-2 bg-accent">
      <Text className="text-text_highLight uppercase tracking-[3px] ml-4">
        {availableType}
      </Text>
      <FlatList
        horizontal
        data={providerType}
        keyExtractor={(provider) => String(provider.provider_id)}
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          marginLeft: 16,
        }}
        renderItem={(itemObj) => {
          const p = itemObj.item;
          return (
            <View className="space-y-4 items-start mr-5 overflow-hidden rounded-md">
              <Pressable
                className="p-1"
                android_ripple={{ color: "#eee" }}
                onPress={() => {
                  navigateTo("Watch Provider", {
                    title: `${p.provider_name} (${
                      (watch_region.name, watch_region.code)
                    })`,
                    urlObject: {
                      name: `${p.provider_name} (${watch_region.name}, ${watch_region.code})`,
                      url: `/discover`,
                      queryParams: {
                        language: "en-US",
                        with_watch_providers: String(p.provider_id),
                        watch_region: watch_region.code,
                      },
                    },
                    currentMediaType: "movie",
                  });
                }}
              >
                <View
                  className="rounded-2xl justify-center overflow-hidden"
                  style={{
                    width: 65,
                    aspectRatio: 1 / 1,
                  }}
                >
                  <ImageCached
                    imageURL={baseImgUrl + p.logo_path}
                    cacheKey={p.provider_id + "watchProvider"}
                  />
                </View>
                <Text
                  key={p.provider_id}
                  className="text-text_dark text-xs w-[65px] text-center"
                >
                  {p.provider_name}
                  {/* {console.log(p.provider_name + " : " + p.provider_id)} */}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}
