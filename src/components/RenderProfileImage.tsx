import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Colors } from "../utils/Colors";
import { Image } from "expo-image";

export default function RenderProfileImage({ imgPath }: { imgPath: string }) {
  const [fallbackImage, setFallbackImage] = useState<boolean>(false);

  function setFallbackImagehandler(state: boolean) {
    setFallbackImage(state);
  }

  return (
    <View className="h-full w-full rounded-2xl overflow-hidden border-2 border-stone-800/60">
      {imgPath && !fallbackImage ? (
        <Image
          source={{ uri: imgPath }}
          className="h-full w-full"
          contentFit="cover"
          transition={350}
          onError={(err) => {
            if (err) {
              setFallbackImagehandler(true);
            }
          }}
        />
      ) : (
        <View className="h-full w-full justify-center items-center">
          <Ionicons name="person" color={Colors.green[900]} size={54} />
        </View>
      )}
    </View>
  );
}
