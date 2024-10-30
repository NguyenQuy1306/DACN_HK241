import React from "react";
import "./HeaderInfo.css";
import "../../../../assets/globalstyle/index.css";

function HeaderInfo({ userName, avatar }) {
    return (
        <div className="container">
            {userName && <p className="user-name">{userName}</p>}
            <div className="avatar-wrapper">
                <img
                    className="avatar"
                    alt={`${userName}'s avatar`}
                    src={avatar}
                ></img>
            </div>
        </div>
    );
}

export default HeaderInfo;
