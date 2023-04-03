import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "./ui/CustomButton";
import { deleteCollection } from "../database/database";
import { Ionicons } from "@expo/vector-icons";
import { TDbCollectionType } from "../../types/typings";
import { Colors } from "../utils/Colors";
import WarningModal from "./ui/WarningModal";

const DeleteSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] =
    useState<TDbCollectionType>("watched");

  function deletingItemHandler(item: TDbCollectionType) {
    setDeletingItem(item);
  }

  function modalHandler(state: boolean) {
    setIsModalOpen(state);
  }

  function confirmDeleteHandler(state: boolean) {
    setConfirmDelete(state);
    //  and only on confirmation

    deleteCollection(deletingItem)
      .then(() => {
        console.log(`Deleted ${deletingItem} 💥`);
        //   when done, reset the confirmation state back to false
        setConfirmDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect();

  function RenderDeleteRow(props: {
    rowTitle: string;
    rowIcon: keyof typeof Ionicons.glyphMap;
    toDelete: TDbCollectionType;
  }) {
    return (
      <View
        className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
        style={{ backgroundColor: "rgb(4, 20, 10)" }}
      >
        <View className="flex-row space-x-2 items-center mx-4">
          <Ionicons
            name={props.rowIcon}
            size={18}
            color={Colors.text_primary}
          />
          <Text className="text-text_tertiary mx-4">{props.rowTitle}</Text>
        </View>

        <CustomButton
          height={50}
          width={50}
          radius={100}
          color={Colors.accentLighter}
          method={() => {
            //  Open the modal for confirmation
            deletingItemHandler(props.toDelete);
            modalHandler(true);

            //  and only on confirmation
            // if (confirmDelete) {
            //   deleteCollection(props.toDelete)
            //     .then(() => {
            //       console.log(`Deleted ${props.toDelete} 💥`);
            //       //   when done, reset the confirmation state back to false
            //       confirmDeleteHandler(false);
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }
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
      </View>
    );
  }

  return (
    <>
      {/* Warning modal */}
      <WarningModal
        isVisible={isModalOpen}
        closeModal={() => modalHandler(false)}
        deletingItem={deletingItem}
        confirmModal={() => confirmDeleteHandler(true)}
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
    </>
  );
};

export default DeleteSettings;
