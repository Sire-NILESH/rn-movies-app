import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { CollectionPart, TImgQualityValues } from "../../types/typings";
import { Colors } from "../utils/Colors";
import { idToGenresMapped } from "../utils/helpers/helper";
import ClipboardableText from "./ui/ClipboardableText";
import ThemeCircleButton from "./ui/ThemeCircleButton";

interface IProps {
  collectionPart: CollectionPart;
  order: number;
  navigateTo: (screen: string, paramOption: Object) => void;
  imgThumbnailQuality: TImgQualityValues;
}

const CollectionPartCard: React.FC<IProps> = ({
  collectionPart,
  order,
  navigateTo,
  imgThumbnailQuality,
}) => {
  const imgQuality = imgThumbnailQuality ? imgThumbnailQuality : "300";

  return (
    <View className="my-3 mx-2">
      {/* Collection Card */}
      <View className="flex-row items-stretch space-x-5">
        {/* IMAGE CARD */}
        <View
          className="ml-2 rounded-md border border-stone-800 overflow-hidden"
          style={{ width: "33%", aspectRatio: 2 / 3 }}
        >
          <Image
            source={
              collectionPart.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w${imgQuality}${collectionPart.poster_path}`,
                  }
                : require("../../assets/images/placeholders/posterPlaceHolder.png")
            }
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>

        {/* Text content */}
        <View className="w-[55%] flex-col justify-between">
          <View>
            {/* Title and genres */}

            <ClipboardableText
              styleClassName="w-[97%] text-base font-semibold text-text_tertiary"
              numberOfLines={2}
              content={`${order + 1} : ${collectionPart.title}`}
              clipboardText={collectionPart.title}
            />

            <View className="flex-row items-start space-x-2 mt-1">
              <Text
                className="text-text_dark text-xs"
                style={{ lineHeight: 20 }}
                numberOfLines={1}
              >
                {collectionPart.genre_ids
                  .map((g) => {
                    // @ts-ignore
                    return idToGenresMapped[String(g)];
                  })
                  .join(", ")}
                {". "}
              </Text>
            </View>

            <View className="space-y-2">
              {/* Stats */}
              <View className="mt-2 space-y-2 items-start">
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="star" size={16} color={Colors.yellow[300]} />
                  <Text className=" text-text_secondary tracking-widest">
                    <Text
                      className="font-semibold"
                      style={{
                        color:
                          collectionPart.vote_average > 4.0
                            ? Colors.green[400]
                            : Colors.red[400],
                      }}
                    >
                      {collectionPart.vote_average.toFixed(2)}
                    </Text>
                    /10
                  </Text>
                </View>
              </View>

              {/* Year */}
              <View className="flex-row items-center space-x-2">
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={Colors.text_secondary}
                />
                <Text className="text-text_tertiary font-semibold">
                  {collectionPart.release_date
                    ? `${String(collectionPart.release_date).split("-")[0]}`
                    : "--"}
                </Text>
              </View>

              {/* Part */}
              {/* <Text className="text-sm text-text_tertiary font-semibold">
                {`Part ${order + 1} `}{" "}
              </Text> */}
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row items-center w-full pt-3">
            <ThemeCircleButton
              text={"More info"}
              onPressHandler={() => {
                navigateTo("More Info", {
                  mediaType: "movie",
                  media: collectionPart,
                });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CollectionPartCard;
