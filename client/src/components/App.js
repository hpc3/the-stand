import React from 'react';

import Header from './Header'
import AboutUs from './AboutUs'
import SearchContainer from './SearchContainer';
import ContactUs from "./ContactUs";

import '../componentStyles/font.css'
import '../componentStyles/App.css';




const App = () => {
    return (
        <div>
            <Header/>
            <AboutUs/>
            <SearchContainer/>
            <ContactUs/>
        </div>
    );
}

export default App;
