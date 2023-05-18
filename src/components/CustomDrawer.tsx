import React from "react";
import { View, Text, ImageBackground } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { LinearGradient } from "expo-linear-gradient";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View className="mt-0" style={{ width: "100%", aspectRatio: 16 / 9 }}>
          <LinearGradient
            colors={[
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              // "rgba(28, 25, 23, 0.2)",
              "rgba(28, 25, 25, 0.4)",
              "rgba(28, 25, 25, 8)",
            ]}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
              source={require("../../assets/images/drawerImage/maven_main.png")}
              resizeMode="cover" //similar to web, "cover", "contain", etc.
              style={{
                width: "100%",
                height: "100%",
              }} //for View dimensions internally
              imageStyle={{
                width: "100%",
                height: "100%",
                zIndex: -100,
              }} //for Image styles internally.
            ></ImageBackground>
          </LinearGradient>
        </View>

        <View className="flex-1 pt-2 my-0 px-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View className="p-3 space-y-1">
        <View className="flex-row items-center">
          <Text className="text-stone-500 text-xs">Version 1.0.0</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-stone-500 text-xs">
            Made with <Text className="font-bold text-stone-400">💖</Text> from{" "}
            <Text className="font-bold text-stone-400">Sire</Text>
          </Text>
        </View>
        {/* <View className="flex-row items-center">
          <Text className="text-stone-500 text-xs">
            Powered by <Text className="font-bold text-stone-400">TMDB</Text>{" "}
            and <Text className="font-bold text-stone-400">justWatch</Text>
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default CustomDrawer;
