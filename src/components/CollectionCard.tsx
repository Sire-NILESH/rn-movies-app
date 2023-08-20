import { View, Text, Image } from "react-native";
import React from "react";
import {
  IBelongsToCollection,
  IGenre,
  TImgQualityValues,
} from "../../types/typings";
import useNavigateTo from "../hooks/useNavigateTo";
import ThemeCircleButton from "./ui/ThemeCircleButton";

interface IProps {
  collection: IBelongsToCollection;
  genres: IGenre[];
  imgThumbnailQuality: TImgQualityValues;
}

const CollectionCard: React.FC<IProps> = ({
  collection,
  genres,
  imgThumbnailQuality,
}) => {
  const { navigateTo } = useNavigateTo();

  const imgQuality = imgThumbnailQuality ? imgThumbnailQuality : "300";

  return (
    <View className="flex-1 space-y-4 mt-8 mx-2 px-2">
      {/* Divider */}
      {/* <View className="w-[90%] border border-tertiary" /> */}
      <Text className="ml-4 font-semibold text-text_tertiary">
        {"Collection"}
      </Text>

      {/* Collection Card */}
      <View className="flex-row items-start space-x-5">
        {/* IMAGE CARD */}
        <View
          className="rounded-lg border border-stone-800 overflow-hidden"
          style={{ width: "33%", aspectRatio: 2 / 3 }}
        >
          <Image
            source={
              collection.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w${imgQuality}${collection.poster_path}`,
                  }
                : require("../../assets/images/placeholders/posterPlaceHolder.png")
            }
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>

        <View className="mt-2 w-[60%] justify-between">
          {/* Text data */}
          <View className="">
            <Text className="font-semibold text-text_tertiary text-sm">
              {collection.name}
            </Text>
            <View className="mt-1 flex-row items-start space-x-2">
              <Text
                className="text-text_dark text-xs"
                style={{ lineHeight: 20 }}
              >
                {genres
                  .map((g, i) => {
                    return g.name;
                  })
                  .join(", ")}
                {". "}
              </Text>
            </View>
          </View>

          <View className="w-28 mt-4">
            <ThemeCircleButton
              text={"More info"}
              onPressHandler={() => {
                navigateTo("FranchiseCollection", {
                  name: "Collection",
                  url: `/collection/${collection.id}`,
                  queryParams: {
                    language: "en-US",
                  },
                });
              }}
            />
          </View>
          {/* </View> */}
        </View>
      </View>

      {/* Divider */}
      {/* <View className="w-[90%] border border-tertiary" /> */}
    </View>
  );
};

export default CollectionCard;
