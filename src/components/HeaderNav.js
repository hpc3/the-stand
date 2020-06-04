import React from "react";


import '../componentStyles/Header.css'

const HeaderNav = () => {

    return(
        <div>
            <nav id="header-nav">
                <li className='header-nav-item'><a href='#about-us'>About Us</a></li>
                <li className='header-nav-item'><a href='#produce'>Produce</a></li>
                <li className='header-nav-item'><a href='#contact-us'>Contact Us</a></li>
            </nav>
        </div>
    )
}

export default HeaderNav;