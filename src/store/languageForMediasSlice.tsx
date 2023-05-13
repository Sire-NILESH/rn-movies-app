import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISOLang } from "../../types/typings";

// Define the initial state using that type
const initialState: ISOLang = {
  name: "English",
  nativeName: "English",
  iso639_1: "en",
  iso639_2T: "eng",
  iso639_2B: "eng",
};

// Create the Slice
const defaultLanguageForMediasSlice = createSlice({
  name: "defaultLanguageForMedias",
  initialState: initialState,
  reducers: {
    setDefaultLanguageForMedias: (state, action: PayloadAction<ISOLang>) => {
      //   set a default language of the type 'ISOLang' directly on the state object
      state.name = action.payload.name;
      state.nativeName = action.payload.nativeName;
      state.iso639_1 = action.payload.iso639_1;
      state.iso639_2T = action.payload.iso639_2T;
      state.iso639_2B = action.payload.iso639_2T;
    },
  },
});

export const { setDefaultLanguageForMedias } =
  defaultLanguageForMediasSlice.actions;

const defaultLanguageForMediasReducer = defaultLanguageForMediasSlice.reducer;
export default defaultLanguageForMediasReducer;
