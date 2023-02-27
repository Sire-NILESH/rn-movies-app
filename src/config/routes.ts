import IRouteProps from "../library/RouteProps";
import HomeScreen from "../screens/Home";
import MoreInfoScreen from "../screens/MoreInfo";
import MoviesScreen from "../screens/Movies";
import TvShowsScreen from "./../screens/TvShows";
import SearchScreen from "./../screens/Search";
import TileListScreen from "../screens/TileList";
import RelatedTileListScreen from "../screens/RelatedTileListScreen";
import TrailerScreen from "../screens/TrailerScreen";

const routes: IRouteProps[] = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Movies",
    component: MoviesScreen,
  },
  {
    name: "TV Shows",
    component: TvShowsScreen,
  },
  {
    name: "Search Screen",
    component: SearchScreen,
  },
  {
    name: "More Info",
    component: MoreInfoScreen,
  },
  {
    name: "Tiles",
    component: TileListScreen,
  },
  {
    name: "Related",
    component: RelatedTileListScreen,
  },
  {
    name: "Trailer",
    component: TrailerScreen,
  },
];

export default routes;
