import React from 'react';
import firebase from './firebase';

import '../componentStyles/ContactUs.css';

class ContactUs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            comment: '',
        }
        
        this.formHandler = this.formHandler.bind(this);
    }
    
    formHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    pushToFirestore = (e) => {
        e.preventDefault();

        const db = firebase.firestore();

        const nameClient = this.state.name;
        const emailClient = this.state.email;
        const commentClient = this.state.comment;

        db.collection('comment').doc(nameClient).set({
            //build payload 
            name: nameClient,
            email: emailClient,
            comment: commentClient
        })
        .then(() => {
            alert('Thanks for the feedback');
            this.setState({
                name: '',
                email:'',
                comment:''
            })
        })
        .catch(error => {
            alert('Something went wrong, please try again')
            console.log(error);
        });
    }


    render() {
        return (
            <div id='contact-us' className='contact-us-container'>
                <h1 id='contact-us-title'>Contact Us</h1>
                    <form id="contact-us-form" onSubmit={this.pushToFirestore}>
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
                            value={this.state.comment}
                            type='text'
                            name="comment"
                            onChange={this.formHandler}
                            required
                            id="contact-us-form-comment"
                        ></textarea>

                        {/* <input
                            value={this.state.comment}
                            type='text'
                            onChange={this.handleComment}
                            required
                            id="contact-us-form-comment"
                        /> */}
                        <button type='submit'>Submit</button>
                    </form>
            </div>
        );
    }

}

export default ContactUs;