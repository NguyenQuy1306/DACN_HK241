import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Modal, Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styles from "./RestaurantInfoForm.module.css";
import {
  getRestaurantByOwnerId,
  updateRestaurantInfor,
} from "../../redux/features/restaurantSlice";

const RestaurantInfoForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );

  const [updatedFields, setUpdatedFields] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getRestaurantByOwnerId({ ownerId: user.maSoNguoiDung }));
  //   }
  // }, [dispatch, user]);

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

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      const formData = new FormData();
      existingImages.forEach((image) => {
        if (image.file) {
          formData.append("newImages", image.file);
        } else {
          let processedUrl = image;
          try {
            const urlObj = new URL(image);
            if (
              urlObj.hostname ===
              "themealbucket1.s3.ap-southeast-1.amazonaws.com"
            ) {
              processedUrl = urlObj.pathname.substring(1);
            }
          } catch (error) {
            console.warn("Invalid URL:", image);
          }
          formData.append("imageUrls", processedUrl);
        }
      });

      formData.append("fields", JSON.stringify(updatedFields));
      formData.append("maSoNhaHang", restaurantOwner.maSoNhaHang);
      dispatch(updateRestaurantInfor(formData));

      setSaving(false);
      setOpenModal(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.inputGrid}>
          {restaurantOwner &&
            Object.entries(restaurantOwner).map(([key, value]) =>
              [
                "ten",
                "diaChi",
                "loaiHinh",
                "khoangGia",
                "gioHoatDong",
              ].includes(key) ? (
                <div key={key} className={styles.inputGroup}>
                  <label className={styles.label}>{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={updatedFields[key] || value}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              ) : null
            )}
        </div>
      </div>

      <div className={styles.imageSection}>
        <h3>Hình ảnh nhà hàng</h3>
        <div className={styles.imageGrid}>
          {existingImages.map((image, index) => (
            <motion.div
              key={index}
              className={styles.imageWrapper}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image.file ? image.preview : image}
                alt="Ảnh"
                className={styles.image}
              />
              <button
                onClick={() =>
                  setExistingImages(
                    existingImages.filter((_, i) => i !== index)
                  )
                }
                className={styles.removeButton}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <label className={styles.uploadButton}>
          Thêm ảnh
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
              }));
              setExistingImages([...existingImages, ...newImages]);
            }}
          />
        </label>

        <div className={styles.buttonGroup}>
          <motion.button
            onClick={() => setOpenModal(true)}
            className={styles.saveButton}
            whileTap={{ scale: 0.95 }}
          >
            Lưu
          </motion.button>
          <motion.button
            onClick={() => window.location.reload()}
            className={styles.cancelButton}
            whileTap={{ scale: 0.95 }}
          >
            Hủy
          </motion.button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            minWidth: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Xác nhận lưu thay đổi?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Bạn có chắc chắn muốn lưu những thay đổi này không?
          </Typography>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenModal(false)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Đang lưu..." : "Xác nhận"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default RestaurantInfoForm;
