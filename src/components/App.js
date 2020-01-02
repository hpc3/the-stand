import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './Header';
import AboutUs from './AboutUs';
import SearchContainer from './SearchContainer';
import ContactUs from "./ContactUs";

import '../componentStyles/App.css';



class App extends React.Component{

    render() {
        return (
        <Router>
            <Switch>
                <Route path='/Home'>
                    <Header/>
                    <AboutUs/>
                    <SearchContainer/>
                    <ContactUs/>
                </Route>
                <Route path='/Dad'>
                    <SearchContainer/>
                </Route>
            </Switch>
        </Router>
        );
    }
}

export default App;