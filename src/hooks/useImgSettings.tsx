import { useEffect, useState } from "react";
import {
  IImageItemSettingsValue,
  IImgItemSettingsDB,
  ImageItemTypes,
} from "../../types/typings";
import {
  addImgItemSetting,
  getdataFromATableFromDB,
} from "../storage/database";

type TTempImgSettingsObj = {
  [key in ImageItemTypes]: IImgItemSettingsDB;
};

/**A Hook to get all the Stored Image quality settings data from the DB
 *
//  * @returns {IReturnType} {allImgItemsSettings, errorGettingImgSettings, setImgItemQualitySettings}
 */
const useImgSettings = () => {
  const [allImgItemsSettings, setAllImageItemsSettings] =
    useState<TTempImgSettingsObj>();
  const [errorImgSettings, setErrorImgSettings] = useState<Error | null>(null);

  useEffect(() => {
    async function getAllImgSettingsFromDB() {
      try {
        setErrorImgSettings(null);
        const imgSettings = await getdataFromATableFromDB(
          "image_qualities",
          "settingsDatabase"
        );
        if (imgSettings.rows.length > 0) {
          const result = imgSettings.rows._array;
          let temp: TTempImgSettingsObj = {} as TTempImgSettingsObj;
          result.forEach(function (item: IImgItemSettingsDB) {
            temp[item.name] = item;
          });
          setAllImageItemsSettings(temp);
        }
      } catch (err) {
        setErrorImgSettings(err as Error);
      }
    }

    // exe the function
    getAllImgSettingsFromDB();
  }, []);

  /**
   * Function to set an image quality setting for a specific supported image type.
   *
   */
  const setImgItemQualitySettings = async (
    newImgSetting: IImageItemSettingsValue
  ) => {
    try {
      await addImgItemSetting(newImgSetting);
    } catch (err) {
      setErrorImgSettings(err as Error);
    }
  };

  return {
    allImgItemsSettings,
    errorImgSettings,
    setImgItemQualitySettings,
  };
};

export default useImgSettings;
