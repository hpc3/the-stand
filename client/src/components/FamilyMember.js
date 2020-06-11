import React from 'react';

import '../componentStyles/FamilyMember.css';

function FamilyMember(props) {
    return (
        <div className="family-member">
            <img className="family-member-image" src={props.imgPath} alt={props.name}></img>
            
            <h3 className='family-member-name'>{props.name}</h3>
        </div>
    );
}

export default FamilyMember;