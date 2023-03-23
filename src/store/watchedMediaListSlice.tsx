import ReduxCollectionSliceBuilder from "../components/builders/ReduxCollectionSliceBuilder";

// Watched Media List is an Object which is a collection of objects of type  IReduxListMedia. We chose this as an object because it will be easier to look up into objects with an id than traversing through an Array of objects.

const watchedMediaListSlice = ReduxCollectionSliceBuilder("watched");

export const {
  addMediaToCollection: addMediaToWatchedMediaList,
  removeMediaFromCollection: removeMediaFromWatchedMediaList,
} = watchedMediaListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const watchedMediasList = (state: RootState) => state.watchedMedias;

const watchedMediaListReducer = watchedMediaListSlice.reducer;
export default watchedMediaListReducer;
