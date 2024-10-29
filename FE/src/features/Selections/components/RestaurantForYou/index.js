import React from "react";
import "./RestaurantForYou.css";

function RestaurantForYou({ image }) {
    return (
        <div className="recommended-card">
            <img
                src={image}
                alt="Delicious food "
                className="recommended-card__image"
            ></img>
        </div>
    );
}

export default RestaurantForYou;
