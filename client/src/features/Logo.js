import React from "react";
import styled from "styled-components";

import TheStandLogoPng from "../images/the-stand-logo-v2.png";

const StyledImage = styled.img`
  height: 15em;
`;

const Logo = () => {
  return (
    <StyledImage
      src={TheStandLogoPng}
      alt="Logo for The Kids Produce Stand"
    ></StyledImage>
  );
};

export default Logo;
