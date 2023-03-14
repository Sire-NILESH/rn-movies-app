import { IDrawerRouteProps, IStackRouteProps } from "../library/RouteProps";
import HomeScreen from "../screens/Home";
import MoreInfoScreen from "../screens/MoreInfo";
import MoviesScreen from "../screens/Movies";
import TvShowsScreen from "../screens/TvShows";
import SearchScreen from "../screens/Search";
import TileListScreen from "../screens/TileList";
import RelatedTileListScreen from "../screens/RelatedTileListScreen";
import TrailerScreen from "../screens/TrailerScreen";
import SeasonsAndEpisodesListScreen from "../screens/SeasonsAndEpisodesListScreen";
import SearchTileListScreen from "../screens/SearchTileListScreen";
import FavoritesScreen from "../screens/Favorite";
import IconButton from "../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";

// const routes: IRouteProps[] = [
export const stackRoutes: IStackRouteProps[] = [
  // {
  //   name: "Home",
  //   component: HomeScreen,
  // },
  // {
  //   name: "Movies",
  //   component: MoviesScreen,
  // },
  // {
  //   name: "TV Shows",
  //   component: TvShowsScreen,
  // },
  {
    name: "Search",
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
    name: "Search Tiles",
    component: SearchTileListScreen,
  },
  {
    name: "Trailer",
    component: TrailerScreen,
  },
  {
    name: "Season and Episodes",
    component: SeasonsAndEpisodesListScreen,
  },
  // {
  //   name: "Drawer",
  //   component: DrawerNavigator,
  // },
];

export const drawerRoutes: IDrawerRouteProps[] = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      title: "Home",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="home-outline"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },

  {
    name: "Movies",
    component: MoviesScreen,
    options: {
      title: "Movies",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="film-outline"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },

  {
    name: "TV Shows",
    component: TvShowsScreen,
    options: {
      title: "TV Shows",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="tv-outline"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },
  {
    name: "Favorites",
    component: FavoritesScreen,
    options: {
      title: "Favorites",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="star-outline"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },
];
