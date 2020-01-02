import React from 'react';


import '../componentStyles/font.css';
import '../componentStyles/Header.css';
import HeaderTitle from './HeaderTitle';
import HeaderNav from "./HeaderNav";



export default function Header(){
    return(
        <header>
            <HeaderTitle/>
            <HeaderNav/>
        </header>
    )
}
