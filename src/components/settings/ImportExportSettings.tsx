import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconCardRow from "./IconCardRow";
import SettingsCardWrapper from "./SettingsCardWrapper";
import { Colors } from "../../utils/Colors";
import CustomButton from "../ui/CustomButton";
import { View } from "react-native";
import useDBimportExport from "../../hooks/useDBimportExport";

const ImportExportSettings = () => {
  const { exportDb, importDb } = useDBimportExport();

  return (
    <SettingsCardWrapper
      iconName="document-outline"
      title="Import/Export File"
      subtitle={
        "Caution! For security reasons, only import the untampered file that was exported from this app."
      }
    >
      <RenderRow
        rowIconNode={
          <MaterialCommunityIcons
            name="export"
            size={18}
            color={Colors.text_primary}
          />
        }
        rowTitle="Export a backup"
        method={exportDb}
      />
      <RenderRow
        rowIconNode={
          <MaterialCommunityIcons
            name="import"
            size={18}
            color={Colors.text_primary}
          />
        }
        rowTitle="Import a backup"
        method={importDb}
      />
    </SettingsCardWrapper>
  );
};

export default ImportExportSettings;

function RenderRow(props: {
  rowTitle: string;
  method: () => Promise<void>;
  rowIconNode: React.ReactNode;
}) {
  return (
    <IconCardRow rowTitle={props.rowTitle} rowIconNode={props.rowIconNode}>
      <CustomButton
        height={50}
        width={50}
        radius={100}
        color={"transparent"}
        method={async () => {
          await props.method();
        }}
      >
        <View className="flex-row space-x-2 items-center">
          {props.rowIconNode}
        </View>
      </CustomButton>
    </IconCardRow>
  );
}
