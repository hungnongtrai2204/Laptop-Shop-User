import PropTypes from "prop-types";
import React from "react";

const BrandLogoOneSingle = ({ data, sliderClassName, spaceBottomClass }) => {
  return (
    <div
      className={`single-brand-logo ${sliderClassName ? sliderClassName : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <img
        src={process.env.PUBLIC_URL + data.image}
        alt=""
        style={{
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
};

BrandLogoOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default BrandLogoOneSingle;
