import { View, Text } from "react-native";
import React from "react";

interface IProps {
  tvMediaId: number;
}

const SeasonsAndEpisodes: React.FC<IProps> = (props) => {
  return (
    <View className="flex-1 px-4 space-y-4">
      <Text className="text-xl text-gray-50">Seasons</Text>
      <View className="flex-row flex-wrap gap-2">
        <Text className="text-gray-50 bg-orange-600/40 border border-orange-100 rounded-full px-3 py-2">
          One
        </Text>
        <Text className="text-gray-50 bg-orange-600/30 border border-orange-900 rounded-full px-3 py-2">
          Two
        </Text>
        <Text className="text-gray-50 bg-orange-600/50 border border-orange-900 rounded-full px-3 py-2">
          ✔️ Three
        </Text>
        <Text className="text-gray-50 bg-orange-600/50 border border-orange-900 rounded-full px-3 py-2">
          ✔️ Four
        </Text>
        <Text className="text-gray-50 bg-orange-600/40 border border-orange-900 rounded-full px-3 py-2">
          Five
        </Text>
        <Text className="text-gray-50 bg-orange-600/50 border border-orange-900 rounded-full px-3 py-2">
          Six
        </Text>
        <Text className="text-gray-50 bg-orange-600/30 border border-orange-900 rounded-full px-3 py-2">
          Seven
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Eight
        </Text>
        <Text className="text-gray-50 bg-orange-600/30 border border-orange-900 rounded-full px-3 py-2">
          Nine
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Ten
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Eleven
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Twelve
        </Text>
      </View>
      <View>
        <Text className="text-gray-300">Episodes</Text>
      </View>
    </View>
  );
};

export default SeasonsAndEpisodes;
