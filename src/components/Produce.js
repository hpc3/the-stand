import React from 'react';

import Button from  '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';



import '../images/corn.jpg';

import '../componentStyles/Produce.css'
import '../componentStyles/font.css'
import '../componentStyles/elemental.css'






class Produce extends React.Component{


    state = {
        quantity: parseInt(this.props.quantity)
    };



    incrementQuantity(){
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decrementQuantity(){
        this.setState({
            quantity: this.state.quantity - 1
        });
    }



    inputChange(){

        //save the id so we know which input to select
        
        //grab the value from the input with appropriate id & parse
        const falcoPhantasm = parseInt(document.getElementById(this.props.id).value);
        
        console.log(falcoPhantasm);

        // // Checks if the value is a int

        if(falcoPhantasm == null){

        }else if(Number.isInteger(falcoPhantasm)){
            this.setState({
                quantity: this.state.quantity + falcoPhantasm
            });

            document.getElementById(this.props.id).value = '';
        }else{
            document.getElementById(this.props.id).value = '';
        }


        if (Number.isInteger(falcoPhantasm)){
            //if it is adjust the state accordingly

        }else if (falcoPhantasm == null){

        }
        //
        // //Remove the value from the input

    }

// className="title" "value"

    render() {
        return (
            <div>
                <div className="produce-card">
                    <img src={this.props.imgSrc} alt={this.props.name} className={this.props.name}/>
                    <h3 className='produce-card-title'>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h3>
                    <p><span className='produce-value-title'>Price:</span> ${this.props.price}</p>
                    <p><span className='produce-value-title'>Type:</span> {this.props.type}</p>
                    <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p>
                    <p className='produce-quantity'><span className='produce-value-title'>Quantity:</span> {this.state.quantity}</p>

                    <ButtonGroup size="small" aria-label="small outlined button group" className='button-group'>
                        <Button id = 'inc' onClick={this.incrementQuantity.bind(this)}><strong>+</strong></Button>
                        <Button id='button-group-enter' onClick={this.inputChange.bind(this)}><strong>Enter</strong></Button>
                        <Button id='dec' onClick={this.decrementQuantity.bind(this)}><strong>-</strong></Button>
                    </ButtonGroup>

                    <input type='text' id={this.props.id} className='quantity-input'/>




                    {/*<div className='produce-card-inputs'>*/}
                        {/*<Button color='default'>+</Button>*/}
                        {/*/!*<button className="inc" onClick={this.incrementQuantity.bind(this)}>+</button>*!/*/}
                        {/*<input type='text' id='quantity-input'/>*/}
                        {/*<button className='dec' onClick={this.decrementQuantity.bind(this)}>-</button>*/}
                    {/*</div>*/}

                    {/*<button className='produce-card-submit' onClick={this.inputChange.bind(this)}>Submit</button>*/}
                </div>
            </div>
        );
    }

}






export default Produce;