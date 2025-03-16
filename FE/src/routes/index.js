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
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import RestaurantInfoForm from "../pages/InforRestaurant/InforRestaurant";
export const routes = [
  {
    path: "/owner/restaurant",
    component: RestaurantInfoForm,
    layout: OwnerLayout,
    role: ["owner"],
  },
  {
    path: "/notfound",
    component: NotFoundPage,
    // layout: OwnerLayout,
    role: ["guest", "customer", "owner"],
  },
  {
    path: "/owner/menu/add",
    component: MenuAdd,
    layout: OwnerLayout,
    role: "owner",
  },
  {
    path: "/deposit-policy",
    component: DepositPolicy,
    layout: MainLayout,
    role: "customer",
  },
  {
    path: "/DetailRestaurant/:id/ResultPayment",
    component: ResultPayment,
    layout: MainLayout,
    role: "customer",
  },
  {
    path: "/SearchResult/:keyword",
    component: SearchResult,
    layout: MainLayout,
    role: ["guest", "customer", "owner"],
  },
  {
    path: "/Search",
    component: Search,
    layout: MainLayout,
    role: "customer",
  },
  {
    path: "/DetailRestaurant/:id",
    component: DetailRestaurant,
    layout: MainLayout,
    role: ["guest", "customer", "owner"],
  },
  {
    path: "/Home",
    component: Home,
    layout: MainLayout,
    role: ["guest", "customer", "owner"],
  },
  {
    path: "/favorite-list/:id",
    component: FavoriteList,
    layout: MainLayout,
    role: "customer",
  },
  {
    path: "/register-restaurant",
    component: RegisterRestaurant1,
    layout: MainLayout,
    role: ["guest", "customer", "owner"],
  },
  {
    path: "/register-restaurant2",
    component: RegisterRestaurant2,
    layout: MainLayout,
    role: ["guest", "customer", "owner"],
  },
  {
    path: "/owner/dashboard",
    component: OwnerDashboard,
    layout: OwnerLayout,
    role: "owner",
  },
  {
    path: "/DetailRestaurant/:id/menuImages",
    component: ViewImagepage,
    role: ["guest", "customer", "owner"],
  },
];
