import React, {Component} from 'react';
import get from 'lodash';
import {Form, Button, Alert} from "react-bootstrap";
import axios from 'axios'
import {Container, Col, Row} from "react-bootstrap";



const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}




export default class AppointmentPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }

        // this.logout = this.logout.bind(this);
        // this.login = this.login.bind(this);
        // this.onErrorClose = this.onErrorClose.bind(this);

        // this.usernameRef = React.createRef();
        // this.passwordRef = React.createRef();
    }

    // logout() {
    //     this.setState({user: {}});
    // }
    
    // login() {
    //     const username = this.usernameRef.current.value;

    //     if(!validateEmail(username)){
    //         this.setState({
    //             error: "Please enter a valid email address"
    //         })
    //         return;
    //     }
    //     const password = require("crypto")
    //     .createHash("sha256")
    //     .update(this.passwordRef.current.value)
    //     .digest("base64");

    //     axios.post("/login", {username: username,password: password}, config)
    //     .then((response) => {
    //         console.log(response);
    //         const data = response.data;
    //         if(data.error){
    //             this.setState({
    //                 error: data.message
    //             })
    //             return;
    //         }
    //         this.context.updateUser(data);
    //         bake_cookie("user", data);
    //         window.location.href = "/";
    //     })
    //     .catch(() => {
    //         this.setState({
    //             error: "An error has occured, please try again"
    //         })
    //     });
    //     console.log(username,password);
    // }

    // onErrorClose() {
    //     this.setState({
    //         error: false
    //     })
    // }

    render(){
        return (
            <Container className = "apppanel">
                <Row>
                    <Col sm={6}>
                        <div className ="apppanel__header">
                            Scheduled/pending
                        </div>
                        
                    </Col>
                    <Col sm={6} xs={12}>
                        <div className ="apppanel__header">
                            Open
                        </div>
                    </Col>
            </Row>
          </Container>
        )
    }
}