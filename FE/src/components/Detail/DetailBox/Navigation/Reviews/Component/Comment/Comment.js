import React, { useState } from "react";
import "./Comment.css";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarRating from "../../StarRating/StarRating";
const Comment = ({ selectedPlace, review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const limitTextLength = (text, limit = 200) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };
  return (
    <li className="CommentDiv">
      <blockquote className="CommentDiv_blockquote">
        <div className="CommentDiv_blockquote_H1">
          <div className="CommentDiv_blockquote_H1_personalDetail">
            <span className="CommentDiv_blockquote_H1_personalDetail_span">
              <PersonIcon className="CommentDiv_blockquote_H1_personalDetail_span_icon"></PersonIcon>
            </span>
            <div className="CommentDiv_blockquote_H1_personalDetail_detail">
              <p>
                <cite className="CommentDiv_blockquote_H1_personalDetail_detail_cite">
                  {review.reviewer.name}
                </cite>
                • <span> {review.reviewer.reviewsCount} reviews</span>
              </p>
              <p>
                <span>{review.date}</span>
              </p>
            </div>
          </div>
          <div className="CommentDiv_blockquote_H1_point">
            <div className="CommentDiv_blockquote_H1_point_H1">
              {/* <span className="CommentDiv_blockquote_H1_point_H1_span1">
                {review.rating}
              </span>
              <span className="CommentDiv_blockquote_H1_point_H1_span2">
                /10
              </span> */}
              <StarRating
                rating={4.5}
                size={"16"}
                classname={"y-css-16tusp"}
              ></StarRating>
            </div>
          </div>
        </div>
        <div className="CommentDiv_blockquote_H2">
          <div className="CommentDiv_blockquote_H2_comment">
            <div className="CommentDiv_blockquote_H2_comment_H1">
              <p>{review.content}</p>
            </div>
            <div className="CommentDiv_blockquote_H2_comment_listImage">
              <img></img>
              <div className="CommentDiv_blockquote_H2_comment_listImage_text">
                <p className="CommentDiv_blockquote_H2_comment_listImage_text_p">
                  <span>Xem các ảnh</span>
                </p>
              </div>
            </div>
          </div>
          <div className="CommentDiv_blockquote_H2_icon">
            <Button className="CommentDiv_blockquote_H2_icon_button1">
              <ThumbUpOffAltIcon className="CommentDiv_blockquote_H2_icon_button1_icon"></ThumbUpOffAltIcon>
              <span>Like</span>
            </Button>
            <Button className="CommentDiv_blockquote_H2_icon_button1">
              <OutlinedFlagIcon className="CommentDiv_blockquote_H2_icon_button1_icon"></OutlinedFlagIcon>
              <span>Report</span>
            </Button>
          </div>
        </div>

        {/* Render each comment in its own CommentDiv_blockquote_H3 */}
        {review.comments &&
          review.comments.length > 0 &&
          review.comments.map((comment, index) => (
            <div key={index} className="CommentDiv_blockquote_H3">
              <div className="CommentDiv_blockquote_H3_header">
                <div className="CommentDiv_blockquote_H3_header_div">
                  <StorefrontIcon className="CommentDiv_blockquote_H3_header_div_icon"></StorefrontIcon>
                </div>
                <p className="CommentDiv_blockquote_H3_header_div_p">
                  {comment.name} •
                  <span className="CommentDiv_blockquote_H3_header_div_icon_span">
                    {" "}
                    {comment.role}
                  </span>
                </p>
              </div>
              <div className="CommentDiv_blockquote_H3_comment">
                <div className="CommentDiv_blockquote_H3_comment_div">
                  <p className="CommentDiv_blockquote_H3_comment_div_p">
                    {isExpanded
                      ? comment.content
                      : limitTextLength(comment.content, 200)}
                    {comment.content.length > 200 && (
                      <Button
                        className="CommentDiv_blockquote_H3_readmore_button"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </Button>
                    )}
                  </p>
                </div>
              </div>

              {/* Optional like button for each comment */}
              {/* <div className="CommentDiv_blockquote_H3_comment_actions">
                <Button className="CommentDiv_blockquote_H3_comment_button">
                  <ThumbUpOffAltIcon className="CommentDiv_blockquote_H3_comment_button_icon"></ThumbUpOffAltIcon>
                  <span>{comment.actions.like} Likes</span>
                </Button>
              </div> */}
            </div>
          ))}
      </blockquote>
    </li>
  );
};

export default Comment;
