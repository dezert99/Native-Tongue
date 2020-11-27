import React, {Component} from 'react';
import get from 'lodash';
import {Form, Button, Alert} from "react-bootstrap";
import axios from 'axios'
import {validateEmail} from "../../../utils/general";
import {bake_cookie, read_cookie, delete_cookie} from "../../../utils/cookies"
import {UserContext} from '../../../contexts/userContext';


const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}




export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }

        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.onErrorClose = this.onErrorClose.bind(this);

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    logout() {
        this.setState({user: {}});
    }
    
    login() {
        const username = this.usernameRef.current.value;

        if(!validateEmail(username)){
            this.setState({
                error: "Please enter a valid email address"
            })
            return;
        }
        const password = require("crypto")
        .createHash("sha256")
        .update(this.passwordRef.current.value)
        .digest("base64");

        axios.post("/login", {username: username,password: password}, config)
        .then((response) => {
            console.log(response);
            const data = response.data;
            if(data.error){
                this.setState({
                    error: data.message
                })
                return;
            }
            this.context.updateUser(data);
            bake_cookie("user", data);
            window.location.href = "/";
        })
        .catch(() => {
            this.setState({
                error: "An error has occured, please try again"
            })
        });
        console.log(username,password);
    }

    onErrorClose() {
        this.setState({
            error: false
        })
    }

    render() {

        return (
            <Form>
                {this.state.error ? 
                    <Alert dismissible variant="danger" onClose={this.onErrorClose}>{this.state.error}</Alert>
                :""}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref ={this.usernameRef}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref ={this.passwordRef}/>
                </Form.Group>
                <Button variant="primary" onClick={this.login}>
                    Submit
                </Button>
            </Form>
        );
    }
}
LoginForm.contextType = UserContext;