import React from "react";
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
          title="Maven"
          subtitle={
            "Maven is a product build as an hobby project. \nThe app allows the users to find movies and tv shows quickly and easily based on 'search', 'genres', 'custom playlists', 'similar', 'actors', 'writers', 'tv channels', 'movie production houses' and even 'watch providers'.\nThe app also provides trailers, 'Featurette', 'Behind the Scenes', 'Clip', 'Trailer' ,'Teaser' for most of the contents so you can get a taste of what content you will be going to watch. You can even mark a content 'Watchlist', 'Favourite' and 'Watched' and is also maintained for you separately as well."
          }
        ></SettingsCardWrapper>
      </View>

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

      <View className="h-24" />
    </ScrollView>
  );
};

export default AboutScreen;
