import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IDropdownYearsObj,
  IImageItemQualitySetting,
  IImageQuality,
} from "../../types/typings";
import { initialImageQualitiesSettingsObj } from "../storage/asyncStorage";

// interface IImageQuality {
//   quality: "Low" | "Medium" | "High" | "Very high";
//   value: "200" | "300" | "400" | "500";
// }

// Define the initial state using that type
// const initialState: IImageQuality = {
//   quality: "Very high",
//   value: "500",
// };

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
