import React from 'react';
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";

import AboutUsTheFamily from './AboutUsTheFamily';
import AboutUsTheStand from './AboutUsTheStand';

import '../componentStyles/AboutUs.css';


class AboutUs extends React.Component{
    

    
    render() {
        return (
            <div id="about-us">
                <Switch>
                    <Route path='/thefamily' component={AboutUsTheFamily}/>
                    <Route path='/thestand' component={AboutUsTheStand}/>
                    <Route path='/' component={Home}/>
                </Switch>
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




