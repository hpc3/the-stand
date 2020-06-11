import React, {useState, useEffect} from 'react';
import { Spring } from 'react-spring/renderprops';

import HeaderTitle from './HeaderTitle';
import HeaderNav from "./HeaderNav";

import '../componentStyles/Header.css';



const Header = () => {
    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    

    let display;


    if(mounted){
        display =
                    <Spring
                        from={{ height: '100%',
                    opacity: 0 }}
                        to={{ height: '30%',
                    opacity: 1 }}
                        config={{ duration: 1500 }}
                    >
                        {props =>
                                <div style={props} id="header-wrapper">
                                    <HeaderTitle />
                                    <HeaderNav />
                                </div>
                        }
                    </Spring>
    }
    
    return (
        <header>
            {display}
        </header>
    )
}

export default Header;
