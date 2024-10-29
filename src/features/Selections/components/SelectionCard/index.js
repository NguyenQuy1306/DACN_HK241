import React from "react";
import "./SelectionCard.css";

function SelectionCard({ imgUrl, title, description, actionUrl }) {
    return (
        <div className="card-container">
            <img
                className="card__image"
                src={imgUrl}
                alt={title}
            ></img>
            <div className="card__body">
                <h4 className="card__title">{title}</h4>
                <p className="card__description">{description}</p>
                <a
                    className="card__action"
                    href={actionUrl}
                >
                    SEE RESTAURANTS
                </a>
            </div>
        </div>
    );
}

export default SelectionCard;
