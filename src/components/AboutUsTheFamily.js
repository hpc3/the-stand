import React from 'react';
import {Link} from 'react-router-dom';
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
                    <FamilyMember className="col-1" name='Little Henry' imgPath={Henry}/>
                    <FamilyMember className="col-1" name='Kyle' imgPath={Kyle}/>
                    <div className="mobile-break"></div>
                    <FamilyMember className="col-1" name='Anna' imgPath={Anna}/>
                    <div id="desktop-break"></div>
                    <FamilyMember className="col-1" name='Big Henry' imgPath={Dad}/>
                    <div className="mobile-break"></div>
                    <FamilyMember className="col-1"name='Mary Ellen' imgPath={Mom}/>
                    <FamilyMember className="col-1"name='Harry' imgPath={Harry}/>
                </div>
                <Link to='/' className='react-links'>Back</Link>
            </div> 
    );
}

export default AboutUsTheFamily;