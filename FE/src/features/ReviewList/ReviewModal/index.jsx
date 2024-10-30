import React from "react";
import styles from "./style.module.css";
import { Button, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function ReviewModal({ open, handleCancel, handleOk, handleChange }) {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, cur) => {
        return [
            ...acc,
            {
                value: cur,
                label: cur,
            },
        ];
    }, []);
    console.log(options);
    return (
        <div className={styles.container}>
            <Modal
                open={open}
                title={<h4 style={{ textAlign: "center", fontWeight: 600 }}>CHI TIẾT ĐÁNH GIÁ</h4>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <p className={styles["update-time"]}>Cập nhật: 12/09/2024</p>,
                    <Button
                        key="back"
                        onClick={handleCancel}
                        type="primary"
                        danger
                    >
                        Xóa
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleOk}
                        style={{ backgroundColor: "green" }}
                        warning
                    >
                        Cập nhật
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        onClick={handleOk}
                    >
                        Hủy
                    </Button>,
                ]}
            >
                <div className={styles["point-list"]}>
                    <div className={styles["point-section"]}>
                        <p className={styles["point-label"]}>Điểm món ăn</p>
                        <Select
                            status="primary"
                            defaultValue="8"
                            style={{
                                width: 120,
                                border: "1px solid #00665C",
                                borderRadius: "4px",
                                textAlign: "center",
                            }}
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                    <div className={styles["point-section"]}>
                        <p className={styles["point-label"]}>Điểm dịch vụ</p>
                        <Select
                            status="primary"
                            defaultValue="8"
                            style={{
                                width: 120,
                                border: "1px solid #00665C",
                                borderRadius: "4px",
                                textAlign: "center",
                            }}
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                    <div className={styles["point-section"]}>
                        <p className={styles["point-label"]}>Điểm không gian</p>
                        <Select
                            status="primary"
                            defaultValue="8"
                            style={{
                                width: 120,
                                border: "1px solid #00665C",
                                borderRadius: "4px",
                                textAlign: "center",
                            }}
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                </div>
                <p className={styles["point-label"]}>Nhận xét</p>

                <TextArea
                    rows={4}
                    placeholder="Hãy để lại nhận xét của bạn về nhà hàng..."
                ></TextArea>
            </Modal>
        </div>
    );
}

export default ReviewModal;
