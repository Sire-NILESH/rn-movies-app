import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Colors } from "../utils/Colors";

export default function RenderProfileImage({ imgPath }: { imgPath: string }) {
  const [fallbackImage, setFallbackImage] = useState<boolean>(false);

  function setFallbackImagehandler(state: boolean) {
    setFallbackImage(state);
  }

  return (
    <View className="h-full w-full rounded-2xl overflow-hidden border-2 border-stone-800/40">
      {imgPath && !fallbackImage ? (
        <Image
          source={{ uri: imgPath }}
          className="h-full w-full border-2 border-green-500"
          resizeMode="cover"
          fadeDuration={400}
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
