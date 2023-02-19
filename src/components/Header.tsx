// import { useEffect, useState } from "react";
// import useAuth from '../hooks/useAuth'
import { View, Text, Image } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();

  const headerLinksItems = [
    { title: "Movies", screenName: "Movies" },
    { title: "TV Shows", screenName: "TV Shows" },
    { title: "Favorites", screenName: "TV Shows" },
  ];

  function renderHeaderLink(title: string, screenName: string) {
    return (
      <View key={title + String(Math.random() * 10)} className="flex-1 py-2">
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
    <View className="flex-row justify-between items-end w-[100%] h-[80]  px-4 ">
      <View className="flex-4">
        <Text className="font-semibold text-3xl text-yellow-50">
          🍿 Popcorn
        </Text>
      </View>

      <View className="w-[62%] flex-row ml-2">
        {headerLinksItems.map((link) =>
          renderHeaderLink(link.title, link.screenName)
        )}
      </View>
    </View>
  );
}

export default Header;
