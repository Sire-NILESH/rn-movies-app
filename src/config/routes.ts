import IRouteProps from "../library/RouteProps";
import HomeScreen from "../screens/Home";
import MoreInfoScreen from "../screens/MoreInfo";
import MoviesScreen from "../screens/Movies";
import TvShowsScreen from "./../screens/TvShows";
import SearchScreen from "./../screens/Search";
import TileListScreen from "../screens/TileList";

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
];

export default routes;
