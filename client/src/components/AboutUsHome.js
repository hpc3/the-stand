import React, { useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

import SectionTitle from "./SectionTitle";
import AboutUsButton from "./AboutUsButton";

const AboutUsHomeWrapper = styled.div`
  height: inherit;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-evenly;

  width: 70%;
  height: 50%;
`;

const AboutUsButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const AboutUsHome = ({ animation }) => {
  useEffect(() => {
    Aos.init({});
  });

  return (
    <AboutUsHomeWrapper>
      <SectionTitle
        fontColor="Blue"
        animateOnScroll="fade-down"
        aosAnchorPlacement="center-bottom"
      >
        About Us
      </SectionTitle>
      <AboutUsButtonWrapper>
        <AboutUsButton
          viewChange={animation}
          direction="middleToLeft"
          view="family"
          animateOnScroll="fade-right"
        >
          The Family
        </AboutUsButton>
        <AboutUsButton
          viewChange={animation}
          direction="middleToRight"
          animateOnScroll="fade-left"
        >
          The Stand
        </AboutUsButton>
      </AboutUsButtonWrapper>
    </AboutUsHomeWrapper>
  );
};

export default AboutUsHome;
