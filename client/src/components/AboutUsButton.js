import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`

    outline: none;

    font-size: 2em;
    border: none;
    background-color: inherit;
    color: ${props => props.fontColor || 'blue'};

    border-bottom: solid white 5px;



    &:hover{
        cursor: pointer;
        color: orange;
    }


    &:visited{
        color: initial;
    }



`



const AboutUsButton = ({children, viewChange, direction, animateOnScroll, fontColor}) => {

    console.log(typeof viewChange);

    return(
        <StyledButton onClick={() => viewChange(direction)} data-aos={animateOnScroll} fontColor={fontColor} >
            {children}
        </StyledButton>
    );

}

export default AboutUsButton;