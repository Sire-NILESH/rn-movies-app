import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../utils/Colors";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import Logo from "./ui/Logo";
import { LinearGradient } from "expo-linear-gradient";

function Header() {
  const navigation = useNavigation<DrawerNavigationOptions>();

  const headerLinksItems = [
    { title: "Movies", screenName: "Movies" },
    { title: "TV Shows", screenName: "TV Shows" },
    // { title: "Favorites", screenName: "TV Shows" },
  ];

  function renderHeaderLink(title: string, screenName: string) {
    return (
      <View key={title + String(Math.random() * 10)} className="py-2">
        <Pressable
          onPress={() => {
            // @ts-ignore
            navigation.navigate(screenName);
          }}
        >
          <Text className="text-stone-100 text text-center font-semibold px-1">
            {title}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[
        // Colors.black,
        "rgba(28, 25, 23, 1)",
        "rgba(28, 25, 23, 0.7)",
        "rgba(28, 25, 23, 0.3)",
        "rgba(0,0,0,0)",
      ]}
      className="flex-row justify-between items-center w-[100%] h-[80] px-4"
    >
      <View>
        {/* @ts-ignore */}
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="ios-menu" size={28} color={Colors.stone[100]} />
        </Pressable>
      </View>

      {/* <View className="ml-2 flex-3 flex-row items-center space-x-2">
        <Logo />
        <Text className="font-semibold text-3xl text-green-400">Reeled</Text>
        <Text className="font-semibold text-3xl text-yellow-50">
          🍿 Popcorn
        </Text>
      </View> */}

      <View className="flex-1 flex-row ml-2 justify-end gap-x-4">
        {headerLinksItems.map((link) =>
          renderHeaderLink(link.title, link.screenName)
        )}
      </View>
    </LinearGradient>
  );
}

export default Header;
