import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { IReduxListMedia } from "../typings";
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
