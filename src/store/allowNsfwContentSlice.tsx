import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NSFWContentPermission {
  nsfw: boolean;
}

// Define the initial state using that type
const initialState: NSFWContentPermission = {
  nsfw: false,
};

// Create the Slice
const allowNsfwContentSlice = createSlice({
  name: "allowNsfw",
  initialState: initialState,
  reducers: {
    toggleAllowNsfwContent: (state, action: PayloadAction) => {
      //   set a action payload directly on the state object
      state.nsfw = !state.nsfw;
    },
  },
});

export const { toggleAllowNsfwContent } = allowNsfwContentSlice.actions;

const allowNsfwContentReducer = allowNsfwContentSlice.reducer;
export default allowNsfwContentReducer;
