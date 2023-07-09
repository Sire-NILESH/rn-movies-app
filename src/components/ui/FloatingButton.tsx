import { View, Pressable } from "react-native";

interface IProps {
  onClickHandler: () => void;
  children: React.ReactNode;
}

const FloatingButton: React.FC<IProps> = ({ onClickHandler, children }) => {
  return (
    <View
      className="absolute bottom-12 right-6 bg-neutral-800 h-14 w-14 z-50 rounded-full overflow-hidden"
      style={{ elevation: 5 }}
    >
      <Pressable
        className="h-full w-full items-center justify-center"
        onPress={onClickHandler}
        android_ripple={{ color: "#eee" }}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default FloatingButton;
