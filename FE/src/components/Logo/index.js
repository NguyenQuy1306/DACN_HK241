import React from "react";
import "./Logo.css";
import logo  from '../../assets/images/logo.png'

function Logo(props) {
    return (
        <div className="container">
            <h2 className="logo__name">TheMeal</h2>
            <img
                src={logo}
                alt="TheMeal's logo"
                className="logo__image"
            />
        </div>
    );
}

export default Logo;
