import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IImageItemQualitySetting } from "../../types/typings";
import { initialImageQualitiesSettingsObj } from "../utils/helpers/helper";

// Create the Slice
const imageQualitySlice = createSlice({
  name: "imageQuality",
  initialState: initialImageQualitiesSettingsObj,
  reducers: {
    setDefaultImageQuality: (
      state,
      action: PayloadAction<IImageItemQualitySetting>
    ) => {
      //   set a default image quality of type IImageQuality directly on the state object
      return Object.assign(state, action.payload);
    },
  },
});

export const { setDefaultImageQuality } = imageQualitySlice.actions;

const imageItemQualityReducer = imageQualitySlice.reducer;
export default imageItemQualityReducer;
