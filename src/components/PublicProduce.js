import React from 'react';

// import '../images';

import '../componentStyles/Produce.css'
import '../componentStyles/font.css'
import '../componentStyles/elemental.css'






class ProducePublic extends React.Component{

    render() {
        return (
            <div>
                <div className="produce-card">
                    {/*<img src={this.props.imgSrc} alt={this.props.name} className={this.props.name}/>*/}
                    <h3 className='produce-card-title'>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h3>
                    <p><span className='produce-value-title'>Price:</span> ${this.props.price}</p>
                    <p><span className='produce-value-title'>Type:</span> {this.props.type}</p>
                    <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p>
                    <p className='produce-quantity'><span className='produce-value-title'>Quantity:</span> {this.props.quantity}</p>
                </div>
            </div>
        );
    }

}






export default ProducePublic;