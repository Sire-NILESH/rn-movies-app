import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISearchHistoryItem } from "../../types/typings";

const initialState: ISearchHistoryItem[] = [];

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: initialState,
  reducers: {
    addSearchHistoryItem: (
      state,
      { payload }: PayloadAction<ISearchHistoryItem>
    ) => {
      const idx = state.findIndex((s) => s.itemName === payload.itemName);

      //  add to history only if it doesnt already exist
      if (idx === -1) {
        state.unshift({
          id: payload.id,
          itemName: payload.itemName,
          itemType: payload.itemType,
        });
      } else {
        const temp = state[idx];
        state.splice(idx, 1);
        state.unshift(temp);
      }

      //  we only keep 10 most recent search history items
      if (state.length > 10) {
        state.pop();
      }
    },

    removeSearchHistoryItem: (
      state,
      { payload }: PayloadAction<ISearchHistoryItem>
    ) => {
      const idx = state.findIndex((s) => s.itemName === payload.itemName);

      if (idx !== null || undefined) {
        state.splice(idx, 1);
      }
    },
  },
});

export const { addSearchHistoryItem, removeSearchHistoryItem } =
  searchHistorySlice.actions;

const searchHistorySliceReducer = searchHistorySlice.reducer;
export default searchHistorySliceReducer;
