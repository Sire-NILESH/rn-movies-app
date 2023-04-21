import AsyncStorage from "@react-native-async-storage/async-storage";
import { IImageItemQualitySetting, IImageQuality } from "../../types/typings";

// interface IImageQuality {
//   quality: "Low" | "Medium" | "High" | "Very high";
//   value: "200" | "300" | "400" | "500";
// }

/** Thumbnail
 * Banner
 * Watch Providers
 * TV Network/Producers
 *
 */

// export type ImageItemTypes = "thumbnail" | "watchProviders" | "banner" | "companies";
// interface IImageItemSettingsValue {
//   //   name: string;
//   key: ImageItemTypes;
//   imgQuality: IImageQuality;
// }

// export type IImageItemQualitySetting = {
//   [key in ImageItemTypes]: IImageItemSettingsValue;
// };

export const initialImageQualitiesSettingsObj: IImageItemQualitySetting = {
  thumbnail: {
    //  name: "Thumbnail",
    key: "thumbnail",
    imgQuality: {
      quality: "Very high",
      value: "500",
    },
  },
  watchProviders: {
    //  name: "Watch Providers",
    key: "watchProviders",
    imgQuality: {
      quality: "Very high",
      value: "500",
    },
  },
  banner: {
    //  name: "Banner",
    key: "banner",
    imgQuality: {
      quality: "Very high",
      value: "500",
    },
  },
  companies: {
    //  name: "TV Network/Producers",
    key: "companies",
    imgQuality: {
      quality: "Very high",
      value: "500",
    },
  },
};

type TAsyncStorageKeys = "@storage_imgSettings";
type TAllowedStorageObjs = IImageItemQualitySetting;

// Storing string value
// const storeStringData = async (value : string) => {
//   try {
//     await AsyncStorage.setItem("@storage_Key", value);
//   } catch (e) {
//     // saving error
//   }
// };

// Storing object value
export const storeObjectData = async (
  storageObj: TAllowedStorageObjs,
  storageKey: TAsyncStorageKeys
) => {
  try {
    const jsonValue = JSON.stringify(storageObj);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (err) {
    // saving error
    throw err;
  }
};

// Reading string value
// const getStringData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("@storage_Key");
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

// Reading object value
export const getObjData = async (storageKey: TAsyncStorageKeys) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    // error reading value
    throw err;
  }
};
