import React from "react";

import styled from "styled-components";

const H1 = styled.h1`
  width: auto;
  font-size: 3em;
  letter-spacing: 0.1em;
  font-weight: normal;
  text-align: center;
  color: ${({ fontColor }) => fontColor};


  border-bottom: ${props => props.borderBottom ? '5px solid black' : ''};

  -webkit-text-stroke:  ${props => props.outlined ?  '1px black' : ''} ;

  @media (max-width: 680px) {
    font-size: 2.5em;
  }
`;

const SectionTitle = ({ children, fontColor, outlined, borderBottom, animateOnScroll}) => {
  return <H1 fontColor={fontColor} outlined={outlined} data-aos={animateOnScroll} borderBottom={borderBottom} >{children}</H1>;
};

export default SectionTitle;
