import { View, Text } from "react-native";
import React from "react";
import {
  calculateProfitOrLoss,
  formatCurrencyNumbers,
} from "../../utils/helpers/helper";
import { Colors } from "../../utils/Colors";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";

interface IProps {
  budget: number;
  revenue: number;
}

const RevenueStats: React.FC<IProps> = ({ budget, revenue }) => {
  const budgetFormatted = formatCurrencyNumbers(budget);
  const revenueFormatted = formatCurrencyNumbers(revenue);
  const percentGains = calculateProfitOrLoss(budget, revenue);
  const percentGaninsNumber = Number(percentGains.split("%")[0]);

  return (
    <View className="px-4 space-y-2 mt-4">
      <View className="px-4 mt-0 flex-row items-center justify-between space-x-2 divide-x-[3px] divide-tertiary">
        <View className="flex-1 px-4 py-2">
          <Text className="text-text_secondary text-lg font-bold text-center">
            ${budgetFormatted}
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

        <View className="flex-1 px-4 py-2">
          <Text className="text-text_secondary text-lg font-bold text-center">
            {revenue === 0 ? "--" : "$" + revenueFormatted}
          </Text>
          <View className="mt-1 flex-row items-center space-x-2 justify-center">
            <FontAwesome name="money" size={14} color={Colors.text_dark} />

            <Text className="text-text_dark text-center">Revenue</Text>
          </View>
        </View>

        <View className="flex-1 px-4 py-2">
          <Text
            className="text-lg font-bold text-center"
            style={{
              color:
                revenue === 0
                  ? Colors.text_primary
                  : percentGaninsNumber > 0
                  ? Colors.green[500]
                  : Colors.red[400],
            }}
          >
            {revenue === 0
              ? "--"
              : percentGains.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <View className="mt-1 flex-row items-center space-x-2 justify-center">
            <FontAwesome name="line-chart" size={14} color={Colors.text_dark} />

            <Text className="text-text_dark text-center">
              {revenue === 0
                ? "No Info"
                : percentGaninsNumber > 0
                ? "Profit"
                : "Loss"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RevenueStats;
