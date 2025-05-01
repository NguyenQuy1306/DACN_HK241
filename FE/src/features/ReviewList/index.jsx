import { Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./style.module.css";
import ReviewModal from "./ReviewModal";
import moment from "moment";
import { BACKEND_URL } from "../../utils/util";

function ReviewList() {
  const customerId = 1;
  const [ratingList, setRatingList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchRatingList = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/rate/${customerId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setRatingList(response.data);
        } else {
          console.log("Failed to fetch rating list!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRatingList();
  }, [customerId]);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [updateTime, setUpdateTime] = useState("");

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenModal = (content, rating, updateTime) => {
    setOpen(true);
    setContent(content);
    setRating(rating);
    setUpdateTime(moment(updateTime).format("DD--MM-YYYY HH:mm:ss"));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Danh sách đánh giá nhà hàng</h3>
      <p className={styles.quantity}>({ratingList.length}) đánh giá</p>
      <Divider />

      <ReviewModal
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        content={content}
        rating={rating}
        updateTime={updateTime}
      />

      <div className={styles["card-list"]}>
        <div className={styles["card-wrapper"]}>
          {ratingList.map((rating, index) => {
            return (
              <div
                onClick={() =>
                  handleOpenModal(
                    rating.noiDung,
                    rating.sao,
                    rating.thoiGianCapNhat
                  )
                }
              >
                <ReviewCard
                  key={index}
                  imgUrl={rating.anhNhaHang}
                  name={rating.tenNhaHang}
                  address={rating.diaChi}
                  rating={rating.sao}
                  updateTime={rating.thoiGianCapNhat}
                  eatTime={rating.thoiGianTraiNghiem}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
