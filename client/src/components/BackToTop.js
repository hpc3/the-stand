import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

const StyledFooter = styled.footer`
  background-color: white;
  height: 4em;
`;

const StyledScrollLink = styled(Link)`
  &:hover {
    color: green;
  }
`;

const BackToTop = () => {
  return (
    <StyledFooter>
      <p style={{ textAlign: "center", paddingTop: "1.5em" }}>
        <StyledScrollLink to="top" smooth={true} duration={2000}>
          Back To Top
        </StyledScrollLink>
      </p>
    </StyledFooter>
  );
};

export default BackToTop;
