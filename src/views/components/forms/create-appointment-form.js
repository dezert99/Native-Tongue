import React, {Component, useState } from 'react';
import get from 'lodash';
import {Container, Form, Button, Alert, Row, Col} from "react-bootstrap";
import axios from 'axios'
import {validateEmail} from "../../../utils/general";
import {bake_cookie, read_cookie, delete_cookie} from "../../../utils/cookies"
import {UserContext} from '../../../contexts/userContext';

import MaterialUITime from './time-picker'
import MaterialUIDate from './date-picker'
import Faq from "react-faq-component" ;


const styles = {
    bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "dark-grey",
    rowContentColor: 'grey',
    arrowColor: "red",
};



let faq_data = {
    
    rows: [
        {
            title: "How do I set up a meeting with a translator?",
            content: "You can set up a meeting with a translator by navigating to the calender from the homepage. There you will see all the available time slots with translators that speak your language. You can simply click on the slot and enter your details to request the meeting.",
        },
        {
            title: "How do I upload documents to discuss with a translator?",
            content: 'You can upload documents in the documents field on the homepage. If you have not yet done so please create an account, login and upload your documents on the homepage. We accept all popular file formats.',
        },
        {
            title: "How will my data and documents be stored?",
            content: 'All your data is encrypted and will never be shared with anyone except the people you have elected to share with.',
        },
        {
            title: "How many meetings can I set up?",
            content: 'As many as you want. We are here to help you through the entire immigration process and are happy to help as much as we can.',
        },
    ],
};

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
            time_set: false,
           
        
        }
        // const [startDate, setStartDate] = useState(new Date());
        
        

        this.onErrorClose = this.onErrorClose.bind(this);
        this.create = this.create.bind(this);

        this.locationRef = React.createRef();


        
    }
    updateEndTime = (time) => {
        let hour = time.getHours()
        let min = time.getMinutes()
        let new_time = this.state.timeEnd
        new_time.setHours(hour)
        new_time.setMinutes(min)
        this.setState({
            timeEnd: new_time,
        })
    }

    updateTime = (time) => {
        let hour = time.getHours()
        let min = time.getMinutes()
        let new_time = this.state.timeStart
        new_time.setHours(hour)
        new_time.setMinutes(min)

        let new_end = this.state.timeEnd
        new_end.setHours(new_time.getHours()+1)
        new_end.setDate(new_time.getDate())
        new_end.setFullYear(new_time.getFullYear())
        new_end.setMonth(new_time.getMonth())
        new_end.setMinutes(new_time.getMinutes())


        this.setState({
            timeStart: new_time,
            timeEnd: new_end,
            time_set: true,
             
        })
        console.log("TIME:", new_time)
    }
    updateDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let new_date = this.state.timeStart
        new_date.setDate(day)
        new_date.setMonth(month)
        new_date.setFullYear(year)

        this.setState({
            timeStart: new_date,
        })
        console.log("TIME:", new_date)
    }


    create = (e) => {
        e.preventDefault();
        let timeS = this.state.timeStart; 
        let timeE = this.state.timeEnd;

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
                    error: "You have already created this appointment slot. Unless you want to create another you're ready to go."
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
                <Col>
                    <Form onSubmit={this.create}>
                        {/* onSubmit={this.update} */}
                        {this.state.error ? 
                            <Alert dismissible variant="danger" onClose={this.onErrorClose}>{this.state.error}</Alert>
                        :""}
                                <Row>
                                    <MaterialUIDate curr={this.state.timeStart} updateTime={this.updateDate}/>
                                </Row>
                                <Row>
                                <MaterialUITime curr={this.state.timeStart} updateTime={this.updateTime} label="Start Time"/>
                                </Row>
                                <Row>
                                    {this.state.time_set?
                                    <MaterialUITime curr={this.state.timeEnd} updateTime={this.updateTime} label="End Time"/>
                                    : ""
                                    }  
                                </Row> 
                                <Row>
                                <Form.Group>
                                    <Form.Label>Location or Link:</Form.Label>
                                    <Form.Control ref={this.locationRef}/>
                                </Form.Group>
                                </Row>
    
                                
                                <Row>
                                    <Button variant="primary" type="submit">Create</Button>
                                </Row> 
                    </Form>
                </Col>

            </Container>
        );
    }
}
CreateAppointmentForm.contextType = UserContext;