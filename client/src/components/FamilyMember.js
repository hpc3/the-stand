import React from 'react';
import styled from 'styled-components';

// import '../componentStyles/FamilyMember.css';


const FamiyMemberWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    width: 100%;

`



const FamilyMemberImage = styled.img`

    height: 88%;
    width: 58%;
    /* border: solid white 1px; */
    border-radius: 1em;

    box-shadow: 0px 5px 10px -3px black;



    @media (max-width: 680px){

        /* height: 80%;
        width: 90%; */
    }
`

const FamilyMemberName = styled.h3`

    padding-top: 1px;
    color: yellow;


`


const FamilyMember = (props)  =>{ 

    return (
        <FamiyMemberWrapper>
            <FamilyMemberImage src={props.imgPath} alt={props.name}></FamilyMemberImage>
            
            <FamilyMemberName>{props.name}</FamilyMemberName>
        </FamiyMemberWrapper>
    );
}

export default FamilyMember;