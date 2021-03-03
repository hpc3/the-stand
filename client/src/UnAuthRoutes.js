import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getVeggies } from "./actions/veggieActions";

import BackToTop from "./components/BackToTop";
import Header from "./components/Header/Header";
import AboutUs from "./components/AboutUs";
import { Veggies } from "./components/Veggies";
import ContactUs from "./components/ContactUs";

const UnAuthRoutes = ({ getVeggies }) => {
  useEffect(() => {
    getVeggies();
  });

  return (
    <>
      <Header />
      <AboutUs />
      <Veggies />
      <ContactUs />
      <BackToTop />
    </>
  );
};

export default connect(null, { getVeggies })(UnAuthRoutes);
