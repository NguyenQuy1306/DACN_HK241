import React, { useState } from "react";
import "./Comment.css";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";

const Comment = ({ selectedPlace, review }) => {
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
              <span className="CommentDiv_blockquote_H1_point_H1_span1">
                {review.rating}
              </span>
              <span className="CommentDiv_blockquote_H1_point_H1_span2">
                /10
              </span>
            </div>
          </div>
        </div>
        <div className="CommentDiv_blockquote_H2">
          <div className="CommentDiv_blockquote_H2_comment">
            <div className="CommentDiv_blockquote_H2_comment_H1">
              <p>{review.content}</p>
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
      </blockquote>
    </li>
  );
};

export default Comment;
