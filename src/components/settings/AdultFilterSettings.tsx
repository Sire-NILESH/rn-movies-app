import { View, Text } from "react-native";
import React, { useState } from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import { Switch } from "react-native-gesture-handler";
import { Colors } from "../../utils/Colors";
import { useAllowNsfwContentHooks } from "../../hooks/reduxHooks";

const AdultFilterSettings = () => {
  const { toggleAllowNsfwContentHandler, allowNsfwContent } =
    useAllowNsfwContentHooks();

  //   const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => toggleAllowNsfwContentHandler();

  return (
    <SettingsCardWrapper
      iconName="funnel-outline"
      title="Adult Content"
      subtitle={`Allow NSFW contents to be shown in search results. \nWhen disabled, will filter out most but not all.`}
    >
      <CardRow rowTitle="Include adult content in search results">
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={allowNsfwContent.nsfw ? Colors.green[500] : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={allowNsfwContent.nsfw}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default AdultFilterSettings;
