import IconButton from "../../components/ui/IconButton";
import FavoritesScreen from "../../screens/Favorite";
import HomeScreen from "../../screens/Home";
import MoviesScreen from "../../screens/Movies";
import TvShowsScreen from "../../screens/TvShows";
import WatchedScreen from "../../screens/Watched";
import WatchlistScreen from "../../screens/Watchlist";
import { IDrawerRouteProps } from "../RouteProps";

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
    name: "Watchlist",
    component: WatchlistScreen,
    options: {
      title: "Watchlist",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="list"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },
  {
    name: "Favourites",
    component: FavoritesScreen,
    options: {
      title: "Favourites",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="heart-outline"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },
  {
    name: "Watched",
    component: WatchedScreen,
    options: {
      title: "Watched",
      drawerIcon: (props) => {
        return (
          <IconButton
            name="eye-outline"
            color={props.color}
            // size={props.size}
            size={20}
          />
        );
      },
    },
  },
];
