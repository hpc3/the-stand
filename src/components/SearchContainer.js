import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import firebase from './firebase'

import SearchTools from "./SearchTools";
import Produce from "./Produce";
import Login from './Login';

import '../componentStyles/SearchContainer.css';

class SearchContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            produce: [],
            error: '',
            loggedIn: false
        }
        this.sortList = this.sortList.bind(this);
        this.handleUserState = this.handleUserState.bind(this);
    }

    componentDidMount() {
        this.getProduceFromFirestore();
    }

    handleUserState(){
        this.setState((prevState) => ({
            loggedIn: !prevState.loggedIn
        }))
    }

    getProduceFromFirestore (){
        firebase
            .firestore()
            .collection('produce')
            .get()
            .then(querySnapshot => {
                let tempArray = [];
                console.log(querySnapshot)
                querySnapshot.forEach(doc => {
                    // grab doc.data() and set it to temp obj
                    let tempObj = doc.data();
                    //grab the id and add it to temp obj
                    tempObj['id'] = doc.id;
                    tempArray.push(tempObj)
                })
                this.setState({
                    produce: tempArray
                })
            })
    }

    sortList(e){
        if (e.target.value === 'a-z'){
                //Loops through an array of objects, p.id
                const tempArray = this.state.produce.sort((a, b) => {
                   if (b.name > a.name) return -1;
                   if (b.name < a.name) return 1;
                   return 0;
                });

                this.setState({
                    produce: tempArray
                });
        }
        if(e.target.value === 'z-a'){
            const tempArray = this.state.produce.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            this.setState({
                produce: tempArray
            });
        }
        if(e.target.value === 'h-l'){
            const tempArray = this.state.produce.sort((a, b) => {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
            });
            this.setState({
                produce: tempArray
            });
        }
        if(e.target.value === 'l-h'){
            const tempArray = this.state.produce.sort((a, b) => {
                if (b.price > a.price) return -1;
                if (b.price < a.price) return 1;
                return 0;
            });
            this.setState({
                produce: tempArray
            });
        }
    }
    render() {
        return(
            <div className='SearchContainer' id="produce" >
                <Router>
                    <Switch>
                        <Route path="/Dad">
                            <Login
                                loginState={this.state.loggedIn}
                                loginHandler={this.handleUserState}
                            />
                        </Route>
                    </Switch>
                </Router>
                <SearchTools sortList={this.sortList}/>
                <div className='produce-container'>
                    {this.state.produce.map((produce, index) =>
                        <Produce
                        {...produce}
                        key={produce.id}
                        index={index}
                        loggedIn={this.state.loggedIn}
                        />
                     )}
                </div>
            </div> 
        )
    }
}
export default SearchContainer;