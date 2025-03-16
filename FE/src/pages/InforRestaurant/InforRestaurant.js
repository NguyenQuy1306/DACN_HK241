import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import styles from "./RestaurantInfoForm.module.css";
import {
  getRestaurantByOwnerId,
  updateRestaurantInfor,
} from "../../redux/features/restaurantSlice";

const RestaurantInfoForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const restaurantOwner = useSelector(
    (state) => state.restaurant.restaurantOwner
  );
  const fieldsAllow = [
    "ten",
    "diaChi",
    "loaiHinh",
    "khoangGia",
    "gioHoatDong",
    "phuHop",
    "monDacSac",
    "moTaKhongGian",
    "diemDacTrung",
    "viDo",
    "kinhDo",
  ];
  const fieldLabels = {
    ten: "Tên nhà hàng",
    diaChi: "Địa chỉ",
    loaiHinh: "Loại hình",
    khoangGia: "Khoảng giá",
    gioHoatDong: "Giờ hoạt động",
    phuHop: "Phù hợp với",
    monDacSac: "Món đặc sắc",
    moTaKhongGian: "Mô tả không gian",
    diemDacTrung: "Điểm đặc trưng",
    viDo: "Vĩ độ",
    kinhDo: "Kinh độ",
  };
  const [updatedFields, setUpdatedFields] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  console.log("existingImages", existingImages);
  useEffect(() => {
    if (user) {
      dispatch(getRestaurantByOwnerId({ ownerId: user.maSoNguoiDung }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (restaurantOwner) {
      setExistingImages(
        restaurantOwner.imageUrls
          ? restaurantOwner.imageUrls.RESTAURANTIMAGE
          : []
      );
    }
  }, [restaurantOwner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "gioMoCua" &&
      updatedFields.gioDongCua &&
      value >= updatedFields.gioDongCua
    ) {
      setError("Giờ mở cửa phải nhỏ hơn giờ đóng cửa");
      return;
    }
    if (
      name === "gioDongCua" &&
      updatedFields.gioMoCua &&
      value <= updatedFields.gioMoCua
    ) {
      setError("Giờ đóng cửa phải lớn hơn giờ mở cửa");
      return;
    }
    setError("");
    setUpdatedFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file, // Lưu file gốc
      preview: URL.createObjectURL(file), // Lưu URL tạm thời
    }));

    setExistingImages((prev) => [...prev, ...newImages]);
  };

  const removeExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((img, index) => index !== idx));
  };

  const handleSave = () => {
    const formData = new FormData();
    existingImages.forEach((image) => {
      if (image.file) {
        formData.append("newImages", image.file);
      } else {
        let processedUrl = image;

        try {
          const urlObj = new URL(image);
          if (
            urlObj.hostname === "themealbucket1.s3.ap-southeast-1.amazonaws.com"
          ) {
            processedUrl = urlObj.pathname.substring(1); // Bỏ dấu '/' đầu tiên
          }
        } catch (error) {
          console.warn("Invalid URL:", image);
        }

        formData.append("imageUrls", processedUrl);
      }
    });

    formData.append("fields", JSON.stringify(updatedFields));

    console.log("FormData contents:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    formData.append("maSoNhaHang", restaurantOwner.maSoNhaHang);
    dispatch(updateRestaurantInfor(formData));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.inputGrid}>
          {restaurantOwner &&
            Object.entries(restaurantOwner).map(([key, value]) =>
              fieldsAllow.includes(key) ? (
                <div key={key} className={styles.inputGroup}>
                  <label className={styles.label}>
                    {fieldLabels[key] || key}
                  </label>
                  {key === "gioHoatDong" ? (
                    <>
                      <TextField
                        type="time"
                        name="gioMoCua"
                        value={updatedFields.gioMoCua || value.gioMoCua || ""}
                        onChange={handleTimeChange}
                        className={styles.input}
                      />
                      <TextField
                        type="time"
                        name="gioDongCua"
                        value={
                          updatedFields.gioDongCua || value.gioDongCua || ""
                        }
                        onChange={handleTimeChange}
                        className={styles.input}
                      />
                      {error && <p className={styles.errorText}>{error}</p>}
                    </>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={updatedFields[key] || value}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  )}
                </div>
              ) : null
            )}
        </div>
      </div>

      <div className={styles.imageSection}>
        <h3>Hình ảnh nhà hàng</h3>
        <div className={styles.imageGrid}>
          {existingImages.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              {image.file ? (
                <>
                  <img
                    src={image.preview}
                    alt="Ảnh cũ"
                    className={styles.image}
                  />
                  <button
                    onClick={() => removeExistingImage(index)}
                    className={styles.removeButton}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <img src={image} alt="Ảnh cũ" className={styles.image} />
                  <button
                    onClick={() => removeExistingImage(index)}
                    className={styles.removeButton}
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <label className={styles.uploadButton}>
          Thêm ảnh
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <div className={styles.buttonGroup}>
          <button onClick={handleSave} className={styles.saveButton}>
            Lưu
          </button>
          <button className={styles.cancelButton}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoForm;
