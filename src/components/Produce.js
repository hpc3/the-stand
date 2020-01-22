import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import '../componentStyles/Produce.css'
import '../componentStyles/font.css'
import '../componentStyles/elemental.css'
import '../componentStyles/ProduceButtons.css';
import ProduceButtons from "./ProduceButtons";
import ProduceInput from "./ProduceInput";


class Produce extends React.Component{


    state = {
        quantity: parseInt(this.props.quantity),
        dad: false
    }



    // handleButtonView = () => {
    //     if (this.state.dad !== true){
    //         return(
    //             <div>
    //                 <ProduceButtons
    //                     quantityChange={this.handleQuantityChange}
    //                 />
    //                 <ProduceInput
    //                     quantityChange={this.handleQuantityChange}
    //                 />
    //             </div>
    //
    //         )
    //     }
    // }


    handleQuantityChange = (delta) => {
        this.setState(prevState =>{
            return {
                quantity: prevState.quantity += delta
            }
        })
    }




    render() {
        return (

            <Router>
                <Switch>
                    <Route path='/Dad'>
                        <div>
                            <div className="produce-card">
                                {/*<img src={this.props.imgSrc} alt={this.props.name} className={this.props.name}/>*/}
                                <h3 className='produce-card-title'>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h3>
                                <p><span className='produce-value-title'>Price:</span> ${this.props.price}</p>
                                <p><span className='produce-value-title'>Type:</span> {this.props.type}</p>
                                <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p>
                                <p className='produce-quantity'><span className='produce-value-title'>Quantity:</span> {this.state.quantity}</p>
                                <ProduceButtons
                                    quantityChange={this.handleQuantityChange}
                                />
                                <ProduceInput
                                    quantityChange={this.handleQuantityChange}
                                />
                            </div>
                        </div>
                    </Route>
                    <Route path='/'>
                        <div>
                            <div className="produce-card">
                                {/*<img src={this.props.imgSrc} alt={this.props.name} className={this.props.name}/>*/}
                                <h3 className='produce-card-title'>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h3>
                                <p><span className='produce-value-title'>Price:</span> ${this.props.price}</p>
                                <p><span className='produce-value-title'>Type:</span> {this.props.type}</p>
                                <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p>
                                <p className='produce-quantity'><span className='produce-value-title'>Quantity:</span> {this.state.quantity}</p>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>



            // <div>
            //     <div className="produce-card">
            //         {/*<img src={this.props.imgSrc} alt={this.props.name} className={this.props.name}/>*/}
            //         <h3 className='produce-card-title'>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h3>
            //         <p><span className='produce-value-title'>Price:</span> ${this.props.price}</p>
            //         <p><span className='produce-value-title'>Type:</span> {this.props.type}</p>
            //         <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p>
            //         <p className='produce-quantity'><span className='produce-value-title'>Quantity:</span> {this.state.quantity}</p>
            //     </div>
            // </div>
        );
    }

}






export default Produce;