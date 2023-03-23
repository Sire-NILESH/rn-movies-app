import ReduxCollectionSliceBuilder from "../components/builders/ReduxCollectionSliceBuilder";

// Watchlist is an Object which is a collection of objects of type  IReduxListMedia. We chose this as an object because it will be easier to look up into objects with an id than traversing through an Array of objects.

const watchlistSlice = ReduxCollectionSliceBuilder("watchlist");

export const {
  addMediaToCollection: addMediaToWatchlist,
  removeMediaFromCollection: removeMediaFromWatchlist,
} = watchlistSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const watchlistMedias = (state: RootState) => state.watchlistMedias;

const watchlistReducer = watchlistSlice.reducer;
export default watchlistReducer;
