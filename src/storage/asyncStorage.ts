import AsyncStorage from "@react-native-async-storage/async-storage";
import { IImageQuality } from "../../types/typings";

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

type ImageItemTypes = "thumbnail" | "watchProviders" | "banner" | "companies";
interface IImageItemSettingsValue {
  //   name: string;
  key: ImageItemTypes;
  imgQuality: IImageQuality;
}

type IImageItemQualitySetting = {
  [key in ImageItemTypes]: IImageItemSettingsValue;
};

const imageQualitiesSettingsObj: IImageItemQualitySetting = {
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

// Storing string value
const storeStringData = async (value) => {
  try {
    await AsyncStorage.setItem("@storage_Key", value);
  } catch (e) {
    // saving error
  }
};

// Storing object value
export const storeObjectData = async (
  imgSettings: IImageItemQualitySetting,
  storageKey: TAsyncStorageKeys
) => {
  try {
    const jsonValue = JSON.stringify(imgSettings);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (err) {
    // saving error
    throw err;
  }
};

// Reading string value
const getStringData = async () => {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

// Reading object value
const getObjData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
