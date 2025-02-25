import React from "react";
import "./Reviews.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TypeRating from "./Component/TypeRating/TypeRating";
import Classification from "./Component/Classification/Classification";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarRating from "./StarRating/StarRating";
const Reviews = ({ selectedPlace, reviewData }) => {
  const reviews = reviewData.map((review) => review.sao);
  const average =
    reviews.length > 0
      ? reviews.reduce((acc, curr) => acc + Number(curr), 0) / reviews.length
      : 0;

  let range9to10 = 0;
  let range7to8 = 0;
  let range5to6 = 0;
  let range3to4 = 0;
  let range1to2 = 0;

  if (reviews.length > 0) {
    // Loop through the reviews and count how many fall into each range
    reviews.forEach((review) => {
      if (review >= 9 && review <= 10) {
        range9to10++;
      } else if (review >= 7 && review <= 8) {
        range7to8++;
      } else if (review >= 5 && review <= 6) {
        range5to6++;
      } else if (review >= 3 && review <= 4) {
        range3to4++;
      } else if (review >= 1 && review <= 2) {
        range1to2++;
      }
    });
  }

  const ranges = [
    { label: "5", count: range9to10 },
    { label: "4", count: range7to8 },
    { label: "3", count: range5to6 },
    { label: "2", count: range3to4 },
    { label: "1", count: range1to2 },
  ];

  // Find the range with the most reviews
  const mostReviews =
    reviews.length > 0
      ? ranges.reduce((prev, curr) => (curr.count > prev.count ? curr : prev))
      : { label: "No reviews", count: 0 };

  return (
    <div className="ReviewsDiv">
      <h2>
        <span>Reviews</span>
        <div className="ReviewsDiv_H1">
          {/* <div className="ReviewsDiv_H1_rating_summary">
            <div className="ReviewsDiv_H1_rating_summary_H1">
              <div className="ReviewsDiv_H1_rating_summary_H2">
                <div className="ReviewsDiv_H1_rating_summary_img">
                  <div className="ReviewsDiv_H1_rating_summary_img_H1">
                    <CircularProgressbarWithChildren
                      strokeWidth={4}
                      value={(average * 100) / 10}
                      styles={buildStyles({
                        pathColor: "hsl(174, 100%, 15%)",
                        trailColor: "#F0F0F0",
                        textSize: "100px",
                      })}
                    >
                      <div className="ReviewsDiv_H1_rating_summary_img_point">
                        <span className="ReviewsDiv_H1_rating_summary_img_point_h2">
                          <span>{average.toFixed(1)}</span>
                        </span>
                        <span className="ReviewsDiv_H1_rating_summary_img_point_h1">
                          /10
                        </span>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
                <div className="ReviewsDiv_H1_rating_summary_img_count">
                  <span className="ReviewsDiv_H1_rating_summary_img_count_span1">
                    {reviews.length > 0 ? "Excellent" : "No reviews available"}
                  </span>
                  <span className="ReviewsDiv_H1_rating_summary_img_count_span2">
                    <span>{reviews.length} reviews</span>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="ReviewsDiv_H1_rating_typeRating">
            <span className="ReviewsDiv_H1_rating_summary_img_count_span1">
              Đánh giá chung
            </span>
            <div className="ReviewsDiv_H1_rating_typeRating_H1">
              {/* <div className="ReviewsDiv_H1_rating_typeRating_H2">
                <TypeRating
                  text={"Đồ ăn"}
                  rating={reviews.length > 0 ? 9 : 0}
                />
                <TypeRating
                  text={"Dịch vụ"}
                  rating={reviews.length > 0 ? 8 : 0}
                />
                <TypeRating
                  text={"Không khí"}
                  rating={reviews.length > 0 ? 7 : 0}
                />
              </div> */}
              <div class="y-css-f0t6x4" role="img" aria-label="4 star rating">
                <StarRating
                  rating={4}
                  size={"32"}
                  classname={"y-css-35tusp"}
                ></StarRating>
              </div>
            </div>
            <span className="ReviewsDiv_H1_rating_summary_img_count_span2">
              <span>{reviews.length} reviews</span>
            </span>
          </div>
          <div className="ReviewsDiv_H1_rating_classification">
            <div className="ReviewsDiv_H1_rating_classification_H1">
              <Classification
                text={"5"}
                rating={
                  reviews.length > 0
                    ? mostReviews.label === "5"
                      ? 100
                      : (range9to10 * 100) / mostReviews.count
                    : 0
                }
              />
              <Classification
                text={"4"}
                rating={
                  reviews.length > 0
                    ? mostReviews.label === "4"
                      ? 100
                      : (range7to8 * 100) / mostReviews.count
                    : 0
                }
              />
              <Classification
                text={"3"}
                rating={
                  reviews.length > 0
                    ? mostReviews.label === "3"
                      ? 100
                      : (range5to6 * 100) / mostReviews.count
                    : 0
                }
              />
              <Classification
                text={"2"}
                rating={
                  reviews.length > 0
                    ? mostReviews.label === "2"
                      ? 100
                      : (range3to4 * 100) / mostReviews.count
                    : 0
                }
              />
              <Classification
                text={"1"}
                rating={
                  reviews.length > 0
                    ? mostReviews.label === "1"
                      ? 100
                      : (range1to2 * 100) / mostReviews.count
                    : 0
                }
              />
            </div>
          </div>
          <div className="ReviewsDiv_H1_rating_howToRating">
            <VerifiedIcon className="ReviewsDiv_H1_rating_howToRating_icon"></VerifiedIcon>
            <div className="ReviewsDiv_H1_rating_howToRating_H1">
              <span className="ReviewsDiv_H1_rating_howToRating_H1_span1">
                <span>Trải nghiệm thực tế từ thực khách thực sự</span>
              </span>
              <span className="ReviewsDiv_H1_rating_howToRating_H1_span2">
                <span>
                  Chỉ những khách đã đặt chỗ với TheFork mới có thể để lại xếp
                  hạng và đánh giá.
                </span>
              </span>
            </div>
          </div>
        </div>
      </h2>
    </div>
  );
};

export default Reviews;
