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
        this.notificationsRef = React.createRef();
        
    }

    update = (e) => {
        e.preventDefault();

        let dob = this.dobRef.current.value; 
        let fName = this.fNameRef.current.value; 
        let lName = this.lNameRef.current.value; 
        let language = this.languageRef.current.value; 
        let port = this.portRef.current.value; 
        let dependants = this.depRef.current.value; 
        let nationality  = this.nationalityRef.current.value; 
        let notifications = this.notificationsRef.current.value;

        let data = {
            uid: this.context.user.user_id,
            username: this.context.user.email,
            dob: dob, 
            fName: fName, 
            lName: lName, 
            language: language,
            port: port,
            dependants: dependants,
            nationality: nationality, 
            notifications: notifications,
            type: this.context.user.type,
        }

        
        axios.put("/user", data, config)
        .then((response) => {
            console.log(response);

            const data = response.data;
            
            console.log("______________", data)
            delete_cookie("user")
            bake_cookie("user", data)
            if(data.error){
                this.setState({
                    error: data.message
                })
                return;
            }
            // console.log("________________", this.context.updateUser)
            // this.context.updateUser(data)
            
            window.location.href = "/dashboard";
            
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

    

    render() {

        return (
            <Form onSubmit={this.update}>
                
                {this.state.error ? 
                    <Alert dismissible variant="danger" onClose={this.onErrorClose}>{this.state.error}</Alert>
                :""}
                <Row>
                    <Col>
                    <Form.Control  ref={this.fNameRef} defaultValue={this.context.user.first_name}/>
                    </Col>
                    <Col>
                    <Form.Control  ref={this.lNameRef} defaultValue={this.context.user.last_name}/>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label >Date of Birth (MM/DD/YY):</Form.Label>
                    <Form.Control  ref={this.dobRef} defaultValue={this.context.user.date_of_birth}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>languages spoken</Form.Label>
                    <Form.Control  ref={this.languageRef} defaultValue={this.context.user.languages}/>
                    <Form.Text id="languageHelpBlock" muted>
                        If you are changing your language preferences please re-enter all the languages you speak as a comma seperated list (IE spanish, german, italian ...)
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Do you want to receive email notifications?</Form.Label>
                    <Form.Control size="sm" as="select"  ref={this.notificationsRef} defaultValue={this.context.user.notifications}>
                        <option value="on">Yes please, keep me updated!</option>
                        <option value="off">No thank you.</option>
                    </Form.Control>
                </Form.Group>
            
                <div className = {this.state.showExtra ? '' : 'hidden'} >
                    <Form.Group>
                        <Form.Label>Port of entry:</Form.Label>
                        <Form.Control  ref={this.portRef} defaultValue={this.context.port_of_entry}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nationality:</Form.Label>
                        <Form.Control  ref={this.nationalityRef} defaultValue={this.context.user.nationality}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number of Dependants:</Form.Label>
                        <Form.Control ref={this.depRef} defaultValue={this.context.user.num_of_dependants}/>
                    </Form.Group>
                </div>

                <Button variant="primary" type="submit">
                    Submit Edits
                </Button>
            </Form>
        );
    }
}
SettingsForm.contextType = UserContext;

