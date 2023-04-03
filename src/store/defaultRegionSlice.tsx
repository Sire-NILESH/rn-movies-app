import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICountry } from "../../types/typings";
import { RootState } from "./store";

// Define the initial state using that type
const initialState: ICountry = {
  name: "United States",
  code: "US",
};

// Create the Slice
const defaultRegionSlice = createSlice({
  name: "defaultRegion",
  initialState: initialState,
  reducers: {
    setDefaultRegion: (state, action: PayloadAction<ICountry>) => {
      //   set a default region of the type 'ICountry' directly on the state object
      state = Object.assign(state, {
        name: action.payload.name,
        code: action.payload.code,
      });
    },
  },
});

export const { setDefaultRegion } = defaultRegionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const defaultRegion = (state: RootState) => state.defaultRegion;

const defaultRegionSliceReducer = defaultRegionSlice.reducer;
export default defaultRegionSliceReducer;
