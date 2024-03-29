import React from "react";
import { Text } from "react-native";
import { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SettingsCardWrapper from "../components/settings/SettingsCardWrapper";
import CardRow from "../components/settings/CardRow";
import LinkButton from "../components/ui/LinkButton";

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
            <LinkButton linkURL={"https://www.themoviedb.org/"} />
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
            <LinkButton linkURL={"https://www.justwatch.com/"} />
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
            <LinkButton
              linkURL={
                "https://www.freepik.com/free-vector/cute-cat-get-mad-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_22070005.htm#page=3&query=funny%20cats%20illustrations&position=49&from_view=search&track=ais"
              }
            />
          </CardRow>
          <CardRow rowTitle="Cute cat yawning cartoon vector icon illustration">
            <LinkButton
              linkURL={
                "https://www.freepik.com/free-vector/cute-cat-yawning-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-flat_24770206.htm"
              }
            />
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
          <AboutScreenContentRow
            content={`The app makes it easier to find movies and tv shows quickly using Search, Genres, Custom playlists, Similar, Actors, Writers, TV channels, Movie production houses and even Watch providers
            \nYou can even mark a content 'Watchlist', 'Favourite' and 'Watched', which is maintained for you locallly on your device.
            \nMaven and nor its creator, own/license any of the content used in the application in anyway whatsoever.`}
          />

          <AboutScreenContentRow
            content={"All Rights Reserved by their Respective Owners."}
          />
        </SettingsCardWrapper>
      </View>

      {/* NOTE */}
      <View>
        <SettingsCardWrapper
          iconName="information-circle-outline"
          title="Note"
          subtitle={"Some useful notes and tips about using app."}
        >
          <AboutScreenContentRow
            content={`All your requests that are made to the api are cached for a specific amount of time and will be cleared automatically.
            \nIf you wish to see the most updated content (episodes, tv/movie listing, charts), you can just clear the request cache from the apps settings screen.
            \nIf you find the app crashing again and again when visiting the trailer screen, you can just clear the request cache from the apps settings screen.
              \nAll images inside the app is cached to improve app's performance. You can delete them manually by clearing the app's cache from your device's settings app.
              \nManually clearing the app's cache will only clear the image caches and not the request cache and your collection data. To do that, you can find their respective settings which are available in the settings screen.
              \nIf you find the application always showing error on startup even with a good internet connection, chances are that your ISP has blocked the TMDB API.\nTry using a VPN connection or change your DNS to circumvent this restriction.
              \nEpisode count that is shown on the thumbnails of TV shows of a person is not just the count of episodes that he/she was involved in as a cast member but the count of his/her involvement in any way as either a cast or a crew member combined.
              \nMedia certificates shown are by default for United States region only.
              \nPopularity stat is a fairly important metric on TMDB. It helps boost search results and adds an incredibly useful sort value for discover. You can think of popularity as being a "lifetime" popularity score that is impacted by the amount of user interactions with the media.`}
          />

          <AboutScreenContentRow
            content={`Tip! You can long press on the thumbnails to jump to recommended/similar content screen.
            \nTip! You can long press on the media title to copy it on the clipboard.`}
          />

          <AboutScreenContentRow
            content={`Using a larger font size on the device will break the applications's UI. Hence, font scaling setting is only limited to smaller font sizes.
            \nFont scaling settings is made such that it will require a manual restart of the application for it to take effect.`}
          />

          <AboutScreenContentRow
            content={`Warning! All your "Favourites", "Watched" and "Watchlist" collection is stored on your device locally. Deleting the "Maven" app's 'all data' from your device's settings app will permanently delete them.`}
          />

          <AboutScreenContentRow
            content={`Warning! For security reasons, only import the untouched/untampered backup file that was exported from this app. Only use this feature if you understand the security implications.
              \nMaven and nor its creator is responsible for for any damage caused to your device.
              \nUse it at your own risk.`}
          />
        </SettingsCardWrapper>
      </View>

      <View className="h-24" />
    </ScrollView>
  );
};

export default AboutScreen;

function AboutScreenContentRow({ content }: { content: string }) {
  return (
    <View
      className="justify-between px-4 mt-2 mx-2 bg-neutral-800 rounded-xl py-3 space-y-2"
      style={{ minHeight: 45 }}
    >
      <Text className="text-text_tertiary text-sm">{content}</Text>
    </View>
  );
}
