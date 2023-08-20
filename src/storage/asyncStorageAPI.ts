import AsyncStorage from "@react-native-async-storage/async-storage";

type TAllowedStorageKey = "@allowFontScaling";

// type TAllowedStringStorageValue = "true" | "false";

export type TAllowFontScaling = {
  allowFontScaling: boolean;
};

type TAllowedObjectStorageValue = TAllowFontScaling;

/**
 * @description Stores a string value in the async storage
 * @param [TAllowedStorageKey] key : The key of the value to be stored
 * @param [string] value : The value to be stored
 */
export const storeStringData = async (
  key: TAllowedStorageKey,
  value: string
) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

/**
 * @description Stores a Object value in the async storage
 * @param [TAllowedStorageKey] key : The key of the value to be stored
 * @param [TAllowedObjectStorageValue] value : The value to be stored
 */
export const storeObjectData = async (
  key: TAllowedStorageKey,
  value: TAllowedObjectStorageValue
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

/**
 * @description Read a String value in the async storage
 * @param [TAllowedStorageKey] key : The key of the value to be read from the storage.
 * @returns [string | null | undefined]
 */
export const getStorageStringValue = async (
  key: TAllowedStorageKey
): Promise<string | null | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    // read error
  }
};

/**
 * @description Read a Object value in the async storage
 * @param [TAllowedStorageKey] key : The key of the value to be read from the storage.
 * @returns [TAllowedObjectStorageValue]
 */
export const getStorageObjectValue = async (key: TAllowedStorageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};
