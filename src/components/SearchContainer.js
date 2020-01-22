import React from 'react';
import axios from 'axios';


import SearchTools from "./SearchTools";
import Produce from "./Produce";

import '../componentStyles/SearchContainer.css';



class SearchContainer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            produce: [],
            error: '',
        }

        this.sortList = this.sortList.bind(this);
    }


    componentDidMount() {
        this.getProduceDate();
    }

    getProduceDate(){
        axios.get('http://my-json-server.typicode.com/hpc3/StandDB/produce')
            .then(response => {
                this.setState({produce: response.data});
            }).catch(error => {
            this.setState({errorMessage: error.message});
        });
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
            <div className='SearchContainer' id='produce'>
                <SearchTools sortList={this.sortList}/>
                <div className='produce-container'>
                    {this.state.produce.map((produce, index) =>
                        <Produce
                            {...produce}
                            key={produce.id}
                            index={index}
                        />
                    )}
                </div>
            </div>
        )
    }
}
export default SearchContainer;