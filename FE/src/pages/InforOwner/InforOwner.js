import React, { useEffect } from "react";
import styles from "./InforOwner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByOwnerId, getRestaurantId } from "../../redux/features/restaurantSlice";
import { useParams } from "react-router-dom";
// import ImageGallery from "./ImageGallery";

function OwnerInfoForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedRestaurant } = useSelector((state) => state.restaurant);

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantId({ id: id }));
        }
    }, [id]);
    return (
        <section className={styles.formContainer}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <h2 className={styles.title}>Thông tin nhà hàng: </h2>
                <h2 className={styles.restName}>{selectedRestaurant?.ten}</h2>
            </div>
            <form>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tên nhà hàng</label>
                    <input
                        type="text"
                        defaultValue="Fresh Garden"
                        value={selectedRestaurant ? selectedRestaurant.ten : ""}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Địa chỉ</label>
                    <input
                        type="text"
                        defaultValue="225/3, Phan Đăng Lưu, P12,Q.Bình Thạnh, TPHCM"
                        value={selectedRestaurant ? selectedRestaurant.diaChi : ""}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Mô tả</label>
                    <textarea
                        className={styles.textarea}
                        defaultValue="Nhà hàng và quầy bar Villagio có một sứ mệnh: cung cấp cho khách hàng trải nghiệm hải sản tươi ngon. Với hải sản theo mùa và bền vững được vận chuyển tươi ngon hàng ngày, thực đơn do đầu bếp của chúng tôi chế biến chứng minh rằng bất kể bạn dùng bữa vào thời điểm nào, hải sản đều có thể thực sự đặc biệt. để cung cấp cho khách hàng trải nghiệm hải sản tươi ngon. Với hải sản theo mùa và để cung cấp cho khách hàng trải nghiệm hải sản tươi ngon. khi bạn dùng bữa, hải sản ..."
                        value={selectedRestaurant ? selectedRestaurant.diemDacTrung : ""}
                    ></textarea>
                </div>

                {/* <div className={styles.formGroup}>
          <label className={styles.label}>Khung giờ</label>
          <TimeRangePicker startTime="08:00" endTime="22:00" />
        </div> */}

                <div className={styles.formGroup}>
                    <div className={styles.threeColumnGrid}>
                        <div className={styles.column}>
                            <label className={styles.label}>Người đại diện</label>
                            <input
                                type="text"
                                defaultValue="Nguyễn Văn A"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.column}>
                            <label className={styles.label}>CCCD</label>
                            <input
                                type="text"
                                defaultValue="096202008761"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.column}>
                            <label className={styles.label}>SĐT</label>
                            <input
                                type="text"
                                defaultValue="0346808237"
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Ngày hợp tác</label>
                    <input
                        type="text"
                        defaultValue="22-01-2021"
                        className={styles.input}
                    />
                </div>

                {/* <div className={styles.formGroup}>
          <label className={styles.label}>Một số hình ảnh nhà hàng</label>
          <ImageGallery
            images={[
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f4aaab79d01fac2a7afe3859b1f06124de0a00b",
                alt: "Restaurant image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/494b74bdc9333f2522ce83616a7cfdf5086f03f3",
                alt: "Restaurant image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/25fc1ba0ffcb9d90609c80a7adc176391e321339",
                alt: "Restaurant image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/07f738c629aa79baaa54c866087147732760c389",
                alt: "Restaurant image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/879d0a3b362cace16a8bf85ec879ee600e4a8597",
                alt: "Restaurant image",
              },
            ]}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Hình ảnh menu</label>
          <ImageGallery
            images={[
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f4aaab79d01fac2a7afe3859b1f06124de0a00b",
                alt: "Menu image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/494b74bdc9333f2522ce83616a7cfdf5086f03f3",
                alt: "Menu image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/25fc1ba0ffcb9d90609c80a7adc176391e321339",
                alt: "Menu image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/07f738c629aa79baaa54c866087147732760c389",
                alt: "Menu image",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/879d0a3b362cace16a8bf85ec879ee600e4a8597",
                alt: "Menu image",
              },
            ]}
          />
        </div> */}

                <button
                    type="button"
                    className={styles.submitButton}
                >
                    Chỉnh sửa
                </button>
            </form>
        </section>
    );
}

export default OwnerInfoForm;
