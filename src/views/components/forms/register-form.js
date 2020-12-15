import React, {Component} from 'react';
import get from 'lodash';
import {Form, Button, Alert, Row, Col} from "react-bootstrap";
import axios from 'axios'
import {validateEmail} from "../../../utils/general";
import {bake_cookie, read_cookie, delete_cookie} from "../../../utils/cookies"
import {UserContext} from '../../../contexts/userContext';


const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}




export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            showExtra: false
        }

        this.onErrorClose = this.onErrorClose.bind(this);
        this.register = this.register.bind(this);

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confPasswordRef = React.createRef();
        this.dobRef = React.createRef();
        this.fNameRef = React.createRef();
        this.lNameRef = React.createRef();
        this.languageRef = React.createRef();
        this.portRef = React.createRef();
        this.depRef = React.createRef();
        this.nationalityRef = React.createRef();
        this.typeRef = React.createRef();
        this.notificationsRef = React.createRef();
        this.showExtra = false;
        
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

    register = (e) => {
        e.preventDefault();
        let username = this.usernameRef.current.value; 
        let password = this.passwordRef.current.value; 
        let confPassword = this.confPasswordRef.current.value; 
        let dob = this.dobRef.current.value; 
        let fName = this.fNameRef.current.value; 
        let lName = this.lNameRef.current.value; 
        let langauge = this.languageRef.current.value; 
        let port = this.portRef.current.value; 
        let dependants = this.depRef.current.value;
        let nationality  = this.nationalityRef.current.value;
        let type = this.typeRef.current.value;
        console.log("TYPE:", type)
        const hashedPassword = require("crypto")
        .createHash("sha256")
        .update(this.passwordRef.current.value)
        .digest("base64");

        if(!validateEmail(username)){
            this.setState({
                error: "Please enter a valid email address"
            })
            window.scrollTo(0, 0);
            return;
        }
        
        if(confPassword != password) {
            this.setState({
                error: "Please confirm the entered passwords match"
            })
            window.scrollTo(0, 0);
            return; 
        }

        let data = {
            username: username,
            password: hashedPassword,
            dob: dob, 
            fName: fName, 
            lName: lName, 
            langauge: langauge.toLowerCase(),
            port: port,
            dependants: dependants,
            nationality: nationality, 
            type: type,
            // notifications: notifications,
        }
        console.log("Dataaaa",data);
        axios.post("/user", data, config)
        .then((response) => {
            console.log(response);
            const data = response.data;
            if(data.error){
                this.setState({
                    error: data.message
                })
                return;
            }
            window.location.href = "/login";
        })
        .catch((err) => {
            console.log(err);
            if(err.response){
                if(err.response.data.message && err.response.data.message.includes("ER_DUP_ENTRY")){
                    this.setState({
                        error: "This email is already taken, please choose another or login."
                    })
                    window.scrollTo(0, 0);
                }
            }
            else {
                this.setState({
                    error: "An error has occured, please try again"
                })
                window.scrollTo(0, 0);
            }
           
            
        });
        console.log("data",data);
        return;
    }

    updateType = (event) => {
        console.log(event);
        if(event.target.value === "user"){
            this.setState({
                showExtra: true
            })
        }
        else {
            this.setState({
                showExtra: false
            })
        }
    }

    render() {

        return (
            <Form onSubmit={this.register}>
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
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref ={this.confPasswordRef}/>
                </Form.Group>
                <Row>
                    <Col>
                    <Form.Control placeholder="First name" ref={this.fNameRef}/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Last name" ref={this.lNameRef}/>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Date of Birth (MM/DD/YY):</Form.Label>
                    <Form.Control ref={this.dobRef}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Langauges spoken</Form.Label>
                    <Form.Control ref={this.languageRef}/>
                    <Form.Text id="langaugeHelpBlock" muted>
                        Please enter the langauges you speak as a comma seperated list (IE spanish, german, italian ...)
                    </Form.Text>
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Do you want to receive email notifications?</Form.Label>
                    <Form.Control size="sm" as="select" ref={this.notifications}>
                        <option value="on">Yes, please email me.</option>
                        <option value="off">No thank you.</option>
                    </Form.Control>
                </Form.Group> */}
                <Form.Group>
                    <Form.Label>Are you a translator or an applicant?</Form.Label>
                    <Form.Control size="sm" as="select" onChange={this.updateType} ref={this.typeRef}>
                        <option value="translator">Translator</option>
                        <option value="user">User</option>
                    </Form.Control>
                </Form.Group>

                <div className = {this.state.showExtra ? '' : 'hidden'} >
                    <Form.Group>
                        <Form.Label>Port of entry:</Form.Label>
                        <Form.Control ref={this.portRef}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nationality:</Form.Label>
                        <Form.Control ref={this.nationalityRef}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number of Dependants:</Form.Label>
                        <Form.Control defaultValue={0} ref={this.depRef}/>
                    </Form.Group>
                </div>
                
                
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}
RegisterForm.contextType = UserContext;