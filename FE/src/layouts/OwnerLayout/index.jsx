import { Fragment } from "react";
import OwnerHeader from "../../components/OwnerHeader";
import "./OwnerLayout.css";
function OwnerLayout({ children }) {
    return (
        <Fragment>
            <OwnerHeader />
            {children}
        </Fragment>
    );
}

export default OwnerLayout;
