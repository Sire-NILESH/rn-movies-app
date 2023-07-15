import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  ICountry,
  IDropdownYearsObj,
  ISearchHistoryItem,
  ISupportedLang,
} from "../../types/typings";

import { setDefaultRegion } from "../store/defaultRegionSlice";
import { setDefaultLanguageForMedias } from "../store/languageForMediasSlice";
import { setDefaultYearFilterForMedias } from "../store/yearFIlterForMediasSlice";
import { toggleAllowNsfwContent } from "../store/allowNsfwContentSlice";
import { toggleBlurHomeScreenBanner } from "../store/blurHomeScreenBannerSlice";
import { toggleThumbnailText } from "../store/thumbnailTextSettingSlice";
import {
  addSearchHistoryItem,
  removeSearchHistoryItem,
} from "../store/searchHistorySlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDefaultRegionHooks = () => {
  // REDUX TOOLKIT HOOKS
  const defaultRegion = useAppSelector((state) => state.defaultRegion);
  const dispatch = useAppDispatch();

  const setDefaultRegionHandler = (country: ICountry) => {
    dispatch(setDefaultRegion(country));
  };

  return {
    setDefaultRegionHandler,
    defaultRegion,
  };
};

export const useDefaultLanguageHooks = () => {
  // REDUX TOOLKIT HOOKS
  const defaultLanguage = useAppSelector(
    (state) => state.defaultLanguageForMedias
  );
  const dispatch = useAppDispatch();

  const setDefaultLanguageHandler = (language: ISupportedLang) => {
    dispatch(setDefaultLanguageForMedias(language));
  };

  return {
    setDefaultLanguageHandler,
    defaultLanguage,
  };
};

export const useDefaultYearHooks = () => {
  // REDUX TOOLKIT HOOKS
  const defaultYear = useAppSelector(
    (state) => state.defaultYearFilterForMedias
  );
  const dispatch = useAppDispatch();

  const setDefaultYearHandler = (yearObj: IDropdownYearsObj) => {
    dispatch(setDefaultYearFilterForMedias(yearObj));
  };

  return {
    setDefaultYearHandler,
    defaultYear,
  };
};

export const useAllowNsfwContentHooks = () => {
  // REDUX TOOLKIT HOOKS
  const allowNsfwContent = useAppSelector((state) => state.allowNsfwContent);
  const dispatch = useAppDispatch();

  const toggleAllowNsfwContentHandler = () => {
    dispatch(toggleAllowNsfwContent());
  };

  return {
    toggleAllowNsfwContentHandler,
    allowNsfwContent,
  };
};

export const useBlurHomeScreenBannerHooks = () => {
  // REDUX TOOLKIT HOOKS
  const isHomeScreenBannerBlur = useAppSelector(
    (state) => state.blurHomeScreenBanner
  );
  const dispatch = useAppDispatch();

  const toggleBlurHomeScreenBannerHandler = () => {
    dispatch(toggleBlurHomeScreenBanner());
  };

  return {
    toggleBlurHomeScreenBannerHandler,
    isHomeScreenBannerBlur,
  };
};

export const useThumbnailTextSettingHooks = () => {
  // REDUX TOOLKIT HOOKS
  const isThumbnailText = useAppSelector((state) => state.thumbnailTextSetting);
  const dispatch = useAppDispatch();

  const toggleThumbnailTextHandler = () => {
    dispatch(toggleThumbnailText());
  };

  return {
    toggleThumbnailTextHandler,
    isThumbnailText,
  };
};

export const useSearchHistoryHooks = () => {
  // REDUX TOOLKIT HOOKS
  const searchHistory = useAppSelector((state) => state.searchHistory);
  const dispatch = useAppDispatch();

  const addSearchHistoryItemHandler = (
    seachHistoryItem: ISearchHistoryItem
  ) => {
    dispatch(addSearchHistoryItem(seachHistoryItem));
  };

  const removeSearchHistoryItemHandler = (
    seachHistoryItem: ISearchHistoryItem
  ) => {
    dispatch(removeSearchHistoryItem(seachHistoryItem));
  };

  return {
    searchHistory,
    addSearchHistoryItemHandler,
    removeSearchHistoryItemHandler,
  };
};
