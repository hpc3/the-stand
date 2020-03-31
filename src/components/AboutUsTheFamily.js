import React from 'react';
import {Link} from 'react-router-dom';
import FamilyMember from './FamilyMember';

import '../componentStyles/AboutUsTheFamily.css';



function AboutUsTheFamily(props) {
    return (
           <div id='about-us-family'>
                <h2 id="about-us-family-title">The Family</h2>
                <div id='family-member-container'>
                    <FamilyMember className="col-1" name='Little Henry' imgPath="/images/Henry.jpeg"/>
                    <FamilyMember className="col-1" name='Kyle' imgPath="/images/Kyle.jpeg"/>
                    <div className="mobile-break"></div>
                    <FamilyMember className="col-1" name='Anna' imgPath="/images/Anna.JPG"/>
                    <div id="desktop-break"></div>
                    <FamilyMember className="col-1" name='Big Henry' imgPath="/images/Dad.jpeg"/>
                    <div className="mobile-break"></div>
                    <FamilyMember className="col-1"name='Mary Ellen' imgPath="/images/Mom.jpeg"/>
                    <FamilyMember className="col-1"name='Harry' imgPath="/images/Harry.jpeg"/>
                </div>
                <Link to='/' className='react-links'>Back</Link>
            </div> 
    );
}

export default AboutUsTheFamily;