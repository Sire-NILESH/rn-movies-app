import React from "react";
import { View, Text, Pressable } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Logo from "./ui/Logo";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        //   contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <View className="mt-6 ml-3 flex-row items-center space-x-2">
          <Logo />
          <Text className="font-semibold text-3xl text-yellow-50">Reeled</Text>
        </View>

        <View className="flex-1 pt-2 my-6">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View className="p-3 space-y-1">
        <View className="flex-row items-center">
          <Text className="text-stone-500 text-xs">Version 1.0.0</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-stone-500 text-xs">
            Powered by <Text className="font-bold text-stone-400">TMDB</Text>{" "}
            and <Text className="font-bold text-stone-400">justWatch</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
