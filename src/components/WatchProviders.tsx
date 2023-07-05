import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState, useMemo } from "react";
import {
  IAllWatchProviderData,
  ICountry,
  MediaTypes,
  WatchProvider,
  WatchProviderForCountry,
} from "../../types/typings";
import CountriesDropdown from "./ui/CountriesDropdown";
import ImageCached from "./ui/ImageCached";
import { useDefaultRegionHooks } from "../hooks/reduxHooks";
import useNavigateTo from "../hooks/useNavigateTo";

interface IProps {
  mediaId: number;
  mediaType: MediaTypes;
  mediaTitle: string;
  watchProvidersData: IAllWatchProviderData;
  imgQuality?: string;
}

const WatchProviders: React.FC<IProps> = ({
  watchProvidersData,
  mediaTitle,
  imgQuality,
}) => {
  const { defaultRegion } = useDefaultRegionHooks();

  const [currentCountry, setCurrentCountry] = useState<ICountry>(defaultRegion);
  const setCountryHandler = (country: ICountry) => {
    setCurrentCountry(country);
  };

  const watchProviders: WatchProviderForCountry = useMemo(
    () => watchProvidersData[currentCountry.code],
    [currentCountry]
  );

  const providerImgQuality = imgQuality ? imgQuality : "200";

  // So every one of them wont have to calculate them separately.
  const { navigateTo } = useNavigateTo();

  return (
    <View className="flex-1 mt-10 space-y-5">
      <View
        className="flex-row items-center justify-between px-4 mt-2 mx-2 rounded-xl"
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
            currentCountry
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
            currentCountry
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
            currentCountry
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
            currentCountry
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
            currentCountry
          )}
        </View>
      ) : null}

      {!watchProviders && (
        <View
          className="items-center justify-center px-4 mx-2 rounded-xl h-[150]"
          // style={{ backgroundColor: "rgb(16, 16, 16)" }}
        >
          <Text className="w-[60%] text-text_secondary text-base text-center font-bold mb-2">
            No Providers...
          </Text>
          <Text
            className="w-[85%] text-text_dark text-xs text-center"
            style={{ lineHeight: 20 }}
          >
            {` Currently no known providers for '${mediaTitle}' is available in ${currentCountry.name} region`}
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
    <View className="space-y-3 py-4 mx-2 rounded-xl bg-accent border border-stone-800">
      <Text className="font-bold text-text_highLight uppercase tracking-[2px] ml-4">
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
                className="p-1 space-y-1"
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
                  className="rounded-2xl justify-center overflow-hidden border border-stone-800"
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
