import React from 'react';

import HeaderTitle from './HeaderTitle';
import HeaderNav from "./HeaderNav";

import '../componentStyles/font.css';
import '../componentStyles/Header.css';

export default function Header(){
    return(
        <header>
            <HeaderTitle/>
            <HeaderNav/>
        </header>
    )
}
