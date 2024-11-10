import MainLayout from "../layouts/MainLayout";
import Search from "../pages/Search";
import DetailRestaurant from "../pages/DetailRestaurant";
import Home from "../pages/Home";
import FavoriteList from "../pages/FavoriteList";
import FilterIndex from "../components/FilterItem";
import RegisterRestaurant1 from "../pages/RegisterRestaurant1";
import RegisterRestaurant2 from "../pages/RegisterRestaurant2";
// import Register from "../Pages/Register/index";
// import Devices from "../Pages/Devices/Devices";
// import Dashboard from "../Pages/Dashboard/Dashboard"
// import Dashboard2 from "../Pages/Dashboard2/Dashboard2"
// import Scheduler from "../Pages/scheduler/scheduler";
// import NotFound from "../Pages/NotFound";
// import SchedulerComponent from "../Pages/scheduler/testnode";
// import CropComponent from "../Pages/Crop/crop";
// import HistoryComponent from "../Pages/History/history";
// import Zones from "../Pages/Zone/Zone";
// import ZoneDetails from "../Pages/Zone/ZoneDetails";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ViewImagepage from "../pages/ViewImagepage";
export const routes = [

  {
    path: "/Search",
    component: Search,
    layout: MainLayout,
  },
  {
    path: "/DetailRestaurant/:id",
    component: DetailRestaurant,
    layout: MainLayout,
  },
  {
    path: "/Home",
    component: Home,
    layout: MainLayout,
  },
  {
    path: "/favorite-list",
    component: FavoriteList,
    layout: MainLayout,
  },
  {
    path: "/register-restaurant",
    component: RegisterRestaurant1,
    layout: MainLayout,
  },

  {
    path: "/DetailRestaurant/:id/menuImages",
    component: ViewImagepage,
  },

  {
    path: "/Register",
    component: Register,
  },
  {
    path: "/Login",
    component: Login,
  },
  // {
  //   path: "*",
  //   component: NotFound,
  //   layout: null,
  // },

];
