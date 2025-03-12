import React, { useState } from "react";

const ImageUploader = ({ imagePreview, setFile, setImagePreview }) => {
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile); // ✅ Set the actual File object for upload
      setImagePreview(URL.createObjectURL(selectedFile)); // ✅ Preview URL for display
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ textAlign: "left", marginBottom: "10px" }}>
        Hình ảnh món ăn
      </h3>

      {/* Image Preview */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Hình ảnh món ăn"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />
      )}

      {/* Upload Label */}
      <p style={{ textAlign: "left", margin: "5px 0" }}>Tải lên ảnh khác</p>

      {/* File Input */}
      <label
        htmlFor="fileUpload"
        style={{
          display: "inline-block",
          backgroundColor: "hsl(174, 100%, 20%)",
          color: "white",
          padding: "8px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Chọn tệp
      </label>
      <input
        type="file"
        id="fileUpload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {/* File Name Display */}
      <span style={{ marginLeft: "10px", color: "#666" }}>
        {imagePreview ? "Đã chọn ảnh" : "Không có tệp nào được chọn"}
      </span>
    </div>
  );
};

export default ImageUploader;
