import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { movieGenres, tvGenres } from "../../utils/helpers/helper";
import { Colors } from "../../utils/Colors";
import { MediaTypes } from "../../typings";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
  deletingItem: string;
  confirmModal: () => void;
}

const WarningModal: React.FC<IProps> = (props) => {
  const deletingItem =
    props.deletingItem?.charAt(0).toUpperCase() +
    props.deletingItem.substring(1);

  function onConfirmHandler() {
    // TODO: confirm and close modal
    props.confirmModal();
    props.closeModal();
  }

  console.log(props.deletingItem);

  function onCancelHandler() {
    // TODO: cancel and close modal
    props.closeModal();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      className="items-center justify-center"
    >
      <View className="absolute mt-[55%] mx-[10%] h-[38%] w-[80%] bg-stone-800 rounded-xl pb-2  [elevation:10] px-4 py-4">
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
              <Ionicons
                name="close-circle-outline"
                color={Colors.gray[100]}
                size={24}
              />
            </Pressable>
          </View>
        </View>

        {/* body */}
        <View className="mt-2 space-y-2">
          <Text className="text-lg text-text_primary">
            {`Do you want to delete "${deletingItem}" ?`}
          </Text>
          <Text className="text-text_dark">
            {`Doing this will permanently delete all your data from "${deletingItem}" and this action is irreversible.`}
          </Text>
        </View>

        {/* footer */}
        <View className="mt-10 space-y-3">
          <View>
            <CustomButton
              radius={100}
              color={Colors.red[600]}
              width={"100%"}
              height={48}
              method={onConfirmHandler}
            >
              <View className="flex-row items-center space-x-2">
                <Ionicons
                  name={"trash-outline"}
                  size={20}
                  color={Colors.text_primary}
                />
                <Text className="text-lg text-text_primary">Delete</Text>
              </View>
            </CustomButton>
          </View>

          <View>
            <CustomButton
              radius={100}
              color={Colors.text_primary}
              width={"100%"}
              height={48}
              method={onCancelHandler}
            >
              <View className="flex-row items-center space-x-2">
                <Ionicons
                  name={"close-circle-outline"}
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
