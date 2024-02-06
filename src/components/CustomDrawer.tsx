import React from "react";
import { View, Text } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "expo-image";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          className="mt-0"
          style={{
            width: "100%",
            // aspectRatio: 16 / 9,
            height: 180,
          }}
        >
          <LinearGradient
            colors={[
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ImageBackground //wrapping the main entry screen with this <ImageBackground> component
              source={require("../../assets/icon.png")}
              // source={require("../../assets/images/drawerImage/maven_main.png")}
              contentFit="cover" //similar to web, "cover", "contain", etc.
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

        {/* <View className="h-2" /> */}

        <View className="flex-1 pt-2 my-0 px-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View className="p-3 space-y-1">
        <View className="flex-row items-center">
          <Text className="text-stone-500 text-xs">Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
