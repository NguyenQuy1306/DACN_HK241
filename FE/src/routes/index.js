import MainLayout from "../layouts/MainLayout";
import Search from "../pages/Search";
import DetailRestaurant from "../pages/DetailRestaurant";
import Home from "../pages/Home";
import FavoriteList from "../pages/FavoriteList";
import FilterIndex from "../components/FilterItem";
import RegisterRestaurant1 from "../pages/RegisterRestaurant1";
import RegisterRestaurant2 from "../pages/RegisterRestaurant2";
import ViewImagepage from "../pages/ViewImagepage";
import SearchResult from "../pages/SearchResult";
import OwnerDashboard from "../pages/Dashboard_Owner";
import OwnerLayout from "../layouts/OwnerLayout";

import ResultPayment from "../pages/ResultPayment/ResultPayment";
import DepositPolicy from "../pages/DepositPolicy/DepositPolicy";
import MenuAdd from "../pages/MenuAdd/MenuAdd";
export const routes = [
  {
    path: "/owner/menu/add",
    component: MenuAdd,
    layout: OwnerLayout,
  },
  {
    path: "/deposit-policy",
    component: DepositPolicy,
    layout: MainLayout,
  },
  {
    path: "/DetailRestaurant/:id/ResultPayment",
    component: ResultPayment,
    layout: MainLayout,
  },
  {
    path: "/SearchResult/:keyword",
    component: SearchResult,
    layout: MainLayout,
  },
  {
    path: "/Search",
    component: Search,
    layout: MainLayout,
  },
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
    path: "/favorite-list/:id",
    component: FavoriteList,
    layout: MainLayout,
  },
  {
    path: "/register-restaurant",
    component: RegisterRestaurant1,
    layout: MainLayout,
  },
  {
    path: "/register-restaurant2",
    component: RegisterRestaurant2,
    layout: MainLayout,
  },

  {
    path: "/owner/dashboard",
    component: OwnerDashboard,
    layout: OwnerLayout,
  },

  {
    path: "/DetailRestaurant/:id/menuImages",
    component: ViewImagepage,
  },

  // {
  //   path: "*",
  //   component: NotFound,
  //   layout: null,
  // },
];
