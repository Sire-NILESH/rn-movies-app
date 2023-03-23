import ReduxCollectionSliceBuilder from "../components/builders/ReduxCollectionSliceBuilder";

// Favourites Media List is an Object which is a collection of objects of type  IReduxListMedia. We chose this as an object because it will be easier to look up into objects with an id than traversing through an Array of objects.

const favouritesSlice = ReduxCollectionSliceBuilder("favourites");

export const {
  addMediaToCollection: addMediaToFavouriteList,
  removeMediaFromCollection: removeMediaFromFavouriteList,
} = favouritesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const favouriteMedias = (state: RootState) => state.favouriteMedias;

const favouriteListReducer = favouritesSlice.reducer;
export default favouriteListReducer;
