import React, { useState, useEffect } from "react";
import NextButton from "./NextButton/NextButton";
const AImage = () => {
  return (
    <div>
      <div
        style={{
          margin: "0px",
          paddingBottom: "calc(17.205%),",
          overflow: "hidden",
          position: "relative",
          //   height: "0px",
          backgroundColor: "rgb(249, 250, 250)",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            zIndex: "1",
            width: "1167px",
          }}
        >
          {/* next button */}
          adsasdasdasdasdasdasd
          <NextButton></NextButton>
          {/* list button: chạy vòng lặp rồi gọi call prop */}
          {/* next button */}
        </div>
        <div> {/* button number of image */}</div>
      </div>
    </div>
  );
};

export default AImage;
