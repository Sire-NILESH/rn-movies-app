import CollectionMediaMoreInfo from "../../screens/CollectionMediaMoreInfo";
import MoreInfoScreen from "../../screens/MoreInfo";
import RelatedTileListScreen from "../../screens/RelatedTileListScreen";
import SearchScreen from "../../screens/Search";
import SearchTileListScreen from "../../screens/SearchTileListScreen";
import SeasonsAndEpisodesListScreen from "../../screens/SeasonsAndEpisodesListScreen";
import TileListScreen from "../../screens/TileList";
import TrailerScreen from "../../screens/TrailerScreen";
import { IStackRouteProps } from "../RouteProps";

export const stackRoutes: IStackRouteProps[] = [
  {
    name: "Search",
    component: SearchScreen,
  },
  {
    name: "More Info",
    component: MoreInfoScreen,
  },
  {
    name: "CollectionMoreInfo",
    component: CollectionMediaMoreInfo,
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
