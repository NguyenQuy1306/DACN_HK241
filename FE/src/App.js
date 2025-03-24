import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { Fragment } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
function App() {
    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                {routes.map((item, index) => {
                    let Page = item.component;
                    let title = item.title;
                    let Layout = Fragment;
                    if (item.layout) {
                        Layout = item.layout;
                    }
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <ProtectedRoute allowedRoles={item.role}>
                                    <Layout title={title}>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
                <Route
                    path="/"
                    element={<Navigate to="/Home" />}
                />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
