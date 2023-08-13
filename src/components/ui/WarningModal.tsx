import { View, Text, Modal, Pressable } from "react-native";
import { Colors } from "../../utils/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
  onConfirmModal: () => void;
  text1: string;
  text2: string;
  deleteType: "clear" | "delete";
}

const WarningModal: React.FC<IProps> = (props) => {
  function onConfirmHandler() {
    // TODO: confirm and close modal
    props.onConfirmModal();
    props.closeModal();
  }

  function onCancelHandler() {
    // TODO: cancel and close modal
    props.closeModal();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.closeModal}
      className="items-center justify-center"
    >
      <View className="absolute mt-[55%] mx-[5%] w-[90%] bg-stone-800 rounded-xl pb-2  [elevation:10] px-4 py-4 border border-neutral-700/60">
        {/* header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Ionicons
              name="warning-outline"
              size={20}
              color={Colors.yellow[500]}
            />

            <Text className="text-text_primary text-center uppercase tracking-[2px]">
              Warning
            </Text>
          </View>
          <View className="rounded-full overflow-hidden">
            <Pressable
              onPress={props.closeModal}
              className="p-2"
              android_ripple={{ color: "#eee" }}
            >
              <Ionicons name="close" color={Colors.gray[100]} size={24} />
            </Pressable>
          </View>
        </View>

        {/* body */}
        <View className="mt-2 space-y-2">
          <Text className="text-lg text-text_primary">{props.text1}</Text>
          <Text className="text-text_dark text-sm">{props.text2}</Text>
        </View>

        {/* footer */}
        <View className="mt-10 flex-row space-x-4 mb-1">
          <View className="flex-1">
            <CustomButton
              radius={8}
              color={Colors.red[600]}
              width={"100%"}
              height={42}
              method={onConfirmHandler}
            >
              <View className="flex-row items-center space-x-2">
                {props.deleteType === "delete" ? (
                  <Ionicons
                    name={"trash-outline"}
                    size={20}
                    color={Colors.text_primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={"broom"}
                    size={20}
                    color={Colors.text_primary}
                  />
                )}
                <Text className="text-lg text-text_primary">
                  {props.deleteType === "delete" ? "Delete" : "Clear"}
                </Text>
              </View>
            </CustomButton>
          </View>

          <View className="flex-1">
            <CustomButton
              radius={8}
              color={Colors.text_primary}
              width={"100%"}
              height={42}
              method={onCancelHandler}
            >
              <View className="flex-row items-center space-x-2">
                <Ionicons
                  name={"close"}
                  size={20}
                  color={Colors.text_darkest}
                />
                <Text className="text-lg text-text_darkest">Cancel</Text>
              </View>
            </CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModal;
