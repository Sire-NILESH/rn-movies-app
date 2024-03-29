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
import { useQuery } from "@tanstack/react-query";
import { personScreenCacheConfig } from "../../config/requestCacheConfig";
import { getPersonInfo } from "../../utils/requests";
import NothingToShow from "../NothingToShow";
import Loader from "./Loader";
import LinkButton from "./LinkButton";

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
      onRequestClose={props.toggleModalHandler}
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
              {"Personal Info"}
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
          <ScrollView
            className="mb-4 mx-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Person Card */}
            <View className="flex-row items-start space-x-5">
              {/* IMAGE CARD */}
              <View
                className="rounded-xl overflow-hidden"
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
                      text2={
                        personInfo.birthday
                          ? String(
                              calculateAge(
                                personInfo.birthday,
                                personInfo.deathday
                              )
                            )
                          : "--"
                      }
                    />
                  </View>
                </View>

                <View className="flex-1 justify-end">
                  {personInfo.imdb_id ? (
                    <View className="mt-3 flex-row gap-2 items-center">
                      {/* <FontAwesome
                        name={"imdb"}
                        size={36}
                        color={Colors.yellow[400]}
                      /> */}
                      <Text className="font-bold text-text_highLight">
                        {"IMDB Page"}
                      </Text>

                      <View className="overflow-hidden">
                        <LinkButton
                          linkURL={`https://www.imdb.com/name/${personInfo.imdb_id}/`}
                          size="small"
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>

            {/* Extra Rows */}

            <View className="mt-6 space-y-3">
              <View>
                <RenderRow
                  text1="Known for department"
                  text2={personInfo.known_for_department}
                />
              </View>

              <View>
                <RenderRow
                  text1="Birthday"
                  text2={
                    personInfo.birthday
                      ? dateFormatter(personInfo.birthday)
                      : "--"
                  }
                />
              </View>

              <View>
                <RenderRow
                  text1="Birth place"
                  text2={
                    personInfo.place_of_birth ? personInfo.place_of_birth : "--"
                  }
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

            <View className="mt-5 mb-3">
              <Text className="text-sm text-text_tertiary">
                {personInfo.biography
                  ? personInfo.biography
                  : "Biography information unavailable"}
              </Text>
            </View>

            {/* SOURCE TMDB */}
            <View className="mb-1 flex-row gap-2 items-center justify-start">
              <Text className="text-sm text-text_dark">
                {"Timeline: "}{" "}
                <Text className="font-bold text-text_highLight">{"TMDB"}</Text>
              </Text>

              <View className="">
                <LinkButton
                  linkURL={`https://www.themoviedb.org/person/${personInfo.id}/`}
                  size="small"
                />
              </View>
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
