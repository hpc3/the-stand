import React from "react";
import styled from "styled-components";

import backgroundImage from "../images/backgroundAbout.jpg";
import AboutBullets from "../images/aboutBulletPt2.svg";

const AboutUsViewWrapper = styled.div`
  height: inherit;
  width: 100vw;
  height: 100vh;

  background: url(${backgroundImage});
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AboutUsHeadingWrapper = styled.div`
  flex: 0.1;
  display: flex;
  align-self: center;
  padding-bottom: 20px;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-self: center; */

  /* @media (max-width: 700px) {
    align-self: center;
  } */
`;

const AboutUsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  background: rgba(0, 0, 0, 0.95);
  height: 80%;
  width: 90%;
  color: white;
  font-family: inherit;
  padding: 1em;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid white;

  @media (max-width: 700px) {
    align-self: center;
    height: 90%;
    background: rgba(0, 0, 0, 0.9);
  }
`;

const AboutUsUL = styled.ul`
  list-style-image: url(${AboutBullets});
  list-style-position: inside;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  grid-gap: 1em;

  & > li {
    color: green;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const AboutUsMainText = styled.p`
  line-height: 25px;

  align-self: center;
  width: 90%;

  @media (max-width: 700px) {
    font-size: 0.9em;
    line-height: initial;
    width: 100%;
  }
`;

const AboutUs = () => {
  return (
    <AboutUsViewWrapper id="about-us">
      <AboutUsContentContainer>
        <AboutUsHeadingWrapper>
          <h1
            style={{
              fontSize: "45px",
              fontWeight: "100",
              width: "fit-content",
              borderBottom: "2px solid white",
            }}
            data-aos="fade-right"
          >
            About Us
          </h1>
        </AboutUsHeadingWrapper>
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
            justifyContent: "space-evenly",
          }}
        >
          <AboutUsMainText data-aos="fade-left">
            We have always had a passion for gardening but it wasn’t until we
            moved into our old farmhouse on Whitford Road that gardening
            blossomed into farming. As our family grew so did the size of our
            garden. When one summer brought a bumper crop of tomatoes our
            youngest entrepreneurs transformed the traditional “lemonade stand”
            into a “tomato stand”. From a small table with a few tomatoes and a
            coffee cup cash register, our produce stand has grown into “The Kids
            Produce Stand”. With a demand for more and varied produce we
            partnered with a few local Amish family farms. Today, we provide a
            wide variety of seasonal, fresh picked local produce while still
            maintaining our easy access, self service style. Come enjoy the best
            fruits and vegetables local farm have to offer at The Kids Produce
            Stand
          </AboutUsMainText>

          <h2
            style={{
              fontSize: "15px",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Come enjoy the best fruits and vegetables local farms have to offer
            at <span style={{ color: "yellow" }}>The Kids Produce Stand</span>
          </h2>
          <AboutUsUL>
            <li style={{ color: "green" }}>
              Open daily mid July through Thanksgiving
            </li>
            <li>Fresh, seasonal produce</li>

            <li>Self Service</li>
            <li>Support Local Farmers</li>
          </AboutUsUL>
        </div>
      </AboutUsContentContainer>
    </AboutUsViewWrapper>
  );
};

export default AboutUs;
