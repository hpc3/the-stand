import React from "react";
import {Spring} from 'react-spring/renderprops';

import '../componentStyles/Header.css'

export default function HeaderTitle() {

    return(
        <Spring
            from={{opacity: 0, marginLeft: -500}}
            to={{opacity: 1, marginLeft: 0}}
            config={{duration: 1500}}
        >
        {props => <div style={props}><h1 className="header-title">The Stand</h1></div>}
        </Spring>
    )
}

