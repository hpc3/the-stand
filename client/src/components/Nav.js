import React from "react";

import {Link} from 'react-scroll';

import styled, {keyframes} from "styled-components";


const slideDown = keyframes`
    from{
        transform: translateY(-100%);

    }
    to{
        transform: translateY(0);
    }
`


const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 4em;

  background-color: forestgreen;

  animation: ${slideDown} 2s;
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: yellow;
  &:hover {
    color: red;
  }

  &:visited{
      color: yellow;
  }
`;







const Nav = () => {
  return (
    <StyledNav id="top">        
            <StyledLink to="about-us" smooth={true} duration={2000}>About Us</StyledLink>
            <StyledLink to="produce" smooth={true} duration={2000}>Produce</StyledLink>
            <StyledLink to="contact-us" smooth={true} duration={2000}>Contact Us</StyledLink>
    </StyledNav>
  );
};

export default Nav;
