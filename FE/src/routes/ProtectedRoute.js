import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { setLoginRoute, setStatusModalAuthentication, setUserRole } from "../redux/features/authenticationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const loginRoute = useSelector((state) => state.authentication.loginRoute);
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.authentication.userRole);
    console.log("allowedRoles", allowedRoles);
    console.log("userRole", userRole);
    // useEffect(() => {
    //   dispatch(setUserRole("guest"));
    //   dispatch(setLoginRoute(false));
    // }, [dispatch]);
    console.log("location pathname", location.pathname);
    console.log("allowedRoles.includes(userRole)", allowedRoles.includes(userRole));
    console.log("loginRoute", loginRoute);

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
        if (loginRoute && allowedRoles.includes("guest")) {
            //   dispatch(setLoginRoute(false));
            console.log("navaigate to owner");
            return (
                <Navigate
                    to="/owner/dashboard"
                    replace
                />
            );
        }
        if (loginRoute && location.pathname === "/owner/menu/add") {
            dispatch(setLoginRoute(false));
            // console.log("navaigate to owner");
            // return <Navigate to="/owner/menu/add" replace />;
        }
        if (userRole === "owner" && allowedRoles.includes("guest") && !loginRoute && location.pathname != "/notfound") {
            console.log("callllll");
            return (
                <Navigate
                    to="/notfound"
                    replace
                />
            );
        }
    }

    console.log("callllll34");
    return children;
};

export default ProtectedRoute;
