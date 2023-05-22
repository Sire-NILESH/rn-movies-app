import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISupportedLang } from "../../types/typings";

// Define the initial state using that type
const initialState: ISupportedLang = {
  name: "All Languages",
  english_name: "All Languages",
  iso_639_1: "",
};

// Create the Slice
const defaultLanguageForMediasSlice = createSlice({
  name: "defaultLanguageForMedias",
  initialState: initialState,
  reducers: {
    setDefaultLanguageForMedias: (
      state,
      action: PayloadAction<ISupportedLang>
    ) => {
      //   set a default language of the type 'ISOLang' directly on the state object
      state.name = action.payload.name;
      state.iso_639_1 = action.payload.iso_639_1;
      state.english_name = action.payload.english_name;
    },
  },
});

export const { setDefaultLanguageForMedias } =
  defaultLanguageForMediasSlice.actions;

const defaultLanguageForMediasReducer = defaultLanguageForMediasSlice.reducer;
export default defaultLanguageForMediasReducer;
