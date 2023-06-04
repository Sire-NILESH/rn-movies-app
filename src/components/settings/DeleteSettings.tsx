import { View } from "react-native";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import { deleteCollection } from "../../storage/database";
import { Ionicons } from "@expo/vector-icons";
import { TDbCollectionType } from "../../../types/typings";
import { Colors } from "../../utils/Colors";
import WarningModal from "../ui/WarningModal";
import SettingsCardWrapper from "./SettingsCardWrapper";
import IconCardRow from "./IconCardRow";
import { showErrorToast, showSuccessToast } from "../../utils/helpers/helper";

const DeleteSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] =
    useState<TDbCollectionType>("watched");

  function deletingItemHandler(item: TDbCollectionType) {
    setDeletingItem(item);
  }

  function modalHandler(state: boolean) {
    setIsModalOpen(state);
  }

  function capitalizeString(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  function confirmDeleteHandler() {
    //  and only on confirmation
    deleteCollection(deletingItem)
      .then(() => {
        showSuccessToast(
          "Deleted !",
          `Your '${capitalizeString(
            deletingItem
          )}' collection was permanently deleted.`
        );
      })
      .catch((_err) => {
        showErrorToast(
          "Error !",
          `Something went wrong while deleting your '${capitalizeString(
            deletingItem
          )}' collection.`
        );
      });
  }

  function RenderDeleteRow(props: {
    rowTitle: string;
    rowIcon: keyof typeof Ionicons.glyphMap;
    toDelete: TDbCollectionType;
  }) {
    return (
      <IconCardRow rowTitle={props.rowTitle} rowIcon={props.rowIcon}>
        <CustomButton
          height={50}
          width={50}
          radius={100}
          color={"transparent"}
          method={() => {
            //  Open the modal for confirmation
            deletingItemHandler(props.toDelete);
            modalHandler(true);
          }}
        >
          <View className="flex-row space-x-2 items-center">
            <Ionicons
              name="trash-outline"
              size={20}
              color={Colors.text_primary}
            />
          </View>
        </CustomButton>
      </IconCardRow>
    );
  }

  return (
    <SettingsCardWrapper
      iconName="trash-outline"
      title="Delete"
      subtitle={`You can delete your collections here.`}
    >
      {/* Warning modal */}
      <WarningModal
        isVisible={isModalOpen}
        closeModal={() => modalHandler(false)}
        deletingItem={deletingItem}
        confirmModal={confirmDeleteHandler}
      />

      <RenderDeleteRow
        rowIcon="heart-outline"
        rowTitle="Favourites"
        toDelete={"favourites"}
      />
      <RenderDeleteRow
        rowIcon="list-outline"
        rowTitle="Watchlist"
        toDelete={"watchlist"}
      />
      <RenderDeleteRow
        rowIcon="eye-outline"
        rowTitle="Watched"
        toDelete={"watched"}
      />
    </SettingsCardWrapper>
  );
};

export default DeleteSettings;
