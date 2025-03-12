import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { border, borderRadius, height, padding, textAlign } from "@mui/system";
import styles from "./style.module.css";
import ImageUploader from "../../components/UpliadImage/ImageUploader";
import ButtonGreen from "../../components/Button/ButtonGreen/ButtonBooking/ButtonGreen";
import ButtonCancel from "../../components/Button/ButtonCancel/ButtonCancel";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/features/categorySlice";
import { createFood } from "../../redux/features/foodSlice";
const MenuAdd = () => {
  const dispatch = useDispatch();
  const handleOnchangeInput = () => {
    console.log("input change");
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const danhMuc = useSelector((state) => state.category.category);
  console.log("danhMuc", danhMuc);
  const handleCategoryChange = (value) => {
    console.log("Selected category:", value);
    setSelectedCategory(value);
  };
  useEffect(() => {
    dispatch(getAllCategory({ restaurantId: 1 }));
  }, [dispatch]);
  const handleCreateNewFood = () => {
    const foodRequest = {
      ten: "quy day roi23",
      moTa: "mo ta mon an",
      gia: 1000,
      trangThai: "active",
    };

    dispatch(
      createFood({
        restaurantId: 1,
        categoryId: 1,
        foodRequest: foodRequest,
        file: file,
      })
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles["container-left"]}>
        <div style={{ padding: " 5px 0 5px 0px" }}>
          <Input
            label="Tên món ăn"
            type="text"
            placeholder="Nhập tên món ăn"
            labelColor="black"
            otherStyle={{
              width: "350px",
              border: "1.5px solid black",
              borderRadius: "10px",
            }}
            onChange={handleOnchangeInput}
          ></Input>
        </div>
        <div style={{ padding: " 5px 0 5px 0px" }}>
          <Input
            label="Danh mục"
            type="select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            otherStyle={{
              width: "350px",
              border: "1.5px solid black",
              borderRadius: "10px",
            }}
            options={danhMuc}
          />
        </div>
        <div style={{ padding: " 5px 0 5px 0px" }}>
          <Input
            label="Giá (VNĐ)"
            type="number"
            placeholder="10000, 20000...."
            labelColor="black"
            otherStyle={{
              width: "350px",
              border: "1.5px solid black",
              borderRadius: "10px",
            }}
            step="1000"
            min="0"
            onChange={handleOnchangeInput}
          ></Input>
        </div>
        <div style={{ padding: " 5px 0 5px 0px" }}>
          <Input
            label="Mô tả"
            type="textarea"
            labelColor="black"
            otherStyle={{
              width: "350px",
              height: "200px",
              border: "1.5px solid black",
              borderRadius: "10px",
              textAlign: "left", // Ensure left alignment
              padding: "10px",
            }}
            onChange={handleOnchangeInput}
          />
        </div>
        <div className={styles["group-button"]}>
          <div className={styles.button1}>
            <ButtonGreen
              text={"Xác nhận"}
              onClick={() => handleCreateNewFood()}
            ></ButtonGreen>
          </div>
          <div className={styles.button2}>
            <ButtonCancel text={"Huỷ bỏ"}></ButtonCancel>
          </div>
        </div>
      </div>
      <div className={styles["container-right"]}>
        <div>
          {/* <Input
            label="Tên món ăn"
            type="text"
            placeholder="Nhập tên món ăn"
            labelColor="black"
            otherStyle={{ width: "350px", border: "1.5px solid black" }}
            onChange={handleOnchangeInput}
          ></Input> */}
        </div>
        <div className={styles.uploadImage}>
          <ImageUploader
            setFile={setFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          ></ImageUploader>
        </div>
      </div>
    </div>
  );
};
export default MenuAdd;
