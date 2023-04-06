import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: number = Number(new Date(Date.now()).getFullYear());
// Create the Slice
const defaultYearFilterForMediasSlice = createSlice({
  name: "defaultYearFIlterForMedias",
  initialState: initialState,
  reducers: {
    setDefaultYearFilterForMedias: (state, action: PayloadAction<number>) => {
      //   set a default year filter of the type 'number' directly on the state object
      return (state = action.payload as number);
    },
  },
});

export const { setDefaultYearFilterForMedias } =
  defaultYearFilterForMediasSlice.actions;

const defaultYearFilterForMediasReducer =
  defaultYearFilterForMediasSlice.reducer;
export default defaultYearFilterForMediasReducer;
