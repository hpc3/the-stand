import React from "react";
import styled, { keyframes } from "styled-components";

import SectionTitle from "./SectionTitle";
import Nav from "./Nav";
import Logo from "./Logo";

const titleAnimation = keyframes`

    from{
        transform: translateX(20%);
    }

    to{
        transform: translateX(0);

    }
`;

const logoAnimation = keyframes`

from{
        transform: translateX(-20%);
    }

    to{
        transform: translateX(0);
    }
`;

const AnimatedLogo = styled.div`
  animation: ${logoAnimation} 2s;
`;

const StyledHeader = styled.header`
  height: 100vh;
  width: 100%;
  background-color: cornflowerblue;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`;

const SplashWrapper = styled.div`
  align-self: center;
  align-items: center;
  height: inherit;
  display: flex;
  width: 70%;

  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const TitleWrapper = styled.div`
  animation: ${titleAnimation} 2s;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderWrapper>
        <Nav />
        <SplashWrapper>
          <AnimatedLogo>
            <Logo />
          </AnimatedLogo>
          <TitleWrapper>
            <SectionTitle fontColor="#FCFA37" outlined>
              The Kids Produce Stand
            </SectionTitle>
          </TitleWrapper>
        </SplashWrapper>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;
