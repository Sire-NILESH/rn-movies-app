import { View, Text, FlatList } from "react-native";
import React from "react";
import { IProductionCompany, Network } from "../../types/typings";
// @ts-ignore
import ExpoFastImage from "expo-fast-image";
import { Colors } from "../utils/Colors";

interface IProps {
  productions: IProductionCompany[];
}

const ProductionCompaines: React.FC<IProps> = (props) => {
  return (
    <View className="flex-1 space-y-4 mt-16 px-4">
      <Text className="text-text_highLight">Production</Text>
      <FlatList
        horizontal
        data={props.productions}
        keyExtractor={(producitonCompany) => String(producitonCompany.id)}
        renderItem={(itemObj) => {
          const p = itemObj.item;
          return (
            <View className="space-y-3 justify-start mr-5">
              <View
                className="bg-stone-50 rounded-full p-2 justify-center"
                style={{
                  width: 65,
                  aspectRatio: 1 / 1,
                }}
              >
                <ExpoFastImage
                  uri={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
                  cacheKey={p.id + "production"}
                  resizeMode={"contain"}
                  className="border-stone-500"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <Text
                key={p.id}
                className="text-text_dark text-xs  text-center w-[60px]"
              >
                {p.name}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductionCompaines;

// import { View, Text, FlatList } from "react-native";
// import React from "react";
// import { IProductionCompany, Network } from "../typings";
// // @ts-ignore
// import ExpoFastImage from "expo-fast-image";
// import { Colors } from "../utils/Colors";

// interface IProps {
//   productions: IProductionCompany[];
// }

// const ProductionCompaines: React.FC<IProps> = (props) => {
//   return (
//     <View className="w-full justify-center pb-2 space-y-4">
//       <Text className="text-text_highLight text-lg px-4">Production</Text>
//       <FlatList
//         horizontal
//         data={props.productions}
//         keyExtractor={(item) => String(item.id)}
//         contentContainerStyle={{
//           paddingHorizontal: 10,
//         }}
//         ItemSeparatorComponent={() => <View className="w-4" />}
//         renderItem={(itemObj) => (
//           <ProductionTag productionCompany={itemObj.item} />
//         )}
//       />
//     </View>
//   );
// };

// export default ProductionCompaines;

// interface IProductionTagProps {
//   productionCompany: IProductionCompany;
// }

// function ProductionTag(props: IProductionTagProps) {
//   return (
//     <View className="flex-1 bg-accent px-4 h-10 rounded-xl items-center justify-center">
//       <Text className="text-text_highLight">
//         {props.productionCompany.name}
//       </Text>
//     </View>
//   );
// }

// return (
//    <View className="flex-1 space-y-4 mt-16 px-4">
//      <Text className="text-text_highLight">Production</Text>
//      <FlatList
//        horizontal
//        data={props.productions}
//        keyExtractor={(producitonCompany) => String(producitonCompany.id)}
//        renderItem={(itemObj) => {
//          const p = itemObj.item;
//          return (
//            <View className="space-y-3 justify-start mr-5">
//              <View
//                className="bg-stone-50 rounded-full p-2 justify-center"
//                style={{
//                  width: 65,
//                  aspectRatio: 1 / 1,
//                }}
//              >
//                <ExpoFastImage
//                  uri={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
//                  cacheKey={p.id + "production"}
//                  resizeMode={"contain"}
//                  className="border-stone-500"
//                  style={{
//                    width: "100%",
//                    height: "100%",
//                  }}
//                />
//              </View>
//              <Text
//                key={p.id}
//                className="text-text_dark text-xs  text-center w-[60px]"
//              >
//                {p.name}
//              </Text>
//            </View>
//          );
//        }}
//      />
//    </View>
//  );
