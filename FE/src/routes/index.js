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
import OwnerMenu from "../pages/MenuList_Owner";
import ResultPayment from "../pages/ResultPayment/ResultPayment";
import DepositPolicy from "../pages/DepositPolicy/DepositPolicy";

import MenuAdd from "../pages/MenuAdd/MenuAdd";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import RestaurantInfoForm from "../pages/InforRestaurant/InforRestaurant";
import Dashboard_Owner from "../pages/Dashboard_Owner";
import MenuList_Owner from "../pages/MenuList_Owner";
import MenuDetail from "./../pages/MenuDetail/index";
import CategoryOwner from "./../pages/CategoyOwner/index";
import OrderOwner from "./../pages/OrderOwner/index";

import OwnerInfoForm from "../pages/InforOwner/InforOwner";
import TableManagement from "../pages/TableManagement/TableManagement";
import RatingOwner from "./../pages/RatingOwner/index";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard_Admin from "../pages/Dashboard_Admin";
import PartnerList from "../pages/PartnerList";
import OverbookingSettings from "../pages/Overbooking/OverbookingSettings";
import ThankYouPage from "../pages/ThankCustomer/ThankYouPage";
export const routes = [
    {
        path: "/thank-you",
        component: ThankYouPage,
        // layout: OwnerLayout,
        role: ["guest", "customer", "owner"],
    },
    {
        path: "/owner/overbooking",
        component: OverbookingSettings,
        layout: OwnerLayout,
        role: ["owner"],
    },
    {
        path: "/owner/tablemanagement",
        component: TableManagement,
        layout: OwnerLayout,
        role: ["owner"],
        title: "Quản lý bàn",
    },
    {
        path: "/admin/ownerdetail/:id",
        component: OwnerInfoForm,
        layout: AdminLayout,
        role: ["admin"],
        title: "Thông tin nhà hàng",
    },

    {
        path: "/owner/restaurant",
        component: RestaurantInfoForm,
        layout: OwnerLayout,
        role: ["owner"],
        title: "Thông tin nhà hàng",
    },
    {
        path: "/admin/partner",
        component: PartnerList,
        layout: AdminLayout,
        role: ["admin"],
        title: "Danh sách nhà hàng",
    },
    {
        path: "/owner/dashboard",
        component: Dashboard_Owner,
        layout: OwnerLayout,
        title: "Bảng điều khiển",
        role: ["owner"],
    },
    {
        path: "/owner/orders",
        component: OrderOwner,
        layout: OwnerLayout,
        title: "Danh sách đặt bàn",
        role: ["owner"],
    },
    {
        path: "/owner/menu/list",
        component: MenuList_Owner,
        layout: OwnerLayout,
        title: "Menu",
        role: ["owner"],
    },
    {
        path: "/owner/rating",
        component: RatingOwner,
        layout: OwnerLayout,
        title: "Đánh giá",
        role: ["owner"],
    },
    {
        path: "/owner/menu/add",
        component: MenuAdd,
        layout: OwnerLayout,
        title: "Thêm món ăn/thức uống",
        role: ["owner"],
    },
    {
        path: "/owner/menu/categories",
        component: CategoryOwner,
        layout: OwnerLayout,
        title: "Danh mục",
        role: ["owner"],
    },
    {
        path: "/owner/menu/:id",
        component: MenuDetail,
        layout: OwnerLayout,
        title: "Chi tiết món ăn/thức uống",
        role: ["owner"],
    },
    {
        path: "/notfound",
        component: NotFoundPage,
        // layout: OwnerLayout,
        role: ["guest", "customer", "owner", "admin"],
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
        role: ["customer", "guest", "owner"],
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
        role: ["guest", "customer", "owner", "admin"],
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

    {
        path: "/admin/dashboard",
        component: Dashboard_Admin,
        layout: AdminLayout,
        role: ["admin"],
        title: "Bảng điều khiển",
    },
];
