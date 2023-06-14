import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { IPersonInfo, IUrlObject, TGenderCodes } from "../../../types/typings";
import RenderProfileImage from "./../RenderProfileImage";
import {
  calculateAge,
  dateFormatter,
  getGender,
} from "../../utils/helpers/helper";
import * as Linking from "expo-linking";
import { useQuery } from "@tanstack/react-query";
import { personScreenCacheConfig } from "../../config/requestCacheConfig";
import { getPersonInfo } from "../../utils/requests";
import NothingToShow from "../NothingToShow";
import Loader from "./Loader";

interface IProps {
  isVisible: boolean;
  toggleModalHandler: () => void;
  personUrlObject: IUrlObject;
}

const PersonDetailModal: React.FC<IProps> = (props) => {
  const { data: personInfo, status: personInfoStatus } = useQuery<IPersonInfo>({
    queryKey: ["personInfo", props.personUrlObject],
    queryFn: () => getPersonInfo(props.personUrlObject),
    staleTime: personScreenCacheConfig.staleTime,
    cacheTime: personScreenCacheConfig.cacheTime,
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      className="items-center justify-center"
    >
      <View className="absolute my-[40%] mx-[5%] w-[90%] h-[75%] bg-zinc-900 rounded-xl border border-neutral-700/60 [elevation:10] overflow-hidden">
        {/* HEADER */}
        <View className="mt-1 flex-row items-center justify-between h-[42] px-[20]">
          {/* Header Title */}
          <View className="flex-row items-center space-x-2">
            <Text
              className="text-text_highLight text-lg font-bold"
              numberOfLines={1}
            >
              {"Personal info"}
            </Text>
          </View>
          {/* Header Buttons */}
          <View className="flex-row justify-between ">
            <View className="rounded-full overflow-hidden">
              <Pressable
                onPress={props.toggleModalHandler}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <Ionicons name="close" color={Colors.gray[100]} size={24} />
              </Pressable>
            </View>
          </View>
        </View>

        {personInfoStatus === "loading" ? (
          //  Loader
          <Loader loading={personInfoStatus === "loading" ? true : false} />
        ) : null}

        {/* BODY */}
        {personInfoStatus === "success" ? (
          <ScrollView className="mb-4 mx-4">
            {/* Person Card */}
            <View className="flex-row items-start space-x-5">
              {/* IMAGE CARD */}
              <View
                className="rounded-xl border border-stone-800 overflow-hidden"
                style={{ width: "33%", aspectRatio: 2 / 3 }}
              >
                <RenderProfileImage
                  imgPath={`https://image.tmdb.org/t/p/w185${personInfo.profile_path}`}
                />
              </View>

              <View className="mt-2 w-[60%] flex-col justify-between">
                {/* Text data */}
                <View className="space-y-2">
                  <Text className="text-xl text-text_highLight font-bold">
                    {personInfo.name}
                  </Text>

                  <View>
                    <RenderRow
                      text1="Gender"
                      text2={`${personInfo.adult ? "🔞 " : ""} ${
                        personInfo.gender != null &&
                        getGender(personInfo.gender as TGenderCodes)
                      }`}
                    />
                  </View>

                  <View>
                    <RenderRow
                      text1="Age"
                      text2={String(
                        calculateAge(personInfo.birthday, personInfo.deathday)
                      )}
                    />
                  </View>
                </View>

                <View className="flex-1 justify-end">
                  {personInfo.imdb_id ? (
                    <View className="mt-3 w-40 flex-row gap-2 items-center justify-center">
                      <FontAwesome
                        name={"imdb"}
                        size={36}
                        color={Colors.yellow[400]}
                      />
                      <Text className="font-bold text-text_highLight">
                        {"IMDB Page"}
                      </Text>

                      <View className="h-10 rounded-full overflow-hidden">
                        <Pressable
                          className="h-10 w-10 items-center justify-center space-x-2 rounded-full"
                          onPress={() => {
                            Linking.openURL(
                              `https://www.imdb.com/name/${personInfo.imdb_id}/`
                            );
                          }}
                          android_ripple={{ color: "#eee" }}
                        >
                          <Ionicons
                            name="link"
                            size={20}
                            color={Colors.blue[500]}
                          />
                        </Pressable>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>

            {/* Extra Rows */}

            <View className="mt-6 space-y-4">
              <View>
                <RenderRow
                  text1="Known for department"
                  text2={personInfo.known_for_department}
                />
              </View>

              <View>
                <RenderRow
                  text1="Birthday"
                  text2={dateFormatter(personInfo.birthday)}
                />
              </View>

              <View>
                <RenderRow
                  text1="Birth place"
                  text2={personInfo.place_of_birth}
                />
              </View>

              {personInfo.deathday ? (
                <View>
                  <RenderRow
                    text1="Death"
                    text2={dateFormatter(personInfo.deathday)}
                  />
                </View>
              ) : null}
            </View>

            <View className="mt-6">
              <Text className="text-sm text-text_tertiary">
                {personInfo.biography}
              </Text>
            </View>
          </ScrollView>
        ) : null}

        {personInfoStatus === "error" ? (
          <NothingToShow problemType="error" />
        ) : null}
      </View>
    </Modal>
  );
};

export default PersonDetailModal;

function RenderRow({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <View className="space-y-1 flex-row items-center gap-2">
      <Text className="text-sm text-text_dark">{text1 + ":"}</Text>
      <Text className="text-sm text-text_secondary font-semibold">{text2}</Text>
    </View>
  );
}
