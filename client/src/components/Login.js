import React, { Component } from 'react';
import * as firebase from 'firebase';

import '../componentStyles/Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorCode: '',
            errorMessage: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleEmailChange = (e) => {
        const email = e.target.value
        this.setState({email})
    }

    handlePasswordChange = (e) => {
        const password = e.target.value
        this.setState({password})
    }

    handleSignIn = (e) => {
        e.preventDefault();

        const email = this.state.email;
        const password = this.state.password;

        firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
            alert('Logged In');
            this.setState({loggedIn: true})
            this.props.loginHandler();
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            this.setState({
                email: '',
                password: '',
                errorCode,
                errorMessage
            })
            alert('Invalid Login Credentials');
        })

    }

    handleLogOut = (e) => {
        e.preventDefault(); 
        firebase.auth().signOut().then(() => {
            alert('Logged Out');
            this.props.loginHandler();
        }).catch(LogOutError => {
            console.log(LogOutError);
        })
    }

    render() {

        const loggedIn = this.props.loginState;
        let view;

        if(!loggedIn){
            view = <button onClick={this.handleSignIn}>Submit</button>
        }else{
            view = <button onClick={this.handleLogOut}>Log Out</button>
        }

        return (
            <div>
                <form>
                    <div id="login-input-wrapper">
                        <label>Email:</label>
                        <input 
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            type='email'/>
                        <label>Password:</label>
                        <input
                            type='password'
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                        />
                    </div>
                    {view}
                </form>
            </div>
        );
    }
}

export default Login;