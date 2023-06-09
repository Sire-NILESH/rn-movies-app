import { View, Pressable } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import { Feather } from "@expo/vector-icons";

interface IProps {
  onShowFilterModal: () => void;
}

const FilterTilesButton: React.FC<IProps> = ({ onShowFilterModal }) => {
  return (
    <View
      className="absolute bottom-12 right-6 bg-neutral-800 h-14 w-14 z-50 rounded-full overflow-hidden"
      style={{ elevation: 5 }}
    >
      <Pressable
        className="h-full w-full items-center justify-center"
        onPress={onShowFilterModal}
        android_ripple={{ color: "#eee" }}
      >
        <Feather name="sliders" size={24} color={Colors.gray[200]} />
      </Pressable>
    </View>
  );
};

export default FilterTilesButton;
