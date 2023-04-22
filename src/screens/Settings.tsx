import React, { memo } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import DeleteSettings from "../components/settings/DeleteSettings";
import DefaultRegionSettings from "../components/settings/DefaultRegionSettings";
import ImgQualitySettings from "../components/settings/ImgQualitySettings";
import DefaultYearSettings from "../components/settings/DefaultYearSettings";
import DefaultLangSettings from "../components/settings/DefaultLangSettings";
import ImportExportSettings from "../components/settings/ImportExportSettings";
import DevOnlySettings from "../components/settings/DevOnlySettings";

const SettingsScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  // const { navigation, route } = props;

  return (
    <View className=" bg-secondary flex-1">
      <ScrollView
        className="bg-secondary px-3 space-y-10"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* DEFAULT REGION */}
        <DefaultRegionSettings />

        {/* Set Default Language */}
        <DefaultLangSettings />

        {/* Set Default Year */}
        <DefaultYearSettings />

        {/* Set Default Image Quality */}
        <ImgQualitySettings />

        {/* IMPORT/EXPORT */}
        <ImportExportSettings />

        {/* DELETE */}
        <DeleteSettings />

        {/* DEVELOPMENT ONLY SETTINGS */}
        <DevOnlySettings />
      </ScrollView>
    </View>
  );
};

export default memo(SettingsScreen);
