import React from 'react';
import styled, {keyframes} from 'styled-components';



import AboutUsTheFamily from './AboutUsTheFamily';
import AboutUsTheStand from './AboutUsTheStand';
import AboutUsHome from './AboutUsHome';




// Keyframe Animation

const middleToRight = keyframes`

    from{
        transform: translateX(0)
    }
    to{
        transform: translateX(-${100/3}%)
    }

`


const rightToMiddle= keyframes`

    from{
        transform: translateX(-${100/3}%)
    }
    to{
        transform: translateX(0);
    }

`


const middleToLeft = keyframes`

from{
        transform: translateX(0)
    }
    to{
        transform: translateX(${100/3}%);
    }

`



const leftToMiddle= keyframes`

    from{
            transform: translateX(${100/3}%)
        }
        to{
            transform: translateX(0);
        }


`


// Styled Components

// Wraps contents, provides a container to hide the rest of the AboutUs Components
const OverFlowWrapper = styled.div`

    height: 100vh;
    width: 100vw;
    overflow-x: hidden;

`


const AboutUsContainer = styled.div`

    
    overflow-x: hidden; 

    margin-left: -100vw;
    
    animation: ${props => props.animate} 1.5s ease forwards;

    height: 100vh;
    width: 300vw;
    background-color: yellow;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const AboutUsViewWrapper = styled.div`


    height: inherit;
    width: 100vw;

    background: ${props => props.bgColor || 'white'};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


class AboutUs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            animation: null

            // middleToRight: false,
            // middleToLeft: false,
            // rightToMiddle: false,
            // leftToMiddle: false
        }

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange = (view) => {
        this.setState({view})
    }

    handleAnimation = (animationDirection) => {

        this.setState({animation: animationDirection});
    }
    

    
    render() {
       
            let animateType;
            switch (this.state.animation) {
                case "middleToRight":
                    animateType = middleToRight;
                    break;
                case "rightToMiddle":
                    animateType = rightToMiddle;
                    break;
                case "middleToLeft":
                    animateType = middleToLeft;
                    break;
                case "leftToMiddle":
                    animateType = leftToMiddle;
                    break;
                default:
                    break;
            }


         

        return (
            <OverFlowWrapper id="about-us">
                    <AboutUsContainer animate={animateType} >
                        <AboutUsViewWrapper bgColor="red" >
                            <AboutUsTheFamily animation={this.handleAnimation} />
                        </AboutUsViewWrapper>
                        <AboutUsViewWrapper>
                            <AboutUsHome animation={this.handleAnimation} />
                        </AboutUsViewWrapper>
                        <AboutUsViewWrapper bgColor="green">
                            <AboutUsTheStand animation={this.handleAnimation} />
                        </AboutUsViewWrapper>
                    </AboutUsContainer>
            </OverFlowWrapper>
        );
    }
}

export default AboutUs;




