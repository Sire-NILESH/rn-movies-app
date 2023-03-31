import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";

function Header() {
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
          currentMediaType: "movie",
          genreId: 0.788734,
        });
      },
    },
    {
      name: "TV Shows",
      navigateTo: () => {
        // @ts-ignore
        navigation.push("Tiles", {
          title: "Trending TV Shows",
          currentMediaType: "tv",
          genreId: 0.97756,
        });
      },
    },
  ];

  function renderHeaderLink(props: { name: string; navigateTo: () => void }) {
    return (
      <View
        key={props.name + String(Math.random() * 10)}
        className="rounded-full overflow-hidden"
      >
        <Pressable
          android_ripple={{ color: "#eee" }}
          className="py-2 px-1"
          onPress={props.navigateTo}
        >
          <Text className="text-text_primary text text-center font-semibold px-1">
            {props.name}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[
        "rgba(15, 15, 15, 1)",
        "rgba(15, 15, 15, 0.5)",
        "rgba(0,0,0,0)",

        // "rgba(28, 25, 23, 1)",
        // "rgba(28, 25, 23, 0.7)",
        // "rgba(28, 25, 23, 0.3)",
        // "rgba(0,0,0,0)",
      ]}
      className="flex-row justify-between items-center w-[100%] h-[80] px-4"
    >
      <View>
        {/* @ts-ignore */}
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="md-menu" size={28} color={Colors.text_primary} />
        </Pressable>
      </View>

      <View className="flex-1 flex-row ml-2 justify-end gap-x-4">
        {headerLinksScreenParams.map((link) => renderHeaderLink(link))}
      </View>
    </LinearGradient>
  );
}

export default Header;
