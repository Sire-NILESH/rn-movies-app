import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import {
  buildGenrePlaylist,
  buildTrendingPlaylist,
} from "../utils/helpers/helper";
import HeaderWrapper from "./HeaderWrapper";
import { SharedValue } from "react-native-reanimated";

interface IProps {
  translateY: SharedValue<number>;
}

const Header: React.FC<IProps> = (props) => {
  const navigation = useNavigation<DrawerNavigationOptions>();

  const headerLinksScreenParams = [
    {
      name: "Search",
      navigateTo: () => {
        // @ts-ignore
        navigation.navigate("Search", { searchCategory: "multi" });
      },
    },
    {
      name: "Movies",
      navigateTo: () => {
        // @ts-ignore
        navigation.push("Tiles", {
          title: "Trending Movies",
          playlist: buildTrendingPlaylist("Trending", "movie"),
          currentMediaType: "movie",
        });
      },
    },
    {
      name: "TV Shows",
      navigateTo: () => {
        // @ts-ignore
        navigation.push("Tiles", {
          title: "Sci-Fi & Fantasy",
          playlist: buildGenrePlaylist("tv", {
            id: 10765,
            name: "Sci-Fi & Fantasy",
          }),
          currentMediaType: "tv",
        });
      },
    },
  ];

  function RenderHeaderLink(props: {
    link: { name: string; navigateTo: () => void };
  }) {
    return (
      <View className="rounded-full overflow-hidden">
        <Pressable
          android_ripple={{ color: "#eee" }}
          className="py-2 px-1"
          onPress={props.link.navigateTo}
        >
          <Text className="text-text_primary text text-center font-semibold px-1">
            {props.link.name}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    // <HeaderWrapper
    //   translateY={props.translateY}
    //   style={{
    //     // backgroundColor: Colors.tertiary,
    //     height: 55,
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    <View
      // colors={["rgba(15, 15, 15, 0.8)", "rgba(15, 15, 15, 0.2)"]}
      className="flex-row justify-between items-center w-[100%] px-4 h-[60] bg-stone-900/50 "
      // style={{ elevation: 0 }}
    >
      <View>
        {/* @ts-ignore */}
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="md-menu" size={28} color={Colors.text_primary} />
        </Pressable>
      </View>

      <View className="flex-1 flex-row ml-2 justify-end gap-x-4">
        {headerLinksScreenParams.map((link, index) => (
          <RenderHeaderLink key={`${link.name}-${index}`} link={link} />
        ))}
      </View>
    </View>
    // </HeaderWrapper>
  );
};

export default Header;
