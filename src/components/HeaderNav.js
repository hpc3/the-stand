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
                <nav className="header-nav">
                    <li className='header-nav-item'><a href='#about-us'>About Us</a></li>
                    <li className='header-nav-item'><a href='#produce'>Produce</a></li>
                    <li className='header-nav-item'><a href='#contact-us'>Contact Us</a></li>
                </nav>
            </div>}
        </Spring>
    )
}