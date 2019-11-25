import React from 'react';

import '../componentStyles/font.css';
import '../componentStyles/Header.css';



const Header = () => (
    <header>
        <h1 className="header-title">The Stand</h1>
        <ul className='header-nav'>
            <li className='header-nav-item'><a href='#top'>Home</a></li>
            <li className='header-nav-item'><a href='#aboutus'>About Us</a></li>
            <li className='header-nav-item'><a href='#produce'>Produce</a></li>
            <li className='header-nav-item'><a href='#top'>Contact Us</a></li>
        </ul>
    </header>
)

export default Header;