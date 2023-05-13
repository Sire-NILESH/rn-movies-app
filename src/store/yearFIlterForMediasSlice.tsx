import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IDropdownYearsObj } from "../../types/typings";

// Define the initial state using that type
const initialState: IDropdownYearsObj = {
  year: 0,
  value: "All years",
};
// Create the Slice
const defaultYearFilterForMediasSlice = createSlice({
  name: "defaultYearFIlterForMedias",
  initialState: initialState,
  reducers: {
    setDefaultYearFilterForMedias: (
      state,
      action: PayloadAction<IDropdownYearsObj>
    ) => {
      //   set a default year filter of the type 'number' directly on the state object
      return Object.assign(state, action.payload);
    },
  },
});

export const { setDefaultYearFilterForMedias } =
  defaultYearFilterForMediasSlice.actions;

const defaultYearFilterForMediasReducer =
  defaultYearFilterForMediasSlice.reducer;
export default defaultYearFilterForMediasReducer;
