import IRouteProps from "../library/RouteProps";
import AboutScreen from "../screens/About";
import ContactScreen from "../screens/Contacts";
import HomeScreen from "../screens/Home";

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
];

export default routes;
