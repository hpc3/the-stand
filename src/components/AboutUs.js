import React from 'react';

import {Transition} from "react-spring/renderprops";


import '../componentStyles/AboutUs.css';
import '../componentStyles/font.css';

class AboutUs extends React.Component{

    render() {
        return (
            <div id="about-us">
            {/*<span id='aboutus'></span>*/}
            <h1 id='about-us-heading'>Our Story</h1>
            <span id='about-us-content'>
                <div className='about-us-tiles'>
                    <p>The Family</p>
                </div>
                <div className='about-us-tiles'>
                    <p>The Stand</p>
                </div>
            </span>

            {/*<div className="about-us-tiles">*/}
            {/*    Just some Sample of test to transition*/}
            {/*</div>*/}

            {/*<div id='about-us-description'>*/}
            {/*    <p>*/}
            {/*        The Kids Produce Stand is hard to pin down.*/}
            {/*        It began from a simple problem, we had too many tomatoes.*/}
            {/*        Henry, our father, placed a shotty table in front of our fence.*/}
            {/*        The table contained two things, tomatoes and an old coffee container with a slit.*/}
            {/*        With the support of the community we've grown to what we are today.*/}
            {/*        Thank you for your continued support.*/}
            {/*        And tell your friends to stop by.*/}
            {/*    </p>*/}
            {/*</div>*/}
        </div>
        );
    }

}

export default AboutUs;




