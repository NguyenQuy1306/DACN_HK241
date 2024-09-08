import MainLayout from "../Layouts/MainLayout";

import Login from "../Pages/Login";
import LoginLayout from "../Layouts/LoginLayout";
import Register from "../Pages/Register/index";
import Devices from "../Pages/Devices/Devices";
import Dashboard from "../Pages/Dashboard/Dashboard"
import Dashboard2 from "../Pages/Dashboard2/Dashboard2"
import Scheduler from "../Pages/scheduler/scheduler";
import NotFound from "../Pages/NotFound";
import SchedulerComponent from "../Pages/scheduler/testnode";
import CropComponent from "../Pages/Crop/crop";
import HistoryComponent from "../Pages/History/history";
import Zones from "../Pages/Zone/Zone";
import ZoneDetails from "../Pages/Zone/ZoneDetails";

export const routes = [
  // {
  //   path: '/Dashboard' , 
  //   component: Dashboard, 
  //   layout: MainLayout
  // },
  {
    path: "/Login",
    component: Login,
    layout: LoginLayout,
  },
  // {
  //   path: '/Dashboard' , component: Dashboard, layout: MainLayout
  // },
  {
    path: '/Dashboard' , component: Dashboard2, layout: MainLayout
  },
  {
    path: "/Register",
    component: Register,
    layout: LoginLayout,
  },
  {
    path: "/History",
    component: HistoryComponent,
    layout: MainLayout,
  },
  {
    path: "/devices",
    component: Devices,
    layout: MainLayout,
  },
  {
    path: "/zone_details/:id",
    component: ZoneDetails,
    layout: MainLayout,
  },
  {
    path: "/scheduler",
    component: Scheduler,
    layout: MainLayout,
  },
  {
    path: "/Crop",
    component: CropComponent,
    layout: MainLayout,
  },
  {
    path: "/zones",
    component: Zones,
    layout: MainLayout,
  },
  {
    path: "*",
    component: NotFound,
    layout: null,
  },
];