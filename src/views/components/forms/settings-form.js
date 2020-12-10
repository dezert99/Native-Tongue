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




export default class SettingsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }

        // this.onErrorClose = this.onErrorClose.bind(this);
        // this.register = this.register.bind(this);

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
            langauge: langauge,
            port: port,
            dependants: dependants,
            nationality: nationality, 
        }

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
            console.log(err.response.data);
            if(err.response.data.message && err.response.data.message.includes("ER_DUP_ENTRY")){
                this.setState({
                    error: "This email is already taken, please choose another or login."
                })
                window.scrollTo(0, 0);
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

    update() {}

    render() {

        return (
            <Form >
                {/* onSubmit={this.update} */}
                {this.state.error ? 
                    <Alert dismissible variant="danger" onClose={this.onErrorClose}>{this.state.error}</Alert>
                :""}
                <Row>
                    <Col>
                    <Form.Control placeholder={this.context.user.first_name} ref={this.fNameRef}/>
                    </Col>
                    <Col>
                    <Form.Control placeholder={this.context.user.last_name} ref={this.lNameRef}/>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label >Date of Birth (MM/DD/YY):</Form.Label>
                    <Form.Control placeholder={this.context.user.date_of_birth} ref={this.dobRef}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Langauges spoken</Form.Label>
                    <Form.Control placeholder={this.context.user.languages} ref={this.languageRef}/>
                    <Form.Text id="langaugeHelpBlock" muted>
                        Please re-enter all the languages you speak as a comma seperated list (IE spanish, german, italian ...)
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Port of entry:</Form.Label>
                    <Form.Control placeholder={this.context.user.port_of_entry} ref={this.portRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nationality:</Form.Label>
                    <Form.Control placeholder={this.context.user.nationality} ref={this.nationalityRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number of Dependants:</Form.Label>
                    <Form.Control placeholder={this.context.num_of_dependants} ref={this.depRef}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit Edits
                </Button>
            </Form>
        );
    }
}
SettingsForm.contextType = UserContext;