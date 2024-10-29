import React from "react";

const StarRating = ({ rating, totalStars = 5 }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - filledStars - halfStar;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Filled stars */}
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={`filled-${index}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="rgba(255,100,61,1)"
        >
          <path d="M10 1.6l1.9 5.8h6l-4.9 3.5 1.9 5.8L10 13.2 5.1 16.7l1.9-5.8L2.1 7.4h6L10 1.6z" />
        </svg>
      ))}

      {/* Half star */}
      {halfStar === 1 && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="rgba(255,100,61,1)"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="rgba(255,100,61,1)" />
              <stop offset="50%" stopColor="rgba(200,201,202,0.48)" />
            </linearGradient>
          </defs>
          <path
            d="M10 1.6l1.9 5.8h6l-4.9 3.5 1.9 5.8L10 13.2 5.1 16.7l1.9-5.8L2.1 7.4h6L10 1.6z"
            fill="url(#halfGrad)"
          />
        </svg>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={`empty-${index}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="rgba(200,201,202,0.48)"
        >
          <path d="M10 1.6l1.9 5.8h6l-4.9 3.5 1.9 5.8L10 13.2 5.1 16.7l1.9-5.8L2.1 7.4h6L10 1.6z" />
        </svg>
      ))}

      {/* Display rating value */}
      <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
