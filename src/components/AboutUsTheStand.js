import React from 'react';
import {Link} from 'react-router-dom';

import '../componentStyles/AboutUsTheStand.css';

import TheStand from '../images/the-stand.JPG'

function AboutUsTheStand(props) {
    return (
        <div id="about-us-the-stand">

            <h2 id="about-us-the-stand-title">The Stand</h2>

            <div id='about-us-the-stand-container'>
                <img src={TheStand} alt='Produce stand'></img>
                <span id="about-us-the-stand-container-content">
                    <p>What began as a way to get rid of extra tomatoes became a small family business. Happy providing the community with fresh produce from the summer through the fall.</p>
                </span>
            </div>

            <Link to='/' className='react-links' >Home</Link>
        </div>
    );
}

export default AboutUsTheStand;