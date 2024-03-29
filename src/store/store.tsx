import { combineReducers, configureStore } from "@reduxjs/toolkit";
import defaultRegionSliceReducer from "./defaultRegionSlice";
import defaultLanguageForMediasReducer from "./languageForMediasSlice";
import defaultYearFilterForMediasReducer from "./yearFIlterForMediasSlice";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import allowNsfwContentReducer from "./allowNsfwContentSlice";
import blurHomeScreenBannerReducer from "./blurHomeScreenBannerSlice";
import thumbnailTextSettingReducer from "./thumbnailTextSettingSlice";
import searchHistorySliceReducer from "./searchHistorySlice";
import dbCollectionModifiedReducer from "./dbCollectionModifiedSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  blacklist: ["dBUpdatedTimeStamp"],
};

const rootReducer = combineReducers({
  defaultRegion: defaultRegionSliceReducer,
  defaultLanguageForMedias: defaultLanguageForMediasReducer,
  defaultYearFilterForMedias: defaultYearFilterForMediasReducer,
  allowNsfwContent: allowNsfwContentReducer,
  blurHomeScreenBanner: blurHomeScreenBannerReducer,
  thumbnailTextSetting: thumbnailTextSettingReducer,
  searchHistory: searchHistorySliceReducer,
  dBUpdatedTimeStamp: dbCollectionModifiedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: { ...persistedReducer, isDBUpdated: dbCollectionModifiedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// redux persist
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
