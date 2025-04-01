import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { getAllCategory } from "../../redux/features/categorySlice";
import { createFood, setCreateStatus } from "../../redux/features/foodSlice";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
const MenuAdd = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
    });

    const danhMuc = useSelector((state) => state.category.category);
    const { restaurantOwner } = useSelector((state) => state.authentication);

    const { createStatus } = useSelector((state) => state.food);

    useEffect(() => {
        console.log("CREATE STATUS: ", createStatus);
        if (createStatus === "SUCCESS") {
            openNotification();
            setFormData({
                name: "",
                price: "",
                description: "",
            });
            setSelectedCategory(null);
            dispatch(setCreateStatus(""));
        }
    }, [createStatus]);

    useEffect(() => {
        dispatch(getAllCategory({ restaurantId: restaurantOwner.maSoNhaHang }));
    }, [restaurantOwner.maSoNhaHang]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCreateNewFood = () => {
        const foodRequest = {
            ten: formData.name,
            moTa: formData.description,
            gia: Number(formData.price),
            trangThai: "active",
        };

        dispatch(
            createFood({
                restaurantId: restaurantOwner.maSoNhaHang,
                categoryId: selectedCategory,
                foodRequest: foodRequest,
                file: file,
            }),
        );
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: "Thành công",
            description: "Món ăn đã được thêm thành công. Vui lòng đến trang danh sách món ăn để xem chi tiết.",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
    };

    return (
        <div className={styles.container}>
            {contextHolder}
            <div className={styles.content}>
                <div className={styles.formSection}>
                    <h2 className={styles.title}>Thêm Món Ăn Mới</h2>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên món ăn</label>
                        <input
                            type="text"
                            name="name"
                            className={styles.input}
                            placeholder="Nhập tên món ăn"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Danh mục</label>
                        <select
                            className={styles.select}
                            value={selectedCategory}
                            name="category"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Chọn danh mục</option>
                            {danhMuc?.map((category) => (
                                <option
                                    key={category.maSoDanhMuc}
                                    value={category.maSoDanhMuc}
                                >
                                    {category.ten}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Giá (VNĐ)</label>
                        <input
                            type="number"
                            name="price"
                            className={styles.input}
                            placeholder="Nhập giá"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0"
                            step="1000"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mô tả</label>
                        <textarea
                            name="description"
                            className={styles.textarea}
                            placeholder="Mô tả món ăn"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className={styles.imageSection}>
                    <div className={styles.imageUploader}>
                        <label className={styles.uploadLabel}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.fileInput}
                            />
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className={styles.imagePreview}
                                />
                            ) : (
                                <div className={styles.uploadPlaceholder}>
                                    <span>Click để tải ảnh lên</span>
                                    <span className={styles.uploadIcon}>📸</span>
                                </div>
                            )}
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.submitButton}
                    onClick={handleCreateNewFood}
                >
                    Xác nhận
                </button>
                <button
                    onClick={() => openNotification()}
                    className={styles.cancelButton}
                >
                    Huỷ bỏ
                </button>
            </div>
        </div>
    );
};

export default MenuAdd;
