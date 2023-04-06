import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { ICountry, IReduxListMedia, ISOLang } from "../../types/typings";
import {
  addMediaToWatchlist,
  removeMediaFromWatchlist,
} from "../store/watchlistSlice";
import {
  addMediaToWatchedMediaList,
  removeMediaFromWatchedMediaList,
} from "../store/watchedMediaListSlice";
import {
  addMediaToFavouriteList,
  removeMediaFromFavouriteList,
} from "../store/favouritesSlice";
import { setDefaultRegion } from "../store/defaultRegionSlice";
import { setDefaultLanguageForMedias } from "../store/languageForMediasSlice";
import { setDefaultYearFilterForMedias } from "../store/yearFIlterForMediasSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWatchlistHooks = () => {
  // REDUX TOOLKIT HOOKS
  const watchlistMedias = useAppSelector((state) => state.watchlistMedias);
  const dispatch = useAppDispatch();

  const isMediaWatchlisted = (mediaId: number) => {
    return watchlistMedias[mediaId] !== undefined;
  };

  const addMediaToWatchlistHandler = (mediaForWatchlist: IReduxListMedia) => {
    dispatch(addMediaToWatchlist(mediaForWatchlist));
  };

  const removeMediaFromWatchlistHandler = (mediaId: number) => {
    dispatch(removeMediaFromWatchlist({ mediaId }));
  };

  return {
    addMediaToWatchlistHandler,
    removeMediaFromWatchlistHandler,
    isMediaWatchlisted,
  };
};

export const useWatchedMediaListHooks = () => {
  // REDUX TOOLKIT HOOKS
  const watchedMedias = useAppSelector((state) => state.watchedMedias);
  const dispatch = useAppDispatch();

  const isMediaWatched = (mediaId: number) => {
    return watchedMedias[mediaId] !== undefined;
  };

  const addMediaToWatchedHandler = (
    mediaForWatchedMediasList: IReduxListMedia
  ) => {
    dispatch(addMediaToWatchedMediaList(mediaForWatchedMediasList));
  };

  const removeMediaFromWatchedHandler = (mediaId: number) => {
    dispatch(removeMediaFromWatchedMediaList({ mediaId }));
  };

  return {
    addMediaToWatchedHandler,
    removeMediaFromWatchedHandler,
    isMediaWatched,
  };
};

export const useFavouriteMediaListHooks = () => {
  // REDUX TOOLKIT HOOKS
  const favouriteMedias = useAppSelector((state) => state.favouriteMedias);
  const dispatch = useAppDispatch();

  const isMediaFavourite = (mediaId: number) => {
    return favouriteMedias[mediaId] !== undefined;
  };

  const addMediaToFavouriteHandler = (
    mediaForWatchedMediasList: IReduxListMedia
  ) => {
    dispatch(addMediaToFavouriteList(mediaForWatchedMediasList));
  };

  const removeMediaFromFavouriteHandler = (mediaId: number) => {
    dispatch(removeMediaFromFavouriteList({ mediaId }));
  };

  return {
    addMediaToFavouriteHandler,
    removeMediaFromFavouriteHandler,
    isMediaFavourite,
  };
};

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

  const setDefaultLanguageHandler = (language: ISOLang) => {
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

  const setDefaultLanguageHandler = (year: number) => {
    dispatch(setDefaultYearFilterForMedias(year));
  };

  return {
    setDefaultLanguageHandler,
    defaultYear,
  };
};
