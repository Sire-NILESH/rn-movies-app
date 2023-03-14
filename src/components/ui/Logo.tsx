import * as React from "react";
import { View, Image } from "react-native";

// interface IProps {
//   width?: number;
//   height?: number;
// }

const Logo = () => {
  return (
    <View className="border border-slate-800 rounded-xl">
      <Image
        source={require("../../../assets/images/icons/logoMain.jpg")}
        resizeMode="center"
        className="w-14 h-14 rounded-xl"
        style={
          {
            // width: 65,
            // height: 65,
            // borderRadius: 6,
          }
        }
      />
    </View>
  );
};

export default Logo;
