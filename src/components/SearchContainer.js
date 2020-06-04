import React, {Component} from 'react';
import {
    Route
} from "react-router-dom";

import firebase from './firebase';

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
    render() 
    {
        
        let errorWithData = <h1> That's weird, something went wrong </h1>

        let produceCards;

        if(this.state.produce.length !== 0){
            produceCards = this.state.produce.map((produce, index) =>
                <Produce
                {...produce}
                key={produce.id}
                index={index}
                loggedIn={this.state.loggedIn}
                />
             )
        }
        
        return(
            <div className='SearchContainer' id="produce" >
                <Route path="/Dad">
                    <Login
                        loginState={this.state.loggedIn}
                        loginHandler={this.handleUserState}
                    />
                </Route>
                <SearchTools sortList={this.sortList}/>
                <div className='produce-container'>
                {/* If produce data has been recieved render cards, else alert user of error */}
                {this.state.produce.length !== 0 ? produceCards : errorWithData }
                </div>
            </div> 
        )
    }
}
export default SearchContainer;