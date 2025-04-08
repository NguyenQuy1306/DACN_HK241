import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setAdminLogin, setLoginRoute, setStatusModalAuthentication } from "../redux/features/authenticationSlice";

//mỗi lần render tới một trang thì function này sẽ được gọi
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const ownerLogin = useSelector((state) => state.authentication.ownerLogin);
    const adminLogin = useSelector((state) => state.authentication.adminLogin);
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.authentication.userRole);
    console.log("allowedRoles", allowedRoles);

    console.log("location pathname", location.pathname);
    console.log("allowedRoles.includes(userRole)", allowedRoles.includes(userRole));
    console.log("ownerLogin", ownerLogin);
    console.log("adminLogin", adminLogin);
    if (!allowedRoles.includes(userRole)) {
        if (userRole === "guest") {
            dispatch(setStatusModalAuthentication({ openModal: true }));
            return (
                <Navigate
                    to="/Home"
                    replace
                />
            );
        } else {
            return (
                <Navigate
                    to="/notfound"
                    replace
                />
            );
        }
    } else {
        //ownerLogin: flag đánh dấu owner từ trang home vào giao diện owner
        if (allowedRoles.includes("guest")) {
            if (ownerLogin) {
                return (
                    <Navigate
                        to="/owner/dashboard"
                        replace
                    />
                );
            }
            if (adminLogin) {
                return (
                    <Navigate
                        to="/admin/dashboard"
                        replace
                    />
                );
            }
        }
        //Khi owner và admin vào giao diện chính đánh dấu flag thành false
        if (ownerLogin && location.pathname == "/owner/dashboard") {
            dispatch(setLoginRoute(false));
        }
        if (adminLogin && location.pathname == "/admin/dashboard") {
            dispatch(setAdminLogin(false));
        }
        // xử lý owner hoặc admin muốn truy cập trang khác không cho phép
        if (userRole === "owner" && allowedRoles.includes("guest") && !ownerLogin && location.pathname != "/notfound") {
            return (
                <Navigate
                    to="/notfound"
                    replace
                />
            );
        }
        if (userRole === "admin" && allowedRoles.includes("guest") && !adminLogin && location.pathname != "/notfound") {
            return (
                <Navigate
                    to="/notfound"
                    replace
                />
            );
        }
    }

    return children;
};

export default ProtectedRoute;
