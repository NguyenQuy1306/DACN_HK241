import React from "react";
import { Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import useStyles from "./styles.js";

const Marker = React.memo(({ place, matches }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.markerContainer}
      lat={Number(place.latitude)}
      lng={Number(place.longitude)}
      key={place.id}
    >
      {!matches ? (
        <LocationOnOutlinedIcon color="primary" fontSize="small" />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Typography
            className={classes.typography}
            variant="subtitle2"
            gutterBottom
          >
            {place.ten}
          </Typography>
          <img
            className={classes.pointer}
            src={
              place.photo
                ? place.photo.images.large.url
                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
            }
          />
        </Paper>
      )}
    </div>
  );
});

export default Marker;
// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const Wrapper = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 18px;
//   height: 18px;
//   background-color: #000;
//   border: 2px solid #fff;
//   border-radius: 100%;
//   user-select: none;
//   transform: translate(-50%, -50%);
//   cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
//   &:hover {
//     z-index: 1;
//   }
// `;

// const Marker = ({ text, onClick }) => (
//   <Wrapper
//     alt={text}
//     onClick={onClick}
//   />
// );

// Marker.defaultProps = {
//   onClick: null,
// };

// Marker.propTypes = {
//   onClick: PropTypes.func,
//   text: PropTypes.string.isRequired,
// };

// export default Marker;
