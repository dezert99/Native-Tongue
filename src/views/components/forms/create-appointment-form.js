import React, {Component, useState } from 'react';
import get from 'lodash';
import {Container, Form, Button, Alert, Row, Col} from "react-bootstrap";
import axios from 'axios'
import {validateEmail} from "../../../utils/general";
import {bake_cookie, read_cookie, delete_cookie} from "../../../utils/cookies"
import {UserContext} from '../../../contexts/userContext';

import MaterialUITime from './time-picker'
import MaterialUIDate from './date-picker'

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
            timeStart: new Date(),
            timeEnd: new Date(),
           
        
        }
        // const [startDate, setStartDate] = useState(new Date());
        
        

        this.onErrorClose = this.onErrorClose.bind(this);
        this.create = this.create.bind(this);

        this.locationRef = React.createRef();


        
    }

    updateTime = (time) => {
        this.setState({
            timeStart: time,
        })
        console.log("TIME:", time)
    }

    create = (e) => {
        e.preventDefault();
        let timeS = this.state.timeStart; 
        let timeE = new Date(this.state.timeStart.setHours(this.state.timeStart.getHours() + 1));
        let translatorUserId = this.context.user.user_id;
        let status = "open"; 
        let location = this.locationRef.current.value; 
        
        let data = {
            timeStart: timeS.toISOString().slice(0, 19).replace('T', ' '),
            timeEnd: timeE.toISOString().slice(0, 19).replace('T', ' '),
            translatorUserId: translatorUserId, 
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
    onErrorClose() {
        this.setState({
            error: false
        })
    }



    

    render() {
        // const [value, onChange] = useState(new Date());
        // let value = state.value
        // let onChange = state.onChange
        return (
            <Container className = "body">
                
                <Form onSubmit={this.create}>
                    {/* onSubmit={this.update} */}
                    {this.state.error ? 
                        <Alert dismissible variant="danger" onClose={this.onErrorClose}>{this.state.error}</Alert>
                    :""}
                    <Col sm={5}>
                        <Row>
                            <MaterialUIDate curr={this.state.timeStart} updateTime={this.updateTime}/>
                            <Form.Group>
                                <Form.Label>Location or Link:</Form.Label>
                                <Form.Control ref={this.locationRef}/>
                            </Form.Group>
                        </Row>
                    </Col>

                    <Col sm={5} >
                        <Row>
                            <MaterialUITime curr={this.state.timeStart} updateTime={this.updateTime}/>
  
                        </Row>
                    </Col>
                    <Button variant="primary" type="submit">Create</Button>
                </Form>
            </Container>
        );
    }
}
CreateAppointmentForm.contextType = UserContext;