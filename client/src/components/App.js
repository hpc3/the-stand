import React from 'react';

import BackToTop from './BackToTop';
import Header from './Header'
import AboutUs from './AboutUs'
import ProduceBin from './ProduceBin';
import ContactUs from "./ContactUs";

const App = () => {
    return (
       <div>
            <Header/>
            <AboutUs/>
            <ProduceBin/>
            <ContactUs/>  
            <BackToTop/>
        </div>
    );
}

export default App;
