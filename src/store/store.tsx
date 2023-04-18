import { combineReducers, configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistSlice";
import watchedMediaListReducer from "./watchedMediaListSlice";
import favouriteListReducer from "./favouritesSlice";
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

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  // whitelist : ["defaultRegion", "defaultLanguageForMedias"]
};

const rootReducer = combineReducers({
  // watchlistMedias: watchlistReducer,
  // watchedMedias: watchedMediaListReducer,
  // favouriteMedias: favouriteListReducer,
  defaultRegion: defaultRegionSliceReducer,
  defaultLanguageForMedias: defaultLanguageForMediasReducer,
  defaultYearFilterForMedias: defaultYearFilterForMediasReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
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
