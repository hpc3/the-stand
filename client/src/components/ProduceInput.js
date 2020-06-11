import React, { Component} from 'react';

import '../componentStyles/ProduceInput.css'


class ProduceInput extends Component{

    state = {
        value: ''
    }


    handleValueChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let quantity = parseInt(this.state.value);

        if(Number.isInteger(quantity)){
            this.props.quantityChange(quantity);
        }

        this.setState({value: ''});

    }
    render() {
        return(
            <form className='produce-card-form' onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    value={this.state.value}
                    onChange={this.handleValueChange}
                    className='produce-card-form-input'
                />
                <input
                    type='submit'
                    value='Enter'
                    className='produce-card-form-submit'
                />
            </form>
        )
    }
}

export default ProduceInput;