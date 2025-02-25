import React from "react";
import "./Logo.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
function Logo(props) {
  const navigate = useNavigate();
  return (
    <div className="container" onClick={() => navigate(`../Home`)}>
      <h2 className="logo__name">TheMeal</h2>
      <img src={logo} alt="TheMeal's logo" className="logo__image" />
    </div>
  );
}

export default Logo;
