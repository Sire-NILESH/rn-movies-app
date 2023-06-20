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
          subtitle={"Maven is an application built as an educational project."}
        >
          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {`The app makes it easier to find movies and tv shows quickly using Search, Genres, Custom playlists, Similar, Actors, Writers, TV channels, Movie production houses and even Watch providers
                \nYou can even mark a content 'Watchlist', 'Favourite' and 'Watched', which is maintained for you locallly on your device.
                \nMaven and nor its creator, own/license any of the content used in the application in anyway whatsoever.`}
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

      {/* NOTE */}
      <View>
        <SettingsCardWrapper
          iconName="information-circle-outline"
          title="Note"
          subtitle={"Some useful notes and tips about using app."}
        >
          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {`All your requests that are made to the api are cached for a specified amount of time and will be cleared automatically.
              \nIf you wish to see the most updated content (episodes, tv/movie listing, charts), you can just clear the request cache from the apps settings screen.
              \nIf you find the app crashing again and again when visiting the trailer screen, you can just clear the request cache from the apps settings screen.
                \nAll images inside the app is cached to improve app's performance. You can delete them manually by clearing the app's cache from your device's settings app.
                \nManually clearing the app's cache will only clear the image caches and not the request cache and your collection data. To do that, you can find their respective settings which are available in the settings screen.
                \nIf you find the application always showing error on startup even with a good internet connection, chances are that your ISP has blocked the TMDB API.\nTry using a VPN connection or change your DNS to circumvent this restriction.
                \nEpisode count that is shown on the thumbnails of TV shows of a person is not just the count of episodes that he/she was involved in as a cast member but the count of his/her involvement in any way as either a cast or a crew member combined.`}
            </Text>
          </View>

          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {`Tip! You can long press on the thumbnails to jump to recommended/similar content screen.`}
            </Text>
          </View>

          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {`Warning! All your "Favourites", "Watched" and "Watchlist" collection is stored on your device locally. Deleting the "Maven" app's 'all data' from your device's settings app will permanently delete them.`}
            </Text>
          </View>

          <View
            className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
            style={{ minHeight: 45 }}
          >
            <Text className="text-text_tertiary text-sm">
              {`Warning! For security reasons, only import the untouched/untampered backup file that was exported from this app. Only use this feature if you understand the security implications.
              \nMaven and nor its creator is responsible for for any damage caused to your device.
              \nUse it at your own risk.`}
            </Text>
          </View>
        </SettingsCardWrapper>
      </View>

      <View className="h-24" />
    </ScrollView>
  );
};

export default AboutScreen;
