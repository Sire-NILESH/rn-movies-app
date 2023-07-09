import { View, Pressable } from "react-native";

interface IButtonGrp {
  onPressHandler: () => void;
  iconChild: React.ReactNode;
}

interface IProps {
  buttonsArray: IButtonGrp[];
  //   children: React.ReactNode;
}

const ButtonGroup: React.FC<IProps> = ({ buttonsArray }) => {
  return (
    <View
      className="absolute bottom-12 right-6 bg-stone-900 w-12 z-50 rounded-xl overflow-hidden border border-stone-800"
      style={{ elevation: 5 }}
    >
      {buttonsArray
        ? buttonsArray.map((b, i) => {
            return (
              <View key={i} className="flex-1">
                <Pressable
                  className="h-10 w-full items-center justify-center"
                  onPress={b.onPressHandler}
                  android_ripple={{ color: "#eee" }}
                >
                  {b.iconChild}
                </Pressable>
                {i !== buttonsArray.length - 1 ? (
                  <View className="w-full border border-stone-800" />
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
};

export default ButtonGroup;
