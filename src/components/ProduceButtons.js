import React, { Component } from 'react';

import '../componentStyles/ProduceButtons.css';


const ProduceButtons = (props) => {
    return(
        <div className='produce-card-button-group'>
            <button className='dec' onClick={() => props.quantityChange(-1)}> - </button>
            <button className='inc' onClick={() => props.quantityChange(1)}> + </button>
        </div>
    )
}



export default ProduceButtons;
