import MainLayout from "../layouts/MainLayout";
import Search from "../pages/Search";
import DetailRestaurant from "../pages/DetailRestaurant";
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
  // {
  //   path: "*",
  //   component: NotFound,
  //   layout: null,
  // },
];
