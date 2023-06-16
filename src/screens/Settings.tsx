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
import BlurHomeBannerSettings from "../components/settings/BlurHomeBannerSettings";
import ThumbnailTextSettings from "../components/settings/ThumbnailTextSettings";
import DeleteReqCacheSettings from "../components/settings/DeleteReqCacheSettings";

const SettingsScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  return (
    <View className=" bg-secondary flex-1">
      <ScrollView
        className="bg-secondary pt-[1px]"
        // className="bg-secondary px-2 space-y-2 pt-2"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View>
          {/* DEFAULT REGION */}
          <DefaultRegionSettings dropdownBgColor={"transparent"} />
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
          {/* Set Blur on homescreen banner */}
          <BlurHomeBannerSettings />
        </View>

        <View>
          {/* Disable text from thumbnail */}
          <ThumbnailTextSettings />
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
          {/* CLEAR REQ CACHE */}
          <DeleteReqCacheSettings />
        </View>

        <View>
          {/* DELETE */}
          <DeleteSettings />
        </View>

        <View>
          {/* ABOUT */}
          <AboutSettings />
        </View>

        {/* <View>
          DEVELOPMENT ONLY SETTINGS
          <DevOnlySettings />
        </View> */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
};

export default memo(SettingsScreen);
