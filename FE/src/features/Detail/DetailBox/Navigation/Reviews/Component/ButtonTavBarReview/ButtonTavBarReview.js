import React, { useState, useEffect, createRef, useRef } from "react";
import "./ButtonTavBarReview.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getComboAvailable } from "../../../../../../../redux/features/comboSlice";
import { getRateInRestaurant } from "../../../../../../../redux/features/rateSlice";
import { setActiveTab } from "../../../../../../../redux/features/navigationSlice";
import { setShouldScroll } from "../../../../../../../redux/features/navigationSlice";
const ButtonTavBarReview = ({ selectedPlace, text, checkOnClick }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.navigation.activeTab);
  //Navigate to t
  const menuTabRef = useRef(null);
  const shouldScroll = useSelector((state) => state.navigation.shouldScroll);
  const scrollToElement = (ref) => {
    if (!ref.current) return;

    const targetPosition =
      ref.current.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Thời gian cuộn (ms)
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Tăng dần từ 0 đến 1

      // Hàm easing (có thể thay đổi để có hiệu ứng mượt hơn)
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutQuad);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (shouldScroll && menuTabRef.current) {
      // menuTabRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      scrollToElement(menuTabRef);
      dispatch(setShouldScroll(false)); // Reset lại để không scroll liên tục
    }
  }, [shouldScroll]);

  const handleOnClickButtonTavBarReview = () => {
    if (text === "Chi tiết") {
      dispatch(setActiveTab(text));
    } else if (text === "Menu") {
      dispatch(getComboAvailable({ restaurantId: selectedPlace.maSoNhaHang }));
      dispatch(setActiveTab(text));
    } else if (text === "Chỉ đường") {
      dispatch(setActiveTab(text));
    } else if (text === "Reviews") {
      dispatch(
        getRateInRestaurant({ restaurantId: selectedPlace.maSoNhaHang })
      );

      dispatch(setActiveTab(text));
    }
  };
  return (
    <Button
      className="ButtonTavBarReviewDiv"
      onClick={() => handleOnClickButtonTavBarReview()}
    >
      <div
        ref={menuTabRef}
        className={`ButtonTavBarReviewDiv_H1 ${
          activeTab === text ? "active" : ""
        }
        
    `}
      >
        <span>{text}</span>
      </div>
    </Button>
  );
};
export default ButtonTavBarReview;
