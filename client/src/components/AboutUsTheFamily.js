import React from 'react';

import FamilyMember from './FamilyMember';

import '../componentStyles/AboutUsTheFamily.css';

import Henry from '../images/Henry.jpeg'
import Kyle from '../images/Kyle.jpeg'
import Anna from '../images/Anna.JPG'
import Mom from '../images/Mom.jpeg'
import Dad from '../images/Dad.jpeg'
import Harry from '../images/Harry.jpeg'

function AboutUsTheFamily(props) {
    return (
           <div id='about-us-family'>
                <h2 id="about-us-family-title">The Family</h2>
                <div id='family-member-container'>
                    <FamilyMember  name='Little Henry' imgPath={Henry}/>
                    <FamilyMember  name='Kyle' imgPath={Kyle}/>
                    <div className="mobile-break"></div>
                    <FamilyMember name='Anna' imgPath={Anna}/>
                    <div id="desktop-break"></div>
                    <FamilyMember name='Big Henry' imgPath={Dad}/>
                    <div className="mobile-break"></div>
                    <FamilyMember name='Mary Ellen' imgPath={Mom}/>
                    <FamilyMember name='Harry' imgPath={Harry}/>
                </div>
                <button className="about-us-button about-us-button-subnav" onClick={props.changePage}>Back</button>
            </div> 
    );
}

export default AboutUsTheFamily;