import React from "react";
import "./Header.css";
import { FRONTEND_URL } from "../../utils/util";

const Header = ({ owner = false }) => {
  return (
    <div
      style={{
        paddingRight: "0.5rem",
        display: "block",
        paddingRight: "10px",
      }}
    >
      <div className="header_style">
        {!owner && (
          <span style={{ cursor: "pointer" }}>
            <a
              href={`${FRONTEND_URL}/register-restaurant`}
              className="text_header"
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              ĐĂNG KÝ NHÀ HÀNG CỦA BẠN
            </a>
          </span>
        )}
        <div className="line_header">
          <hr
            style={{
              height: "15px",
              margin: " 0.5rem",
              borderLeft: "1px solid rgb(213, 216, 220)",
            }}
          ></hr>
        </div>{" "}
        <span style={{ cursor: "pointer" }}>
          <span
            className="text_header"
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            TRỢ GIÚP
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
