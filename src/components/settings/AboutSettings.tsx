import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import CustomButton from "./../ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native-animatable";
import { Colors } from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const AboutSettings = () => {
  const navigation = useNavigation();

  const navigationHandler = () => {
    // @ts-ignore
    navigation.push("About");
  };

  return (
    <SettingsCardWrapper
      iconName="information-circle-outline"
      title="About"
      subtitle={"More info about about us and attributions."}
    >
      <CardRow rowTitle="About us">
        <CustomButton
          height={50}
          width={50}
          radius={100}
          color={Colors.accentLighter}
          method={() => {
            navigationHandler();
          }}
        >
          <View className="flex-row space-x-2 items-center">
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color={Colors.text_primary}
            />
          </View>
        </CustomButton>
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default AboutSettings;
