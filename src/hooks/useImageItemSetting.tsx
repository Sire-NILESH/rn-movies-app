import React, { useEffect, useState } from "react";
import {
  IImageItemSettingsValue,
  IImgItemSettingsDB,
  ImageItemTypes,
  TAllImgSettingsDB,
} from "../../types/typings";
import {
  addImgItemSetting,
  getImgItemSetting,
  // getImgItemSetting,
  getdataFromACollection,
} from "../storage/database";

// interface IProps {
//   imgItem: ImageItemTypes;
// }

/**A Hook to get all the Stored Image quality settings data from the DB
 *
 */
const useImageItemSetting = (imgItem: ImageItemTypes) => {
  const [imgItemsSetting, setImageItemSetting] = useState<IImgItemSettingsDB>();
  const [errorImgSettings, setErrorImgSettings] = useState<Error | null>(null);

  useEffect(() => {
    async function getAllImgSettingsFromDB() {
      try {
        setErrorImgSettings(null);
        const imgSettings = await getImgItemSetting(imgItem);
        if (imgSettings.rows.length > 0) {
          setImageItemSetting(imgSettings.rows._array[0]);
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
    imgItemsSetting,
    errorImgSettings,
    setImgItemQualitySettings,
    // getAllImgSettingsFromDB,
  };
};

export default useImageItemSetting;
