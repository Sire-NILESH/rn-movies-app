import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICountry } from "../../types/typings";
import { defaultRegionConfig } from "../config/defaultRegion";

// Define the initial state using that type
const initialState: ICountry = defaultRegionConfig;

// Create the Slice
const defaultRegionSlice = createSlice({
  name: "defaultRegion",
  initialState: initialState,
  reducers: {
    setDefaultRegion: (state, action: PayloadAction<ICountry>) => {
      //   set a default region of the type 'ICountry' directly on the state object
      state.name = action.payload.name;
      state.code = action.payload.code;
    },
  },
});

export const { setDefaultRegion } = defaultRegionSlice.actions;

const defaultRegionSliceReducer = defaultRegionSlice.reducer;
export default defaultRegionSliceReducer;
