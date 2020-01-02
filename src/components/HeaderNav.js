import React from "react";
import {Spring} from 'react-spring/renderprops';

import '../componentStyles/Header.css'

export default function HeaderNav() {

    return(
        <Spring
            from={{opacity: 0, paddingTop: 25}}
            to={{opacity: 1, paddingTop: 0}}
            config={{duration: 1250}}
        >
            {props => <div style={props}>
                <ul className='header-nav'>
                <li className='header-nav-item'><a href='#top'>Home</a></li>
                <li className='header-nav-item'><a href='#aboutus'>About Us</a></li>
                <li className='header-nav-item'><a href='#produce'>Produce</a></li>
                <li className='header-nav-item'><a href='#top'>Contact Us</a></li>
                </ul>
            </div>}
        </Spring>
    )
}