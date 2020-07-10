import React from 'react';
import styled from 'styled-components';

import SectionTitle from './SectionTitle';
import FamilyMember from './FamilyMember';
import AboutUsButton from './AboutUsButton';


import Henry from '../images/Henry.jpeg'
import Kyle from '../images/Kyle.jpeg'
import Anna from '../images/Anna.JPG'
import Mom from '../images/Mom.jpeg'
import Dad from '../images/Dad.jpeg'
import Harry from '../images/Harry.jpeg'



const AboutUsFamilyWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    height: inherit;
    width: 100vw;

`

const FamilyMemberContainer = styled.div`


    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-row-gap: 2em;
    width: 80%;



    @media (max-width: 680px){
        grid-template-columns: 50% 50%;
        height: 55%;
        width: 100%;
    }


`



const AboutUsTheFamily = ({animation}) => {
    return (
           <AboutUsFamilyWrapper>

                <SectionTitle fontColor="yellow">The Family</SectionTitle>
                <FamilyMemberContainer>
                    <FamilyMember  name='Little Henry' imgPath={Henry} />
                    <FamilyMember  name='Kyle' imgPath={Kyle} />
                    <FamilyMember name='Anna' imgPath={Anna} />
                    <FamilyMember name='Big Henry' imgPath={Dad} />
                    <FamilyMember name='Mary Ellen' imgPath={Mom}/>
                    <FamilyMember name='Harry' imgPath={Harry}/>
                </FamilyMemberContainer>
                <AboutUsButton viewChange={animation} direction="leftToMiddle" fontColor="yellow">Back</AboutUsButton>
            </AboutUsFamilyWrapper>
    );
}

export default AboutUsTheFamily;