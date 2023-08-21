import { Text } from "react-native";
import { useCallback } from "react";
import { getStorageObjectValue } from "../storage/asyncStorageAPI";

const setFontScalingGlobally = (value: boolean) => {
  // @ts-ignore
  Text.defaultProps = {
    // @ts-ignore
    ...Text.defaultProps,
    allowFontScaling: value,
    maxFontSizeMultiplier: 1, // larger font sizes are not supported
  };
};

const useFontSettings = () => {
  const loadGlobalFontSettings = useCallback(() => {
    async function getAllowFontScalingSettings() {
      try {
        const response = await getStorageObjectValue("@allowFontScaling");

        if (response === null) {
          setFontScalingGlobally(true);
        } else {
          setFontScalingGlobally(response.allowFontScaling);
        }
      } catch (err) {
        setFontScalingGlobally(true);
      }
    }

    getAllowFontScalingSettings();
  }, []);

  return loadGlobalFontSettings;
};

export default useFontSettings;
