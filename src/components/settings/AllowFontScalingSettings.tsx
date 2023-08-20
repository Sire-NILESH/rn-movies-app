import { useCallback, useEffect, useState } from "react";
import SettingsCardWrapper from "./SettingsCardWrapper";
import CardRow from "./CardRow";
import CustomSwitch from "../ui/CustomSwitch";
import {
  TAllowFontScaling,
  getStorageObjectValue,
  storeObjectData,
} from "../../storage/asyncStorageAPI";

const AllowFontScalingSettings = () => {
  const [allowFontScaling, setAllowFontScaling] =
    useState<TAllowFontScaling | null>();

  const toggleSwitch = useCallback(async () => {
    const toggleTo = {
      allowFontScaling: !allowFontScaling?.allowFontScaling,
    };

    try {
      await storeObjectData("@allowFontScaling", toggleTo);
      setAllowFontScaling(toggleTo);
    } catch (err) {}
  }, [allowFontScaling]);

  useEffect(() => {
    async function getAllowFontScalingSettings() {
      try {
        const response = await getStorageObjectValue("@allowFontScaling");

        if (response === null) {
          setAllowFontScaling({
            allowFontScaling: false,
          });
        } else {
          setAllowFontScaling({
            allowFontScaling: response.allowFontScaling,
          });
        }
      } catch (err) {
        setAllowFontScaling({
          allowFontScaling: false,
        });
      }
    }

    getAllowFontScalingSettings();
  }, []);

  return (
    <SettingsCardWrapper
      iconName="search"
      title="Font scaling"
      subtitle={`When enabled, will follow device's font size settings. Requires a manual app restart. Only works for smaller font sizes.`}
    >
      <CardRow rowTitle="Allow Font Scaling">
        <CustomSwitch
          stateValue={
            allowFontScaling === null || allowFontScaling === undefined
              ? false
              : allowFontScaling.allowFontScaling
          }
          toggleHandler={toggleSwitch}
        />
      </CardRow>
    </SettingsCardWrapper>
  );
};

export default AllowFontScalingSettings;
