import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import {
  ICountry,
  MediaTypes,
  WatchProvider,
  WatchProviderForCountry,
} from "../typings";
import useFetcher from "../hooks/useFetcher";
import { getWatchProviders } from "../utils/requests";
import CountriesDropdown from "./ui/CountriesDropdown";

interface IProps {
  mediaId: number;
  mediaType: MediaTypes;
}
// const countries = ["Egypt", "Canada", "Australia", "Ireland"];

const WatchProviders: React.FC<IProps> = ({ mediaId, mediaType }) => {
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

  const [currentCountry, setCurrentCountry] = useState<ICountry>({
    name: "United States",
    code: "US",
  });

  const setCountryHandler = (country: ICountry) => {
    setCurrentCountry(country);
  };

  const watchProviders: WatchProviderForCountry =
    // @ts-ignore
    screenProps && screenProps[currentCountry.code];

  console.log(watchProviders);
  return (
    <View className="flex-1 mt-8 space-y-10">
      <View className="w-full">
        <CountriesDropdown
          currentCountry={currentCountry}
          setCountryHandler={setCountryHandler}
        />
      </View>

      {watchProviders?.flatrate ? (
        <View>{renderFlatlist(watchProviders.flatrate, "Subscription")}</View>
      ) : null}

      {watchProviders?.buy ? (
        <View>{renderFlatlist(watchProviders.buy, "Buy")}</View>
      ) : null}

      {watchProviders?.ads ? (
        <View>{renderFlatlist(watchProviders.ads, "With Adverts")}</View>
      ) : null}

      {watchProviders?.free ? (
        <View>{renderFlatlist(watchProviders.free, "Free")}</View>
      ) : null}

      {!watchProviders && (
        <View className="flex-1 justify-center px-4">
          <Text className="text-stone-500 text-base text-center">
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
  availableType: "Subscription" | "Free" | "Buy" | "With Adverts"
) {
  return (
    <View
      className="space-y-3 py-4 mx-2 rounded-xl border-2"
      style={{ backgroundColor: "rgb(3, 20, 10)" }}
      // style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
    >
      <Text className="text-green-100 uppercase tracking-[3px] ml-4">
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
            <View className="space-y-4 items-start mr-5">
              <View className="rounded-2xl flex-1 justify-center overflow-hidden">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${p.logo_path}`,
                  }}
                  className="border-stone-500"
                  resizeMode="contain"
                  style={{ width: 65, height: 65 }}
                />
              </View>
              <Text
                key={p.provider_id}
                className="text-stone-400 text-xs w-[60px] text-center"
              >
                {p.provider_name}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
