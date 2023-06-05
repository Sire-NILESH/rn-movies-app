import React from "react";
import { Text } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SettingsCardWrapper from "../components/settings/SettingsCardWrapper";
import CardRow from "../components/settings/CardRow";
import CustomButton from "../components/ui/CustomButton";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const AboutScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "About",
    });
  }, []);

  return (
    <ScrollView className="flex-1 bg-secondary pt-[1px]">
      <View>
        <SettingsCardWrapper
          iconName="information-circle-outline"
          title="TMDB"
          subtitle={
            "This product uses the TMDB API but is not endorsed or certified by TMDB in any way whatsoever."
          }
        >
          <CardRow rowTitle="TMDB website">
            <CustomButton
              height={50}
              width={50}
              radius={100}
              color={"transparent"}
              // color={Colors.accentLighter}
              method={() => {
                Linking.openURL("https://www.themoviedb.org/");
              }}
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons name="link" size={20} color={Colors.blue[500]} />
              </View>
            </CustomButton>
          </CardRow>
        </SettingsCardWrapper>
      </View>

      <View>
        <SettingsCardWrapper
          iconName="information-circle-outline"
          title="JustWatch"
          subtitle={
            "This product uses the TMDB API that provides watch providers for contents from JustWatch but is not endorsed or certified by TMDB or JustWatch in any way whatsoever."
          }
        >
          <CardRow rowTitle="JustWatch website">
            <CustomButton
              height={50}
              width={50}
              radius={100}
              color={"transparent"}
              // color={Colors.accentLighter}
              method={() => {
                Linking.openURL("https://www.justwatch.com/");
              }}
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons name="link" size={20} color={Colors.blue[500]} />
              </View>
            </CustomButton>
          </CardRow>
        </SettingsCardWrapper>
      </View>

      <View>
        <SettingsCardWrapper
          iconName="information-circle-outline"
          title="freepik"
          subtitle={
            "This product uses some license free images from 'freepik'."
          }
        >
          <CardRow rowTitle="Cute cat get mad cartoon vector icon illustration. animal nature icon concept isolated premium vector. flat cartoon style">
            <CustomButton
              height={50}
              width={50}
              radius={100}
              color={"transparent"}
              // color={Colors.accentLighter}
              method={() => {
                Linking.openURL(
                  "https://www.freepik.com/free-vector/cute-cat-get-mad-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_22070005.htm#page=3&query=funny%20cats%20illustrations&position=49&from_view=search&track=ais"
                );
              }}
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons name="link" size={20} color={Colors.blue[500]} />
              </View>
            </CustomButton>
          </CardRow>
          <CardRow rowTitle="Cute cat yawning cartoon vector icon illustration">
            <CustomButton
              height={50}
              width={50}
              radius={100}
              color={"transparent"}
              // color={Colors.accentLighter}
              method={() => {
                Linking.openURL(
                  "https://www.freepik.com/free-vector/cute-cat-yawning-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-flat_24770206.htm"
                );
              }}
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons name="link" size={20} color={Colors.blue[500]} />
              </View>
            </CustomButton>
          </CardRow>
        </SettingsCardWrapper>
      </View>

      {/* MAVEN */}
      <View>
        <SettingsCardWrapper
          iconName="information-circle-outline"
          title="Maven"
          subtitle={"Maven is an application build as an educational project."}
        >
          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {
                "The app makes it easier to find movies and tv shows quickly using Search, Genres, Custom playlists, Similar, Actors, Writers, TV channels, Movie production houses and even Watch providers"
              }
            </Text>
            <Text className="text-text_tertiary text-sm">
              {
                "You can even mark a content 'Watchlist', 'Favourite' and 'Watched', which is maintained for you locallly on your device."
              }
            </Text>
            <Text className="text-text_tertiary text-sm">
              {
                "Maven and nor its creator, own/license any of the content used in the application in anyway whatsoever."
              }
            </Text>
          </View>

          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {"All Rights Reserved by their Respective Owners."}
            </Text>
          </View>
        </SettingsCardWrapper>
      </View>

      <View className="h-24" />
    </ScrollView>
  );
};

export default AboutScreen;
