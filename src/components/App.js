import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './Header';
import AboutUs from './AboutUs';
import SearchContainer from './SearchContainer';

import '../componentStyles/App.css';



class App extends React.Component{
    render() {
        return (
        <Router>
            <Switch>
                <Route path='/'>
                    <Header/>
                    {/*<AboutUs/>*/}
                    <SearchContainer/>
                </Route>
                <Route path='/Dad'>
                    <SearchContainer/>
                </Route>
            </Switch>
        </Router>
        );
    }
}

export default App;