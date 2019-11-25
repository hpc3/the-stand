import React from 'react';


import '../componentStyles/AboutUs.css';
import '../componentStyles/font.css';

class AboutUs extends React.Component{


    render() {
        return (
            <div id='about-us'>
                <span id='aboutus'></span>
                <h1 id='about-us-heading'>About Us</h1>

                <div id='about-us-info'>
                    <h2>Some stuff</h2>
                    <p>some more stuff woah</p>
                </div>
            </div>
        );
    }

}

export default AboutUs;