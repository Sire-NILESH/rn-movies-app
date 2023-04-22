import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconCardRow from "./IconCardRow";
import LanguageDropdown from "../ui/LanguageDropdown";
import SettingsCardWrapper from "./SettingsCardWrapper";
import { Colors } from "../../utils/Colors";

const ImportExportSettings = () => {
  return (
    <SettingsCardWrapper
      iconName="trash-outline"
      title="Delete"
      subtitle={`You can delete your collections here.`}
    >
      <RenderRow
        rowIconNode={
          <MaterialCommunityIcons
            name="import"
            size={18}
            color={Colors.text_primary}
          />
        }
        rowTitle="Import a file"
      />
      <RenderRow
        rowIconNode={
          <MaterialCommunityIcons
            name="export"
            size={18}
            color={Colors.text_primary}
          />
        }
        rowTitle="Export a file"
      />
    </SettingsCardWrapper>
  );
};

export default ImportExportSettings;

function RenderRow(props: { rowTitle: string; rowIconNode: React.ReactNode }) {
  return (
    <IconCardRow rowTitle={props.rowTitle} rowIconNode={props.rowIconNode}>
      <LanguageDropdown saveMode="applicationWide" />
    </IconCardRow>
  );
}
