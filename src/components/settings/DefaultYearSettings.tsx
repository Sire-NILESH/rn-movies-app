import React from "react";
import CardRow from "./CardRow";
import YearsDropdown from "../ui/YearsDropdown";
import SettingsCardWrapper from "./SettingsCardWrapper";

const DefaultYearSettings = () => {
  return (
    <SettingsCardWrapper
      iconName="calendar"
      title="Default Year"
      subtitle={`Set a default year to find medias released in that year.`}
    >
      <CardRow rowTitle="Select a Year">
        <YearsDropdown saveMode="applicationWide" />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default DefaultYearSettings;
