import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IReduxListMedia } from "../../../types/typings";

// Collection List is an Object which is a collection of objects of type  IReduxListMedia. We chose this as an object because it will be easier to look up into objects with an id than traversing through an Array of objects.

// Define the initial state using that type
const initialState: {
  [mediaId: number]: IReduxListMedia;
} = {};

const ReduxCollectionSliceBuilder = (sliceName: string) => {
  // Create the Slice
  const collectionSlice = createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
      addMediaToCollection: (state, action: PayloadAction<IReduxListMedia>) => {
        //   set a key from payload's 'mediaId' property and its value as the media
        state[action.payload.mediaId] = action.payload;
      },
      removeMediaFromCollection: (
        state,
        action: PayloadAction<{ mediaId: number }>
      ) => {
        //  simply look up for that mediaId and delete it from the collection which is a type of an Object.
        delete state[action.payload.mediaId];
      },
    },
  });

  return collectionSlice;
};

export default ReduxCollectionSliceBuilder;
