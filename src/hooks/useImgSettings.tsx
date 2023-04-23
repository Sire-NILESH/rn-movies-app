import { useEffect, useState } from "react";
import {
  IImageItemSettingsValue,
  TAllImgSettingsDB,
} from "../../types/typings";
import { addImgItemSetting, getdataFromACollection } from "../storage/database";

/**A Hook to get all the Stored Image quality settings data from the DB
 *
//  * @returns {IReturnType} {allImgItemsSettings, errorGettingImgSettings, setImgItemQualitySettings}
 */
const useImgSettings = () => {
  const [allImgItemsSettings, setAllImageItemsSettings] =
    useState<TAllImgSettingsDB>([]);
  const [errorImgSettings, setErrorImgSettings] = useState<Error | null>(null);

  useEffect(() => {
    async function getAllImgSettingsFromDB() {
      try {
        setErrorImgSettings(null);
        const imgSettings = await getdataFromACollection("image_qualities");
        if (imgSettings.rows.length > 0) {
          setAllImageItemsSettings(imgSettings.rows._array);
        }
      } catch (err) {
        setErrorImgSettings(err as Error);
      }
    }

    // exe the function
    getAllImgSettingsFromDB();
  }, []);

  // async function getImgSettingsFromDB(imgItem: ImageItemTypes) {
  //   try {
  //     setErrorImgSettings(null);
  //     const imgSettings = await getImgItemSetting(imgItem);
  //     if (imgSettings.rows.length > 0) {
  //       return imgSettings.rows._array as TAllImgSettingsDB;
  //     }
  //   } catch (err) {
  //     setErrorImgSettings(err as Error);
  //   }
  // }

  // getImgItemSetting();

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
    // getAllImgSettingsFromDB,
  };
};

export default useImgSettings;
