import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, Flex, Modal, Rate, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function ReviewModal({ open, handleCancel, handleOk, handleChange, content, rating, updateTime }) {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, cur) => {
        return [
            ...acc,
            {
                value: cur,
                label: cur,
            },
        ];
    }, []);
    const desc = ["Thất vọng", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];
    const [value, setValue] = useState(3);
    const moment = require("moment");

    return (
        <div className={styles.container}>
            <Modal
                open={open}
                title={<h4 style={{ textAlign: "center", fontWeight: 600 }}>CHI TIẾT ĐÁNH GIÁ</h4>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <p className={styles["update-time"]}>
                        Cập nhật: {moment(updateTime).format("DD-MM-YYYY HH:mm:ss")}
                    </p>,
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
                        type="primary"
                        onClick={handleOk}
                    >
                        Hủy
                    </Button>,
                ]}
            >
                <div className={styles["point-list"]}>
                    <Flex
                        gap="middle"
                        vertical
                    >
                        {value ? <span>{desc[value - 1]}</span> : null}
                        <Rate
                            tooltips={desc}
                            onChange={setValue}
                            value={rating}
                            disabled
                        />
                    </Flex>
                </div>
                <p className={styles["point-label"]}>Nhận xét</p>

                <TextArea
                    rows={4}
                    placeholder="Hãy để lại nhận xét của bạn về nhà hàng..."
                    value={content}
                ></TextArea>
            </Modal>
        </div>
    );
}

export default ReviewModal;
