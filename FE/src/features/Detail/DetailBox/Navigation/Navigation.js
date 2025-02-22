import React, { useState, useEffect, createRef } from "react";
import "./Navigation.css";
import ButtonTavBarReview from "./Reviews/Component/ButtonTavBarReview/ButtonTavBarReview";
import Reviews from "./Reviews/Reviews";
import FilterComment from "./Reviews/Component/FilterComment/FilterComment";
import Comment from "./Reviews/Component/Comment/Comment";
import Menu from "./Menu/Menu";
import About from "./About/About";
import Direction from "./Direction/Direction";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../redux/features/navigationSlice";
const Navigation = ({ selectedPlace }) => {
  const reviewData = useSelector((state) => state.rate.rate);
  const activeTab = useSelector((state) => state.navigation.activeTab);

  return (
    <div className="NavigationDiv">
      <div className="Navigation_H1">
        <div className="Navigation_H2">
          <ButtonTavBarReview
            text={"Chi tiết"}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
          <ButtonTavBarReview
            text={"Menu"}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
          <ButtonTavBarReview
            text={"Chỉ đường"}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
          <ButtonTavBarReview
            text={"Reviews"}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
        </div>
      </div>
      {activeTab === "Reviews" && (
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
      {activeTab === "Menu" && <Menu selectedPlace={selectedPlace}></Menu>}
      {activeTab === "Chi tiết" && (
        <About selectedPlace={selectedPlace}></About>
      )}
      {activeTab === "Chỉ đường" && (
        <Direction selectedPlace={selectedPlace}></Direction>
      )}
    </div>
  );
};
export default Navigation;
