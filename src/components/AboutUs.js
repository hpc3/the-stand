import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AboutUsTheFamily from './AboutUsTheFamily';
import AboutUsTheStand from './AboutUsTheStand';

import '../componentStyles/AboutUs.css';


class AboutUs extends React.Component{
    render() {
        return (
            <div id="about-us">
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route path='/thefamily'>
                            <AboutUsTheFamily/>
                        </Route>
                        <Route path='/thestand'>
                            <AboutUsTheStand/>
                        </Route>
                    </Switch>
                </Router>
            </div>  
        );
        function Home(){
            return(
                <div id='about-us-home'>
                    <h1 id='about-us-heading'>Our Story</h1>
                    <span id='about-us-content'>
                        <div className='about-us-tiles'>
                            <Link to='/thefamily' className='react-links'><p>The Family</p></Link>
                        </div>
                        <div className='about-us-tiles'>
                            <Link to='/thestand' className='react-links'><p>The Stand</p></Link>
                        </div>
                    </span>
                </div>
            )
        }
    }
}

export default AboutUs;




