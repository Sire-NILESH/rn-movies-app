import AboutScreen from "../../screens/AboutScreen";
import CollectionMediaMoreInfo from "../../screens/CollectionMediaMoreInfo";
import FranchiseCollection from "../../screens/FranchiseCollection";
import MoreInfoScreen from "../../screens/MoreInfo";
import PersonMediasStackScreen from "../../screens/PersonMediasStackScreen";
import RelatedTileListScreen from "../../screens/RelatedTileListScreen";
import SearchScreen from "../../screens/Search";
import SearchTileListScreen from "../../screens/SearchTileListScreen";
import SeasonsStackScreen from "../../screens/SeasonsStackScreen";
import TileListScreen from "../../screens/TileList";
import TrailerScreen from "../../screens/TrailerScreen";
import WatchProviderStackScreen from "../../screens/WatchProviderStackScreen";
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
    name: "Person Medias",
    component: PersonMediasStackScreen,
  },
  {
    name: "Watch Provider",
    component: WatchProviderStackScreen,
  },
  {
    name: "About",
    component: AboutScreen,
  },
  {
    name: "FranchiseCollection",
    component: FranchiseCollection,
  },
  {
    name: "SeasonsStackScreen",
    component: SeasonsStackScreen,
  },
];
