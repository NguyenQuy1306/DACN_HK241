import React, { useState, useEffect, createRef } from "react";
import "./Navigation.css";
import ButtonTavBarReview from "./Reviews/Component/ButtonTavBarReview/ButtonTavBarReview";
import Reviews from "./Reviews/Reviews";
import FilterComment from "./Reviews/Component/FilterComment/FilterComment";
import Comment from "./Reviews/Component/Comment/Comment";
import Menu from "./Menu/Menu";
import About from "./About/About";
import Direction from "./Direction/Direction";
const Navigation = ({ selectedPlace }) => {
  const [onClickDetail, setOnClickDetail] = useState(true);
  const [onClicMenu, setOnClicMenu] = useState(false);
  const [onClickPath, setOnClickPath] = useState(false);
  const [onClickReviews, setOnClickReviews] = useState(false);
  const reviewsData = [
    {
      reviewer: {
        name: "Bethanne S.",
        reviewsCount: 1,
        avatarUrl: "path-to-avatar", // Replace with actual URL if needed
      },
      date: "September 18, 2024",
      rating: 10,
      content: `We enjoyed the experience very much. The food was very well presented. 
                The atmosphere was very nice. We tried the signature six-course package 
                with the accompanying wine as recommended.`,
      images: [
        { url: "path-to-image-1" }, // Replace with actual image URLs
        { url: "path-to-image-2" },
        { url: "path-to-image-3" },
      ],
      actions: {
        like: "1", // Number of likes
        report: "REPORT",
      },
      comments: [
        {
          name: "Le Christine",
          role: "Owner",
          content: `Dear Bethanne, Thank you very much for sharing your full satisfaction 
                    at the end of your experience at Le Christine! The whole team is 
                    delighted to hear that you enjoyed the dinner and ambiance.`,
          actions: {
            like: "2", // Number of likes for the comment
          },
        },
      ],
    },
    {
      reviewer: {
        name: "Sarah L.",
        reviewsCount: 21,
        avatarUrl: "path-to-avatar", // Replace with actual URL if needed
      },
      date: "September 18, 2024",
      rating: 9,
      content: `Great ambiance and delicious food. A bit pricey, but the service makes up for it. 
                The wine selection is excellent.`,
      actions: {
        like: "3", // Number of likes
        report: "REPORT",
      },
      comments: [
        {
          name: "Le Christine",
          role: "Owner",
          content: `Dear Sarah, we appreciate your feedback and are glad to hear that 
                    you enjoyed the ambiance and wine selection.`,
          actions: {
            like: "1", // Number of likes for the comment
          },
        },
      ],
    },
    {
      reviewer: {
        name: "Michael K.",
        reviewsCount: 56,
        avatarUrl: "path-to-avatar", // Replace with actual URL if needed
      },
      date: "September 17, 2024",
      rating: 8,
      content: `The food was tasty, but the portions were smaller than expected. 
                The staff was friendly, and the location is perfect for a quiet dinner.`,
      actions: {
        like: "4", // Number of likes
        report: "REPORT",
      },
      comments: [],
    },
    {
      reviewer: {
        name: "Emily R.",
        reviewsCount: 12,
        avatarUrl: "path-to-avatar", // Replace with actual URL if needed
      },
      date: "September 15, 2024",
      rating: 7,
      content: `Decent meal overall, but the wait time was too long. The food was good, 
                but not enough to justify the delay.`,
      actions: {
        like: "2", // Number of likes
        report: "REPORT",
      },
      comments: [
        {
          name: "Le Christine",
          role: "Owner",
          content: `Dear Emily, we apologize for the wait time and will work on improving 
                    our service. We appreciate your feedback.`,
          actions: {
            like: "0", // Number of likes for the comment
          },
        },
      ],
    },
  ];

  return (
    <div className="NavigationDiv">
      <div className="Navigation_H1">
        <div className="Navigation_H2">
          <ButtonTavBarReview
            text={"Chi tiết"}
            setOnClickDetail={setOnClickDetail}
            setOnClicMenu={setOnClicMenu}
            setOnClickPath={setOnClickPath}
            setOnClickReviews={setOnClickReviews}
            checkOnClick={onClickDetail}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
          <ButtonTavBarReview
            text={"Menu"}
            setOnClickDetail={setOnClickDetail}
            setOnClicMenu={setOnClicMenu}
            setOnClickPath={setOnClickPath}
            setOnClickReviews={setOnClickReviews}
            checkOnClick={onClicMenu}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
          <ButtonTavBarReview
            text={"Chỉ đường"}
            setOnClickDetail={setOnClickDetail}
            setOnClicMenu={setOnClicMenu}
            setOnClickPath={setOnClickPath}
            setOnClickReviews={setOnClickReviews}
            checkOnClick={onClickPath}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
          <ButtonTavBarReview
            text={"Reviews"}
            setOnClickDetail={setOnClickDetail}
            setOnClicMenu={setOnClicMenu}
            setOnClickPath={setOnClickPath}
            setOnClickReviews={setOnClickReviews}
            checkOnClick={onClickReviews}
            selectedPlace={selectedPlace}
          ></ButtonTavBarReview>
        </div>
      </div>
      {onClickReviews && (
        <>
          <Reviews reviewData={reviewsData} />
          <div className="NavigationDiv_H2">
            <div className="NavigationDiv_H2_filter">
              <div className="NavigationDiv_H2_filter_H1">
                <FilterComment text={"Newest"} />
              </div>
            </div>
            <ul className="NavigationDiv_H2_ul">
              {reviewsData.map((review, index) => (
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
      {onClicMenu && <Menu selectedPlace={selectedPlace}></Menu>}
      {onClickDetail && <About selectedPlace={selectedPlace}></About>}
      {onClickPath && <Direction selectedPlace={selectedPlace}></Direction>}
    </div>
  );
};
export default Navigation;
