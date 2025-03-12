import { Fragment } from "react";
import OwnerHeader from "../../components/OwnerHeader";
import "./OwnerLayout.css";
function OwnerLayout({ children, title }) {
    return (
        <Fragment>
            <OwnerHeader title={title} />
            {children}
        </Fragment>
    );
}

export default OwnerLayout;
