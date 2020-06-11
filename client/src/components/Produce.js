import React from 'react';
import firebase from './firebase'


import ProduceButtons from "./ProduceButtons";
import ProduceInput from "./ProduceInput";

import '../componentStyles/Produce.css'
import '../componentStyles/ProduceButtons.css';

import images from './images';


class Produce extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            quantity: '',
            id: null,
            hasBeenChanged: false
        }
    }
    
    componentDidMount(){
        this.setState({
            quantity: parseInt(this.props.quantity),
            id: this.props.id,
        })
    }

    pushToFirestore = () => {
        if(this.state.hasBeenChanged){
            //push quanity back up, have to use the id to reference the document within the collection
            

            const db = firebase.firestore()
            // ID of cloudfirestore document 
            const docID = this.state.id
            //Value of quantity to update 
            const quantity = this.state.quantity
            //created Data object to push back to firestore as date of last stocked
            const lastStocked = new Date();
    
            db.collection('produce').doc(docID).update({
                quantity: quantity,
                lastStocked: lastStocked.toString()
            })
            .then(() => {
                alert("data pushed")
            })
            .catch((error) => {
                alert('Dad you gotta log in first');
                console.log(error);
            }) 
        }else{
            alert('Quantity has not been changed');
        }
    }


    handleQuantityChange = (delta) => {
        if(!this.state.hasBeenChanged){
            this.setState((prevState) => ({
                quantity: prevState.quantity += delta,
                hasBeenChanged: true
            }))
        }else{
            this.setState(prevState =>{
                return{
                    quantity: prevState.quantity += delta
                }
                
            })
        }
    }

    render() {

        let loggedIn = this.props.loggedIn;
        let buttons;

        if(loggedIn){
            buttons = 
                    <div>
                        <ProduceButtons
                                quantityChange={this.handleQuantityChange}
                            />
                        <ProduceInput
                                quantityChange={this.handleQuantityChange}
                            />
                        <button onClick={this.pushToFirestore}>Submit</button>
                    </div>
        }
        return (
                <div className="produce-card">
                    <img  src={images[this.props.name].src} alt={this.props.name} className='produce-card-images'/>
                    <h3 className='produce-card-title'>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h3>
                    <p><span className='produce-value-title'>Last Stocked:</span> {this.props.lastStocked}</p>
                    <p><span className='produce-value-title'>Price:</span> ${this.props.price}</p>
                    <p><span className='produce-value-title'>Type:</span> {this.props.type}</p>
                    <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p>
                    <p className='produce-quantity'><span className='produce-value-title'>Quantity:</span> {this.state.quantity}</p>
                    {buttons} 
                </div>   
        );
    }

}






export default Produce;