import { Fragment, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <Fragment>
      <div>
        <div
          style={{
            height: "32px",
            background: "hsl(180, 9%, 98%)",
            display: "block",
            // top: 0,
            width: "100%",
            zIndex: 5,
          }}
        >
          <Header></Header>
        </div>
        {children}
        <Footer />
      </div>
    </Fragment>
  );
}

export default MainLayout;
