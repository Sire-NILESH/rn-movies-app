import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MediaTypes, TDbCollectionType } from "../../types/typings";

type TForceUpdate = {
  forceUpdate: {
    timeStamp: number | null;
  };
};

type TDBUpdateStatus = {
  [key in TDbCollectionType]: {
    [key in MediaTypes]: { timeStamp: number | null };
  };
};

type TDBChange = TDBUpdateStatus & TForceUpdate;

// type TActionType = {
//    [K in TDbCollectionType]: Record<K, { timeStamp: number | null }>
// }[TDbCollectionType];

type TActionPayload = {
  collectionType: TDbCollectionType;
  mediaType: MediaTypes;
};

// Define the initial state
const initialState: TDBChange = {
  forceUpdate: {
    timeStamp: null,
  },
  watchlist: {
    movie: { timeStamp: null },
    tv: { timeStamp: null },
    multi: { timeStamp: null },
  },
  favourites: {
    movie: { timeStamp: null },
    tv: { timeStamp: null },
    multi: { timeStamp: null },
  },
  watched: {
    movie: { timeStamp: null },
    tv: { timeStamp: null },
    multi: { timeStamp: null },
  },
};

// Create the Slice
const dbCollectionModifiedSlice = createSlice({
  name: "dBUpdatedTimeStamp",
  initialState: initialState,
  reducers: {
    setDbCollectionModified: (state, action: PayloadAction<TActionPayload>) => {
      //   set a action payload directly on the state object
      state[action.payload.collectionType][action.payload.mediaType].timeStamp =
        Date.now();
    },
    forceUpdateDbCollectionModified: (state, _action: PayloadAction<void>) => {
      state.forceUpdate.timeStamp = Date.now();
      //  const forceUpdateTimeStamp = new Date()
    },
  },
});

export const { setDbCollectionModified, forceUpdateDbCollectionModified } =
  dbCollectionModifiedSlice.actions;

const dbCollectionModifiedReducer = dbCollectionModifiedSlice.reducer;
export default dbCollectionModifiedReducer;
