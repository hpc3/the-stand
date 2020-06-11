import React from 'react';

import AboutUsTheFamily from './AboutUsTheFamily';
import AboutUsTheStand from './AboutUsTheStand';

import '../componentStyles/AboutUs.css';

class AboutUs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            view: 'home'
        }

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange = (e) => {
        this.setState({view: e.target.id})
    }
    

    
    render() {

        let AboutUsView;

        switch(this.state.view){
            case('family'):
                AboutUsView = <AboutUsTheFamily
                                changePage={this.handleViewChange}
                              />
                break;
            case('stand'):
                AboutUsView = <AboutUsTheStand
                                changePage={this.handleViewChange}
                              />
                break;
            case('home'):
            default:
                AboutUsView = <div id='about-us-home'>
                                    <h1 id='about-us-heading'>Our Story</h1>
                                    <span id='about-us-content'>
                                        <div className='about-us-tiles'>
                                            <button className="about-us-button" onClick={this.handleViewChange} id="family">The Family</button>
                                        </div>
                                        <div className='about-us-tiles'>
                                             <button className="about-us-button" onClick={this.handleViewChange}  id="stand">The Stand</button>
                                        </div>
                                    </span>
                                </div>
                break;
        } 
        return (
            <div id="about-us">
                {AboutUsView}
            </div>
        );
    }
}

export default AboutUs;




