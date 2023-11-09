import React, { Fragment } from "react";
import { MetaTags } from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import Layout from "../../components/Layout";

const HomePage = (props) => {
  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Ecommerce Home</title>
        <meta
          name="description"
          content="Fashion home of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomePage;
