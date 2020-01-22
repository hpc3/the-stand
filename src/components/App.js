import React from 'react';


import Header from './Header';
import AboutUs from './AboutUs';
import SearchContainer from './SearchContainer';
import ContactUs from "./ContactUs";


import '../componentStyles/App.css';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class App extends React.Component{

    render() {
        return (
            <div>
                <Header/>
                <AboutUs/>
                <SearchContainer/>
                <ContactUs/>
            </div>
        );
    }
}

export default App;