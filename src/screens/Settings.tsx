import React, { memo } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import DeleteSettings from "../components/settings/DeleteSettings";
import DefaultRegionSettings from "../components/settings/DefaultRegionSettings";
import ImgQualitySettings from "../components/settings/ImgQualitySettings";
import DefaultYearSettings from "../components/settings/DefaultYearSettings";
import DefaultLangSettings from "../components/settings/DefaultLangSettings";
import AdultFilterSettings from "../components/settings/AdultFilterSettings";
import AboutSettings from "../components/settings/AboutSettings";

const SettingsScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  return (
    <View className=" bg-secondary flex-1">
      <ScrollView
        className="bg-secondary px-2 space-y-2 pt-2"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View>
          {/* DEFAULT REGION */}
          <DefaultRegionSettings />
        </View>

        <View>
          {/* Set Default Language */}
          <DefaultLangSettings />
        </View>

        <View>
          {/* Set Default Year */}
          <DefaultYearSettings />
        </View>

        <View>
          {/* Set Adult Filter */}
          <AdultFilterSettings />
        </View>

        <View>
          {/* Set Default Image Quality */}
          <ImgQualitySettings />
        </View>

        {/* <View>
          IMPORT/EXPORT
          <ImportExportSettings />
        </View> */}

        <View>
          {/* DELETE */}
          <DeleteSettings />
        </View>

        {/* <View>
          DEVELOPMENT ONLY SETTINGS
          <DevOnlySettings />
        </View> */}

        <View>
          {/* ABOUT */}
          <AboutSettings />
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
};

export default memo(SettingsScreen);
