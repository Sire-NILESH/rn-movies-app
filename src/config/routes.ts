import IRouteProps from "../library/RouteProps";
import AboutScreen from "../screens/About";
import ContactScreen from "../screens/Contacts";
import HomeScreen from "../screens/Home";
import MoreInfoScreen from "../screens/MoreInfo";
import MoviesScreen from "../screens/Movies";
import TvShowsScreen from "./../screens/TvShows";
import SearchScreen from "./../screens/Search";

const routes: IRouteProps[] = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "About",
    component: AboutScreen,
  },
  {
    name: "Contact",
    component: ContactScreen,
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
];

export default routes;
