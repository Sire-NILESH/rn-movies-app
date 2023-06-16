import { View, Text } from "react-native";
import React, { useState } from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import IconCardRow from "./IconCardRow";
import CustomButton from "../ui/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import WarningModal from "../ui/WarningModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showErrorToast, showSuccessToast } from "../../utils/helpers/helper";

const DeleteReqCacheSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function modalHandler(state: boolean) {
    setIsModalOpen(state);
  }

  async function confirmDeleteHandler() {
    try {
      await AsyncStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
      showSuccessToast("Cleared !", "Your request cache were cleared.");
    } catch (error) {
      showErrorToast(
        "Error !",
        "Something went wrong while clearing request cache"
      );
    }
  }

  return (
    <SettingsCardWrapper
      iconName="ios-trash-bin-outline"
      title="Clear request cache"
      subtitle={
        "Do it if you find the application behaving unexpectedly or if you wish to see latest content."
      }
    >
      {/* Warning modal */}
      <WarningModal
        isVisible={isModalOpen}
        closeModal={() => modalHandler(false)}
        onConfirmModal={confirmDeleteHandler}
        text1={"Do you really want to clear all request cache?"}
        text2={
          "Do it if you find the application behaving unexpectedly or if you wish to see latest content."
        }
        deleteType="clear"
      />

      <IconCardRow
        rowTitle={"Clear request cache"}
        rowIcon={"paper-plane-outline"}
      >
        <CustomButton
          height={50}
          width={50}
          radius={100}
          color={"transparent"}
          method={() => {
            //  Open the modal for confirmation
            // deletingItemHandler(props.toDelete);
            modalHandler(true);
          }}
        >
          <View className="flex-row space-x-2 items-center">
            <MaterialCommunityIcons
              name="broom"
              size={20}
              color={Colors.text_primary}
            />
          </View>
        </CustomButton>
      </IconCardRow>
    </SettingsCardWrapper>
  );
};

export default DeleteReqCacheSettings;
