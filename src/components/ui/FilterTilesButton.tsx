import { Colors } from "../../utils/Colors";
import { Feather } from "@expo/vector-icons";
import FloatingButton from "./FloatingButton";

interface IProps {
  onShowFilterModal: () => void;
}

const FilterTilesButton: React.FC<IProps> = ({ onShowFilterModal }) => {
  return (
    <FloatingButton onClickHandler={onShowFilterModal}>
      <Feather name="sliders" size={24} color={Colors.gray[200]} />
    </FloatingButton>
  );
};

export default FilterTilesButton;
