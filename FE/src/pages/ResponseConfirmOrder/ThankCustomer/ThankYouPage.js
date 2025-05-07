// src/pages/ThankYouPage.js
import { Button } from "antd";
import React from "react";

const ThankYouPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#f0f9ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#4CAF50", fontSize: "3rem" }}>Cảm ơn bạn!</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px", textAlign: "center" }}>
        Chúng tôi rất vui khi biết rằng bạn sẽ đến như đã hẹn. Hẹn gặp bạn tại
        nhà hàng!
      </p>
      <Button href="/home" color="primary">
        Trang chủ
      </Button>
    </div>
  );
};

export default ThankYouPage;
