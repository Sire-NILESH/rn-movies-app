import { View, Text } from "react-native";
import React from "react";
import {
  calculateProfitOrLoss,
  formatCurrencyNumbers,
} from "../../utils/helpers/helper";
import { Colors } from "../../utils/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

interface IProps {
  budget: number;
  revenue: number;
}

const RevenueStats: React.FC<IProps> = ({ budget, revenue }) => {
  const percentGains = calculateProfitOrLoss(budget, revenue);
  const percentGaninsNumber = Number(percentGains.split("%")[0]);

  return (
    <View
      className="border rounded-xl mx-4 mt-4 mb-1 flex-row items-center justify-between divide-x-[3px] divide-stone-800/60"
      style={{
        backgroundColor: "rgb(20, 18, 16)",
        borderColor: "rgb(31, 28, 27)",
      }}
    >
      {/* STAT 1 */}
      <View className="flex-1 items-center py-3">
        <Text className="text-text_secondary text-lg font-bold text-center">
          {budget === 0 ? "--" : "$" + formatCurrencyNumbers(budget)}
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          <Ionicons
            name="ios-wallet-outline"
            size={14}
            color={Colors.text_dark}
          />
          <Text className="text-text_dark text-center">Budget</Text>
        </View>
      </View>

      {/* STAT 2 */}
      <View className="flex-1 items-center py-3">
        <Text className="text-text_secondary text-lg font-bold text-center">
          {revenue === 0 ? "--" : "$" + formatCurrencyNumbers(revenue)}
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          <FontAwesome name="money" size={14} color={Colors.text_dark} />

          <Text className="text-text_dark text-center">Revenue</Text>
        </View>
      </View>

      {/* STAT 3 */}
      <View className="flex-1 items-center py-3">
        <Text
          className="text-lg font-bold text-center"
          style={{
            color:
              revenue === 0 || budget === 0
                ? Colors.text_primary
                : percentGaninsNumber > 0
                ? Colors.green[500]
                : Colors.red[400],
          }}
        >
          {revenue === 0 || budget === 0
            ? "--"
            : percentGains.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <View className="mt-1 flex-row items-center space-x-2 justify-center">
          <FontAwesome name="line-chart" size={14} color={Colors.text_dark} />

          <Text className="text-text_dark text-center">
            {revenue === 0 || budget === 0
              ? "No Info"
              : percentGaninsNumber > 0
              ? "Profit"
              : "Loss"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RevenueStats;
