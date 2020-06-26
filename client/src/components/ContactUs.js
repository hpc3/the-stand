import React from 'react';
import axios from 'axios';

import '../componentStyles/ContactUs.css';

class ContactUs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
        }
        
        this.formHandler = this.formHandler.bind(this);
        this.pushCommentToDatabase = this.pushCommentToDatabase.bind(this);
    }
    
    formHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    pushCommentToDatabase = (e) => {
        e.preventDefault();

        const {name, email, message} = this.state;

        axios({
            method: "POST",
            url: "/comment",
            data: {name, email, message}
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })


    }


    


    render() {
        return (
            <div id='contact-us' className='contact-us-container'>
                <h1 id='contact-us-title'>Contact Us</h1>
                    <form id="contact-us-form" onSubmit={this.pushCommentToDatabase}>
                        <label>Name:</label>
                        <input 
                            value={this.state.name}
                            type='text'
                            onChange={this.formHandler}
                            name="name"
                            required
                            id="contact-us-form-name"
                            />
                        <label>Email:</label>
                        <input 
                            value={this.state.email}
                            type='email' 
                            name="email"
                            onChange={this.formHandler}
                            id="contact-us-form-email"
                        />
                        <label>Comment:</label>

                        <textarea
                            value={this.state.message}
                            type='text'
                            name="message"
                            onChange={this.formHandler}
                            required
                            id="contact-us-form-message"
                        ></textarea>
                        <button type='submit'>Submit</button>
                    </form>
            </div>
        );
    }

}

export default ContactUs;