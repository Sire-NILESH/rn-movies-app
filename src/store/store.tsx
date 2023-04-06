import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistSlice";
import watchedMediaListReducer from "./watchedMediaListSlice";
import favouriteListReducer from "./favouritesSlice";
import defaultRegionSliceReducer from "./defaultRegionSlice";
import defaultLanguageForMediasReducer from "./languageForMediasSlice";
import defaultYearFilterForMediasReducer from "./yearFIlterForMediasSlice";

export const store = configureStore({
  reducer: {
    watchlistMedias: watchlistReducer,
    watchedMedias: watchedMediaListReducer,
    favouriteMedias: favouriteListReducer,
    defaultRegion: defaultRegionSliceReducer,
    defaultLanguageForMedias: defaultLanguageForMediasReducer,
    defaultYearFilterForMedias: defaultYearFilterForMediasReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
