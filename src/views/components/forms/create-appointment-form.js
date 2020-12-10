import React, {Component} from 'react';
import get from 'lodash';
import {Form, Button, Alert, Row, Col} from "react-bootstrap";
import axios from 'axios'
import {validateEmail} from "../../../utils/general";
import {bake_cookie, read_cookie, delete_cookie} from "../../../utils/cookies"
import {UserContext} from '../../../contexts/userContext';
// import TimePickerPage from "./time-picker"
// import BasicDateTimePicker from './time-picker'
// import TimePicker from 'react-gradient-timepicker';
// import {Timepicker} from 'react-timepicker';
// import 'react-timepicker/timepicker.css';


const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}




export default class CreateAppointmentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }
        

        // this.onErrorClose = this.onErrorClose.bind(this);
        this.register = this.register.bind(this);

        this.timeStart = React.createRef();
        this.timeEnd = React.createRef();
        this.description = React.createRef();
        this.translatorUserId = React.createRef();
        this.applicantUserId = React.createRef();
        this.status = React.createRef();
        this.location = React.createRef();
        
    }
    onChange (hours, minutes) {
        console.log("Hours:", hours)
    }
    

    register = (e) => {
        e.preventDefault();
        let timeStart = this.timeStartRef.current.value; 
        let timeEnd = this.timeEndRef.current.value; 
        let description = this.descriptionRef.current.value; 
        let translatorUserId = this.translatorUserIdRef.current.value; 
        let applicantUserId = this.applicantUserIdRef.current.value; 
        let status = this.statusRef.current.value; 
        let location = this.locationRef.current.value; 
        
        let data = {
            timeStart: timeStart,
            timeEnd: timeEnd,
            description: description, 
            translatorUserId: translatorUserId, 
            applicantUserId: applicantUserId, 
            status: status,
            location: location,
        }

        axios.post("/appointments", data, config)
        .then((response) => {
            console.log(response);
            const data = response.data;
            if(data.error){
                this.setState({
                    error: data.message
                })
                return;
            }
            window.location.href = "/dashboard";
        })
        .catch((err) => {
            console.log(err.response.data);
            if(err.response.data.message && err.response.data.message.includes("ER_DUP_ENTRY")){
                this.setState({
                    error: "You have already created this appointment slot. Unless you want to create another you ready to go."
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
            <Form onSubmit={this.register}>
                {this.state.error ? 
                    <Alert dismissible variant="danger" onClose={this.onErrorClose}>{this.state.error}</Alert>
                :""}
                {/* <Form.Group sm = {6}>
                    <Form.Label>45 Minute Appointment Start</Form.Label>
                    <TimePickerPage />
                // </Form.Group> */}

                

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
                    <Form.Control ref={this.depRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Are you a translator or an applicant?</Form.Label>
                    <Form.Control size="sm" as="select" ref={this.typeRef}>
                        <option value="user">User</option>
                        <option value="translator">Translator</option>
                    </Form.Control>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}
CreateAppointmentForm.contextType = UserContext;