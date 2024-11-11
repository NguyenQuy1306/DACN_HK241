import MainLayout from "../layouts/MainLayout";
import Search from "../pages/Search";
import DetailRestaurant from "../pages/DetailRestaurant";
import Home from "../pages/Home";
import FavoriteList from "../pages/FavoriteList";
import FilterIndex from "../components/FilterItem";
import RegisterRestaurant1 from "../pages/RegisterRestaurant1";
import RegisterRestaurant2 from "../pages/RegisterRestaurant2";

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
