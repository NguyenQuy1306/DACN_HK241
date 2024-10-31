import React, { useState } from "react";
import "./OtherInformationComponent.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";

const OtherInformationComponent = ({ icon, text }) => {
  const [check, setCheck] = useState(false);
  const [hovered, setHovered] = useState(false); // To track hover state

  const handleOnHover = (isHovered) => {
    setHovered(isHovered); // Set hover state when hovering
  };

  return (
    <div className="OtherInformationComponent_H1">
      <div className="OtherInformationComponent_H2">{icon}</div>
      <span className="OtherInformationComponent_H1_span">
        <span>{text}</span>
        {/* <span>$105</span> */}
      </span>

      {icon.type === LocalAtmOutlinedIcon && (
        <div className="OtherInformationComponent_H1_span_HelpOutlineOutlinedIcon">
          <span style={{ position: "relative" }}>
            <HelpOutlineOutlinedIcon
              onMouseEnter={() => handleOnHover(true)} // Call on hover
              onMouseLeave={() => handleOnHover(false)} // Call when hover ends
              className="OtherInformationComponent_H1_span_HelpOutlineOutlinedIconHelpOutlineOutlinedIcon"
            />
            {hovered && ( // Show this when clicked or hovered
              <span className="OtherInformationComponent_H1_span_HelpOutlineOutlinedIcon_span">
                <div className="OtherInformationComponent_H1_span_HelpOutlineOutlinedIcon_span_div"></div>

                <p className="OtherInformationComponent_H1_span_HelpOutlineOutlinedIcon_span_p1">
                  <span>Average price</span>
                </p>
                <p className="OtherInformationComponent_H1_span_HelpOutlineOutlinedIcon_span_p2">
                  <span>
                    Average price for a meal, calculated on the basis of an
                    appetizer, entrée, and dessert, excluding drinks. The
                    average price is only an indication.
                  </span>
                </p>
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default OtherInformationComponent;
