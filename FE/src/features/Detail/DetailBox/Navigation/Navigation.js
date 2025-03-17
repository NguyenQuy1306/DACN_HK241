import React, { useEffect, useRef } from "react";
import "./Navigation.css";
import ButtonTavBarReview from "./Reviews/Component/ButtonTavBarReview/ButtonTavBarReview";
import Reviews from "./Reviews/Reviews";
import FilterComment from "./Reviews/Component/FilterComment/FilterComment";
import Comment from "./Reviews/Component/Comment/Comment";
import Menu from "./Menu/Menu";
import About from "./About/About";
import Direction from "./Direction/Direction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const Navigation = ({ selectedPlace }) => {
  const reviewData = useSelector((state) => state.rate.rate);
  const activeTab = useSelector((state) => state.navigation.activeTab);
  const dispatch = useDispatch();
  // Tạo ref cho mỗi phần
  const reviewsRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const directionRef = useRef(null);
  // useEffect(() => {
  //   dispatch(setActiveTab(text));
  // }, [dispatch]);
  // Effect để cuộn đến tab tương ứng
  useEffect(() => {
    let scrollToRef;
    switch (activeTab) {
      case "Reviews":
        scrollToRef = reviewsRef;
        break;
      case "Menu":
        scrollToRef = menuRef;
        break;
      case "Chi tiết":
        scrollToRef = aboutRef;
        break;
      case "Chỉ đường":
        scrollToRef = directionRef;
        break;
      default:
        scrollToRef = null;
    }

    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeTab]);

  return (
    <div className="NavigationDiv">
      <div className="Navigation_H1">
        <div className="Navigation_H2">
          <ButtonTavBarReview text={"Chi tiết"} selectedPlace={selectedPlace} />
          <ButtonTavBarReview text={"Menu"} selectedPlace={selectedPlace} />
          <ButtonTavBarReview
            text={"Chỉ đường"}
            selectedPlace={selectedPlace}
          />
          <ButtonTavBarReview text={"Reviews"} selectedPlace={selectedPlace} />
        </div>
      </div>

      <div ref={menuRef}>
        {activeTab === "Menu" && <Menu selectedPlace={selectedPlace} />}
      </div>

      <div ref={aboutRef}>
        {activeTab === "Chi tiết" && <About selectedPlace={selectedPlace} />}
      </div>

      <div ref={directionRef}>
        {(activeTab === "Chỉ đường" || activeTab === "Chi tiết") && (
          <Direction selectedPlace={selectedPlace} />
        )}
      </div>

      <div ref={reviewsRef}>
        {(activeTab === "Reviews" || activeTab === "Chi tiết") && (
          <>
            <Reviews reviewData={reviewData} />
            <div className="NavigationDiv_H2">
              <div className="NavigationDiv_H2_filter">
                <div className="NavigationDiv_H2_filter_H1">
                  <FilterComment text={"Newest"} />
                </div>
              </div>
              <ul className="NavigationDiv_H2_ul">
                {reviewData.map((review, index) => (
                  <Comment
                    key={index}
                    review={review}
                    selectedPlace={selectedPlace}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
