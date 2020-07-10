import React from "react";
import styled from "styled-components";

import SectionTitle from "./SectionTitle";
import AboutUsButton from "./AboutUsButton";

// import "../componentStyles/AboutUsTheStand.css";

import TheStand from "../images/the-stand.JPG";

const AboutUsTheStandWrapper = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 80%;

`;

const AboutUsTheStandContentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  height: 50%;
  align-items: center;


  @media(max-width:680px){
    flex-direction: column;
    height: 80%;
  }


`;

const AboutUsTheStandText = styled.div`
  width: 60%;
  color: yellow;
  font-size: .9em;
`;

const TheStandImage = styled.img`
  width: 30%;

  border-radius: 1em;
  box-shadow: 0px 5px 10px -3px black;


  @media(max-width: 680px){
    width: 50%;
  }

`;





const AboutUsTheStand = ({ animation }) => {
  return (
    <AboutUsTheStandWrapper>
      <SectionTitle fontColor="yellow">The Stand</SectionTitle>
      <AboutUsTheStandContentWrapper>
        <TheStandImage src={TheStand} alt="Produce stand"></TheStandImage>
        <AboutUsTheStandText>
          <p>
            The produce stand has been a constant for so long none of us can
            really remember when it started. After growing too many tomatos we
            decided to put a table and an old coffee can in front of our fence
            to avoid any waste. Year after year we slowly grew to what we are
            today. A rickity structure now placed behind our fence. Times be a
            changing.{" "}
          </p>
        </AboutUsTheStandText>
      </AboutUsTheStandContentWrapper>

      <AboutUsButton
        viewChange={animation}
        direction="rightToMiddle"
        fontColor="yellow"
      >
        Back
      </AboutUsButton>
    </AboutUsTheStandWrapper>
  );
};

export default AboutUsTheStand;
